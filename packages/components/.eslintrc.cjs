/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    root: true,
    extends: ['@frontify/eslint-config-react', 'plugin:storybook/recommended', 'plugin:tailwindcss/recommended'],
    plugins: ['notice'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    parserOptions: {
        project: ['tsconfig.json', 'tsconfig.node.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
    },
    overrides: [
        {
            files: ['*.js', '*.ts', '*.tsx'],
            rules: {
                'notice/notice': [
                    'error',
                    {
                        template: '/* (c) Copyright Frontify Ltd., all rights reserved. */\n\n',
                        messages: {
                            whenFailedToMatch: 'No Frontify copyright header set.',
                        },
                    },
                ],
            },
        },
        {
            files: ['*.ts', '*.tsx', '*.js'],
            parser: '@typescript-eslint/parser',
            rules: {
                'tailwindcss/enforces-shorthand': 'off',
                'tailwindcss/classnames-order': 'off',
                'tailwindcss/enforces-negative-arbitrary-values': 'off',
                'tailwindcss/no-custom-classname': [
                    'warn',
                    {
                        callees: ['className', 'sv', 'class'],
                        whitelist: ['fondue-theme-provider'],
                    },
                ],
            },
        },
        {
            files: ['**/*.md/**/*'],
            processor: 'markdown/markdown',
            parserOptions: {
                project: null,
            },
        },
    ],
};
