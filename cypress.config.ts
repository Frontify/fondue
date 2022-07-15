import { defineConfig } from 'cypress';

export default defineConfig({
    video: false,
    retries: {
        runMode: 2,
    },
    component: {
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.ts');
        },
        viewportHeight: 1280,
        viewportWidth: 800,
        specPattern: ['./src//**/*.cy.tsx', './**/*.spec.ts', './src//**/*.spec.tsx'],
        devServer: {
            framework: 'react',
            bundler: 'vite',
        },
    },
});
