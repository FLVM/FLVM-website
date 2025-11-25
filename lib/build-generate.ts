import fs from 'fs/promises';
import path from 'path';

const IN = './schemas.json';
const OUT = './velite-generated.mjs';

const typeMap = {
	string: 'z.string()',
	number: 'z.number()',
	boolean: 'z.boolean()',
	date: 'z.string().transform(s => new Date(s))',
	any: 'z.any()'
};

/*
// Exemple de contenu
[
  {
    "id": "articles",
    "path": "content/articles",
    "schema": {
      "title": { "type": "string", "required": true },
      "date":  { "type": "date", "required": true },
      "tags":  { "type": "array", "items": { "type": "string" } },
      "draft": { "type": "boolean" }
    }
  },
  {
    "id": "authors",
    "path": "content/authors",
    "schema": {
      "name": { "type": "string", "required": true },
      "bio": { "type": "string" },
      "social": { "type": "object", "properties": { "twitter": { "type": "string" }, "github": { "type": "string" } } }
    }
  }
]

*/
function fieldToZodExpr(name, def) {
	// def: { type: "string" | "array" | "object" | ..., required?: true, items?: {...}, properties?: {...} }
	if (def.type === 'array') {
		const item = def.items || { type: 'any' };
		if (item.type === 'object') {
			const inner = objectPropsToZod(item.properties || {});
			return `${name}: z.array(z.object(${inner}))${def.required ? '' : '.optional()'}`;
		}
		const itemExpr = item.type === 'array' ? 'z.any()' : typeMap[item.type] || 'z.any()';
		return `${name}: z.array(${itemExpr})${def.required ? '' : '.optional()'}`;
	}
	if (def.type === 'object') {
		const inner = objectPropsToZod(def.properties || {});
		return `${name}: z.object(${inner})${def.required ? '' : '.optional()'}`;
	}
	const base = typeMap[def.type] || 'z.any()';
	return `${name}: ${base}${def.required ? '' : '.optional()'}`;
}

function objectPropsToZod(props) {
	const entries = Object.entries(props).map(([k, v]) => {
		const expr =
			v.type === 'object'
				? objectPropsToZod(v.properties || {})
				: v.type === 'array'
					? v.items && v.items.type === 'object'
						? `z.array(z.object(${objectPropsToZod(v.items.properties || {})}))`
						: typeMap[v.items?.type] || 'z.any()'
					: typeMap[v.type] || 'z.any()';
		const opt = v.required ? '' : '.optional()';
		return `${JSON.stringify(k)}: ${expr}${opt}`;
	});
	return `{\n  ${entries.join(',\n  ')}\n}`;
}

async function main() {
	const raw = await fs.readFile(IN, 'utf8');
	const schemas = JSON.parse(raw);

	const parts = [];
	parts.push(`import { z } from 'zod';\n`);

	for (const s of schemas) {
		const id = s.id.replace(/[^a-zA-Z0-9_$]/g, '_');
		const props = s.schema || {};
		const fieldLines = Object.entries(props).map(([k, def]) => fieldToZodExpr(k, def));
		const zodObj = `{\n  ${fieldLines.join(',\n  ')}\n}`;
		parts.push(`export const ${id}Schema = z.object(${zodObj});`);
		parts.push(
			`export const ${id} = { id: ${JSON.stringify(s.id)}, path: ${JSON.stringify(s.path || `content/${s.id}`)}, schema: ${id}Schema };`
		);
		parts.push('');
	}

	const collectionList = schemas.map((s) => s.id).map((id) => id.replace(/[^a-zA-Z0-9_$]/g, '_'));
	parts.push(`export const collections = [${collectionList.join(', ')}];\n`);

	await fs.writeFile(OUT, parts.join('\n'), 'utf8');
	console.log('Generated', OUT);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
