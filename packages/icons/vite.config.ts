/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

import { peerDependencies as peerDependenciesMap } from './package.json';

const externalCandidates = [...Object.keys(peerDependenciesMap), 'react/jsx-runtime'];
const isExternal = (id: string) =>
    externalCandidates.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));

const globals = {
    react: 'React',
    'react/jsx-runtime': 'react/jsx-runtime',
};

export default defineConfig({
    plugins: [react(), tsConfigPaths(), dts({ insertTypesEntry: true, exclude: ['**/*.stories.tsx'] })],
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler',
            },
        },
    },
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'FondueIcons',
            formats: ['es'],
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: isExternal,
            output: [
                {
                    name: 'FondueIcons',
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    globals,
                },
            ],
        },
    },
});
