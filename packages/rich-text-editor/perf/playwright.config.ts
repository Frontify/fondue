/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, devices } from '@playwright/experimental-ct-react';
import tsConfigPaths from 'vite-tsconfig-paths';

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

// The browser rows of the performance budgets, which run only here: the component tests of `src` run in the other config.
export default defineConfig({
    testDir: '.',
    testMatch: '**/*.perf.tsx',
    // A row takes 200 samples under a 4x CPU throttle, so a test gets far more time than a component test.
    timeout: 30 * 60 * 1000,
    workers: 1,
    fullyParallel: false,
    retries: 0,
    reporter: 'list',
    use: {
        ctPort: 3102,
        ctTemplateDir: '../playwright',
        ctCacheDir: '.cache',
        ctViteConfig: {
            plugins: [tsConfigPaths({ root: packageRoot })],
            // The production build never calls a Profiler's `onRender`, so React DOM is its profiling build.
            resolve: {
                alias: [
                    { find: /^react-dom\/client$/, replacement: 'react-dom/profiling' },
                    { find: /^react-dom$/, replacement: 'react-dom/profiling' },
                ],
            },
            define: { 'process.env.NODE_ENV': JSON.stringify('production') },
        },
        testIdAttribute: 'data-test-id',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
