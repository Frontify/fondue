/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { cssTypesPlugin } from './scripts/cssTypesPlugin';

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: './tsconfig.rte.json',
            insertTypesEntry: true,
        }),
        cssTypesPlugin(),
    ],
    build: {
        lib: {
            entry: 'src/subpackages/rte.ts',
            name: 'FondueRte',
            fileName: 'fondue-rte',
        },
        rollupOptions: {
            external: ['@frontify/fondue-rte'],
        },
        outDir: 'dist/packages/rte',
    },
});
