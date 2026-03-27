/* (c) Copyright Frontify Ltd., all rights reserved. */

import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [dts({ insertTypesEntry: true, rollupTypes: true })],
    build: {
        lib: {
            entry: './src/index.ts',
            formats: ['es'],
            fileName: 'fondue-api',
        },
        sourcemap: true,
        minify: false,
    },
    test: {
        environment: 'node',
    },
});
