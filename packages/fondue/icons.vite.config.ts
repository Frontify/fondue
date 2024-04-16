import { defineConfig } from 'vite';

/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
    build: {
        lib: {
            entry: 'src/subpackages/icons.ts',
            name: 'FondueIcons',
            fileName: 'fondue-icons',
        },
        rollupOptions: {
            external: ['@frontify/fondue-icons'],
        },
        outDir: 'dist/packages/icons'
    }
});
