/* (c) Copyright Frontify Ltd., all rights reserved. */

import { basename } from 'node:path';

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from './package.json';

// The consumer installs these anyway, so bundling them would ship a second copy.
const externalCandidates = [...Object.keys(dependenciesMap), ...Object.keys(peerDependenciesMap)];
const matchesExternalCandidate = (id: string) =>
    externalCandidates.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));

const STYLE_FILE = /\.(css|scss|sass|less|styl)(\?|$)/;

const externalizeJsDeps = (): Plugin => ({
    name: 'externalize-js-deps',
    enforce: 'pre',
    apply: (config, env) => env.command === 'build' && config.build?.lib !== undefined,
    async resolveId(id, importer, options) {
        if (!matchesExternalCandidate(id)) {
            return null;
        }
        const resolved = await this.resolve(id, importer, { ...options, skipSelf: true });

        if (resolved && STYLE_FILE.test(resolved.id)) {
            return resolved;
        }

        return { id, external: true };
    },
});

const CSS_MODULE_SUFFIX = /\.module\.(scss|css)$/;

/**
 * CSS module class names are `rte-<module>__<class>` (`.quote` in
 * `quote.module.scss` becomes `rte-quote__quote`). Unhashed, so the classes in
 * `serializeToHtml` output are stable across builds and a host stylesheet can
 * rely on them. That only holds while module file names are unique, so a
 * duplicate fails the build.
 */
const stableScopedName = () => {
    const fileByModule = new Map<string, string>();

    return (local: string, filename: string): string => {
        const file = filename.split('?')[0] ?? filename;
        const moduleName = basename(file).replace(CSS_MODULE_SUFFIX, '');
        const claimedBy = fileByModule.get(moduleName);
        if (claimedBy !== undefined && claimedBy !== file) {
            throw new Error(
                `CSS modules ${claimedBy} and ${file} would both scope their classes as "rte-${moduleName}__…". Rename one.`,
            );
        }
        fileByModule.set(moduleName, file);

        return `rte-${moduleName}__${local}`;
    };
};

export default defineConfig({
    plugins: [
        react(),
        tsConfigPaths(),
        dts({
            insertTypesEntry: true,
            rollupTypes: true,
            // Only the package source: not `.storybook/`, which the tsconfig also covers.
            include: ['src'],
            exclude: ['**/*.stories.tsx', '**/*.spec.ts', '**/*.spec.tsx'],
        }),
        externalizeJsDeps(),
    ],
    /**
     * SCSS modules end up in one `dist/style.css` (`@frontify/fondue-rich-text-editor/styles`).
     * PostCSS is inline and without Tailwind, so no `postcss.config.*` is picked
     * up and no utility CSS reaches the bundle; Tailwind is added in `.storybook/main.ts`.
     */
    css: {
        modules: { generateScopedName: stableScopedName() },
        postcss: { plugins: [autoprefixer()] },
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    /**
     * No DOM by default; a spec that needs one opts into `happy-dom` with a
     * `// @vitest-environment happy-dom` docblock.
     *
     * Excluded: `__tests__/typeDerivation.spec.ts` (asserts at compile time, `tsgo --noEmit`
     * runs it) and `lint-fixtures/src/` (lint input, not tests).
     *
     * CSS modules compile in tests, so markup carries the shipped class names.
     */
    test: {
        environment: 'node',
        css: { include: [CSS_MODULE_SUFFIX], modules: { classNameStrategy: 'scoped' } },
        exclude: [...configDefaults.exclude, 'src/__tests__/typeDerivation.spec.ts', 'lint-fixtures/src/**'],
    },
    build: {
        lib: {
            entry: './src/index.ts',
            fileName: (format: string) => `[name].${format}.js`,
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
                },
            ],
        },
    },
});
