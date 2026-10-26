/* (c) Copyright Frontify Ltd., all rights reserved. */

import { builtinModules } from 'node:module';

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig, type OxlintOverride } from 'oxlint';

import packageJson from './package.json' with { type: 'json' };

const FOLDERS = [
    'model',
    'runtime',
    'persistence',
    'bridge',
    'ui',
    'react',
    'reader',
    'entries',
    'codecs',
    'plugins',
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

const DEFINITION_MESSAGE =
    '`runtime/definition` imports only `model` and ProseMirror, because it builds the engine definition from `model`.';

const SCHEMA_MESSAGE =
    '`schema` imports only `model` and `prosemirror-model`, because `./html` and `runtime/import` load the schema without the engine.';

const IMPORT_MESSAGE =
    '`runtime/import` imports only `model` and `prosemirror-model`, because `./html` loads it without the engine.';

const HTML_MESSAGE =
    '`runtime/import/fromHtml` imports only `model`, `#/runtime/definition/schema`, `runtime/import` and `prosemirror-model`, because `./html` runs on the server without the engine or React.';

const FEATURE_FILE_MESSAGE =
    "A feature file imports only `#/model`, its own `./migration` and a declared dependency's `#/plugins/<id>/feature`, as an outside feature must, and never its editor part, which the reader, codecs and server do not load.";

// An undeclared package can't be imported, so the declared ones are the whole list.
const DECLARED_PACKAGES = Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies });

// The packages that editor parts and stories may import beside the package's own modules.
const UI_PACKAGES = ['react', '@frontify/fondue-components', '@frontify/fondue-icons'];

const UI_PACKAGES_TEXT = UI_PACKAGES.map((name) => `\`${name}\``).join(', ');

const NODE_BUILTINS = [
    'node:*',
    ...builtinModules.filter((name) => !name.startsWith('node:')).flatMap((name) => [name, `${name}/**`]),
];

const EDITOR_PART_MESSAGE = `An editor part acts only through \`#/bridge/plugin\`: it imports that module, \`#/bridge/define\`, \`#/model\` and its own feature folder, and of other packages only ${UI_PACKAGES_TEXT}, never Node built-ins, the engine, the runtime, the editor layers or another feature.`;

const COMPONENT_DIRECTION_MESSAGE =
    'A component imports hooks, helpers and its sibling components, never a root file of its plugin (`index`, `editor`, `reader`, `feature`), because static imports run components, hooks, helpers.';

const HOOK_DIRECTION_MESSAGE =
    'A hook imports helpers and its sibling hooks, never a component or a root file of its plugin (`index`, `editor`, `reader`, `feature`), because static imports run components, hooks, helpers.';

const HELPER_DIRECTION_MESSAGE =
    'A helper imports its sibling helpers, never a hook, a component or a root file of its plugin (`index`, `editor`, `reader`, `feature`) by a static import, because static imports run components, hooks, helpers; only a lazy `import()` of a component may load one.';

const CLIPBOARD_MESSAGE =
    '`runtime/clipboard` imports `model`, `runtime/definition`, `runtime`, `codecs`, `runtime/import` and ProseMirror, never React or the editor layers.';

const FEATURE_INDEX_MESSAGE =
    "A feature's index builds its unit and imports only its own `./feature`, `./editor` and `./reader`, and `#/bridge/pluginApi/definePlugin`.";

const READER_FILE_MESSAGE =
    "A feature's reader override imports only `react` (no Node built-ins), `#/model`, `#/reader/define`, its own `./feature`, its own `./components/*` and a declared dependency's `#/plugins/<id>/feature`, as an outside feature must.";

const MODEL_ENTRY_MESSAGE =
    'A feature file imports `model` only through its public entry `#/model`, as an outside feature must, never a subpath.';

const MODEL_FILE_MESSAGE = 'Code outside `model` imports `#/model` or `#/model/internal`, never a model file directly.';

const FEATURE_PLUGINS_MESSAGE =
    "The all-units registry imports only `#/model`, `#/bridge/pluginApi/definePlugin` and each feature's `./*/index` through its glob, because it loads every editor part and only `pluginsById` users and `testing` may load it.";

