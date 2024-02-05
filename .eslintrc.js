modules.exports = {
    parser: 'babel-eslint',
    plugins: ['react', 'react-native'],
    rules: {
        'quotes': ['error', 'single'],
        'no-console': 'off'
    },
    env: {
        'react-native/react-native': true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-native/all'],
};