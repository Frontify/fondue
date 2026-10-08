/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { type AllowWarnDeny, defineConfig, type OxlintOverride } from 'oxlint';

type ImportPattern = { readonly group: string[]; readonly message: string };
type Scope = {
    readonly files: string[];
    readonly patterns?: ImportPattern[];
    readonly allowRadix?: string[];
    readonly allowHistory?: boolean;
};

// Source folders of `SPEC-rich-text`, Package layout.
const FOLDERS = [
    'model',
    'definition',
    'runtime',
    'persistence',
    'clipboard',
    'html',
    'bridge',
    'ui',
    'react',
    'reader',
    'codecs',
    'features',
    'locales',
    'testing',
    'styles',
] as const;
type Folder = (typeof FOLDERS)[number];

const PUBLIC_ENTRIES = ['index', 'model', 'features', 'reader', 'codecs', 'html', 'testing', 'locales/*', 'styles'];

// Gitignore patterns read a leading `#` as a comment, so the `#/*` alias needs an escape.
const alias = (path: string) => `\\#/${path}`;
const relative = (path: string) => `../**/${path}`;
// A file directly in `src/` reaches a sibling folder as `./folder`.
const sibling = (path: string) => `./${path}`;

/**
 * Forbids every folder outside `allowed`, in the alias and both relative forms.
 * An allowed `folder/part` path forbids the rest of that folder.
 */
