module.exports = {
  root: true,
  env: {
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['plugin:vue/strongly-recommended', '@vue/prettier'],
  globals: {
    AMap: true
  },
  rules: {
    // 'vue/html-self-closing': 'warn',
    // 'vue/max-attributes-per-line': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
