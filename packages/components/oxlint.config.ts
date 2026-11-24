/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig } from 'oxlint';

export default defineConfig({
    extends: [reactConfig],
    options: {
        typeAware: true,
    },
    ignorePatterns: [
        'storybook-static/',
        'playwright-report/',
        'test-results/',
        'playwright/',
        'debug-storybook.log',
        '**/*.mdx',
    ],
    overrides: [
        {
            files: ['**/*.{js,jsx,ts,tsx,mts,cts,cjs}'],
            jsPlugins: ['@tony.ganchev/eslint-plugin-header', 'eslint-plugin-tailwindcss'],
            rules: {
                '@tony.ganchev/header/header': [
                    'error',
                    {
                        header: {
                            commentType: 'block',
                            lines: [' (c) Copyright Frontify Ltd., all rights reserved. '],
                        },
                        trailingEmptyLines: { minimum: 2 },
                    },
                ],
                'tailwindcss/no-custom-classname': [
                    'warn',
                    {
                        whitelist: ['^(?!tw-).*$'],
                        callees: ['className', 'sv', 'class'],
                        cssFiles: [],
                    },
                ],
                'tailwindcss/no-contradicting-classname': 'error',
                'tailwindcss/enforces-negative-arbitrary-values': 'error',
                'tailwindcss/no-unnecessary-arbitrary-value': 'error',

                '@eslint-react/dom-no-missing-button-type': 'warn',

                // Keep the project's existing severity on type-aware rules (warn, not error)
                'typescript/no-explicit-any': 'warn',
                'typescript/no-floating-promises': 'warn',
                'typescript/no-misused-promises': 'warn',
                'typescript/no-unsafe-argument': 'warn',
                'typescript/no-unsafe-assignment': 'warn',
                'typescript/no-unsafe-call': 'warn',
                'typescript/no-unsafe-member-access': 'warn',
                'typescript/no-unsafe-return': 'warn',
                'typescript/prefer-promise-reject-errors': 'warn',
                'promise/always-return': 'warn',
                'promise/catch-or-return': 'warn',
            },
        },
        {
            // Test-only helpers (Playwright, harnesses) must not end up in the shipped bundle
            files: ['**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['#/testutils', '#/testutils/*', '**/testutils', '**/testutils/*'],
                                message:
                                    'testutils are for tests only. Import them from *.ct.tsx or *.spec.ts(x) files.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            files: ['**/*.ct.tsx', '**/*.spec.{ts,tsx}', '**/*.test.{ts,tsx}', '**/__tests__/**', '**/testutils/**'],
            rules: {
                'no-restricted-imports': 'off',
            },
        },
        {
            files: ['**/*.stories.tsx'],
            rules: {
                '@eslint-react/rules-of-hooks': 'off',
                '@eslint-community/eslint-comments/disable-enable-pair': 'off',
            },
        },
    ],
});
