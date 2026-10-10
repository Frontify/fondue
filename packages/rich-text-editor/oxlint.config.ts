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

const aliasPatterns = (folders: readonly string[]): string[] =>
    folders.flatMap((folder) => [`#/${folder}`, `#/${folder}/**`]);

const relativePatterns = (folders: readonly string[]): string[] =>
    folders.flatMap((folder) => [`../${folder}`, `../${folder}/**`, `../../${folder}`, `../../${folder}/**`]);

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

const modelFolders = FOLDERS.filter((folder) => folder !== 'model');

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
    ],
});
