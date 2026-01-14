/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: './tsconfig.rte.json',
            insertTypesEntry: true,
        }),
        {
            name: 'preserve-css-imports',
            load(id) {
                if (id.endsWith('rte.styles.css')) {
                    return { code: '', map: null, moduleSideEffects: 'no-treeshake' };
                }
            },
            generateBundle() {
                const cssPath = resolve(__dirname, 'src/subpackages/rte.styles.css');
                const content = readFileSync(cssPath, 'utf-8');
                this.emitFile({
                    type: 'asset',
                    fileName: 'style.css',
                    source: content,
                });
            },
        },
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
