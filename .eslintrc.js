module.exports = {
    extends: ['@frontify/eslint-config-react', 'plugin:jsx-a11y/recommended'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    plugins: ['jsx-a11y'],
    rules: {
        'unicorn/no-nested-ternary': 'off' /* disabled to align with prettier */,
        'react-hooks/rules-of-hooks': 'warn' /* disabled to do a partial release */,
    },
};
