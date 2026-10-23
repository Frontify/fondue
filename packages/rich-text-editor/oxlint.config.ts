/* (c) Copyright Frontify Ltd., all rights reserved. */

import { builtinModules } from 'node:module';

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig, type OxlintOverride } from 'oxlint';

import packageJson from './package.json' with { type: 'json' };

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

const FRAMEWORK_PATTERNS = [
    'next',
    'next/**',
    'react-router',
    'react-router-*',
    'react-router-*/**',
    'react-router/**',
    '@remix-run/**',
    'react-server-dom-*',
    'react-server-dom-*/**',
];

const REACT_PATTERNS = ['react', 'react/**', 'react-dom', 'react-dom/**'];

const PROSEMIRROR_PATTERNS = ['prosemirror-*'];

const ENGINE_PATTERNS = [...PROSEMIRROR_PATTERNS, ...REACT_PATTERNS];

const FRAMEWORK_MESSAGE = 'The package must work in every host framework.';

const MODEL_MESSAGE =
    '`model` imports nothing else in the package and no engine or React, because the headless entries are built on it.';

const DEFINITION_MESSAGE = '`definition` builds the engine definition from `model`.';

const SCHEMA_MESSAGE =
    '`schema` imports only `model` and `prosemirror-model`, because `./html` and `clipboard/import` load the schema without the engine.';

const CLIPBOARD_IMPORT_MESSAGE =
    '`clipboard/import` imports only `model` and `prosemirror-model`, because `./html` loads it without the engine.';

const FEATURE_FILE_MESSAGE =
    "A feature file imports only `#/model`, its own `./migration` and a declared dependency's `#/features/<id>/feature`, as an outside feature must, and never its editor part, which the reader, codecs and server do not load.";

// An undeclared package can't be imported, so the declared ones are the whole list.
const DECLARED_PACKAGES = Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies });

// The packages that editor parts may import beside the package's own modules.
const UI_PACKAGES = ['react', '@frontify/fondue-components', '@frontify/fondue-icons'];

const UI_PACKAGES_TEXT = UI_PACKAGES.map((name) => `\`${name}\``).join(', ');

const NODE_BUILTINS = [
    'node:*',
    ...builtinModules.filter((name) => !name.startsWith('node:')).flatMap((name) => [name, `${name}/**`]),
];

const EDITOR_PART_MESSAGE = `An editor part acts only through \`#/bridge/plugin\`: it imports that module, \`#/bridge/define\`, \`#/model\` and its own feature folder, and of other packages only ${UI_PACKAGES_TEXT}, never Node built-ins, the engine, the runtime, the editor layers or another feature.`;

const MODEL_ENTRY_MESSAGE =
    'A feature file imports `model` only through its public entry `#/model`, as an outside feature must, never a subpath.';

const FEATURE_WIRING_MESSAGE =
    'The feature index, registry and profiles wire shipped features from `model`, and do not load views, readers or the editor.';

const READER_MESSAGE =
    '`reader` imports `model`, `locales` and `#/features/*/reader`, because the reader never loads editor code.';

const CLIENT_REACT_MESSAGE =
    'The reader renders on the server too, so it uses no client hook, context or class component.';

const CODECS_MESSAGE =
    '`codecs` imports only `model` and `locales`, because `./codecs` runs without the engine or React.';

const LOCALES_MESSAGE = '`locales` holds plain string tables and imports nothing in the package.';

const PROSEMIRROR_EXCEPT_MODEL = DECLARED_PACKAGES.filter(
    (name) => name.startsWith('prosemirror-') && name !== 'prosemirror-model',
);

const FEATURE_SIBLINGS = ['./*', './**', '!./migration'];

// Every file of a feature folder but its vocabulary, migration, reader and fixtures is editor side.
const EDITOR_PART_FILES = ['src/features/*/**/*.{ts,tsx}'];

