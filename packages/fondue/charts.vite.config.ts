/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { cssTypesPlugin } from './scripts/cssTypesPlugin';

export default defineConfig({
    plugins: [
        dts({ insertTypesEntry: true, exclude: ['**/*.stories.tsx'], include: 'src/subpackages/charts.ts' }),
        cssTypesPlugin(),
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
