/* (c) Copyright Frontify Ltd., all rights reserved. */

import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import browserslistToEsbuild from 'browserslist-to-esbuild';
import { type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

type PackageJson = {
    readonly browserslist: string[];
    readonly dependencies?: Record<string, string>;
    readonly peerDependencies?: Record<string, string>;
    readonly exports: Record<string, string | { readonly import?: string }>;
};

const packageJson = JSON.parse(readFileSync(new URL('package.json', import.meta.url), 'utf8')) as PackageJson;

const externalCandidates = [
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies ?? {}),
];
const matchesExternalCandidate = (id: string) =>
    externalCandidates.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));

const STYLE_FILE = /\.(css|scss|sass|less|styl)(\?|$)/;

// Externalize JS deps (incl. subpaths) so consumers share runtime instances; inline
// stylesheet subpaths since they have no shared runtime to share.
const externalizeJsDeps = (): Plugin => ({
    name: 'externalize-js-deps',
    enforce: 'pre',
    // Library build only. Storybook merges this config and would break on bare imports.
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

// Each script entry of the `exports` map builds from the `src` module at the same path.
const libraryEntries = Object.fromEntries(
    Object.values(packageJson.exports).flatMap((target) => {
        if (typeof target === 'string' || target.import === undefined) {
            return [];
        }
        const name = target.import.replace(/^\.\/dist\//, '').replace(/\.js$/, '');
        const source = [`./src/${name}.ts`, `./src/${name}.tsx`].find((path) =>
            existsSync(new URL(path, import.meta.url)),
        );
        return source === undefined ? [] : [[name, source]];
    }),
);

const sourceDirectory = fileURLToPath(new URL('src', import.meta.url));
const distDirectory = fileURLToPath(new URL('dist', import.meta.url));

// `nodenext` consumers need a full file path in every relative declaration import, inline `import()` types included.
const withDeclarationExtensions = (filePath: string, content: string) => {
    const sourceDir = dirname(filePath).replace(distDirectory, sourceDirectory);
    return content.replaceAll(
        /((?:from\s+|import\()['"])(\.{1,2}\/[^'"]+?)(['"])/g,
        (match, open: string, specifier: string, close: string) => {
            if (specifier.endsWith('.js')) {
                return match;
            }
            const target = resolve(sourceDir, specifier);
            const isDirectory = !['.ts', '.tsx'].some((extension) => existsSync(`${target}${extension}`));
            return `${open}${specifier}${isDirectory ? '/index.js' : '.js'}${close}`;
        },
    );
};

const buildTarget = browserslistToEsbuild(packageJson.browserslist);

const testExclude = [...configDefaults.exclude, 'fixtures/**', '**/__lint-fixtures__/**'];

export default defineConfig({
    plugins: [
        tsConfigPaths(),
        dts({
            include: ['src'],
            exclude: ['src/**/*.{test,ct,stories}.{ts,tsx}', 'src/**/__lint-fixtures__/**', 'src/setupTests.ts'],
            beforeWriteFile: (filePath, content) => ({
                filePath,
                content: withDeclarationExtensions(filePath, content),
            }),
        }),
        externalizeJsDeps(),
    ],
    build: {
        lib: {
            entry: libraryEntries,
            formats: ['es'],
            cssFileName: 'style',
        },
        target: buildTarget,
        cssTarget: buildTarget,
        sourcemap: true,
        minify: true,
        rollupOptions: {
            output: {
                format: 'es',
                preserveModules: true,
                preserveModulesRoot: 'src',
                entryFileNames: '[name].js',
            },
        },
    },
    test: {
        coverage: {
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            include: ['src/**/*.{ts,tsx}'],
            exclude: ['src/**/*.{test,ct,stories}.{ts,tsx}', 'src/**/__lint-fixtures__/**', 'src/setupTests.ts'],
        },
        projects: [
            {
                extends: true,
                test: {
                    name: 'node',
                    environment: 'node',
                    include: ['src/**/*.test.ts', 'scripts/**/*.test.ts'],
                    exclude: [...testExclude, 'src/**/*.dom.test.ts'],
                },
            },
            {
                extends: true,
                test: {
                    name: 'dom',
                    environment: 'happy-dom',
                    setupFiles: ['./src/setupTests.ts'],
                    css: true,
                    include: ['src/**/*.test.tsx', 'src/**/*.dom.test.ts'],
                    exclude: testExclude,
                },
            },
        ],
    },
});
