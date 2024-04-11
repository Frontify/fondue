/* (c) Copyright Frontify Ltd., all rights reserved. */

import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import { type UserConfig, defineConfig } from 'vitest/config';

export default defineConfig({
    plugins: [react(), tsConfigPaths()] as UserConfig['plugins'],
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
