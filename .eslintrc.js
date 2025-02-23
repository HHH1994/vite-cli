module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/vue3-recommended',
      'plugin:@typescript-eslint/recommended',
      '.eslintrc-auto-import.json'
    ],
    env: {
      node: true,
      es6: true
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-vue'],
    rules: {
      // 自定义规则
      "vue/comment-directive": 'off'
    },
    overrides: [
      {
        files: ['*.js'],
        extends: ['plugin:@typescript-eslint/disable-type-checked'],
      },
    ],
    root: true
  };