/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig, devices } from '@playwright/test';

// The release smoke run: each fixture app, built from the packed release, opened in a browser.
export default defineConfig({
    testDir: '.',
    testMatch: 'smoke.e2e.ts',
    globalSetup: './setup.ts',
    timeout: 60_000,
    forbidOnly: !!process.env.CI,
    reporter: 'line',
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
