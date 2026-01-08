/**
 * Sveltia to Velite
 *
 * Génère un fichier de schéma pour Velite à partir d'un fichier de
 * configuration Svletia.
 *
 * @note: Les tranformateur ne peuvent pas être utilisé pour le moment.
 * Envisager de pouvoir les définirs via un fichier de configuration.
 * Par exemple dans le fichier `velite.config.ts` lors de l'instanciation
 * des collections (`collections(config)`).
 */

import fs from 'fs';
import yaml from 'js-yaml';

// type Config = {
//   // Peut être récupéré dans la config de Sveltia
//   contentPath?: string
//   sveltiaFilePath?: string
//   outputPath?: string
// }

/**
 * Convertie un champs Sveltia en type Velite (zod)
 *
 * @todo: Ajouter slug: s.path() pour les collections Sveltia et
 * des transformateur (pour générer les nom (firstname + lastname) et filename) aux
 * collection et les singletons.
 *
 * @param {string} name Nom de l'entrée
 * @param {object} def Définition de l'entrée
 * @returns
 */
function fieldToZod(field) {
	let result = '';
	// Svletia "body" => Velite "content"
	const name = field.name === 'body' ? 'content' : field.name;
	switch (field.widget) {
		case 'boolean':
			result += `${name}: s.boolean()`;
			break;
		case 'number':
			result += `${name}: s.number()`;
			break;
		case 'datetime':
			result += `${name}: s.date()`;
			break;
		// @todo : voir pourquoi s.markdown() génère :
		// " info The content is empty  image.legend "
		case 'markdown':
			result += `${name}: s.markdown()`;
			break;
		// s.enum; s.union, s.object, s.array, s.slug
		case 'select':
			// Options has string list
			let options = field.options.map((o) => `"${o}"`);
			// Options has object list
			if (typeof field.options[0] === 'object') {
				options = field.options.map((o) => `"${o.value}"`);
			}
			result += `${name}: s.enum(["", ${options}])`;
			break;
		case 'list':
			if (field.fields) {
				result += `${name}: s.array(s.object({${Object.values(field.fields).map((f) => fieldToZod(f))}}))`;
			} else if (field.types) {
				if (field.types.length > 1) {
					result += `${name}: s.array(s.union([${Object.values(field.types).map((t) => `s.object({${Object.values(t.fields).map((f) => fieldToZod(f))}}).extend({type: s.enum(["${t.name}"])})`)}]))`;
				} else {
					result += `${name}: s.array(s.object({${Object.values(field.types).map((f) => fieldToZod(f))}}).extend({type: s.enum(["${field.types[0].name}"])}))`;
				}
			} else if (field.allow_add === false) {
				result += `${name}: s.enum([${field.default.map((o) => `"${o}"`)}])`;
			} else {
				result += `${name}: s.array(s.string())`;
			}
			break;
		case 'object':
			// Object enum
			// @todo: évaluer usage
			const fieldEnum = false;
			if (fieldEnum) {
			} else {
				result += `${name}: s.object({${Object.values(field.fields).map((f) => fieldToZod(f))}})`;
			}
			break;
		// @todo: champ caché, essayer de déteerminer le type en fonction
		// de la valuer par défaut (boolean, number, object ou string)
		default:
			// Tous les autres widgets de Sveltia devrait être traités type `any`
			// Liste des widgets : https://decapcms.org/docs/widgets/
			result += `${name}: s.string()`;
	}

	if (field.required === false) {
		result += '.optional().nullable()';
	}

	return result;
}

/**
 * Generate Velite collections from Sveltai config file
 * @param config
 */
export async function generateCollections(config = {}) {
	// const contentPath = config.contentPath || "content"
	const sveltiaFilePath = config.sveltiaFilePath || './static/admin/config.yml';
	const outputPath = config.outputPath || './velite-generated.js';
	const transforms = config.transforms || {};
	const raw = yaml.load(fs.readFileSync(sveltiaFilePath, 'utf8'));
	console.log(raw.collections);
	const collections = raw.collections.concat(
		raw.singletons.map((s) => ({ ...s, singleton: true }))
	);

	const result = [];
	result.push('// Velite file generated from `./lib/sveltia-to-velite.ts`');
	result.push('\n');
	result.push("import { s } from 'velite'");

	// From Sveltia collections
	let collectionList = [];
	// @todo: appliquer le meme traitement pour les singletons
	for (const c of collections.filter((c) => !c.divider)) {
		const id = c.name.charAt(0).toUpperCase() + c.name.slice(1);

		const pattern = c.singleton
			? c.file.replace('content/', '')
			: c.folder.replace('content/', '') + '/**/*.md';
		const single = c.singleton ? true : false;

		const schema = Object.values(c.fields).map((field) => fieldToZod(field));

		if (!c.hide) {
			schema.push(`slug: s.path()`);
		}

		let zodObj = `{\n ${schema.join(',\n ')}\n}`;

		if (transforms[c.name]) {
			result.push(`import path from "path"`);
			result.push(`export const ${id}Schema = s.object(${zodObj})${transforms[c.name]}`);
		} else {
			result.push(`export const ${id}Schema = s.object(${zodObj})`);
		}

		result.push(
			`export const ${c.name} = { name: ${JSON.stringify(id)}, pattern: ${JSON.stringify(pattern)}, single: ${single}, schema: ${id}Schema}`
		);
		result.push('');
		collectionList.push(c.name);
	}
	// From Svletia Singletons
	// @DRY

	result.push(`export const collections = {${collectionList.join(', ')}};\n`);
	fs.writeFileSync(outputPath, result.join('\n'), 'utf8');
	console.log('Velite schema file generated: ', outputPath);
}

generateCollections({
	transforms: {
		team: `.transform((data, { meta }) => {
      return {
        ...data,
        filename: path.basename(meta.path),
        name: \`\${data.firstname} \${data.lastname}\`
      }
    })`
	}
}).catch((err) => {
	console.error(err);
	process.exit(1);
});
