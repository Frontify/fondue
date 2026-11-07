/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig } from 'oxlint';

/**
 * The layer boundaries, as import rings. Dependencies point inward: core ←
 * plugins / renderer / editor, with ProseMirror confined to
 * `editor/engines/prosemirror/`. Another layer is reached through its `#/…`
 * alias only, so each ring bans the aliases it may not use — always the bare
 * alias too (`#/plugins`, not just `#/plugins/**`) — and bans relative paths
 * that climb out of the importing file's own layer. How far `../` may climb
 * depends on how deep the importing file sits, hence one ring per depth.
 *
 * Patterns are globs matched against the import specifier: `*` stays within one
 * path segment, `**` crosses any number, and a later `!pattern` re-allows what
 * an earlier one banned.
 */
const NO_ENGINE = {
    group: ['prosemirror-*'],
    message:
        'ProseMirror imports are forbidden outside src/editor/engines/prosemirror/. Use the RtePlugin + EditorControlApi seam instead.',
};

const NO_SERVER_RENDER = {
    group: ['react-dom/server'],
    message:
        'The package never renders React to a string: serializeToHtml writes HTML itself. Only the server-rendering specs, standing in for a host, use react-dom/server.',
};

/** Every alias outside the core, which is all a plugin or the renderer may not use. */
const OUTER_LAYERS = [
    '#/editor',
    '#/editor/**',
    '#/renderer',
    '#/renderer/**',
    '#/plugins',
    '#/plugins/**',
    '#/index',
    '#/documentFormat',
];

/** Bans relative imports that climb `up` (`..`, `../..`, …) or further. */
const noRelativeEscape = (up: string, message: string) => ({
    group: [`${up}/**`],
    message,
});

const CORE_ONLY = {
    group: OUTER_LAYERS,
    message: 'Plugins may only import the core surface (#/core).',
};

/**
 * One plugin reaching into another is how "anything a shipped plugin does, an
 * external author can do too" stops being true. A plugin's own subfolders are
 * fine, so what counts as another plugin — or as leaving `src/plugins/`
 * altogether — depends on how deep the importing file sits: `up` is the
 * relative path from the importing file to `src/plugins/`.
 */
const noSiblingPlugin = (up: string) => ({
    group: [`${up}/**`, `!${up}/shared`, `!${up}/shared/**`],
    message:
        'A plugin may not import another plugin, nor reach out of src/plugins/ by a relative path (use #/core). What several plugins are built out of belongs in src/plugins/shared/.',
});

/** The shell reaches the engine only through `useEditorHandle`; `up` is the relative path to `src/editor/`. */
const noEngineFromShell = (up: string) => ({
    group: ['#/editor/engines', '#/editor/engines/**', `${up}/engines`, `${up}/engines/**`],
    message: 'Only useEditorHandle wires an adapter in. Everything else uses the editor port.',
});

const NO_UI_KIT = {
    group: [
        '@frontify/fondue-icons',
        '@frontify/fondue-icons/**',
        '@frontify/fondue-components',
        '@frontify/fondue-components/**',
    ],
    message: 'Content modules reach the renderer and export, so they import no editing UI kit.',
};

/** A plugin's content module stays free of its editing code, which keeps the renderer bundle small. */
const CONTENT_ONLY = {
    group: [
        './**',
        '!./*.module.scss',
        '!./types',
        '!./helpers/**',
        // A read view the renderer draws for every mention.
        '!./components/MentionLink',
    ],
    message:
        'A content module imports only its styles, types, helpers and read views: never its plugin, its editing components or the toolbar button.',
};

// A path, not a pattern: a `!` re-allow in any pattern group (the sibling ring's `shared`) wins over every group.
const NO_TOOLBAR_BUTTON = ['../shared/ToolbarButton', '../shared/ToolbarButton/ToolbarButton'].map((name) => ({
    name,
    message: CONTENT_ONLY.message,
}));

const SHELL_OUTER_LAYERS = {
    group: [
        '#/plugins',
        '#/plugins/**',
        '!#/plugins/shared/ToolbarButton/ToolbarButton',
        '#/index',
        '#/documentFormat',
    ],
    message: 'The editor shell may import core, the renderer, the port, and the toolbar button.',
};

const SHELL_ESCAPE_MESSAGE = 'The editor shell reaches other layers through their #/… alias, never a relative path.';

/**
 * The engine adapter's allowed targets are listed positively: the core, and of
 * the editor only the port. `allowPluginBarrel` lets its test harness and specs
 * build editors from the shipped plugins (`#/plugins`), which the adapter itself
 * must never depend on.
 */
const engineRing = (allowPluginBarrel: boolean) => ({
    group: [
        '#/editor',
        '#/editor/**',
        '!#/editor/port',
        '#/renderer',
        '#/renderer/**',
        ...(allowPluginBarrel ? [] : ['#/plugins']),
        '#/plugins/**',
        '#/index',
        '#/documentFormat',
        '../**',
    ],
    message:
        'The engine adapter may import #/core and #/editor/port, nothing further out — and never by a relative path out of its folder.',
});

const ENGINE = 'src/editor/engines/prosemirror';

