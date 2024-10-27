module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.contexts.json'], 
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint', 'react'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  env: {
    node: true,  // Enable Node.js global variables like 'process'
    browser: true,  // Enables browser global variables
    es2021: true,  // Enables modern ECMAScript globals
  },
  rules: {
    'react/react-in-jsx-scope': 'off',         // Disables the need to import React in every file with JSX
    'react/prop-types': 'off',                 // Disables prop-types validation as you're using TypeScript
    'no-case-declarations': 'off',             // Disables lexical declaration errors in case blocks
    'no-undef': 'off',                         // Disables undefined variable errors (useful if you're encountering issues with global variables like 'process')
  },
  settings: {
    react: {
      version: 'detect',                       // Automatically detects the React version for linting
    },
  },
}
