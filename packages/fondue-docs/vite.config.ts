/* (c) Copyright Frontify Ltd., all rights reserved. */

import { builtinModules } from 'node:module';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

const nodeBuiltins = new Set([...builtinModules, ...builtinModules.map((m) => `node:${m}`)]);

export default defineConfig({
    plugins: [tsConfigPaths(), dts({ entryRoot: 'src', insertTypesEntry: true, exclude: ['**/*.test.ts'] })],
    build: {
        target: 'node18',
        sourcemap: true,
        minify: false,
        lib: {
            entry: './src/index.ts',
            formats: ['es'],
            fileName: () => 'fondue-docs.js',
        },
        rollupOptions: {
            external: (id) => nodeBuiltins.has(id) || id.startsWith('node:'),
            output: {
                preserveModules: false,
            },
        },
    },
});
