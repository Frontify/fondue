/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

import packageJson from './package.json';

type DependencyManifest = {
    dependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
};

const { dependencies: dependenciesMap = {}, peerDependencies: peerDependenciesMap = {} } =
    packageJson as DependencyManifest;

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

export default defineConfig({
    plugins: [
        tsConfigPaths(),
        dts({
            entryRoot: 'src',
            exclude: ['**/__tests__/**', '**/*.{spec,test,stories}.{ts,tsx}'],
        }),
        externalizeJsDeps(),
    ],
    build: {
        lib: {
            entry: {
                'model/index': './src/model/index.ts',
            },
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
        coverage: {
            exclude: [
                ...configDefaults.exclude,
                '**.config.{ts,cjs}',
                '**/**/*.{ct,spec,test,stories}.{ts,tsx}',
                '**/__tests__/**',
            ],
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
        },
    },
});
