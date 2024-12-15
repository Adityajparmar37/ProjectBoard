module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest', // Ensure compatibility with the latest ECMAScript features
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // Explicitly enable JSX support
    },
  },
  settings: {
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off', // Disable PropTypes if you're using TypeScript
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Warn about unused variables, ignore those starting with `_`
    'react-hooks/rules-of-hooks': 'error', // Enforce the Rules of Hooks
    'react-hooks/exhaustive-deps': 'warn', // Warn about missing dependencies in useEffect
  },
};
