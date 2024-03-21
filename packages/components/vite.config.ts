/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vitest/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import pkg from './package.json';

const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react/jsx-runtime': 'jsxRuntime',
};

export default defineConfig({
    plugins: [
        react(),
        dts({
            compilerOptions: {
                sourceMap: true,
            },
            exclude: ['**/*.stories.*', '**/*.test.*', '**/*.spec.*', '**/*.ct.*', '**/__tests__/**', '**/*.mdx'],
        }),
    ],
    build: {
        lib: {
            entry: join(__dirname, 'src/index.ts'),
            fileName: (format) => `[name].${format}.js`,
        },
        minify: false,
        sourcemap: true,
        rollupOptions: {
            external: [
                ...Object.keys(pkg.peerDependencies ?? {}),
                ...Object.keys(pkg.dependencies ?? {}),
                'react/jsx-runtime',
            ],
            output: [
                {
                    format: 'es',
                    name: 'FondueUI',
                    preserveModulesRoot: join(__dirname, 'src'),
                    preserveModules: true,
                    globals,
                },
                {
                    format: 'umd',
                    name: 'FondueUI',
                    globals,
                },
            ],
        },
    },
});
