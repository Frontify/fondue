/* (c) Copyright Frontify Ltd., all rights reserved. */

import { builtinModules } from 'node:module';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const nodeBuiltins = new Set([...builtinModules, ...builtinModules.map((m) => `node:${m}`)]);

export default defineConfig({
    plugins: [dts({ insertTypesEntry: true, include: 'src/subpackages/docs.ts' })],
    build: {
        target: 'node18',
        lib: {
            entry: 'src/subpackages/docs.ts',
            name: 'FondueDocs',
            fileName: 'fondue-docs',
            formats: ['es'],
        },
        rollupOptions: {
            external: (id) => id === '@frontify/fondue-docs' || nodeBuiltins.has(id) || id.startsWith('node:'),
        },
        outDir: 'dist/packages/docs',
    },
});
