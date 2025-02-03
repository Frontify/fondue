/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        dts({
            rollupTypes: true,
            copyDtsFiles: true,
        }),
    ],
    build: {
        outDir: resolve(__dirname, 'dist/theme'),
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'FondueTokens',
            formats: ['es'],
            fileName: (format) => `fondue-theme-provider.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
        cssCodeSplit: true,
    },
});
