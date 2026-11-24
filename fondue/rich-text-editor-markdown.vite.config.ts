/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: './tsconfig.rich-text-editor-markdown.json',
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: 'src/subpackages/rich-text-editor-markdown.ts',
            name: 'FondueRichTextEditorMarkdown',
            fileName: 'fondue-rich-text-editor-markdown',
        },
        rollupOptions: {
            external: ['@frontify/fondue-rich-text-editor/markdown'],
        },
        outDir: 'dist/packages/rich-text-editor/markdown',
    },
});
