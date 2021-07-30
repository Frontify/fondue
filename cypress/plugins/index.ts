import { resolve } from "path";
import { startDevServer } from "@cypress/vite-dev-server";

export default (on) => {
    on("dev-server:start", (options) => {
        return startDevServer({
            options,
            viteConfig: {
                configFile: resolve(__dirname, "..", "..", "vite.config.ts"),
            },
        });
    });
};
