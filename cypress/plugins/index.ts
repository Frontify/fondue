/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { resolve } from "path";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import { startDevServer } from "@cypress/vite-dev-server";

export default (on: any, config: any): any => {
    on("dev-server:start", (options: any) => {
        return startDevServer({
            options,
            viteConfig: {
                configFile: resolve(__dirname, "..", "..", "vite.config.ts"),
            },
        });
    });

    return config;
};