const NOT_EDITOR_PART_FILES = [
    'src/features/*/feature.ts',
    'src/features/*/migration.ts',
    'src/features/*/reader.tsx',
    'src/features/*/fixtures/**',
    'src/features/conformance/**',
];

const editorPartFolders = FOLDERS.filter(
    (folder) => folder !== 'model' && folder !== 'features' && folder !== 'locales',
);

// Alias specifiers start with `#` and relative specifiers start with `.`.
const EXTERNAL_SPECIFIER = '^[^.#]';

// An undeclared package can't be imported, so banning the declared ones but `allowed` bans every other package.
// An `allowed` entry ending in `/*` allows every package of that scope or prefix.
const packagesExcept = (allowed: readonly string[]): string[] =>
    DECLARED_PACKAGES.filter(
        (name) =>
            !allowed.some((entry) => (entry.endsWith('/*') ? name.startsWith(entry.slice(0, -1)) : name === entry)),
    ).flatMap((name) => [name, `${name}/**`]);

const EDITOR_PART_EXTERNALS = [...packagesExcept(UI_PACKAGES), ...NODE_BUILTINS];

const aliasPatterns = (folders: readonly string[]): string[] =>
    folders.flatMap((folder) => [`#/${folder}`, `#/${folder}/**`]);

// Patterns match the specifier text, not the resolved path, so list a parent prefix for every depth that a source
// file can sit below `src`, with one level to spare.
const PARENT_PREFIXES = ['../', '../../', '../../../', '../../../../'];

const relativePatterns = (folders: readonly string[]): string[] =>
    folders.flatMap((folder) => PARENT_PREFIXES.flatMap((prefix) => [`${prefix}${folder}`, `${prefix}${folder}/**`]));

// A `!` pattern lets paths back in that earlier patterns of the same group ban.
const exceptPatterns = (paths: readonly string[]): string[] =>
    ['#/', ...PARENT_PREFIXES].flatMap((root) => paths.map((path) => `!${root}${path}`));

const FEATURE_ROOTS = ['#/features', ...PARENT_PREFIXES.map((prefix) => `${prefix}features`)];

const featurePathPatterns = (tails: readonly string[]): string[] =>
    FEATURE_ROOTS.flatMap((root) => tails.map((tail) => `${root}${tail}`));

// Every feature's editor-side files; they lead a group, so the bans after them still hold.
const EDITOR_PART_PATTERNS = FEATURE_ROOTS.flatMap((root) => [
    `${root}/*/*`,
    `${root}/*/*/**`,
    ...['/*/feature', '/*/migration', '/*/reader', '/*/fixtures/**'].map((tail) => `!${root}${tail}`),
]);

const FEATURE_FILE_TAILS = [
    '',
    '/index',
    '/registry',
    '/profiles',
    '/profiles/**',
    '/*/view',
    '/*/reader',
    '/*/migration',
    '/*/fixtures',
    '/*/fixtures/**',
    '/conformance',
    '/conformance/**',
    '/__tests__',
    '/__tests__/**',
] as const;

const WIRING_FEATURE_TAILS = [
    '/*/view',
    '/*/reader',
    '/*/fixtures',
    '/*/fixtures/**',
    '/conformance',
    '/conformance/**',
    '/__tests__',
    '/__tests__/**',
] as const;

const READER_FEATURE_TAILS = [
    '',
    '/index',
    '/registry',
    '/profiles',
    '/profiles/**',
    '/*/feature',
    '/*/view',
    '/*/migration',
    '/*/fixtures',
    '/*/fixtures/**',
    '/conformance',
    '/conformance/**',
    '/__tests__',
    '/__tests__/**',
] as const;

type ImportRestriction = {
    group?: string[];
    regex?: string;
    message: string;
};

type ImportNameRestriction = {
    name: string;
    importNames: string[];
    message: string;
};

