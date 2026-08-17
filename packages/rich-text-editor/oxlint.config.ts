/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig } from 'oxlint';

/**
 * The layer boundaries, as import rings. Dependencies point inward: core ←
 * plugins / renderer / editor, with ProseMirror confined to
 * `editor/engines/prosemirror/`. The groups below are shared by the rings that
 * need them, so that a ring scoped to one folder depth still carries the whole
 * rule.
 */
const NO_ENGINE = {
    group: ['prosemirror-*'],
    message:
        'ProseMirror imports are forbidden outside src/editor/engines/prosemirror/. Use the RtePlugin + EditorControlApi seam instead.',
};

const NO_SERVER_RENDER = {
    group: ['react-dom/server'],
    message: 'Only src/renderer/serializeToHtml.ts renders React outside the tree.',
};

const CORE_ONLY = {
    group: ['#/editor', '#/editor/**', '#/renderer', '#/renderer/**', '#/plugins/**', '#/index', '#/documentFormat'],
    message: 'Plugins may only import the core surface (#/core).',
};

/**
 * One plugin reaching into another is how "anything a shipped plugin does, an
 * external author can do too" stops being true. A plugin's own subfolders are
 * fine, so what counts as another plugin depends on how deep the importing file
 * sits — hence one group per depth, each applied to files at that depth.
 */
const noSiblingPlugin = (up: string) => ({
    group: [`${up}/*`, `${up}/*/**`, `!${up}/shared`, `!${up}/shared/**`],
    message:
        'A plugin may not import another plugin. What several plugins are built out of belongs in src/plugins/shared/.',
});

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
            files: ['src/**/*.{ts,tsx}'],
            excludeFiles: ['src/editor/engines/prosemirror/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['prosemirror-*'],
                                message:
                                    'ProseMirror imports are forbidden outside src/editor/engines/prosemirror/. Use the RtePlugin + EditorControlApi seam instead.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            files: ['src/**/*.{ts,tsx}'],
            excludeFiles: [
                'src/renderer/serializeToHtml.ts',
                'src/serverRendering*.spec.tsx',
                'src/serializeToHtml*.spec.tsx',
            ],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['react-dom/server'],
                                message: 'Only src/renderer/serializeToHtml.ts renders React outside the tree.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            files: ['src/core/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['prosemirror-*', 'react-dom', 'react-dom/**'],
                                message: 'The core may use React types, never an engine or a renderer.',
                            },
                            {
                                group: [
                                    '#/editor',
                                    '#/editor/**',
                                    '#/renderer',
                                    '#/renderer/**',
                                    '#/plugins/**',
                                    '#/index',
                                    '#/documentFormat',
                                ],
                                message: 'The core imports from no other layer — it is what the other layers import.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            files: ['src/renderer/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['prosemirror-*'],
                                message: 'The renderer never imports an engine.',
                            },
                            {
                                group: ['#/editor', '#/editor/**', '#/plugins/**', '#/index', '#/documentFormat'],
                                message: 'The renderer may import core and nothing else.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            files: ['src/plugins/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': ['error', { patterns: [NO_ENGINE, NO_SERVER_RENDER, CORE_ONLY] }],
            },
        },
        {
            files: ['src/plugins/*/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    { patterns: [NO_ENGINE, NO_SERVER_RENDER, CORE_ONLY, noSiblingPlugin('..')] },
                ],
            },
        },
        {
            files: ['src/plugins/*/*/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    { patterns: [NO_ENGINE, NO_SERVER_RENDER, CORE_ONLY, noSiblingPlugin('../..')] },
                ],
            },
        },
        {
            files: ['src/editor/**/*.{ts,tsx}'],
            excludeFiles: ['src/editor/hooks/useEditorHandle.ts', 'src/editor/engines/prosemirror/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['#/editor/engines/**'],
                                message:
                                    'Only useEditorHandle wires an adapter in. Everything else uses the editor port.',
                            },
                            {
                                group: ['#/plugins/**', '#/index', '#/documentFormat'],
                                message: 'The editor shell may import core, the renderer, and the port.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            files: ['src/editor/engines/prosemirror/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: [
                                    '#/editor/RichTextEditor',
                                    '#/editor/Toolbar',
                                    '#/editor/hooks/**',
                                    '#/plugins/**',
                                    '#/renderer',
                                    '#/renderer/**',
                                    '#/index',
                                    '#/documentFormat',
                                ],
                                message: 'The engine adapter may import core and the editor port, nothing further out.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            files: ['src/**/*.stories.tsx'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['prosemirror-*'],
                                message:
                                    'ProseMirror imports are forbidden outside src/editor/engines/prosemirror/. Use the RtePlugin + EditorControlApi seam instead.',
                            },
                            {
                                group: [
                                    '#/core',
                                    '#/core/**',
                                    '#/editor',
                                    '#/editor/**',
                                    '#/renderer',
                                    '#/renderer/**',
                                    '#/plugins',
                                    '#/plugins/**',
                                    './plugins/**',
                                    './documentFormat',
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
