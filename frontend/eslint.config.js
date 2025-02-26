import js from '@eslint/js';
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import pluginVue from 'eslint-plugin-vue';

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,

  {
    rules: {
      eqeqeq: 'error',
      semi: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'quotes': ['error', 'single', {'avoidEscape': true}],
      'no-unused-vars': 'error',
      'no-object-constructor': 'error'
    },
  }
];
