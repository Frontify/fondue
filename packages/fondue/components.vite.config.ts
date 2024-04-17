/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({ insertTypesEntry: true, exclude: ['**/*.stories.tsx'], include: 'src/subpackages/components.ts' })],
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
