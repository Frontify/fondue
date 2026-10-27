/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import { cssTypesPlugin } from './scripts/cssTypesPlugin';

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: './tsconfig.rich-text-editor.json',
            insertTypesEntry: true,
        }),
        cssTypesPlugin(),
    ],
    build: {
        lib: {
            entry: 'src/subpackages/rich-text-editor.ts',
            name: 'FondueRichTextEditor',
            fileName: 'fondue-rich-text-editor',
            cssFileName: 'style',
        },
        rollupOptions: {
            external: ['@frontify/fondue-rich-text-editor'],
        },
        outDir: 'dist/packages/rich-text-editor',
    },
});
