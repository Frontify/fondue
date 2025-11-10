/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

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
