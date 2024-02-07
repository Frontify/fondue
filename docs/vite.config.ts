/* (c) Copyright Frontify Ltd., all rights reserved. */

import { join } from 'node:path';

import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    resolve: {
        alias: {
            '#contentlayer/generated': join(__dirname, '.contentlayer/generated'),
        },
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    plugins: [react(), vike({ prerender: true })],
});
