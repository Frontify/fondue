/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

// @ts-expect-error No types available
import frontifyConfig from '@frontify/eslint-config-react';
import { defineConfig } from 'eslint/config';
// @ts-expect-error No types available
import noticePlugin from 'eslint-plugin-notice';

export default defineConfig(
    {
        ignores: [
            'dist/',
            'storybook-static/',
            'node_modules/',
            '**/*.md',
            '**/*.mdx',
            '**/*.mdx/**.ts',
            '**/*.mdx/**.tsx',
            '**/*.md/**.ts',
            '**/*.md/**.tsx',
        ],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    frontifyConfig,
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.cjs'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            'import/resolver': {
                typescript: {
                    project: `${import.meta.dirname}/tsconfig.json`,
                },
            },
        },
        plugins: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            notice: noticePlugin,
        },
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

            '@typescript-eslint/no-explicit-any': 'warn',
            '@typescript-eslint/no-floating-promises': 'warn',
            '@typescript-eslint/no-misused-promises': 'warn',
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',
            '@typescript-eslint/prefer-promise-reject-errors': 'warn',
            'promise/always-return': 'warn',
            'promise/catch-or-return': 'warn',
        },
    },
    {
        files: ['**/*.stories.tsx'],
        rules: {
            'react-hooks/rules-of-hooks': 'off',
            '@eslint-react/rules-of-hooks': 'off',
            '@eslint-react/component-hook-factories': 'off',
            '@eslint-react/hooks-extra/prefer-use-state-lazy-initialization': 'off',
            '@eslint-community/eslint-comments/disable-enable-pair': 'off',
        },
    },
);
