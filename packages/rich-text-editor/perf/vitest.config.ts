/* (c) Copyright Frontify Ltd., all rights reserved. */

import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// The Node rows of the performance budgets run as Vitest bench, with the samples kept for the perf script's p95.
export default defineConfig({
    plugins: [tsConfigPaths()],
    test: {
        environment: 'node',
        benchmark: { include: ['src/**/*.bench.ts'], retainSamples: true },
    },
});
