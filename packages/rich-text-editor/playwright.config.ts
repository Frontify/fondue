/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig, devices } from '@playwright/experimental-ct-react';
import tsConfigPaths from 'vite-tsconfig-paths';

// Tests that drive the browser through the DevTools protocol, which only Chromium has.
const NEEDS_DEVTOOLS_PROTOCOL = /@devtools-protocol/;

// https://playwright.dev/docs/test-configuration
export default defineConfig({
    testDir: './src',
    timeout: 10_000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? '50%' : undefined,
    reporter: 'html',
    testMatch: '**/*.ct.{ts,tsx}',
    use: {
        testIdAttribute: 'data-test-id',
        trace: 'on-first-retry',
        ctPort: 3101,
        ctViteConfig: {
            plugins: [tsConfigPaths()],
            // The bundle ships production-only code paths; the tests want the development warnings.
            define: { 'process.env.NODE_ENV': '"development"' },
        },
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', grepInvert: NEEDS_DEVTOOLS_PROTOCOL, use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', grepInvert: NEEDS_DEVTOOLS_PROTOCOL, use: { ...devices['Desktop Safari'] } },
    ],
});
