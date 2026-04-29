/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({ insertTypesEntry: true, include: 'src/subpackages/locales.ts' })],
    build: {
        lib: {
            entry: 'src/subpackages/locales.ts',
            name: 'FondueLocales',
            fileName: 'fondue-locales',
        },
        rollupOptions: {
            external: ['@frontify/fondue-components/locales'],
        },
        outDir: 'dist/packages/locales',
    },
});
