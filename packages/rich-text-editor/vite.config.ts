/* (c) Copyright Frontify Ltd., all rights reserved. */

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

import { type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from './package.json';

const externalCandidates = [...Object.keys(dependenciesMap), ...Object.keys(peerDependenciesMap)];
const matchesExternalCandidate = (id: string) =>
    externalCandidates.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));

const STYLE_FILE = /\.(css|scss|sass|less|styl)(\?|$)/;

// Externalize JS deps (incl. subpaths) so consumers share runtime instances; inline
// stylesheet subpaths since they have no shared runtime to share.
const externalizeJsDeps = (): Plugin => ({
    name: 'externalize-js-deps',
    enforce: 'pre',
    // Library build only. Vitest loads this config without build.lib.
    apply: (config, env) => env.command === 'build' && config.build?.lib !== undefined,
    async resolveId(id, importer, options) {
        if (!matchesExternalCandidate(id)) {
            return null;
        }

        const resolved = await this.resolve(id, importer, {
            ...options,
            skipSelf: true,
        });

        if (resolved && STYLE_FILE.test(resolved.id)) {
            return resolved;
        }

        return { id, external: true };
    },
});

const ENTRIES = {
    index: './src/index.ts',
    'model/index': './src/model/index.ts',
    'features/index': './src/plugins/index.ts',
    'entries/reader': './src/entries/reader.ts',
    'entries/authoring': './src/entries/authoring.ts',
    'codecs/index': './src/codecs/index.ts',
    'html/index': './src/runtime/import/fromHtml.ts',
    'testing/index': './src/testing/index.ts',
};

// The `./html` and `./features` exports keep their declaration paths while their sources live in runtime/import and
// plugins, so each gets a re-export at its published path when its entry is built.
const DECLARATION_SHIMS = [
    { entry: 'html/index', source: 'runtime/import/fromHtml' },
    { entry: 'features/index', source: 'plugins/index' },
];

export default defineConfig({
    plugins: [
        tsConfigPaths(),
        dts({
            entryRoot: 'src',
            include: ['src'],
            exclude: [
                '**/__tests__/**',
                '**/*.{spec,test,stories}.{ts,tsx}',
                'src/setupTests.ts',
                'src/react/examples/**',
                'src/docs/**',
            ],
            afterBuild: (emittedFiles) => {
                for (const { entry, source } of DECLARATION_SHIMS) {
                    if (!Object.hasOwn(ENTRIES, entry)) {
                        continue;
                    }

                    const suffix = `/${source}.d.ts`;
                    const emitted = [...emittedFiles.keys()].find((file) => file.endsWith(suffix));
                    if (emitted === undefined) {
                        throw new Error(`The build emitted no ${suffix}.`);
                    }

                    const target = `${emitted.slice(0, -suffix.length)}/${entry}.d.ts`;
                    mkdirSync(dirname(target), { recursive: true });
                    writeFileSync(target, `export * from '../${source}';\n`);
                }
            },
        }),
        externalizeJsDeps(),
    ],
    build: {
        lib: {
            entry: ENTRIES,
            cssFileName: 'style',
            formats: ['es'],
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            output: [
                {
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    entryFileNames: '[name].js',
                },
            ],
        },
    },
    test: {
        environment: 'happy-dom',
        setupFiles: ['./src/setupTests.ts'],
        // `runFeatureContract` registers its cases through the runner globals, as it does in a host's tests.
        globals: true,
        // A cold transform cache makes the first import of an entry slow; each test keeps the 5,000 ms default.
        hookTimeout: 60_000,
        coverage: {
            exclude: [
                ...configDefaults.exclude,
                '**.config.{ts,cjs}',
                '**/**/*.{ct,spec,test,stories}.{ts,tsx}',
                '**/__tests__/**',
                'src/setupTests.ts',
            ],
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            thresholds: {
                lines: 85,
                branches: 80,
                'src/model/**': { lines: 95, branches: 90 },
                'src/runtime/**': { lines: 95, branches: 90 },
                'src/persistence/**': { lines: 95, branches: 90 },
                'src/runtime/import/**': { lines: 95, branches: 90 },
                'src/codecs/**': { lines: 95, branches: 90 },
            },
        },
    },
});
