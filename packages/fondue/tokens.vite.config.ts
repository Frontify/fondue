/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

import { cssTypesPlugin } from './scripts/cssTypesPlugin';

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'node_modules/@frontify/fondue-tokens/dist/*',
                    dest: '',
                },
            ],
        }),
        cssTypesPlugin(),
    ],
    build: {
        lib: {
            entry: 'src/subpackages/tokens.ts',
            name: 'FondueTokens',
            fileName: 'fondue-tokens',
        },
        rollupOptions: {
            external: ['@frontify/fondue-tokens'],
        },
        outDir: 'dist/packages/tokens',
    },
});
