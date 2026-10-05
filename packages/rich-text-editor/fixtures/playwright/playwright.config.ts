import { defineConfig } from '@playwright/experimental-ct-react';

import config from '../../playwright.config';

// The package config, pointed at these fixture specs and at the package's mount template.
export default defineConfig({
    ...config,
    testDir: '.',
    outputDir: '../../test-results/fixtures',
    use: { ...config.use, ctTemplateDir: '../../playwright', ctCacheDir: '../../playwright/.cache/fixtures' },
});
