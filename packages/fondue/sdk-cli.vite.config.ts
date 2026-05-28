/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import fg from 'fast-glob';
import { defineConfig, type Plugin } from 'vite';

import pkg from './package.json';

const SDK_DIR = resolve(__dirname, '../sdk');

const shebangPlugin = (): Plugin => ({
    name: 'shebang',
    renderChunk(code) {
        return `#!/usr/bin/env node\n${code}`;
    },
});

/**
 * Mirror the SDK's `adapters/` tree next to the bundled bin so any adapter's
 * runtime asset lookups (rooted at `import.meta.url`) resolve. Whole-tree copy
 * keeps this config adapter-agnostic — no manifest, no per-adapter wiring
 * needed when new adapters land. `.ts` source is skipped since it's already
 * bundled into `index.js`.
 */
const copyAdapterAssetsPlugin = (): Plugin => ({
    name: 'copy-adapter-assets',
    async generateBundle() {
        const root = resolve(SDK_DIR, 'adapters');
        const files = await fg('**/*', { cwd: root, ignore: ['**/*.ts'] });
        for (const rel of files) {
            this.emitFile({
                type: 'asset',
                fileName: `adapters/${rel}`,
                source: readFileSync(resolve(root, rel)),
            });
        }
    },
});

export default defineConfig({
    define: {
        // Surfaced in the CLI's `--version` output and in install logs / stamps,
        // so they match the `@frontify/fondue` version the user actually installed.
        __FONDUE_VERSION__: JSON.stringify(pkg.version),
    },
    plugins: [copyAdapterAssetsPlugin(), shebangPlugin()],
    build: {
        // Don't wipe sibling tool outputs already in `dist/`.
        emptyOutDir: false,
        lib: {
            entry: resolve(SDK_DIR, 'cli.ts'),
            name: 'fondue-sdk-cli',
            formats: ['es'],
            fileName: () => 'index.js',
        },
        outDir: 'dist/tools/sdk-cli',
        rollupOptions: {
            external: [/^node:/, 'commander'],
            output: {
                format: 'module',
                entryFileNames: 'index.js',
            },
        },
        target: 'es2022',
        minify: false,
    },
});
