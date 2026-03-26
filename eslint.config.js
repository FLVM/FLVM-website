import prettier from 'eslint-config-prettier';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default defineConfig(
  includeIgnoreFile(gitignorePath),
  js.configs.recommended,
  ...ts.configs.recommended,
  ...svelte.configs.recommended,
  prettier,
  ...svelte.configs.prettier,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      // typescript-eslint strongly recommend that you do not use the no-undef lint rule on TypeScript projects.
      // see: https://typescript-eslint.io/troubleshooting/faqs/eslint/#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
      'no-undef': 'off',

      // Règle "pas de @html"
      // N'est pas autorisé de base pour des raison d'attaques XSS potentielles.
      // Les sources provenant du CMS, les risques restent limités.
      // Néanmoins, à l'avenir, voir si il existe des alternatives.
      'svelte/no-at-html-tags': 'off',

      // Règle "ne pas permettre de navigation interne vers une 404".
      // Trop complexe de mettre en place le contrôle d'url pour ce genre de projet.
      // Ne peut fonctionner qu'à partir du moment ou le CMS permet de contrainde
      // les url valide (elle doivent être toujours valide).
      // https://sveltejs.github.io/eslint-plugin-svelte/rules/no-navigation-without-resolve/
      'svelte/no-navigation-without-resolve': 'off'
    }
  },
  {
    files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: ['.svelte'],
        parser: ts.parser,
        svelteConfig
      }
    }
  }
);