const FEATURE_WIRING_MESSAGE =
    'The feature index, registry and profiles wire shipped features from `model`, and do not load views, readers or the editor.';

const FEATURE_INTERNALS_MESSAGE =
    'Outside its folder, a feature is imported only through its `feature` and `index`, never its editor, reader, view or dialog files, because those carry editor code and only the glob registries load them.';

const FEATURE_UNIT_MESSAGE =
    '`./features`, `reader`, `codecs`, `model` and `runtime/import/fromHtml` never import `#/plugins/*/index`, because a unit carries editor code.';

const READER_MESSAGE =
    '`reader` imports `model` and `locales`, never a feature, because a feature reader imports `#/reader/define`.';

const ENTRIES_MESSAGE =
    '`entries` imports `#/reader/*` and `#/plugins/*/reader` only, because an entry wires the shipped feature readers and loads no editor code.';

const CLIENT_REACT_MESSAGE =
    'The reader renders on the server too, so it uses no client hook, context or class component.';

const CODECS_MESSAGE =
    '`codecs` imports only `model` and `locales`, because `./codecs` runs without the engine or React.';

const LOCALES_MESSAGE = '`locales` holds plain string tables and imports nothing in the package.';

const PROSEMIRROR_EXCEPT_MODEL = DECLARED_PACKAGES.filter(
    (name) => name.startsWith('prosemirror-') && name !== 'prosemirror-model',
);

const FEATURE_SIBLINGS = ['./*', './**', '!./migration'];

// Every file of a feature folder but its vocabulary, migration, reader, index and fixtures is editor side.
const EDITOR_PART_FILES = ['src/plugins/*/*.{ts,tsx}'];

// Components, hooks and helpers sit one folder down and reach their own plugin's other folders through `../`.
const EDITOR_PART_SUBFOLDER_FILES = ['src/plugins/*/*/**/*.{ts,tsx}'];

// A folder one level down names its plugin's root files through `../`, and `..` alone resolves to its index.
const PLUGIN_ROOT_PATTERNS = ['..', '../', ...['index', 'editor', 'reader', 'feature'].map((file) => `../${file}`)];

const NOT_EDITOR_PART_FILES = [
    'src/plugins/*/feature.ts',
    'src/plugins/*/migration.ts',
    'src/plugins/*/reader.tsx',
    'src/plugins/*/index.ts',
    'src/plugins/*/fixtures/**',
];

const editorPartFolders = FOLDERS.filter(
    (folder) => folder !== 'model' && folder !== 'plugins' && folder !== 'locales',
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

const READER_FILE_EXTERNALS = [...packagesExcept(['react']), ...NODE_BUILTINS];

// Stories also run in Storybook, so its packages are allowed.
const STORY_EXTERNALS = [...packagesExcept([...UI_PACKAGES, 'storybook', '@storybook/*']), ...NODE_BUILTINS];

// The public entries come from `exports`, the style sheet entry is no module.
const PUBLIC_ENTRY_MODULES = Object.entries(packageJson.exports)
    .filter(([, target]) => typeof target === 'object')
    .map(([entry]) => (entry === '.' ? 'index' : entry.slice(2)))
    .map((path) => (path === 'reader' || path === 'authoring' ? `entries/${path}` : path))
    .map((path) => (path === 'html' ? 'runtime/import/fromHtml' : path))
    .map((path) => (path === 'features' ? 'plugins' : path));

// The public entries, the modules they re-export to plugins and the shared story folder, through the alias.
const STORY_MODULES = [...PUBLIC_ENTRY_MODULES, 'bridge/plugin', 'bridge/define', 'reader/define', 'react/examples/**'];

const STORY_MESSAGE = `A story imports only the public entries and the modules they re-export to plugins (${STORY_MODULES.map((path) => `\`#/${path}\``).join(', ')}), files of its own folder, ${UI_PACKAGES_TEXT}, \`storybook/*\` and \`@storybook/*\`, as an outside host must.`;

const UI_MESSAGE =
    '`ui` imports the runtime only through `#/runtime/port`, `#/runtime/definition` and `#/runtime/import/fromHtml`, and imports neither `react`, `persistence` nor the engine.';

