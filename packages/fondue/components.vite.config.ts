import { defineConfig } from 'vite';

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
    build: {
        lib: {
            entry: 'src/subpackages/components.ts',
            name: 'FondueComponents',
            fileName: 'fondue-components',
        },
        rollupOptions: {
            external: ['@frontify/fondue-components'],
        },
        outDir: 'dist/packages/components'
    }
});
