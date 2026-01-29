/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: './tsconfig.rte.json',
            insertTypesEntry: true,
        }),
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
