/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

// @ts-expect-error No types available
import frontifyConfig from '@frontify/eslint-config-react';
import headerPlugin from '@tony.ganchev/eslint-plugin-header';
import { defineConfig } from 'eslint/config';
// @ts-expect-error No types available
import tailwindcssPlugin from 'eslint-plugin-tailwindcss';

export default defineConfig(
    {
        ignores: ['dist/', 'node_modules/', '.storybook/**', 'storybook-static/'],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    frontifyConfig,
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@tony.ganchev': headerPlugin,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            tailwindcss: tailwindcssPlugin,
        },
        rules: {
            // Copyright header rules
            '@tony.ganchev/header': [
                'error',
                {
                    header: {
                        commentType: 'block',
                        lines: [' (c) Copyright Frontify Ltd., all rights reserved. '],
                    },
                    trailingEmptyLines: {
                        minimum: 2,
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
            '@eslint-react/dom-no-missing-button-type': 'warn',

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
