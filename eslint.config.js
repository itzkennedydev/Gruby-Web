import typescript from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'dist/**', 'drizzle/**', 'next.config.js'],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,  
        projectService: {
          allowDefaultProject: ['*.js', '*.cjs', '*.mjs'],
        },
        ecmaVersion: 2024,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
    },
    settings: {
      react: {
        version: 'detect'  
      },
      next: {
        rootDir: './',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks,
    },
    rules: {
      ...typescript.configs['recommended'].rules,
      ...react.configs['recommended'].rules,
      ...reactHooks.configs['recommended'].rules,
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_' 
      }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      'react/prop-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'react/no-unknown-property': ['error', { ignore: ['jsx', 'global'] }]
    }
  }
];
