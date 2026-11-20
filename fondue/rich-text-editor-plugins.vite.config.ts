/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: './tsconfig.rich-text-editor-plugins.json',
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: 'src/subpackages/rich-text-editor-plugins.ts',
            name: 'FondueRichTextEditorPlugins',
            fileName: 'fondue-rich-text-editor-plugins',
        },
        rollupOptions: {
            external: ['@frontify/fondue-rich-text-editor/plugins'],
        },
        outDir: 'dist/packages/rich-text-editor/plugins',
    },
});
