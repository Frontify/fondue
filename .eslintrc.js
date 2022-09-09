module.exports = {
    extends: ['@frontify/eslint-config-react', 'plugin:jsx-a11y/recommended', 'plugin:storybook/recommended'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['jsx-a11y'],
    rules: {
        'react-hooks/rules-of-hooks': 'warn' /* degraded to warning to do a partial release */,
    },
};
