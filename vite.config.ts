/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'path';
import { PreRenderedAsset } from 'rollup';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import istanbul from 'vite-plugin-istanbul';
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
    // these 2 properties were in https://github.com/ifaxity/vite-plugin-istanbul, but they aren't recognised here
    // open: true,
    // port: 3000,
    plugins: [
        dts({ insertTypesEntry: true }),
        istanbul({
            include: 'src/*',
            exclude: ['node_modules', 'test/'],
            extension: ['.js', '.ts', '.vue'],
            // requireEnv: true,
            forceBuildInstrument: true,
            // cypress: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: (format: string) => `[name].${format}.js`,
            name: 'Fondue',
        },
        sourcemap: true,
        minify: false,
        rollupOptions: {
            external: [...dependencies, ...peerDependencies],
            output: [
                {
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    assetFileNames,
                    globals,
                },
                {
                    format: 'umd',
                    assetFileNames,
                    globals,
                },
                {
                    format: 'cjs',
                    assetFileNames,
                    globals,
                },
            ],
        },
    },
});