export default defineConfig({
    extends: [reactConfig],
    options: {
        typeAware: true,
    },
    ignorePatterns: ['dist/', 'storybook-static/', 'lint-fixtures/src/'],
    /**
     * A later override's `no-restricted-imports` replaces an earlier one for the
     * same file rather than adding to it. So every override repeats each shared
     * group that applies to its files, which is what the constants and helpers
     * above are for.
     */
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
            excludeFiles: [`${ENGINE}/**/*.{ts,tsx}`],
            rules: {
                'no-restricted-imports': ['error', { patterns: [NO_ENGINE] }],
            },
        },
        {
            files: ['src/**/*.{ts,tsx}'],
            excludeFiles: ['src/__tests__/serverRendering*.spec.tsx', `${ENGINE}/**/*.{ts,tsx}`],
            rules: {
                'no-restricted-imports': ['error', { patterns: [NO_ENGINE, NO_SERVER_RENDER] }],
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
                                group: [...OUTER_LAYERS, '../**'],
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
                            NO_SERVER_RENDER,
                            {
                                group: ['prosemirror-*'],
                                message: 'The renderer never imports an engine.',
                            },
                            {
                                group: [
                                    '#/editor',
                                    '#/editor/**',
                                    '#/plugins',
                                    '#/plugins/**',
                                    '#/index',
                                    '#/documentFormat',
                                    '../**',
                                ],
                                message: 'The renderer may import #/core and nothing else.',
                            },
                        ],
                    },
                ],
            },
        },
        {
            // The plugin barrel, `src/plugins/index.ts`, gathers the plugins and nothing from outside.
            files: ['src/plugins/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            NO_ENGINE,
                            NO_SERVER_RENDER,
                            CORE_ONLY,
                            noRelativeEscape('..', 'Plugins reach the core through #/core, never a relative path.'),
                        ],
                    },
                ],
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
            files: ['src/plugins/*/content.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        paths: NO_TOOLBAR_BUTTON,
                        patterns: [
                            NO_ENGINE,
                            NO_SERVER_RENDER,
                            CORE_ONLY,
                            noSiblingPlugin('..'),
                            NO_UI_KIT,
                            CONTENT_ONLY,
                        ],
                    },
                ],
            },
        },
        {
            // What the renderer and export default to, so it gathers content modules only.
            files: ['src/plugins/defaultContent.ts'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            NO_ENGINE,
                            NO_SERVER_RENDER,
                            CORE_ONLY,
                            noRelativeEscape('..', 'Plugins reach the core through #/core, never a relative path.'),
                            NO_UI_KIT,
                            {
                                group: ['./**', '!./*/content'],
                                message: 'defaultContent gathers content modules only, never a plugin.',
                            },
                        ],
                    },
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
            files: ['src/editor/*.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            NO_SERVER_RENDER,
                            NO_ENGINE,
                            noEngineFromShell('.'),
                            SHELL_OUTER_LAYERS,
                            noRelativeEscape('..', SHELL_ESCAPE_MESSAGE),
                        ],
                    },
                ],
            },
        },
        {
            // A spec drives the editor the way a host does, so it may import the public API.
            files: ['src/editor/*.spec.{ts,tsx}'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            NO_SERVER_RENDER,
                            NO_ENGINE,
                            noEngineFromShell('.'),
                            SHELL_OUTER_LAYERS,
                            { ...noRelativeEscape('..', SHELL_ESCAPE_MESSAGE), group: ['../**', '!../index'] },
                        ],
                    },
                ],
            },
        },
        {
            files: ['src/editor/{components,helpers,hooks}/**/*.{ts,tsx}'],
            excludeFiles: ['src/editor/hooks/useEditorHandle.ts'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            NO_SERVER_RENDER,
                            NO_ENGINE,
                            noEngineFromShell('..'),
                            SHELL_OUTER_LAYERS,
                            noRelativeEscape('../..', SHELL_ESCAPE_MESSAGE),
                        ],
                    },
                ],
            },
        },
        {
            // The one shell file that wires the engine in.
            files: ['src/editor/hooks/useEditorHandle.ts'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            NO_SERVER_RENDER,
                            NO_ENGINE,
                            SHELL_OUTER_LAYERS,
                            noRelativeEscape('../..', SHELL_ESCAPE_MESSAGE),
                        ],
                    },
                ],
            },
        },
        {
            files: [`${ENGINE}/**/*.{ts,tsx}`],
            rules: {
                'no-restricted-imports': ['error', { patterns: [NO_SERVER_RENDER, engineRing(false)] }],
            },
        },
        {
            // The engine's test harness and specs build editors from the shipped plugins.
            files: [`${ENGINE}/testEditor.ts`, `${ENGINE}/**/*.spec.{ts,tsx}`],
            rules: {
                'no-restricted-imports': ['error', { patterns: [NO_SERVER_RENDER, engineRing(true)] }],
            },
        },
        {
            files: ['src/**/*.stories.tsx'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            NO_SERVER_RENDER,
                            NO_ENGINE,
                            {
                                group: ['#/**', './**', '../**', '!../index'],
                                message: 'Stories may only import the package public API (../index).',
                            },
                        ],
                    },
                ],
            },
        },
    ],
});
