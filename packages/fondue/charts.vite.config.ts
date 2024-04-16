import { defineConfig } from 'vite';

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
    build: {
        lib: {
            entry: 'src/subpackages/charts.ts',
            name: 'FondueCharts',
            fileName: 'fondue-charts',
        },
        rollupOptions: {
            external: ['@frontify/fondue-charts'],
        },
        outDir: 'dist/packages/charts'
    }
});
