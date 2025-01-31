/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [
        react(),
        cssInjectedByJsPlugin(),
        dts({
            rollupTypes: true,
            include: ['src/components/ThemeProvider'],
            copyDtsFiles: true,
        }),
    ],
    build: {
        outDir: resolve(__dirname, 'dist/theme'),
        lib: {
            entry: resolve(__dirname, 'src/components/ThemeProvider/ThemeProvider.tsx'), // Your entry file
            name: 'FondueTheme', // Global variable name when used in browser
            formats: ['es'],
            fileName: (format) => `fondue-theme.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom'], // Don't bundle React
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
