/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({ insertTypesEntry: true, exclude: ['**/*.stories.tsx'], include: 'src/subpackages/components.ts' }),
        {
            name: 'preserve-css-imports',
            load(id) {
                if (id.endsWith('components.styles.css')) {
                    return { code: '', map: null, moduleSideEffects: 'no-treeshake' };
                }
            },
            generateBundle() {
                const cssPath = resolve(__dirname, 'src/subpackages/components.styles.css');
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
            entry: 'src/subpackages/components.ts',
            name: 'FondueComponents',
            fileName: 'fondue-components',
        },
        rollupOptions: {
            external: ['@frontify/fondue-components'],
        },
        outDir: 'dist/packages/components',
    },
});
