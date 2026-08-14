/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig } from 'oxlint';

/**
 * The layer boundaries, as import rings. Dependencies point inward: domain ←
 * ports ← adapters, with the React shell driving and the plugins written against
 * the domain alone. The groups below are shared by the rings that need them, so
 * that a ring scoped to one folder depth still carries the whole rule.
 */
const NO_ENGINE = {
    group: ['prosemirror-*'],
    message:
        'ProseMirror imports are forbidden outside src/adapters/prosemirror/. Use the RtePlugin + EditorControlApi seam instead.',
};

const NO_SERVER_RENDER = {
    group: ['react-dom/server'],
    message:
        'Only src/adapters/reactProbe/ renders React outside the tree. Take a RenderProbe through EditorOptions.probe instead.',
};

const DOMAIN_ONLY = {
    group: ['#/domain/**', '#/ports', '#/ports/**', '#/adapters/**', '#/ui', '#/ui/**', '#/index'],
    message: 'Plugins may only import the domain surface (#/domain).',
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
        // The layers, as import rings. Dependencies point inward: domain ← ports
        // ← adapters, with the React shell driving and the plugins written against
        // the domain alone. Each ring below names what a layer may NOT reach for.
        {
            // Engine (ProseMirror) imports are confined to one folder by design —
            // that folder is what an engine swap replaces.
            files: ['src/**/*.{ts,tsx}'],
            excludeFiles: ['src/adapters/prosemirror/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['prosemirror-*'],
                                message:
                                    'ProseMirror imports are forbidden outside src/adapters/prosemirror/. Use the RtePlugin + EditorControlApi seam instead.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            // Rendering React outside the component tree is one adapter's job.
            files: ['src/**/*.{ts,tsx}'],
            excludeFiles: ['src/adapters/reactProbe/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['react-dom/server'],
                                message:
                                    'Only src/adapters/reactProbe/ renders React outside the tree. Take a RenderProbe through EditorOptions.probe instead.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            // The domain is the innermost layer: it imports from no other.
            files: ['src/domain/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['prosemirror-*', 'react-dom', 'react-dom/**'],
                                message: 'The domain may use React types, never an engine or a renderer.',
                            },
                            {
                                group: [
                                    '#/ports',
                                    '#/ports/**',
                                    '#/adapters/**',
                                    '#/ui',
                                    '#/ui/**',
                                    '#/plugins/**',
                                    '#/index',
                                ],
                                message: 'The domain imports from no other layer — it is what the other layers import.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            // Ports sit between the domain and whatever carries the work out.
            files: ['src/ports/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['prosemirror-*', 'react-dom', 'react-dom/**'],
                                message: 'A port describes an implementation; it never is one.',
                            },
                            {
                                group: ['#/adapters/**', '#/ui', '#/ui/**', '#/plugins/**', '#/index'],
                                message: 'Ports may import the domain and nothing else.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            // An adapter implements a port. It knows nothing of the shell that
            // drives it, the plugins it is handed, or the package's public API.
            files: ['src/adapters/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['#/ui', '#/ui/**', '#/plugins/**', '#/index'],
                                message:
                                    'An adapter implements a port: it may import the domain and the ports, nothing further out.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            // Plugins may only import the domain. This keeps shipped plugins
            // honest: anything they can do, an external plugin author can do too.
            files: ['src/plugins/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': ['error', { patterns: [NO_ENGINE, NO_SERVER_RENDER, DOMAIN_ONLY] }],
            },
        },
        {
            // A file directly in a plugin folder: one `..` reaches its siblings.
            files: ['src/plugins/*/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    { patterns: [NO_ENGINE, NO_SERVER_RENDER, DOMAIN_ONLY, noSiblingPlugin('..')] },
                ],
            },
        },
        {
            // A file in a plugin's own subfolder: two `..` reach its siblings, and
            // one `..` is still inside the plugin it belongs to.
            files: ['src/plugins/*/*/**/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    { patterns: [NO_ENGINE, NO_SERVER_RENDER, DOMAIN_ONLY, noSiblingPlugin('../..')] },
                ],
            },
        },
        {
            // One composition point wires the adapters in; the rest of the shell
            // drives the editor through the EditorHandle port.
            files: ['src/ui/**/*.{ts,tsx}'],
            excludeFiles: ['src/ui/hooks/useEditorHandle.ts'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['#/adapters/**'],
                                message:
                                    'Only useEditorHandle wires an adapter in. Everything else uses the EditorHandle port from #/ports.',
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
                                    'ProseMirror imports are forbidden outside src/adapters/prosemirror/. Use the RtePlugin + EditorControlApi seam instead.',
                            },
                            {
                                group: [
                                    '#/domain',
                                    '#/domain/**',
                                    '#/ports',
                                    '#/ports/**',
                                    '#/adapters/**',
                                    '#/ui',
                                    '#/ui/**',
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
