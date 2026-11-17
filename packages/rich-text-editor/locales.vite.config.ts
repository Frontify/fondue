/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readdirSync } from 'node:fs';
import { basename, resolve } from 'node:path';

import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const localesDir = resolve(__dirname, 'src/locales');
const SOURCE_EXTENSION = '.ts';
/** The files beside the locales that are no locale of their own. */
const NOT_A_LOCALE: ReadonlySet<string> = new Set(['index.ts', 'types.ts']);
const localeEntries = Object.fromEntries(
    readdirSync(localesDir)
        .filter((file) => file.endsWith(SOURCE_EXTENSION) && !NOT_A_LOCALE.has(file))
        .map((file) => [basename(file, SOURCE_EXTENSION), resolve(localesDir, file)]),
);

export default defineConfig({
    plugins: [
        dts({
            outDir: 'dist/locales',
            entryRoot: 'src/locales',
            include: ['src/locales'],
            exclude: ['**/*.spec.ts'],
        }),
    ],
    build: {
        outDir: 'dist/locales',
        emptyOutDir: false,
        sourcemap: true,
        minify: true,
        lib: {
            entry: {
                index: resolve(localesDir, 'index.ts'),
                ...localeEntries,
            },
            formats: ['es'],
        },
        rollupOptions: {
            output: {
                entryFileNames: '[name].js',
                chunkFileNames: 'chunks/[name]-[hash].js',
            },
        },
    },
});