// `default` is listed too, since `React.useState` reaches a hook with no named import.
const CLIENT_REACT: ImportNameRestriction = {
    name: 'react',
    importNames: [
        'default',
        'useState',
        'useReducer',
        'useEffect',
        'useLayoutEffect',
        'useInsertionEffect',
        'useMemo',
        'useCallback',
        'useRef',
        'useContext',
        'useId',
        'useImperativeHandle',
        'useDebugValue',
        'useDeferredValue',
        'useTransition',
        'useSyncExternalStore',
        'use',
        'createContext',
        'Component',
        'PureComponent',
    ],
    message: CLIENT_REACT_MESSAGE,
};

const frameworkRestriction: ImportRestriction = {
    group: FRAMEWORK_PATTERNS,
    message: FRAMEWORK_MESSAGE,
};

// Later overrides replace rule options, so each layer repeats the bans that still apply.
// oxlint 1.67 accepts excludeFiles, but the published override type omits it.
type LayerOverride = OxlintOverride & { excludeFiles?: string[] };

const layerOverride = (
    files: string | readonly string[],
    restrictions: ImportRestriction[],
    excludeFiles: readonly string[] = [],
    paths: readonly ImportNameRestriction[] = [],
): LayerOverride => ({
    files: typeof files === 'string' ? [files] : [...files],
    excludeFiles: ['**/__tests__/**', '**/*.stories.tsx', ...excludeFiles],
    rules: {
        'no-restricted-imports': ['error', { paths: [...paths], patterns: [frameworkRestriction, ...restrictions] }],
    },
});

const modelFolders = FOLDERS.filter((folder) => folder !== 'model');

const definitionFolders = FOLDERS.filter((folder) => folder !== 'model' && folder !== 'definition');

const outsideFeatureFolders = FOLDERS.filter((folder) => folder !== 'model' && folder !== 'features');

const readerFolders = FOLDERS.filter(
    (folder) => folder !== 'model' && folder !== 'locales' && folder !== 'reader' && folder !== 'features',
);

const codecsFolders = FOLDERS.filter((folder) => folder !== 'model' && folder !== 'locales' && folder !== 'codecs');

const localesFolders = FOLDERS.filter((folder) => folder !== 'locales');

const clipboardImportFolders = FOLDERS.filter((folder) => folder !== 'model');

const CLIPBOARD_IMPORT_PATHS = ['clipboard/import', 'clipboard/import/**'];

const TESTING_MESSAGE =
    '`testing` may import `model`, `runtime`, `persistence`, `definition`, `reader`, `codecs` and `locales`, and from `features` only conformance and fixtures.';

const RUNTIME_MESSAGE = '`runtime` imports `model`, `definition`, `clipboard/import` and ProseMirror.';

const BRIDGE_MESSAGE =
    '`bridge` imports `model`, `runtime`, `persistence`, `prosemirror-view`, `prosemirror-model` and React.';

const REACT_FOLDER_MESSAGE = '`react` imports every folder except `testing`, and neither `react-dom` nor ProseMirror.';

const PERSISTENCE_MESSAGE = '`persistence` imports `model` and `runtime`.';

const testingAllowed = new Set([
    'model',
    'runtime',
    'persistence',
    'definition',
    'reader',
    'codecs',
    'locales',
    'testing',
    'features',
]);

const testingFolders = FOLDERS.filter((folder) => !testingAllowed.has(folder));

const runtimeAllowed = new Set(['model', 'definition', 'runtime']);

const runtimeFolders = FOLDERS.filter((folder) => !runtimeAllowed.has(folder));

const runtimeRestriction: ImportRestriction = {
    group: [
        ...aliasPatterns(runtimeFolders),
        ...relativePatterns(runtimeFolders),
        ...REACT_PATTERNS,
        ...exceptPatterns(CLIPBOARD_IMPORT_PATHS),
    ],
    message: RUNTIME_MESSAGE,
};

const bridgeAllowed = new Set(['model', 'runtime', 'persistence', 'bridge']);

const bridgeFolders = FOLDERS.filter((folder) => !bridgeAllowed.has(folder));

