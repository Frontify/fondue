/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig, devices } from '@playwright/experimental-ct-react';
import tsConfigPaths from 'vite-tsconfig-paths';

// The policy the CT page is served under: no inline script, `eval` or foreign origin (quality AC-032).
const CONTENT_SECURITY_POLICY =
    "default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob:; connect-src 'self'";

// https://playwright.dev/docs/test-configuration
export default defineConfig({
    testDir: './src',
    // Editing tests type, select and wait for overlays, so they get more time than `packages/components`.
    timeout: 20_000,
    fullyParallel: true,
    snapshotPathTemplate: './src/{testFileDir}/__snapshots__/{testFileName}/{arg}-{projectName}{ext}',
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    failOnFlakyTests: !!process.env.CI,
    workers: process.env.CI ? '50%' : undefined,
    reporter: 'html',
    testMatch: '**/*.ct.{ts,tsx}',
    use: {
        trace: 'on-first-retry',
        ctPort: 3101,
        ctViteConfig: {
            plugins: [tsConfigPaths()],
            define: { 'process.env.NODE_ENV': JSON.stringify('development') },
            preview: { headers: { 'Content-Security-Policy': CONTENT_SECURITY_POLICY } },
        },
        testIdAttribute: 'data-test-id',
    },
    expect: {
        toHaveScreenshot: {
            maxDiffPixelRatio: 0.02, // Allow up to 2% of pixels to be different
        },
    },
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
});
