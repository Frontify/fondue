/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from 'cypress';

export default defineConfig({
    video: false,
    retries: {
        runMode: 2,
    },
    component: {
        setupNodeEvents() {
            return require('./cypress/plugins/index.ts');
        },
        viewportHeight: 1280,
        viewportWidth: 800,
        specPattern: './src/**/*.{spec,cy}.{ts,tsx}',
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
        experimentalSingleTabRunMode: true,
    },
});
