/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';
import { configDefaults, defineConfig } from 'vitest/config';

import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from './package.json';

const peerDependencies = Object.keys(peerDependenciesMap);
const dependencies = Object.keys(dependenciesMap);

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
            name: 'FondueComponents',
            formats: ['es'],
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: [...dependencies, ...peerDependencies],
            output: [
                {
                    name: 'FondueComponents',
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    globals,
                },
            ],
        },
    },
    test: {
        environment: 'happy-dom',
        setupFiles: ['./src/setupTests.ts'],
        css: true,
        exclude: [...configDefaults.exclude, 'scripts/templates/**/*.**'],
        coverage: {
            exclude: [
                ...configDefaults.exclude,
                '.storybook',
                'playwright',
                'scripts/templates',
                '.eslintrc.cjs',
                '**.config.{ts,cjs}',
                '**/**/*.{ct,spec,test,stories}.{ts,tsx}',
            ],
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
        },
    },
});
