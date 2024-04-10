/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { UserConfig, defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react({
        babel: {
            plugins: [
                'babel-plugin-macros',
                [
                    '@emotion/babel-plugin-jsx-pragmatic',
                    {
                        export: 'jsx',
                        import: '__cssprop',
                        module: '@emotion/react',
                    },
                ],
                [
                    '@babel/plugin-transform-react-jsx',
                    { pragma: '__cssprop' },
                    'twin.macro',
                ],
            ],
        },
    }), tsConfigPaths()] as UserConfig["plugins"],
    test: {
        environment: 'happy-dom',
        setupFiles: ['./src/setupTests.ts'],
        css: true,
        coverage: {
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            all: false,
        },
    },
});
