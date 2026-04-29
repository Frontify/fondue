/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({ outDir: 'dist/locales', entryRoot: 'src/locales', include: ['src/locales'] })],
    build: {
        outDir: 'dist/locales',
        emptyOutDir: false,
        sourcemap: true,
        minify: true,
        lib: {
            entry: resolve(__dirname, 'src/locales/index.ts'),
            fileName: 'index',
            formats: ['es'],
        },
        rollupOptions: {
            external: [/^date-fns/],
        },
    },
});