const DOCS_MESSAGE = `A docs example imports only the public entries (${PUBLIC_ENTRY_MODULES.map((path) => `\`#/${path}\``).join(', ')}) and files of its own folder, as an outside host must.`;

const readerFileFolders = FOLDERS.filter((folder) => folder !== 'model' && folder !== 'plugins');

const aliasPatterns = (folders: readonly string[]): string[] =>
    folders.flatMap((folder) => [`#/${folder}`, `#/${folder}/**`]);

// Patterns match the specifier text, not the resolved path, so list a parent prefix for every depth that a source
// file can sit below `src`, with one level to spare.
const PARENT_PREFIXES = ['../', '../../', '../../../', '../../../../'];

// A component's own `styles/*.module.scss` shares the name of the `styles` layer, which holds no CSS modules.
const relativePatterns = (folders: readonly string[]): string[] =>
    folders.flatMap((folder) =>
        PARENT_PREFIXES.flatMap((prefix) => {
            const patterns = [`${prefix}${folder}`, `${prefix}${folder}/**`];
            if (folder === 'styles') {
                patterns.push(`!${prefix}styles/*.module.scss`);
            }

            return patterns;
        }),
    );

// A `!` pattern lets paths back in that earlier patterns of the same group ban.
const exceptPatterns = (paths: readonly string[]): string[] =>
    ['#/', ...PARENT_PREFIXES].flatMap((root) => paths.map((path) => `!${root}${path}`));

const FEATURE_ROOTS = ['#/plugins', ...PARENT_PREFIXES.map((prefix) => `${prefix}plugins`)];

const featurePathPatterns = (tails: readonly string[]): string[] =>
    FEATURE_ROOTS.flatMap((root) => tails.map((tail) => `${root}${tail}`));

// Every feature's editor-side files; they lead a group, so the bans after them still hold.
const EDITOR_PART_PATTERNS = FEATURE_ROOTS.flatMap((root) => [
    `${root}/*/*`,
    `${root}/*/*/**`,
    ...['/*/feature', '/*/migration', '/*/reader', '/*/fixtures/**'].map((tail) => `!${root}${tail}`),
]);

// A shipped profile is no feature folder, and the feature's fixtures are data.
const FEATURE_INTERNALS_PATTERNS = FEATURE_ROOTS.flatMap((root) => [
    `${root}/*/*`,
    `${root}/*/*/**`,
    ...['/*/feature', '/*/index', '/profiles/**', '/*/fixtures/**'].map((tail) => `!${root}${tail}`),
]);

const FEATURE_UNIT_PATTERNS = featurePathPatterns(['/*/index']);

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
    '/__tests__',
    '/__tests__/**',
] as const;

const WIRING_FEATURE_TAILS = [
    '/*/view',
    '/*/reader',
    '/*/fixtures',
    '/*/fixtures/**',
    '/__tests__',
    '/__tests__/**',
] as const;

