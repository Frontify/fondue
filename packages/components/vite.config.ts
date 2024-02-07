/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react(), dts({ insertTypesEntry: true, rollupTypes: true })],
    build: {
        cssCodeSplit: true,
        outDir: './dist',
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            fileName: 'component-lib',
        },
        rollupOptions: {
            external: ['react'],
            output: {
                globals: {
                    react: 'React',
                },
                preserveModules: false,
            },
        },
    },
});
