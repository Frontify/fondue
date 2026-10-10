/* (c) Copyright Frontify Ltd., all rights reserved. */

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

const FEATURE_FILE_MESSAGE =
    "A feature file imports only `#/model`, its own `./migration` and a declared dependency's `#/features/<id>/feature`, as an outside feature must.";

const FEATURE_WIRING_MESSAGE =
    'The feature index, registry and profiles wire shipped features from `model`, and do not load views, readers or the editor.';

const READER_MESSAGE =
    '`reader` imports `model`, `locales` and `#/features/*/reader`, because the reader never loads editor code.';

// An undeclared package can't be imported, so the declared ones are the whole list.
const PROSEMIRROR_EXCEPT_MODEL = Object.keys({ ...packageJson.dependencies, ...packageJson.devDependencies }).filter(
    (name) => name.startsWith('prosemirror-') && name !== 'prosemirror-model',
);

const FEATURE_SIBLINGS = ['./feature', './view', './reader', './fixtures', './fixtures/**', './styles/**'];

// Alias specifiers start with `#` and relative specifiers start with `.`.
const EXTERNAL_SPECIFIER = '^[^.#]';

const aliasPatterns = (folders: readonly string[]): string[] =>
    folders.flatMap((folder) => [`#/${folder}`, `#/${folder}/**`]);

const relativePatterns = (folders: readonly string[]): string[] =>
    folders.flatMap((folder) => [`../${folder}`, `../${folder}/**`, `../../${folder}`, `../../${folder}/**`]);

const FEATURE_ROOTS = ['#/features', '../features', '../../features'] as const;

const featurePathPatterns = (tails: readonly string[]): string[] =>
    FEATURE_ROOTS.flatMap((root) => tails.map((tail) => `${root}${tail}`));

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
): LayerOverride => ({
    files: typeof files === 'string' ? [files] : [...files],
    excludeFiles: ['**/__tests__/**', ...excludeFiles],
    rules: {
        'no-restricted-imports': ['error', { patterns: [frameworkRestriction, ...restrictions] }],
    },
});

const modelFolders = FOLDERS.filter((folder) => folder !== 'model');

const definitionFolders = FOLDERS.filter((folder) => folder !== 'model' && folder !== 'definition');

const outsideFeatureFolders = FOLDERS.filter((folder) => folder !== 'model' && folder !== 'features');

const readerFolders = FOLDERS.filter(
    (folder) => folder !== 'model' && folder !== 'locales' && folder !== 'reader' && folder !== 'features',
);

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
        layerOverride(
            ['src/features/*/feature.ts', 'src/features/*/migration.ts'],
            [
                {
                    group: [
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
            ['src/features/index.ts', 'src/features/registry.ts', 'src/features/profiles/**/*.{ts,tsx}'],
            [
                {
                    group: [
                        ...aliasPatterns(outsideFeatureFolders),
                        ...relativePatterns(outsideFeatureFolders),
                        ...featurePathPatterns(WIRING_FEATURE_TAILS),
                        ...ENGINE_PATTERNS,
                    ],
                    message: FEATURE_WIRING_MESSAGE,
                },
            ],
        ),
        layerOverride('src/reader/**/*.{ts,tsx}', [
            {
                group: [
                    ...aliasPatterns(readerFolders),
                    ...relativePatterns(readerFolders),
                    ...featurePathPatterns(READER_FEATURE_TAILS),
                    ...PROSEMIRROR_PATTERNS,
                ],
                message: READER_MESSAGE,
            },
        ]),
    ],
});
