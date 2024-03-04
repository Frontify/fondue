/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';


export default defineConfig({
    plugins: [dts({ insertTypesEntry: true, rollupTypes: true })],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/fondueComponents.ts'),
            name: 'FondueComponents',
            fileName: (format: string) => `[name].${format}.js`,
        },
        outDir: resolve(__dirname, 'dist/fondue-components'),
        sourcemap: true,
        minify: true,
    },
});
