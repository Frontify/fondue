/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import { build } from 'esbuild';
import { Plugin, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from './package.json';

const peerDependencies = Object.keys(peerDependenciesMap);
// TODO: review this approach to exclude all deps from the final bundles.
// The filtering is used for an hotfix and is a temporary workaround until we have refined how to improve and stabilize the deps building
const dependencies = Object.keys(dependenciesMap)

export const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/client': 'ReactDOMClient',
    'react/jsx-runtime': 'react/jsx-runtime',
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
    // needs to be defined here, such that it is not undefined in the tests.
    define: {
        'process.env.REACT_APP_SC_ATTR': JSON.stringify(process.env.REACT_APP_SC_ATTR),
        'process.env.SC_ATTR': JSON.stringify(process.env.SC_ATTR),
    },
    plugins: [react(), tsConfigPaths(), dts({ insertTypesEntry: true, rollupTypes: true }), bundleIconsInDevPlugin()],
    build: {
        lib: {
            entry: './src/index.ts',
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
                    globals,
                },
                {
                    name: 'Fondue',
                    format: 'umd',
                    globals,
                },
                {
                    name: 'Fondue',
                    format: 'cjs',
                    globals,
                },
            ],
        },
    },
});
