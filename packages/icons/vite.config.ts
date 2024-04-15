/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import vitePluginExternal from 'vite-plugin-external';
import tsConfigPaths from 'vite-tsconfig-paths';

import { peerDependencies as peerDependenciesMap } from './package.json';

export const globals = {
    react: 'React',
    'react/jsx-runtime': 'react/jsx-runtime',
};

export default defineConfig({
    plugins: [
        react(),
        tsConfigPaths(),
        vitePluginExternal({
            nodeBuiltins: true,
            externalizeDeps: Object.keys(peerDependenciesMap),
        }),
        dts({ insertTypesEntry: true, exclude: ['**/*.stories.tsx'] }),
    ],
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'FondueIcons',
            formats: ['es'],
        },
        sourcemap: true,
        minify: true,
    },
});
