/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    plugins: [dts({ insertTypesEntry: true, rollupTypes: true })],
    build: {
        cssCodeSplit: true,
        outDir: './dist/lib',
        lib: {
            // Could also be a dictionary or array of multiple entry points
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
            // the proper extensions will be added
            fileName: 'component-lib',
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['react'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    react: 'React',
                },
                preserveModules: false,
            },
        },
    },
});
