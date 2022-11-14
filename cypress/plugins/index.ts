/* (c) Copyright Frontify Ltd., all rights reserved. */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { startDevServer } from '@cypress/vite-dev-server';

export default (on: any, config: any): any => {
    on('dev-server:start', (options: any) => {
        return startDevServer({
            options,
        });
    });

    return config;
};
