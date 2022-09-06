/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { startDevServer } from '@cypress/vite-dev-server';

export default (on: any, config: any): any => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('@cypress/code-coverage/task')(on, config);
    on('dev-server:start', (options: any) => {
        return startDevServer({
            options,
        });
    });

    return config;
};
