/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

import { peerDependencies as peerDependenciesMap } from './package.json';

const peerDependencies = Object.keys(peerDependenciesMap);

const globals = {
    react: 'React',
    'react/jsx-runtime': 'react/jsx-runtime',
};

export default defineConfig({
    plugins: [react(), tsConfigPaths(), dts({ insertTypesEntry: true, exclude: ['**/*.stories.tsx'] })],
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'FondueIcons',
            formats: ['es'],
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: [...peerDependencies],
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
