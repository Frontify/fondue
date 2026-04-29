/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'node:path';

import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

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
