/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

import frontifyConfig from '@frontify/eslint-config-react';
import noticePlugin from 'eslint-plugin-notice';
import storybookPlugin from 'eslint-plugin-storybook';
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __dirname = path.dirname(fileURLToPath(new URL('.', import.meta.url)));

export default tseslint.config(
    {
        ignores: [
            'src/foundation/Icon/Generated/**/*.tsx',
            'src/foundation/Icon/Generated/index.ts',
            'src/foundation/Icon/IconEnum.ts',
            'src/components/ComponentEnum.ts',
            'src/components/postcss.config.cjs',
            'src/subpackages/tokens.js',
            'postcss.config.cjs',
            'cypress.config.ts',
            'vite.config.ts',
            'tailwind.config.js',
            'tokens.vite.config.ts',
            'components.vite.config.ts',
            'charts.vite.config.ts',
            'icons.vite.config.ts',
            'eslint.config.mjs',
            'README.md',
            'dist',
            'legacyTokens',
            '.storybook',
            'storybook-static',
            'node_modules',
            '**/*.json',
        ],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    frontifyConfig,
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
        languageOptions: {
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: __dirname,
            },
        },
        plugins: {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            notice: noticePlugin,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            tailwindcss: tailwindcssPlugin,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            storybook: storybookPlugin,
        },
        rules: {
            // Copyright header rules=
            'notice/notice': [
                'error',
                {
                    template: '/* (c) Copyright Frontify Ltd., all rights reserved. */\n\n',
                    messages: {
                        whenFailedToMatch: 'No Frontify copyright header set.',
                    },
                },
            ],

            // TailwindCSS rules
            'tailwindcss/no-custom-classname': [
                'warn',
                {
                    whitelist: ['^(?!tw-).*$'],
                    callees: ['className', 'sv', 'class'],
                },
            ],
            'tailwindcss/no-contradicting-classname': 'error',
            'tailwindcss/enforces-negative-arbitrary-values': 'error',
            'tailwindcss/no-unnecessary-arbitrary-value': 'error',

            // JavaScript DOM rules
            'unicorn/prefer-dom-node-text-content': 'warn',

            // React rules
            '@eslint-react/dom/no-missing-button-type': 'warn',

            // Typescript rules
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
            '@eslint-react/hooks-extra/prefer-use-state-lazy-initialization': 'off',
            '@eslint-community/eslint-comments/disable-enable-pair': 'off',
        },
    },
);
