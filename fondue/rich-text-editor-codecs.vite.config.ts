/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        dts({
            tsconfigPath: './tsconfig.rich-text-editor-codecs.json',
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: 'src/subpackages/rich-text-editor-codecs.ts',
            name: 'FondueRichTextEditorCodecs',
            fileName: 'fondue-rich-text-editor-codecs',
        },
        outDir: 'dist/packages/rich-text-editor/codecs',
    },
});
