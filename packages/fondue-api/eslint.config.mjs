/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

// @ts-expect-error No types available
import frontifyConfig from '@frontify/eslint-config-react';
import { defineConfig } from 'eslint/config';
// @ts-expect-error No types available
import noticePlugin from 'eslint-plugin-notice';

export default defineConfig(
    {
        ignores: ['dist/', 'node_modules/'],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    frontifyConfig,
    {
        files: ['**/*.ts', '**/*.mts', '**/*.cts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
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
            '@typescript-eslint/no-unsafe-argument': 'warn',
            '@typescript-eslint/no-unsafe-assignment': 'warn',
            '@typescript-eslint/no-unsafe-call': 'warn',
            '@typescript-eslint/no-unsafe-member-access': 'warn',
            '@typescript-eslint/no-unsafe-return': 'warn',
            'promise/always-return': 'warn',
            'promise/catch-or-return': 'warn',
        },
    },
);
