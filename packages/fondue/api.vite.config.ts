/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({ insertTypesEntry: true, include: 'src/subpackages/api.ts' })],
    build: {
        lib: {
            entry: 'src/subpackages/api.ts',
            name: 'FondueApi',
            fileName: 'fondue-api',
        },
        rollupOptions: {
            external: ['@frontify/fondue-api'],
        },
        outDir: 'dist/packages/api',
    },
});
