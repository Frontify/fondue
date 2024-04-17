/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({ insertTypesEntry: true, exclude: ['**/*.stories.tsx'], include: 'src/subpackages/icons.ts' })],
    build: {
        lib: {
            entry: 'src/subpackages/icons.ts',
            name: 'FondueIcons',
            fileName: 'fondue-icons',
        },
        rollupOptions: {
            external: ['@frontify/fondue-icons'],
        },
        outDir: 'dist/packages/icons',
    },
});