const onlyFolders = (allowed: string[], message: string): ImportPattern[] =>
    FOLDERS.filter((folder) => !allowed.includes(folder)).flatMap((folder: Folder) => {
        const parts = allowed.filter((path) => path.startsWith(`${folder}/`));
        const groupFor = (form: (path: string) => string) => [
            form(folder),
            form(`${folder}/**`),
            ...parts.flatMap((part) => [`!${form(part)}`, `!${form(`${part}/**`)}`]),
            // Chrome CSS Modules sit in `styles/` folders next to their component.
            ...(folder === 'styles' ? [`!${form('styles/*.module.scss')}`] : []),
        ];
        return [
            { group: groupFor(alias), message },
            { group: groupFor(relative), message },
            { group: groupFor(sibling), message },
        ];
    });

const noProseMirror = (allowed: string[] = []): ImportPattern => ({
    group: ['prosemirror-*', 'prosemirror-*/**', ...allowed.map((name) => `!${name}`)],
    message: 'Only the layers that own the engine import ProseMirror (SPEC-rich-text, Package layout).',
});

// A file kind of `SPEC-rich-text`, Feature file imports: everything outside `allowed` is reported.
const onlyImports = (allowed: string[], message: string): ImportPattern[] => [
    { group: ['*', ...allowed.map((path) => `!${path}`)], message },
];

// A folder name cannot tell a relative import inside the same folder apart, so these scopes take the alias.
const aliasOnly = (group: string[]): ImportPattern => ({
    group,
    message: 'Import the other modules of the package through the `#/` alias here (SPEC-rich-text/AC-010).',
});

// A folder of `SPEC-rich-text`, Source folders, that may import nothing: relative, `#/` alias and bare packages all fail.
const noImports = (folder: Folder): ImportPattern[] =>
    onlyImports([], `\`src/${folder}\` imports nothing (SPEC-rich-text/AC-010).`);

const FRAMEWORKS: ImportPattern = {
    group: [
        'next',
        'next/**',
        'react-router',
        'react-router/**',
        'react-router-*',
        'react-router-*/**',
        '@remix-run/**',
        'react-server-dom-*',
        'react-server-dom-*/**',
    ],
    message: 'The package depends on no router, server-component API or framework runtime (SPEC-rich-text/AC-077).',
};

const restrictedImports = ({
    patterns = [],
    allowRadix,
    allowHistory = false,
}: Scope): [AllowWarnDeny, ...unknown[]] => [
    'error',
    {
        paths: [
            {
                name: 'react-dom',
                importNames: ['default', 'flushSync'],
                message: 'The package never calls `flushSync` (SPEC-rich-text-react/AC-009).',
            },
        ],
        patterns: [
            FRAMEWORKS,
            ...(allowHistory
                ? []
                : [
                      {
                          group: ['prosemirror-history'],
                          message: 'Reach history only through `src/runtime/history/` (SPEC-rich-text-runtime/AC-052).',
                      },
                  ]),
            {
                group: ['@radix-ui/**', ...(allowRadix ?? []).map((name) => `!${name}`)],
                message: 'Use the Fondue overlays; only the toolbars import Radix (SPEC-rich-text-react/AC-098).',
            },
            ...patterns,
        ],
    },
];

const layer = (folder: Folder, allowed: Folder[] | string[]) =>
    onlyFolders(
        [folder, ...allowed],
        `\`src/${folder}\` imports only ${allowed.join(', ') || 'nothing'} from the package (SPEC-rich-text/AC-010).`,
    );

// Each override's `no-restricted-imports` replaces earlier ones, so every scope carries the shared patterns.
const IMPORT_SCOPES: Scope[] = [
    { files: ['src/**'] },
    {
        files: ['src/index.ts', 'src/__lint-fixtures__/index.ts'],
        patterns: [
            ...onlyFolders(
                FOLDERS.filter((folder) => folder !== 'testing'),
                'The `.` entry imports every layer except `testing` (SPEC-rich-text/AC-010).',
            ),
            noProseMirror(),
        ],
    },
    { files: ['src/model/**'], patterns: [...layer('model', []), noProseMirror()] },
    { files: ['src/definition/**'], patterns: layer('definition', ['model']) },
    {
        files: ['src/definition/schema.ts', 'src/definition/__lint-fixtures__/schema.ts'],
        patterns: [
            ...onlyFolders(
                ['model', 'definition/schema'],
                '`definition/schema.ts` imports only `model` and `prosemirror-model` (SPEC-rich-text/AC-010).',
            ),
            noProseMirror(['prosemirror-model']),
            aliasOnly(['./**', '../**']),
        ],
    },
    {
        files: ['src/runtime/**'],
        patterns: [
            ...layer('runtime', ['model', 'definition']),
            {
                group: ['react', 'react/**', 'react-dom', 'react-dom/**'],
                message: 'Runtime modules never import React (SPEC-rich-text-runtime/AC-063).',
            },
        ],
    },
    {
        files: ['src/runtime/history/**'],
        allowHistory: true,
        patterns: [
            ...layer('runtime', ['model', 'definition']),
            {
                group: ['react', 'react/**', 'react-dom', 'react-dom/**'],
                message: 'Runtime modules never import React (SPEC-rich-text-runtime/AC-063).',
            },
        ],
    },
    { files: ['src/persistence/**'], patterns: [...layer('persistence', ['model', 'runtime']), noProseMirror()] },
    { files: ['src/clipboard/**'], patterns: layer('clipboard', ['model', 'definition', 'runtime', 'codecs']) },
    {
        files: ['src/clipboard/import/**'],
        patterns: [
            ...onlyFolders(
                ['model', 'definition/schema', 'clipboard/import'],
                '`clipboard/import` imports only `model`, `definition/schema.ts` and `prosemirror-model` (SPEC-rich-text/AC-010).',
            ),
            noProseMirror(['prosemirror-model']),
            aliasOnly(['../**']),
        ],
    },
    {
        files: ['src/html/**'],
        patterns: [
            ...layer('html', ['model', 'clipboard/import', 'definition/schema']),
            noProseMirror(['prosemirror-model']),
        ],
    },
    {
        files: ['src/bridge/**'],
        patterns: [
            ...layer('bridge', ['model', 'runtime', 'persistence']),
            noProseMirror(['prosemirror-view', 'prosemirror-model']),
        ],
    },
    {
        files: ['src/bridge/chrome-toolbar.tsx', 'src/bridge/__lint-fixtures__/chrome-toolbar.tsx'],
        allowRadix: ['@radix-ui/react-toolbar'],
        patterns: [
            ...layer('bridge', ['model', 'runtime', 'persistence']),
            noProseMirror(['prosemirror-view', 'prosemirror-model']),
        ],
    },
    { files: ['src/ui/**'], patterns: [...layer('ui', ['model', 'runtime', 'bridge', 'locales']), noProseMirror()] },
    {
        files: ['src/ui/toolbar/**', 'src/ui/bubble-toolbar/**'],
        allowRadix: ['@radix-ui/**'],
        patterns: [...layer('ui', ['model', 'runtime', 'bridge', 'locales']), noProseMirror()],
    },
    {
        files: ['src/react/**'],
        patterns: [
            ...layer(
                'react',
                FOLDERS.filter((folder) => folder !== 'testing'),
            ),
            noProseMirror(),
        ],
    },
    {
        files: ['src/reader/**'],
        patterns: [...layer('reader', ['model', 'locales']), noProseMirror()],
    },
    {
        files: ['src/reader/registry.ts', 'src/reader/__lint-fixtures__/registry.ts'],
        patterns: [...layer('reader', ['model', 'locales', 'features/*/reader']), noProseMirror()],
    },
    { files: ['src/codecs/**'], patterns: [...layer('codecs', ['model', 'locales']), noProseMirror()] },
    { files: ['src/locales/**'], patterns: noImports('locales') },
    { files: ['src/styles/**'], patterns: noImports('styles') },
    {
        files: ['src/testing/**'],
        patterns: [
            ...layer('testing', [
                'model',
                'runtime',
                'persistence',
                'features/conformance',
                'features/*/fixtures',
                'features/__fixtures__',
            ]),
            noProseMirror(),
        ],
    },
    {
        files: ['src/features/index.ts', 'src/features/registry.ts', 'src/features/profiles/**'],
        patterns: [
            ...onlyFolders(
                [
                    'model',
                    'features/*/feature',
                    'features/*/migration',
                    'features/index',
                    'features/registry',
                    'features/profiles',
                ],
                "The feature registry and profiles import only `model` and each feature's `feature.ts` and `migration.ts` (SPEC-rich-text/AC-010).",
            ),
            noProseMirror(),
            aliasOnly(['./**', '../**', '!./*']),
        ],
    },
    // SPEC-rich-text/AC-061: shipped features, test fixture features and stories use only public API.
    {
        files: ['src/features/__fixtures__/**'],
        patterns: onlyImports(
            [
                ...PUBLIC_ENTRIES.map(alias),
                alias('bridge/define'),
                alias('reader/define'),
                alias('features/*/feature'),
                './**',
                'react',
                '@frontify/fondue-components',
                '@frontify/fondue-icons',
            ],
            'Fixture features import only public entries (SPEC-rich-text/AC-061).',
        ),
    },
    {
        files: [
            'src/features/*/feature.ts',
            'src/features/*/migration.ts',
            'src/features/__fixtures__/**/feature.ts',
            'src/features/__fixtures__/**/migration.ts',
        ],
        patterns: onlyImports(
            [alias('model'), './migration', alias('features/*/feature'), '../*/feature'],
            '`feature.ts` and `migration.ts` import only `#/model`, their own `migration.ts` and the `feature.ts` of a declared dependency (SPEC-rich-text/AC-061).',
        ),
    },
    {
        files: ['src/features/*/view.tsx', 'src/features/__fixtures__/**/view.tsx'],
        patterns: onlyImports(
            [
                './feature',
                './styles/*.module.scss',
                alias('bridge/define'),
                'react',
                '@frontify/fondue-components',
                '@frontify/fondue-icons',
            ],
            '`view.tsx` imports only its `feature.ts`, its CSS Module, `#/bridge/define`, React and the Fondue components and icons (SPEC-rich-text/AC-061).',
        ),
    },
    {
        files: ['src/features/*/reader.tsx', 'src/features/__fixtures__/**/reader.tsx'],
        patterns: onlyImports(
            ['./feature', alias('reader/define'), 'react'],
            '`reader.tsx` imports only its `feature.ts`, `#/reader/define` and React (SPEC-rich-text/AC-061).',
        ),
    },
    {
        files: ['**/*.stories.tsx'],
        patterns: onlyImports(
            [
                ...PUBLIC_ENTRIES.map(alias),
                alias('bridge/define'),
                alias('reader/define'),
                alias('features/*/feature'),
                'react',
                '@frontify/fondue-components',
                '@frontify/fondue-icons',
                '@storybook/**',
            ],
            'Stories import only public entries (SPEC-rich-text/AC-061).',
        ),
    },
    // Tests, the contract cases and the conformance twins may import every folder.
    {
        files: [
            'src/**/*.test.{ts,tsx}',
            'src/**/*.ct.{ts,tsx}',
            'src/**/*.bench.ts',
            'src/features/conformance/**',
            'src/features/__fixtures__/contract.cases.ts',
            'src/setupTests.ts',
        ],
    },
];

const NETWORK_GLOBALS = [
    'fetch',
    'XMLHttpRequest',
    'WebSocket',
    'EventSource',
    'localStorage',
    'sessionStorage',
    'indexedDB',
];
const TIME_GLOBALS = [
    'Date',
    'setTimeout',
    'clearTimeout',
    'setInterval',
    'clearInterval',
    'queueMicrotask',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'requestIdleCallback',
    'cancelIdleCallback',
    'crypto',
];
const DOM_GLOBALS = ['document', 'window', 'navigator'];
const GLOBAL_OBJECTS = ['window', 'globalThis', 'self'];

const NETWORK_MESSAGE = 'Reach the network and storage only through `EditorServices` (SPEC-rich-text/AC-051).';
const TIME_MESSAGE =
    'Read time, IDs, randomness and scheduling only through `RuntimeEnvironment` (SPEC-rich-text-quality/AC-002).';
const DOM_MESSAGE =
    'Codecs and the reader read only the envelope and resolver results, never the live DOM (SPEC-rich-text-output/AC-027).';

const globals = (names: string[], message: string) => names.map((name) => ({ name, message }));
const viaGlobalObjects = (names: string[], message: string) =>
    GLOBAL_OBJECTS.flatMap((object) => names.map((property) => ({ object, property, message })));

const restricted = (network: boolean, time: boolean, dom = false): NonNullable<OxlintOverride['rules']> => ({
    'no-restricted-globals': [
        'error',
        ...(network ? globals(NETWORK_GLOBALS, NETWORK_MESSAGE) : []),
        ...(time ? globals(TIME_GLOBALS, TIME_MESSAGE) : []),
        ...(dom ? globals(DOM_GLOBALS, DOM_MESSAGE) : []),
    ],
    'no-restricted-properties': [
        'error',
        ...(network
            ? [
                  { object: 'navigator', property: 'sendBeacon', message: NETWORK_MESSAGE },
                  { object: 'document', property: 'cookie', message: NETWORK_MESSAGE },
                  ...viaGlobalObjects(NETWORK_GLOBALS, NETWORK_MESSAGE),
              ]
            : []),
        ...(time
            ? [
                  { object: 'Math', property: 'random', message: TIME_MESSAGE },
                  { object: 'performance', property: 'now', message: TIME_MESSAGE },
                  ...viaGlobalObjects(TIME_GLOBALS, TIME_MESSAGE),
              ]
            : []),
        ...(dom ? viaGlobalObjects(DOM_GLOBALS, DOM_MESSAGE) : []),
    ],
});

const TEST_FILES = ['src/**/*.test.{ts,tsx}', 'src/**/*.ct.{ts,tsx}', 'src/**/*.bench.ts'];

export default defineConfig({
    extends: [reactConfig],
    plugins: ['typescript', 'eslint', 'promise', 'unicorn', 'import', 'jsx-a11y', 'react'],
    options: {
        typeAware: true,
    },
    ignorePatterns: [
        'dist/',
        'playwright/.cache/',
        'playwright-report/',
        'test-results/',
        'storybook-static/',
        'coverage/',
        'fixtures/',
    ],
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
                // The shared config lowers this to `warn` for TypeScript files; the public types hold no `any`.
                'typescript/no-explicit-any': 'error',
            },
        },
        {
            files: ['src/**'],
            jsPlugins: ['./lint/rte-style.js'],
            rules: {
                'import/no-cycle': 'error',
                'no-nested-ternary': 'error',
                'react/no-danger': 'error',
                'rte-style/no-empty-object-fallback': 'error',
                'rte-style/no-object-spread-merge': 'error',
                'rte-style/one-optional-per-expression': 'error',
                'rte-style/no-effects-in-selector': ['error', { hooks: ['useEditorSelection', 'useEditorSummary'] }],
                'rte-style/no-pointer-prevent-default': 'error',
                ...restricted(true, true),
            },
        },
        ...IMPORT_SCOPES.map((scope) => ({
            files: scope.files,
            rules: { 'no-restricted-imports': restrictedImports(scope) },
        })),
        {
            files: [
                'src/model/environment.ts',
                'src/model/__lint-fixtures__/environment.ts',
                'src/runtime/environment.ts',
            ],
            rules: restricted(true, false),
        },
        { files: ['src/testing/**'], rules: restricted(false, true) },
        { files: ['src/codecs/**', 'src/reader/**'], rules: restricted(true, true, true) },
        {
            files: ['src/ui/**', 'src/features/*/view.tsx', 'src/features/__fixtures__/**/view.tsx'],
            jsPlugins: ['./lint/rte-style.js'],
            rules: { 'rte-style/no-jsx-string-literal': 'error' },
        },
        {
            files: ['src/react/**', 'src/ui/**', 'src/features/*/view.tsx', 'src/features/__fixtures__/**/view.tsx'],
            jsPlugins: ['./lint/rte-style.js'],
            rules: { 'rte-style/no-image-chrome': 'error' },
        },
        {
            files: ['src/ui/bubble-toolbar/**', 'src/ui/suggestions/**', 'src/ui/toolbar/**'],
            jsPlugins: ['./lint/rte-style.js'],
            rules: { 'rte-style/no-pointer-prevent-default': 'off' },
        },
        {
            files: TEST_FILES,
            jsPlugins: ['./lint/rte-style.js'],
            rules: {
                'rte-style/no-composing-assignment': 'error',
                'rte-style/no-jsx-string-literal': 'off',
                'rte-style/no-image-chrome': 'off',
                'rte-style/no-pointer-prevent-default': 'off',
                ...restricted(true, false),
            },
        },
        // SPEC-rich-text/AC-051 bans the network outside `src/testing`, so its test files keep the exemption.
        {
            files: ['src/testing/**/*.{test,ct}.{ts,tsx}', 'src/testing/**/*.bench.ts'],
            rules: restricted(false, false),
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
