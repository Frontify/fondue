/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        lib: {
            entry: 'tools/index.ts',
            name: 'FondueTools',
            fileName: 'fondue-tools',
            formats: ['cjs'],
        },
        rollupOptions: {
            external: ['node:fs', 'node:path', 'node:url', 'commander', /^jscodeshift\//],
            output: {
                banner: '#!/usr/bin/env node\n', // Shebang for executable
                format: 'cjs',
            },
        },

        outDir: 'dist/tools',
        minify: false,
    },
});
