/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { startDevServer } from '@cypress/vite-dev-server';
const path = require('path');

export default (on: any, config: any): any => {
    require('@cypress/code-coverage/task')(on, config);
    on('dev-server:start', (options: any) => {
        return startDevServer({
            options,
            viteConfig: {
                configFile: path.resolve(__dirname, 'vite.config.ts'),
            },
        });
    });

    return config;
};
