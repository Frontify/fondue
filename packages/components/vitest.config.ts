/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        setupFiles: ['./setupTests.ts'],
        css: true,
        coverage: {
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'lcov', 'html'],
            all: false,
        },
    },
});
