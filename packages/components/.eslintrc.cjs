/* (c) Copyright Frontify Ltd., all rights reserved. */

module.exports = {
    root: true,
    extends: ['@frontify/eslint-config-react', 'plugin:storybook/recommended'],
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
    ],
};
