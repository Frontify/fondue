/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import { type Plugin } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

import { peerDependencies as peerDependenciesMap } from './package.json';

const externalCandidates = [...Object.keys(peerDependenciesMap)];
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

export const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/client': 'ReactDOMClient',
    'react/jsx-runtime': 'react/jsx-runtime',
};

export default defineConfig({
    plugins: [
        react(),
        tsConfigPaths(),
        dts({ insertTypesEntry: true, rollupTypes: true, exclude: ['**/*.stories.tsx'] }),
        externalizeJsDeps(),
    ],
    /**
     * The whole package is styled with SCSS modules, which end up in a single
     * `dist/style.css` consumers import via `@frontify/fondue-rich-text-editor/styles`.
     *
     * PostCSS is declared inline — and deliberately without Tailwind — so no
     * `postcss.config.*` can be picked up and no utility CSS can reach the
     * bundle. Tailwind is a Storybook-only concern and is added there, in
     * `.storybook/main.ts`.
     */
    css: {
        postcss: { plugins: [autoprefixer()] },
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    /**
     * The engine hosts a `contenteditable`, so the tests that drive one need a DOM
     * — `happy-dom` rather than a browser, since nothing here is about layout.
     *
     * `type-derivation.spec.ts` is deliberately excluded: it asserts at compile
     * time and `tsgo --noEmit` is its runner (see its header), so it holds no test
     * suite for this one to find.
     */
    test: {
        environment: 'node',
        exclude: [...configDefaults.exclude, 'src/type-derivation.spec.ts'],
    },
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'Rte',
            fileName: 'rte',
            formats: ['es'],
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            output: [
                {
                    name: 'Rte',
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    globals,
                },
            ],
        },
    },
});
