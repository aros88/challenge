const js = require('@eslint/js');

module.exports = [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,

  {
    rules: {
      'no-undef': 'off',
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
