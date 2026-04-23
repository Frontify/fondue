/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from './package.json';

const peerDependencies = Object.keys(peerDependenciesMap);
const dependencies = Object.keys(dependenciesMap);
const externalPackages = [...dependencies, ...peerDependencies, 'react-dom/client', 'react/jsx-runtime'];

// Externalize a declared dependency AND any of its subpath imports (e.g.
// `@dnd-kit/react/sortable`, `@dnd-kit/abstract/modifiers`). Rollup's static `external`
// array does exact-string matching, so without subpath handling those modules get
// inlined into the bundle, dragging in their transitive deps (`@dnd-kit/dom`,
// `@dnd-kit/state`, etc.) as duplicate copies alongside the consumer's. That breaks
// libraries that rely on a single shared runtime instance — most visibly dnd-kit,
// whose registry uses `instanceof Draggable` / `instanceof Droppable` checks that
// silently fail when two copies of the class exist.
const isExternal = (id: string) => externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));

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
    ],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'FondueComponents',
            formats: ['es'],
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: isExternal,
            output: [
                {
                    name: 'FondueComponents',
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    globals,
                },
            ],
        },
    },
    test: {
        environment: 'happy-dom',
        setupFiles: ['./src/setupTests.ts'],
        css: true,
        exclude: [...configDefaults.exclude, 'scripts/templates/**/*.**'],
        coverage: {
            exclude: [
                ...configDefaults.exclude,
                '.storybook',
                'playwright',
                'scripts/templates',
                '.eslintrc.cjs',
                '**.config.{ts,cjs}',
                '**/**/*.{ct,spec,test,stories}.{ts,tsx}',
                'storybook-static',
            ],
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
        },
    },
});
