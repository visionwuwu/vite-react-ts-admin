module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/prop-types': 0,
    'no-empty-interface': 0,
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-useless-escape': 0,
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'react/display-name': [2],
    '@typescript-eslint/no-non-null-assertion': 0,
    'no-self-assign': 0,
  },
}
