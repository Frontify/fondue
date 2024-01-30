/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'path';
import type { PreRenderedAsset } from 'rollup';
import { build } from 'esbuild';
import { Plugin, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import react from '@vitejs/plugin-react';

import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from '../../packages/fondue/package.json';

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
    'react-dom/client': 'ReactDOMClient',
};

const assetFileNames = (chunkInfo: PreRenderedAsset): string => {
    if (chunkInfo.name === 'style.css') {
        return 'styles.css';
    }
    return chunkInfo.name ?? 'UnknownFileName';
};

export const bundleIconsInDevPlugin = (): Plugin => {
    let command: string;
    return {
        name: 'bundle-icons',
        config(_config, { command: _command }) {
            command = _command;
        },
        async load(id: string) {
            // Only bundle icons when running the dev server.
            if (command === 'serve' && id.endsWith('/Icon/Generated/index.ts')) {
                const { outputFiles } = await build({
                    absWorkingDir: process.cwd(),
                    entryPoints: [id],
                    bundle: true,
                    write: false,
                    platform: 'browser',
                    jsx: 'automatic',
                    format: 'esm',
                    plugins: [
                        {
                            name: 'externals',
                            setup(build) {
                                build.onResolve({ namespace: 'file', filter: /.*/ }, (args) => {
                                    if (args.kind === 'entry-point') {
                                        return null;
                                    }

                                    // If the file is in our icons, use standard resolution.
                                    if (args.path.startsWith('./Icon')) {
                                        return null;
                                    }

                                    // If vendors, mark as external
                                    return {
                                        path: args.path,
                                        external: true,
                                    };
                                });
                            },
                        },
                    ],
                });

                if (!outputFiles || outputFiles.length !== 1) {
                    return null;
                }

                return outputFiles[0].text;
            }
            return null;
        },
    };
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
    plugins: [react(), dts({ insertTypesEntry: true, rollupTypes: true }), bundleIconsInDevPlugin()],
    optimizeDeps: {
        include: ['react/jsx-runtime'],
    },
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            fileName: (format: string) => `[name].${format}.js`,
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: [...dependencies, ...peerDependencies, 'react-dom/client', 'react/jsx-runtime'],
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
