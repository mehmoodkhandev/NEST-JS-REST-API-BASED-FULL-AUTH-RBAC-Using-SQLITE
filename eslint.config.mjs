// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  /* -------------------- Global ignores -------------------- */
  {
    ignores: ['eslint.config.mjs', 'dist/**', 'node_modules/**'],
  },

  /* -------------------- Base ESLint -------------------- */
  eslint.configs.recommended,

  /* -------------------- TypeScript (type-aware) -------------------- */
  ...tseslint.configs.recommendedTypeChecked,

  /* -------------------- Prettier -------------------- */
  eslintPluginPrettierRecommended,

  /* -------------------- Language options -------------------- */
  {
    languageOptions: {
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
  },

  /* -------------------- Rules: safe & sane -------------------- */
  {
    rules: {
      /* ---- Keep code clean ---- */
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn',

      /* ---- Allow real backend patterns ---- */
      '@typescript-eslint/no-explicit-any': 'warn',

      /* ---- Turn OFF rules that cause noise in NestJS ---- */
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',

      /* ---- Async sanity ---- */
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
    },
  },

  /* -------------------- Relax DTOs / Entities -------------------- */
  {
    files: ['**/*.dto.ts', '**/*.entity.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
