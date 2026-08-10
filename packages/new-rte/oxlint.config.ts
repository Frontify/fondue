/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig } from 'oxlint';

export default defineConfig({
    extends: [reactConfig],
    options: {
        typeAware: true,
    },
    ignorePatterns: ['dist/', 'storybook-static/', '**/*.mdx'],
    overrides: [
        {
            files: ['**/*.{js,jsx,ts,tsx,mts,cts,cjs}'],
            jsPlugins: ['@tony.ganchev/eslint-plugin-header'],
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
            files: ['**/*.stories.tsx'],
            rules: {
                '@eslint-react/rules-of-hooks': 'off',
                '@eslint-community/eslint-comments/disable-enable-pair': 'off',
            },
        },
        {
            // Engine (ProseMirror) imports are confined to src/RichTextEditor/prosemirror by design.
            files: ['src/**/*.{ts,tsx}'],
            excludeFiles: ['src/RichTextEditor/prosemirror/**'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['prosemirror-*'],
                                message:
                                    'ProseMirror imports are forbidden outside src/RichTextEditor/prosemirror/. Use the FondueRtePlugin + EditorControlApi seam instead.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            // Plugins may only import the editor surface (src/RichTextEditor/index.ts),
            // never editor internals or the package root. This keeps shipped plugins
            // honest — anything they can do, an external plugin author can do too.
            files: ['src/plugins/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['prosemirror-*'],
                                message:
                                    'ProseMirror imports are forbidden outside src/RichTextEditor/prosemirror/. Use the FondueRtePlugin + EditorControlApi seam instead.',
                            },
                            {
                                group: ['#/RichTextEditor/**', '#/index', '**/RichTextEditor/**'],
                                message: 'Plugins may only import the editor surface (#/RichTextEditor).',
                            },
                        ],
                    },
                ],
            },
        },
        {
            // Stories stand in for consumer code: they may only use the package
            // public API (src/index.ts).
            files: ['src/**/*.stories.tsx'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['prosemirror-*'],
                                message:
                                    'ProseMirror imports are forbidden outside src/RichTextEditor/prosemirror/. Use the FondueRtePlugin + EditorControlApi seam instead.',
                            },
                            {
                                group: [
                                    '#/RichTextEditor',
                                    '#/RichTextEditor/**',
                                    './RichTextEditor/**',
                                    './plugins/**',
                                ],
                                message: 'Stories may only import the package public API (./index).',
                            },
                        ],
                    },
                ],
            },
        },
    ],
});
