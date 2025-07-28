/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'tools/transforms', // Copies all transform.js files
                    dest: '.',
                },
            ],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'tools/index.ts'),
            name: 'fondue-tools',
            formats: ['cjs'],
            fileName: () => 'index.cjs',
        },
        outDir: 'dist/tools',
        rollupOptions: {
            external: [
                'node:events',
                'node:fs',
                'node:path',
                'node:process',
                'node:child_process',
                'util',
                'stream',
                'crypto',
                'os',
                'url',
                'buffer',
                'assert',
                'readline',
                'worker_threads',
                // External dependencies
                'jscodeshift',
                'commander', // If you're using commander
                'chalk', // If you're using chalk
            ],
            output: {
                format: 'cjs',
                entryFileNames: 'index.cjs',
            },
        },
        target: 'es2022',
        minify: false,
    },
});
