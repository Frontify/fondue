/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import { type Plugin, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsConfigPaths from 'vite-tsconfig-paths';

import { peerDependencies as peerDependenciesMap } from './package.json';

const externalCandidates = [...Object.keys(peerDependenciesMap)];
const matchesExternalCandidate = (id: string) =>
    externalCandidates.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));

const STYLE_FILE = /\.(css|scss|sass|less|styl)(\?|$)/;

const externalizeJsDeps = (): Plugin => ({
    name: 'externalize-js-deps',
    enforce: 'pre',
    apply: (config, env) => env.command === 'build' && config.build?.lib !== undefined,
    async resolveId(id, importer, options) {
        if (!matchesExternalCandidate(id)) {
            return null;
        }
        const resolved = await this.resolve(id, importer, { ...options, skipSelf: true });

        if (resolved && STYLE_FILE.test(resolved.id)) {
            return resolved;
        }

        return { id, external: true };
    },
});

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
        externalizeJsDeps(),
    ],
    build: {
        lib: {
            entry: './src/index.ts',
            name: 'FondueNewRte',
            formats: ['es'],
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            output: [
                {
                    name: 'FondueNewRte',
                    format: 'es',
                    preserveModules: true,
                    preserveModulesRoot: 'src',
                    globals,
                },
            ],
        },
    },
});
