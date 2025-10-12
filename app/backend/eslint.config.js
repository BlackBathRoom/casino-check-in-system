import baseConfig from '@hono/eslint-config';
import prettier from 'eslint-config-prettier';

const tsconfigRootDir = new URL('.', import.meta.url).pathname;

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir,
      },
    },
  },
  prettier,
];