const bridgeEnginePatterns = DECLARED_PACKAGES.filter(
    (name) => name.startsWith('prosemirror-') && name !== 'prosemirror-view' && name !== 'prosemirror-model',
);

const reactFolders = FOLDERS.filter((folder) => folder === 'testing');

const persistenceFolders = FOLDERS.filter(
    (folder) => folder !== 'model' && folder !== 'runtime' && folder !== 'persistence',
);

const TESTING_FEATURE_TAILS = [
    '',
    '/index',
    '/registry',
    '/profiles',
    '/profiles/**',
    '/*/feature',
    '/*/view',
    '/*/reader',
    '/*/migration',
    '/*/styles',
    '/*/styles/**',
] as const;

const definitionPatterns = [
    ...aliasPatterns(definitionFolders),
    ...relativePatterns(definitionFolders),
    ...REACT_PATTERNS,
];

export default defineConfig({
    extends: [reactConfig],
    options: {
        typeAware: true,
    },
    ignorePatterns: ['dist/', 'coverage/', '.storybook/', 'storybook-static/'],
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

                '@eslint-react/dom-no-missing-button-type': 'warn',

                // Unlike the other Fondue packages, the type-aware rules keep the shared config's error severity.
            },
        },
        {
            files: ['**/*.stories.tsx'],
            rules: {
                '@eslint-react/rules-of-hooks': 'off',
                '@eslint-community/eslint-comments/disable-enable-pair': 'off',
            },
        },
        // The editor's own rules: layer boundaries, import cycles and nested ternaries.
        {
            files: ['src/**/*.{ts,tsx}'],
            rules: {
                'import/no-cycle': 'error',
                'no-nested-ternary': 'error',
                'no-restricted-imports': ['error', { patterns: [frameworkRestriction] }],
            },
        },
        {
            files: ['src/**/*.{ts,tsx}'],
            excludeFiles: ['**/__tests__/**', '**/*.stories.tsx'],
            plugins: ['react'],
            rules: {
                'react/no-danger': 'error',
            },
        } satisfies LayerOverride,
        layerOverride('src/model/**/*.{ts,tsx}', [
            {
                group: [...aliasPatterns(modelFolders), ...relativePatterns(modelFolders), ...ENGINE_PATTERNS],
                message: MODEL_MESSAGE,
            },
        ]),
        layerOverride('src/definition/**/*.{ts,tsx}', [{ group: definitionPatterns, message: DEFINITION_MESSAGE }]),
        layerOverride('src/definition/schema.ts', [
            {
                group: [
                    ...definitionPatterns,
                    '#/definition',
                    '#/definition/**',
                    ...relativePatterns(['definition']),
                    './**',
                    ...PROSEMIRROR_EXCEPT_MODEL,
                ],
                message: SCHEMA_MESSAGE,
            },
        ]),
        layerOverride('src/clipboard/import/**/*.{ts,tsx}', [
            {
                group: [
                    ...aliasPatterns(clipboardImportFolders),
                    ...relativePatterns(clipboardImportFolders),
                    '../*',
                    ...PROSEMIRROR_EXCEPT_MODEL,
                    ...REACT_PATTERNS,
                    ...exceptPatterns(CLIPBOARD_IMPORT_PATHS),
                ],
                message: CLIPBOARD_IMPORT_MESSAGE,
            },
        ]),
        layerOverride(
            ['src/features/*/feature.ts', 'src/features/*/migration.ts'],
            [
                {
                    group: [
                        ...EDITOR_PART_PATTERNS,
                        '#/model/**',
                        ...aliasPatterns(outsideFeatureFolders),
                        ...featurePathPatterns(FEATURE_FILE_TAILS),
                        '../**',
                        ...FEATURE_SIBLINGS,
                    ],
                    message: FEATURE_FILE_MESSAGE,
                },
                { regex: EXTERNAL_SPECIFIER, message: FEATURE_FILE_MESSAGE },
            ],
            ['src/features/conformance/**'],
        ),
        layerOverride(
            EDITOR_PART_FILES,
            [
                {
                    group: [
                        ...aliasPatterns(editorPartFolders),
                        '#/model/**',
                        ...exceptPatterns(['bridge/plugin', 'bridge/define']),
                        '#/features/**',
                        '../**',
                    ],
                    message: EDITOR_PART_MESSAGE,
                },
                { group: EDITOR_PART_EXTERNALS, message: EDITOR_PART_MESSAGE },
            ],
            NOT_EDITOR_PART_FILES,
        ),
        layerOverride(
            ['src/features/index.ts', 'src/features/registry.ts', 'src/features/profiles/**/*.{ts,tsx}'],
            [
                {
                    group: [
                        ...EDITOR_PART_PATTERNS,
                        '#/model/**',
                        ...aliasPatterns(outsideFeatureFolders),
                        ...relativePatterns(outsideFeatureFolders),
                        ...featurePathPatterns(WIRING_FEATURE_TAILS),
                        ...ENGINE_PATTERNS,
                    ],
                    message: FEATURE_WIRING_MESSAGE,
                },
            ],
        ),
        layerOverride('src/features/*/fixtures/**/*.{ts,tsx}', [
            { group: ['#/model/**', ...relativePatterns(['model'])], message: MODEL_ENTRY_MESSAGE },
        ]),
        layerOverride(
            'src/reader/**/*.{ts,tsx}',
            [
                {
                    group: [
                        ...EDITOR_PART_PATTERNS,
                        ...aliasPatterns(readerFolders),
                        ...relativePatterns(readerFolders),
                        ...featurePathPatterns(READER_FEATURE_TAILS),
                        ...PROSEMIRROR_PATTERNS,
                    ],
                    message: READER_MESSAGE,
                },
            ],
            [],
            [CLIENT_REACT],
        ),
        layerOverride('src/codecs/**/*.{ts,tsx}', [
            {
                group: [
                    ...aliasPatterns(codecsFolders),
                    ...relativePatterns(codecsFolders),
                    ...featurePathPatterns(['', '/**']),
                    ...ENGINE_PATTERNS,
                ],
                message: CODECS_MESSAGE,
            },
        ]),
        layerOverride('src/locales/**/*.{ts,tsx}', [
            {
                group: [...aliasPatterns(localesFolders), ...relativePatterns(localesFolders), ...ENGINE_PATTERNS],
                message: LOCALES_MESSAGE,
            },
        ]),
        layerOverride('src/testing/**/*.{ts,tsx}', [
            {
                group: [
                    ...aliasPatterns(testingFolders),
                    ...relativePatterns(testingFolders),
                    ...featurePathPatterns(TESTING_FEATURE_TAILS),
                    ...ENGINE_PATTERNS,
                ],
                message: TESTING_MESSAGE,
            },
        ]),
        layerOverride('src/runtime/**/*.{ts,tsx}', [runtimeRestriction]),
        layerOverride('src/bridge/**/*.{ts,tsx}', [
            {
                group: [...aliasPatterns(bridgeFolders), ...relativePatterns(bridgeFolders), ...bridgeEnginePatterns],
                message: BRIDGE_MESSAGE,
            },
        ]),
        layerOverride('src/react/**/*.{ts,tsx}', [
            {
                group: [
                    ...aliasPatterns(reactFolders),
                    ...relativePatterns(reactFolders),
                    'react-dom',
                    'react-dom/**',
                    ...PROSEMIRROR_PATTERNS,
                ],
                message: REACT_FOLDER_MESSAGE,
            },
        ]),
        layerOverride('src/persistence/**/*.{ts,tsx}', [
            {
                group: [
                    ...aliasPatterns(persistenceFolders),
                    ...relativePatterns(persistenceFolders),
                    ...ENGINE_PATTERNS,
                ],
                message: PERSISTENCE_MESSAGE,
            },
        ]),
    ],
});
