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
        EXPERIMENTAL_useProjectService: true,
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
            files: ['**/*.md/**/*'],
            processor: 'markdown/markdown',
            parserOptions: {
                project: null,
            },
        },
    ],
};
