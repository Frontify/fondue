/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({ insertTypesEntry: true, exclude: ['**/*.stories.tsx'], include: 'src/subpackages/charts.ts' }),
        {
            name: 'preserve-css-imports',
            load(id) {
                if (id.endsWith('charts.styles.css')) {
                    return { code: '', map: null, moduleSideEffects: 'no-treeshake' };
                }
            },
            generateBundle() {
                const cssPath = resolve(__dirname, 'src/subpackages/charts.styles.css');
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
            entry: 'src/subpackages/charts.ts',
            name: 'FondueCharts',
            fileName: 'fondue-charts',
        },
        rollupOptions: {
            external: ['@frontify/fondue-charts'],
        },
        outDir: 'dist/packages/charts',
    },
});
