/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'path';
import { PreRenderedAsset } from 'rollup';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from './package.json';

const peerDependencies = Object.keys(peerDependenciesMap);
const dependencies = Object.keys(dependenciesMap);

export const alias = {
    '@components': resolve(__dirname, './src/components'),
    '@foundation': resolve(__dirname, './src/foundation'),
    '@hooks': resolve(__dirname, './src/hooks'),
    '@layout': resolve(__dirname, './src/layout'),
    '@typography': resolve(__dirname, './src/typography'),
    '@utilities': resolve(__dirname, './src/utilities'),
};

export const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
};

const assetFileNames = (chunkInfo: PreRenderedAsset): string => {
    if (chunkInfo.name === 'style.css') {
        return 'styles.css';
    }
    return chunkInfo.name ?? 'UnknownFileName';
};

export default defineConfig({
    resolve: {
        alias,
    },
    // needs to be defined here, such that it is not undefined in the tests.
    define: {
        'process.env.REACT_APP_SC_ATTR': JSON.stringify(process.env.REACT_APP_SC_ATTR),
        'process.env.SC_ATTR': JSON.stringify(process.env.SC_ATTR),
    },
    plugins: [dts({ insertTypesEntry: true })],
    build: {
        lib: {
            name: 'Fondue',
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: (format: string) => `[name].${format}.js`,
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: [...dependencies, ...peerDependencies],
            output: [
                {
                    name: 'Fondue',
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    assetFileNames,
                    globals,
                },
                {
                    name: 'Fondue',
                    format: 'umd',
                    assetFileNames,
                    globals,
                },
                {
                    name: 'Fondue',
                    format: 'cjs',
                    assetFileNames,
                    globals,
                },
            ],
        },
    },
});
