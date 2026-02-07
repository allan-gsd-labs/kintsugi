import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import next from '@next/eslint-plugin-next';

export default [
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'coverage/**', 'dist/**', '*.tsbuildinfo'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      '@next/next': next,
    },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs['core-web-vitals'].rules,
    },
  },
];
