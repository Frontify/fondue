/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { startDevServer } = require("@cypress/vite-dev-server");

module.exports = (on) => {
    on("dev-server:start", (options) => {
        return startDevServer({
            options,
            viteConfig: {
                configFile: path.resolve(__dirname, "..", "..", "vite.config.js"),
            },
        });
    });
};
