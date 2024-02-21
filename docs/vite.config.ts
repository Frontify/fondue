/* (c) Copyright Frontify Ltd., all rights reserved. */

import { join, resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '#contentlayer/generated': resolve(__dirname, '.contentlayer/generated'),
            '#': resolve(__dirname, './src'),
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: [react(), vike({ prerender: true })],
});
