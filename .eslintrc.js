module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:vue/essential', 'prettier'],
  globals: {
    axios: 'readonly',
    Vue: 'readonly',
    weex: 'readonly',
    loginReady: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': ['warn', { printWidth: 120, endOfLine: 'auto' }],
    'no-debugger': process.env.NODE_ENV === '"production"' ? 'error' : 'off',
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-unused-vars': ['error', { args: 'none' }],
    'no-control-regex': 'off'
  }
}
