/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig, type OxlintOverride } from 'oxlint';

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

const ENGINE_PATTERNS = ['prosemirror-*', 'react', 'react/**', 'react-dom', 'react-dom/**'];

const FRAMEWORK_MESSAGE = 'The package must work in every host framework.';

const MODEL_MESSAGE =
    '`model` imports nothing else in the package and no engine or React, because the headless entries are built on it.';

const TESTING_MESSAGE =
    '`testing` may import `model`, `runtime`, and `persistence`, and from `features` only `features/conformance/**`, `features/*/fixtures/**`, and `features/__fixtures__/**`.';

const aliasPatterns = (folders: readonly string[]): string[] =>
    folders.flatMap((folder) => [`#/${folder}`, `#/${folder}/**`]);

const relativePatterns = (folders: readonly string[]): string[] =>
    folders.flatMap((folder) => [`../${folder}`, `../${folder}/**`, `../../${folder}`, `../../${folder}/**`]);

const FEATURE_ROOTS = ['#/features', '../features', '../../features'] as const;

const FEATURE_ALLOW_TAILS = [
    '/conformance',
    '/conformance/**',
    '/*/fixtures',
    '/*/fixtures/**',
    '/__fixtures__',
    '/__fixtures__/**',
] as const;

const restrictedFeaturePatterns = FEATURE_ROOTS.flatMap((root) => [
    root,
    `${root}/**`,
    ...FEATURE_ALLOW_TAILS.map((tail) => `!${root}${tail}`),
]);

type ImportRestriction = {
    group: string[];
    message: string;
};

const frameworkRestriction: ImportRestriction = {
    group: FRAMEWORK_PATTERNS,
    message: FRAMEWORK_MESSAGE,
};

// Later overrides replace rule options, so each layer repeats the bans that still apply.
// oxlint 1.67 accepts excludeFiles, but the published override type omits it.
type LayerOverride = OxlintOverride & { excludeFiles?: string[] };

const layerOverride = (files: string, restrictions: ImportRestriction[]): LayerOverride => ({
    files: [files],
    excludeFiles: ['**/__tests__/**'],
    rules: {
        'no-restricted-imports': ['error', { patterns: [frameworkRestriction, ...restrictions] }],
    },
});

const SERVICES_MESSAGE =
    'The host owns network, storage and cookies, so package source reaches them only through `EditorServices`.';

const RUNTIME_MESSAGE = 'Tests drive every clock, frame and ID through `RuntimeEnvironment`.';

const SERVICE_GLOBALS = [
    'fetch',
    'XMLHttpRequest',
    'WebSocket',
    'EventSource',
    'localStorage',
    'sessionStorage',
    'indexedDB',
] as const;

const RUNTIME_GLOBALS = [
    'Date',
    'setTimeout',
    'setInterval',
    'clearTimeout',
    'clearInterval',
    'crypto',
    'queueMicrotask',
    'requestAnimationFrame',
    'cancelAnimationFrame',
    'requestIdleCallback',
    'cancelIdleCallback',
] as const;

type GlobalRestriction = {
    name: string;
    message: string;
};

type PropertyRestriction = {
    object: string;
    property: string;
    message: string;
};

const globalRestrictions = (names: readonly string[], message: string): GlobalRestriction[] =>
    names.map((name) => ({ name, message }));

const propertyRestrictions = (pairs: [string, string][], message: string): PropertyRestriction[] =>
    pairs.map(([object, property]) => ({ object, property, message }));

const serviceGlobals = globalRestrictions(SERVICE_GLOBALS, SERVICES_MESSAGE);
const runtimeGlobals = globalRestrictions(RUNTIME_GLOBALS, RUNTIME_MESSAGE);

const serviceProperties = propertyRestrictions(
    [
        ['navigator', 'sendBeacon'],
        ['document', 'cookie'],
    ],
    SERVICES_MESSAGE,
);

const runtimeProperties = propertyRestrictions(
    [
        ['Math', 'random'],
        ['globalThis', 'crypto'],
        ['window', 'crypto'],
    ],
    RUNTIME_MESSAGE,
);

const RUNTIME_ENVIRONMENT_FILES = ['src/model/environment.ts', 'src/runtime/environment.ts'];

const hostOverride = (
    files: readonly string[],
    globals: readonly GlobalRestriction[],
    properties: readonly PropertyRestriction[],
): LayerOverride => ({
    files: [...files],
    excludeFiles: ['**/__tests__/**'],
    rules: {
        'no-restricted-globals': ['error', ...globals],
        'no-restricted-properties': ['error', ...properties],
    },
});

const modelFolders = FOLDERS.filter((folder) => folder !== 'model');

const testingFolders = FOLDERS.filter(
    (folder) =>
        folder !== 'testing' &&
        folder !== 'model' &&
        folder !== 'runtime' &&
        folder !== 'persistence' &&
        folder !== 'features',
);

export default defineConfig({
    extends: [reactConfig],
    options: {
        typeAware: true,
    },
    ignorePatterns: ['dist/', 'coverage/'],
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
            },
        },
        {
            files: ['src/**/*.{ts,tsx}'],
            rules: {
                'import/no-cycle': 'error',
                'no-nested-ternary': 'error',
                'no-restricted-imports': ['error', { patterns: [frameworkRestriction] }],
            },
        },
        layerOverride('src/model/**/*.{ts,tsx}', [
            {
                group: [...aliasPatterns(modelFolders), ...relativePatterns(modelFolders), ...ENGINE_PATTERNS],
                message: MODEL_MESSAGE,
            },
        ]),
        layerOverride('src/testing/**/*.{ts,tsx}', [
            {
                group: [
                    ...aliasPatterns(testingFolders),
                    ...relativePatterns(testingFolders),
                    ...restrictedFeaturePatterns,
                    ...ENGINE_PATTERNS,
                ],
                message: TESTING_MESSAGE,
            },
        ]),
        hostOverride(
            ['src/**/*.{ts,tsx}'],
            [...serviceGlobals, ...runtimeGlobals],
            [...serviceProperties, ...runtimeProperties],
        ),
        hostOverride(['src/testing/**/*.{ts,tsx}'], runtimeGlobals, runtimeProperties),
        hostOverride(RUNTIME_ENVIRONMENT_FILES, serviceGlobals, serviceProperties),
    ],
});
