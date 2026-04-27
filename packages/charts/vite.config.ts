/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from './package.json';

const externalCandidates = [
    ...Object.keys(dependenciesMap),
    ...Object.keys(peerDependenciesMap),
    'react-dom/client',
    'react/jsx-runtime',
];
const isExternal = (id: string) =>
    externalCandidates.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));

export const globals = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-dom/client': 'ReactDOMClient',
    'react/jsx-runtime': 'react/jsx-runtime',
};

export default defineConfig({
    plugins: [
        react(),
        tsConfigPaths(),
        dts({ insertTypesEntry: true, rollupTypes: true, exclude: ['**/*.stories.tsx'] }),
    ],
    build: {
        lib: {
            entry: './src/index.ts',
            fileName: (format: string) => `[name].${format}.js`,
            name: 'FondueCharts',
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: isExternal,
            output: [
                {
                    name: 'FondueCharts',
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    globals,
                },
                {
                    name: 'FondueCharts',
                    format: 'umd',
                    globals,
                },
                {
                    name: 'FondueCharts',
                    format: 'cjs',
                    globals,
                },
            ],
        },
    },
    test: {
        environment: 'happy-dom',
        css: true,
        coverage: {
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'lcov'],
            include: ['src/**/*.ts', 'src/**/*.tsx'],
            exclude: ['src/**/test.ts', 'src/**/test.tsx', 'src/**/spec.ts', 'src/**/spec.tsx'],
        },
    },
});
