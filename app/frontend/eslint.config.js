//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';

const tsconfigRootDir = new URL('.', import.meta.url).pathname;

export default [
  ...tanstackConfig,
  {
    files: ['**/*.{js,ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir,
      },
    },
  },
];
