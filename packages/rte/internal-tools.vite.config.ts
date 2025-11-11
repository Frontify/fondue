/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'node:path';

import { defineConfig, type Plugin } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const shebangPlugin = (): Plugin => {
    return {
        name: 'shebang',
        renderChunk(code) {
            return `#!/usr/bin/env node\n${code}`;
        },
    };
};

export default defineConfig({
    plugins: [
        viteStaticCopy({
            targets: [
                {
                    src: 'tools/codemod/transforms', // Copies all transform.js files
                    dest: '.',
                },
            ],
        }),
        shebangPlugin(),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'tools/internal.ts'),
            name: 'fondue-tools',
            formats: ['es'],
            fileName: () => 'index.js',
        },
        outDir: 'dist/tools/internal',
        rollupOptions: {
            external: [
                'node:events',
                'node:fs',
                'node:path',
                'node:url',
                'node:module',
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
                'execa',
                'commander',
            ],
            output: {
                format: 'module',
                entryFileNames: 'index.js',
            },
        },
        target: 'es2022',
        minify: false,
    },
});