type ImportRestriction = {
    group?: string[];
    regex?: string;
    importNamePattern?: string;
    allowTypeImports?: boolean;
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

// `default` is listed too, since `ReactDOM.flushSync` reaches it with no named import.
const FLUSH_SYNC: ImportNameRestriction = {
    name: 'react-dom',
    importNames: ['default', 'flushSync'],
    message:
        'The package never calls `flushSync`, since a flush per node view hit "Maximum update depth exceeded" in Tiptap.',
};

const frameworkRestriction: ImportRestriction = {
    group: FRAMEWORK_PATTERNS,
    message: FRAMEWORK_MESSAGE,
};

const historyRestriction: ImportRestriction = {
    group: ['prosemirror-history'],
    message: 'Only `src/runtime/history/` imports `prosemirror-history`.',
};

const tablesInternalsRestriction: ImportRestriction = {
    group: ['prosemirror-tables'],
    importNamePattern: '^_',
    message: 'The underscore exports of `prosemirror-tables` are its internals.',
};

const featureInternalsRestriction: ImportRestriction = {
    group: FEATURE_INTERNALS_PATTERNS,
    message: FEATURE_INTERNALS_MESSAGE,
};

const featureUnitRestriction: ImportRestriction = {
    group: FEATURE_UNIT_PATTERNS,
    message: FEATURE_UNIT_MESSAGE,
};

// Model files import each other directly, and the model tests import their helpers by alias.
const modelFileRestriction: ImportRestriction = {
    group: [
        '#/model/**',
        ...PARENT_PREFIXES.map((prefix) => `${prefix}model/**`),
        ...exceptPatterns(['model/internal', 'model/__tests__/**']),
    ],
    message: MODEL_FILE_MESSAGE,
};

const SOURCE_RESTRICTIONS = [frameworkRestriction, historyRestriction, tablesInternalsRestriction];

const OUTSIDE_MODEL_RESTRICTIONS = [...SOURCE_RESTRICTIONS, modelFileRestriction];

// Later overrides replace rule options, so each override repeats the base paths and patterns.
const importRule = (
    patterns: ImportRestriction[],
    paths: readonly ImportNameRestriction[] = [],
    sourceRestrictions: ImportRestriction[] = OUTSIDE_MODEL_RESTRICTIONS,
) => ['error', { paths: [FLUSH_SYNC, ...paths], patterns: [...sourceRestrictions, ...patterns] }] as const;

const VIEW_INTERNALS_MESSAGE = 'The input state and DOM observer of the editor view are ProseMirror internals.';

// Later overrides replace rule options, so each layer repeats the bans that still apply.
// oxlint 1.67 accepts excludeFiles, but the published override type omits it.
type LayerOverride = OxlintOverride & { excludeFiles?: string[] };

const layerOverride = (
    files: string | readonly string[],
    restrictions: ImportRestriction[],
    excludeFiles: readonly string[] = [],
    paths: readonly ImportNameRestriction[] = [],
    sourceRestrictions: ImportRestriction[] = OUTSIDE_MODEL_RESTRICTIONS,
): LayerOverride => ({
    files: typeof files === 'string' ? [files] : [...files],
    excludeFiles: ['**/__tests__/**', '**/*.stories.tsx', ...excludeFiles],
    rules: {
        'no-restricted-imports': importRule(restrictions, paths, sourceRestrictions),
    },
});

// An editor part, or a folder of one, acts only through the plugin bridge and `outside` is the path above its own folder.
const editorPartRestrictions = (outside: string): ImportRestriction[] => [
    {
        group: [
            ...aliasPatterns(editorPartFolders),
            '#/model/**',
            ...exceptPatterns(['bridge/plugin', 'bridge/define']),
            '#/plugins/**',
            outside,
        ],
        message: EDITOR_PART_MESSAGE,
    },
    { group: EDITOR_PART_EXTERNALS, message: EDITOR_PART_MESSAGE },
];

const nonModelFolders = FOLDERS.filter((folder) => folder !== 'model');

const outsideFeatureFolders = FOLDERS.filter((folder) => folder !== 'model' && folder !== 'plugins');

const readerFolders = FOLDERS.filter((folder) => folder !== 'model' && folder !== 'locales' && folder !== 'reader');

const entriesFolders = FOLDERS.filter((folder) => folder !== 'reader');

const codecsFolders = FOLDERS.filter((folder) => folder !== 'model' && folder !== 'locales' && folder !== 'codecs');

const localesFolders = FOLDERS.filter((folder) => folder !== 'locales');

const clipboardAllowed = new Set(['model', 'runtime', 'codecs']);

const clipboardFolders = FOLDERS.filter((folder) => !clipboardAllowed.has(folder));

const IMPORT_PATHS = ['runtime/import', 'runtime/import/**'];

// `fromHtml` sits inside `runtime/import`, so layers that may import the import code but not the `./html` entry ban it again after the re-allow.
const HTML_PATHS = ['runtime/import/fromHtml'];

const HTML_BAN_PATTERNS = [
    ...aliasPatterns(HTML_PATHS),
    ...relativePatterns(HTML_PATHS),
    ...['./', ...PARENT_PREFIXES].map((prefix) => `${prefix}import/fromHtml`),
];

// These folders sit inside `runtime`, so layers that may import `runtime` still ban them by path.
const RUNTIME_PARTS = ['runtime/clipboard', 'runtime/definition', 'runtime/import'];

// Layers that ban the runtime but keep `runtime/definition` re-allow it.
const DEFINITION_PATHS = ['runtime/definition', 'runtime/definition/**'];

const TESTING_MESSAGE =
    '`testing` may import `model`, `runtime` (but not `runtime/import`), `persistence`, `reader`, `codecs` and `locales`, from `runtime/clipboard` only `runtime/clipboard/plugin`, and from `plugins` only conformance and fixtures.';

const CONFORMANCE_MESSAGE =
    'The contract suite drives editor parts through the engine, so it also imports `react`, `react-dom/server`, `#/bridge/plugin`, `#/plugins/plugins`, `#/plugins/registry` and `#/react/compile/engine`.';

const RUNTIME_MESSAGE = '`runtime` imports `model`, `runtime/definition`, `runtime/import` and ProseMirror.';

const BRIDGE_MESSAGE =
    '`bridge` imports `model`, `runtime` (but not `runtime/clipboard`, `runtime/definition` or `runtime/import`), `persistence` and React, never ProseMirror.';

const REACT_FOLDER_MESSAGE =
    '`react` imports every folder except `testing`, the runtime only through `#/runtime/port`, `#/runtime/definition` and `#/runtime/import` (only `compile/compileEditor` and `RichTextEditor/hooks/useSessionRuntime` also import `#/runtime/assembly`), and neither `react-dom` nor ProseMirror.';

const PERSISTENCE_MESSAGE =
    '`persistence` imports `model` and `runtime`, but not `runtime/clipboard`, `runtime/definition` or `runtime/import`.';

const STYLES_MESSAGE = '`styles` imports nothing in the package and no engine or React.';

const testingAllowed = new Set([
    'model',
    'runtime',
    'persistence',
    'reader',
    'entries',
    'codecs',
    'locales',
    'testing',
    'plugins',
]);

const testingFolders = [
    ...FOLDERS.filter((folder) => !testingAllowed.has(folder)),
    ...RUNTIME_PARTS.filter((folder) => folder !== 'runtime/definition'),
];

const runtimeFolders = FOLDERS.filter((folder) => folder !== 'model' && folder !== 'runtime');

const runtimeRestriction: ImportRestriction = {
    group: [
        ...aliasPatterns(runtimeFolders),
        ...relativePatterns(runtimeFolders),
        ...REACT_PATTERNS,
        ...HTML_BAN_PATTERNS,
    ],
    message: RUNTIME_MESSAGE,
};

const bridgeAllowed = new Set(['model', 'runtime', 'persistence', 'bridge']);

const bridgeFolders = [...FOLDERS.filter((folder) => !bridgeAllowed.has(folder)), ...RUNTIME_PARTS];

const reactFolders = FOLDERS.filter((folder) => folder === 'testing');

// The port is the one runtime module the React layers import, so no engine value or type reaches them.
const portOnlyPatterns = [
    ...aliasPatterns(['runtime']),
    ...relativePatterns(['runtime']),
    ...exceptPatterns(['runtime/port', ...DEFINITION_PATHS]),
];

// The two react files that build the engine also import the assembly, which holds the engine-typed values.
const REACT_ASSEMBLY_FILES = [
    'src/react/compile/compileEditor.ts',
    'src/react/RichTextEditor/hooks/useSessionRuntime.ts',
];

const portAndAssemblyPatterns = [
    ...aliasPatterns(['runtime']),
    ...relativePatterns(['runtime']),
    ...exceptPatterns(['runtime/port', 'runtime/assembly', ...DEFINITION_PATHS]),
];

const reactRestrictions = (runtimePatterns: string[]): ImportRestriction[] => [
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
    { group: runtimePatterns, message: REACT_FOLDER_MESSAGE },
    featureInternalsRestriction,
];

const persistenceFolders = [
    ...FOLDERS.filter((folder) => folder !== 'model' && folder !== 'runtime' && folder !== 'persistence'),
    ...RUNTIME_PARTS,
];

const stylesFolders = FOLDERS.filter((folder) => folder !== 'styles');

const TESTING_FEATURE_TAILS = [
    '',
    '/index',
    '/plugins',
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

// `runtime/definition` imports no other runtime file, and `../**` would reach one, so it is banned as well.
const definitionBans = [...aliasPatterns(nonModelFolders), ...relativePatterns(nonModelFolders), ...REACT_PATTERNS];

export default defineConfig({
    extends: [reactConfig],
    options: {
        typeAware: true,
    },
    ignorePatterns: [
        'dist/',
        'coverage/',
        '.storybook/',
        'storybook-static/',
        'playwright-report/',
        'test-results/',
        'playwright/.cache/',
    ],
    overrides: [
        {
            files: ['**/*.{js,jsx,ts,tsx,mts,cts,cjs}'],
            jsPlugins: ['@tony.ganchev/eslint-plugin-header', '@stylistic/eslint-plugin'],
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
                'typescript/consistent-type-definitions': ['error', 'type'],
                '@stylistic/padding-line-between-statements': [
                    'error',
                    { blankLine: 'always', prev: '*', next: 'return' },
                    { blankLine: 'always', prev: 'block-like', next: '*' },
                ],

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
                'no-restricted-imports': importRule([], [], SOURCE_RESTRICTIONS),
            },
        },
        {
            files: ['src/**/*.{ts,tsx}'],
            excludeFiles: ['src/model/**'],
            rules: {
                'no-restricted-imports': importRule([]),
            },
        } satisfies LayerOverride,
        {
            files: ['src/**/*.{ts,tsx}'],
            excludeFiles: ['**/__tests__/**', '**/*.stories.tsx'],
            plugins: ['react'],
            rules: {
                'react/no-danger': 'error',
                'no-restricted-properties': [
                    'error',
                    { property: 'input', message: VIEW_INTERNALS_MESSAGE },
                    { property: 'domObserver', message: VIEW_INTERNALS_MESSAGE },
                ],
            },
        } satisfies LayerOverride,
        layerOverride(
            'src/model/**/*.{ts,tsx}',
            [
                {
                    group: [
                        ...aliasPatterns(nonModelFolders),
                        ...relativePatterns(nonModelFolders),
                        ...ENGINE_PATTERNS,
                    ],
                    message: MODEL_MESSAGE,
                },
                featureUnitRestriction,
            ],
            [],
            [],
            SOURCE_RESTRICTIONS,
        ),
        layerOverride('src/runtime/clipboard/**/*.{ts,tsx}', [
            {
                group: [
                    ...aliasPatterns(clipboardFolders),
                    ...relativePatterns(clipboardFolders),
                    ...REACT_PATTERNS,
                    ...HTML_BAN_PATTERNS,
                ],
                message: CLIPBOARD_MESSAGE,
            },
        ]),
        layerOverride('src/*.{ts,tsx}', [featureInternalsRestriction]),
        layerOverride(
            ['src/plugins/*/feature.ts', 'src/plugins/*/migration.ts'],
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
        ),
        ...[
            { files: EDITOR_PART_FILES, outside: '../**' },
            { files: EDITOR_PART_SUBFOLDER_FILES, outside: '../../**' },
        ].map(({ files, outside }) => layerOverride(files, editorPartRestrictions(outside), NOT_EDITOR_PART_FILES)),
        // After the editor-part pair, since a later override replaces the rule options, so each repeats its bans.
        ...[
            { files: 'components', group: PLUGIN_ROOT_PATTERNS, message: COMPONENT_DIRECTION_MESSAGE },
            {
                files: 'hooks',
                group: ['../components', '../components/**', ...PLUGIN_ROOT_PATTERNS],
                message: HOOK_DIRECTION_MESSAGE,
            },
            {
                files: 'helpers',
                group: ['../hooks', '../hooks/**', '../components', '../components/**', ...PLUGIN_ROOT_PATTERNS],
                message: HELPER_DIRECTION_MESSAGE,
            },
        ].map(({ files, group, message }) =>
            layerOverride(`src/plugins/*/${files}/**/*.{ts,tsx}`, [
                ...editorPartRestrictions('../../**'),
                { group, message },
            ]),
        ),
        layerOverride(
            ['src/plugins/*.ts', 'src/plugins/profiles/**/*.{ts,tsx}'],
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
                featureUnitRestriction,
            ],
        ),
        layerOverride('src/plugins/plugins.ts', [
            {
                group: [
                    ...aliasPatterns(outsideFeatureFolders),
                    '!#/bridge/pluginApi/definePlugin',
                    '#/model/**',
                    '#/plugins/**',
                    '../**',
                    './*',
                    './**',
                    '!./*/index',
                    ...ENGINE_PATTERNS,
                ],
                message: FEATURE_PLUGINS_MESSAGE,
            },
        ]),
        layerOverride('src/plugins/*/reader.tsx', [
            {
                group: [
                    ...EDITOR_PART_PATTERNS,
                    '#/model/**',
                    ...aliasPatterns(readerFileFolders),
                    '!#/reader/define',
                    ...featurePathPatterns(FEATURE_FILE_TAILS),
                    '../**',
                    './*',
                    './**',
                    '!./feature',
                    '!./components/*',
                ],
                message: READER_FILE_MESSAGE,
            },
            { group: READER_FILE_EXTERNALS, message: READER_FILE_MESSAGE },
        ]),
        layerOverride('src/plugins/*/index.ts', [
            {
                group: [
                    ...aliasPatterns(FOLDERS),
                    '!#/bridge/pluginApi/definePlugin',
                    '../**',
                    './*',
                    './**',
                    '!./feature',
                    '!./editor',
                    '!./reader',
                ],
                message: FEATURE_INDEX_MESSAGE,
            },
            { group: [...packagesExcept([]), ...NODE_BUILTINS], message: FEATURE_INDEX_MESSAGE },
        ]),
        layerOverride('src/plugins/*/fixtures/**/*.{ts,tsx}', [
            { group: ['#/model/**', ...relativePatterns(['model'])], message: MODEL_ENTRY_MESSAGE },
        ]),
        layerOverride(
            'src/reader/**/*.{ts,tsx}',
            [
                {
                    group: [
                        ...aliasPatterns(readerFolders),
                        ...relativePatterns(readerFolders),
                        ...PROSEMIRROR_PATTERNS,
                    ],
                    message: READER_MESSAGE,
                },
                featureUnitRestriction,
            ],
            [],
            [CLIENT_REACT],
        ),
        layerOverride(
            'src/entries/**/*.{ts,tsx}',
            [
                {
                    group: [
                        ...aliasPatterns(entriesFolders),
                        ...relativePatterns(entriesFolders),
                        ...exceptPatterns(['plugins/*/reader']),
                        ...PROSEMIRROR_PATTERNS,
                    ],
                    message: ENTRIES_MESSAGE,
                },
            ],
            // `authoring` re-exports the editor part kit, so only the headless entries keep this boundary.
            ['src/entries/authoring.ts'],
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
            featureUnitRestriction,
        ]),
        layerOverride('src/locales/**/*.{ts,tsx}', [
            {
                group: [...aliasPatterns(localesFolders), ...relativePatterns(localesFolders), ...ENGINE_PATTERNS],
                message: LOCALES_MESSAGE,
            },
        ]),
        layerOverride(
            'src/testing/**/*.{ts,tsx}',
            [
                {
                    group: [
                        ...aliasPatterns(testingFolders),
                        ...relativePatterns(testingFolders),
                        ...featurePathPatterns(TESTING_FEATURE_TAILS),
                        ...ENGINE_PATTERNS,
                        // The `paste` helper feeds the paste pipeline through its entry.
                        ...exceptPatterns(['runtime/clipboard/plugin']),
                    ],
                    message: TESTING_MESSAGE,
                },
                featureInternalsRestriction,
            ],
            ['src/testing/conformance/**'],
        ),
        layerOverride('src/testing/conformance/**/*.{ts,tsx}', [
            {
                group: [
                    ...aliasPatterns(testingFolders),
                    ...relativePatterns(testingFolders),
                    ...featurePathPatterns(TESTING_FEATURE_TAILS),
                    ...ENGINE_PATTERNS,
                    ...exceptPatterns(['runtime/clipboard/plugin']),
                    ...exceptPatterns(['bridge/plugin', 'plugins/plugins', 'plugins/registry', 'react/compile/engine']),
                    '!react',
                    '!react-dom/server',
                ],
                message: CONFORMANCE_MESSAGE,
            },
            featureInternalsRestriction,
        ]),
        layerOverride('src/runtime/**/*.{ts,tsx}', [runtimeRestriction], ['src/runtime/clipboard/**']),
        {
            files: ['src/runtime/history/**/*.{ts,tsx}'],
            excludeFiles: ['**/__tests__/**'],
            rules: {
                'no-restricted-imports': [
                    'error',
                    {
                        paths: [FLUSH_SYNC],
                        patterns: [
                            frameworkRestriction,
                            tablesInternalsRestriction,
                            modelFileRestriction,
                            runtimeRestriction,
                        ],
                    },
                ],
            },
        } satisfies LayerOverride,
        // After the `src/runtime/**` overrides, so a later override replaces their rule options for `runtime/import`.
        layerOverride('src/runtime/import/**/*.{ts,tsx}', [
            {
                group: [
                    ...aliasPatterns(nonModelFolders),
                    ...relativePatterns(nonModelFolders),
                    '../*',
                    ...PROSEMIRROR_EXCEPT_MODEL,
                    ...REACT_PATTERNS,
                    ...exceptPatterns(IMPORT_PATHS),
                    ...HTML_BAN_PATTERNS,
                    './fromHtml',
                ],
                message: IMPORT_MESSAGE,
            },
        ]),
        layerOverride('src/runtime/import/fromHtml.ts', [
            {
                group: [
                    ...aliasPatterns(nonModelFolders),
                    ...relativePatterns(nonModelFolders),
                    ...PROSEMIRROR_EXCEPT_MODEL,
                    ...REACT_PATTERNS,
                    ...exceptPatterns(['runtime/definition/schema', ...IMPORT_PATHS]),
                ],
                message: HTML_MESSAGE,
            },
            featureUnitRestriction,
        ]),
        // After the `src/runtime/**` overrides, so a later override replaces their rule options for `runtime/definition`.
        layerOverride('src/runtime/definition/**/*.{ts,tsx}', [
            { group: [...definitionBans, ...exceptPatterns(DEFINITION_PATHS), '../**'], message: DEFINITION_MESSAGE },
        ]),
        layerOverride('src/runtime/definition/schema.ts', [
            {
                group: [...definitionBans, '../**', './**', ...PROSEMIRROR_EXCEPT_MODEL],
                message: SCHEMA_MESSAGE,
            },
        ]),
        layerOverride('src/bridge/**/*.{ts,tsx}', [
            {
                group: [...aliasPatterns(bridgeFolders), ...relativePatterns(bridgeFolders), ...PROSEMIRROR_PATTERNS],
                message: BRIDGE_MESSAGE,
            },
        ]),
        layerOverride(
            'src/react/**/*.{ts,tsx}',
            reactRestrictions([...portOnlyPatterns, ...exceptPatterns(IMPORT_PATHS)]),
            REACT_ASSEMBLY_FILES,
        ),
        layerOverride(
            REACT_ASSEMBLY_FILES,
            reactRestrictions([...portAndAssemblyPatterns, ...exceptPatterns(IMPORT_PATHS)]),
        ),
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
        // Must stay after the `src/**` base override, since a later override replaces the rule options.
        {
            files: ['**/*.stories.tsx'],
            rules: {
                'no-restricted-imports': importRule([
                    {
                        group: ['#/**', ...STORY_MODULES.map((path) => `!#/${path}`), '../**', ...STORY_EXTERNALS],
                        message: STORY_MESSAGE,
                    },
                ]),
            },
        },
        layerOverride('src/docs/**/*.{ts,tsx}', [
            {
                group: ['#/**', ...PUBLIC_ENTRY_MODULES.map((path) => `!#/${path}`), '../**'],
                message: DOCS_MESSAGE,
            },
        ]),
        layerOverride('src/ui/**/*.{ts,tsx}', [
            { group: [...portOnlyPatterns, ...exceptPatterns(HTML_PATHS)], message: UI_MESSAGE },
            {
                group: [
                    ...aliasPatterns(['react', 'persistence']),
                    ...relativePatterns(['react', 'persistence']),
                    ...PROSEMIRROR_PATTERNS,
                ],
                message: UI_MESSAGE,
            },
            featureInternalsRestriction,
        ]),
        layerOverride('src/styles/**/*.{ts,tsx}', [
            {
                group: [...aliasPatterns(stylesFolders), ...relativePatterns(stylesFolders), ...ENGINE_PATTERNS],
                message: STYLES_MESSAGE,
            },
        ]),
    ],
});
