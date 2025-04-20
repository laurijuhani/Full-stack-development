module.exports = {
  root: true, // Mark this as the root configuration for the backend
  env: {
    node: true, // Enable Node.js global variables and Node.js scoping
    es2020: true,
  },
  extends: [
    'eslint:recommended', // Use recommended ESLint rules
  ],
  parserOptions: {
    ecmaVersion: 'latest', // Use the latest ECMAScript version
    sourceType: 'module', // Enable ES modules
  },
  rules: {
    // Add any custom rules for the backend here
    'no-console': 'off', // Allow console statements (useful for backend logging)
  },
};