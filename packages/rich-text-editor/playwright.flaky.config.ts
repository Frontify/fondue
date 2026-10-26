/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from '@playwright/test';

// Proves that under `CI=1` the run reports the fixture as flaky and exits non-zero. Never part of the component test run.
export default defineConfig({
    testDir: './playwright/flaky',
    // Not `*.spec.ts`, which Vitest would collect.
    testMatch: '*.fixture.ts',
    retries: process.env.CI ? 2 : 0,
    failOnFlakyTests: !!process.env.CI,
    reporter: 'line',
    projects: [{ name: 'chromium' }],
});
