/* eslint-disable @typescript-eslint/no-var-requires */
const defineConfig = require("vite").defineConfig;
const IconTemplate = require("./src/components/Icon/IconTemplate");
const resolve = require("path").resolve;
const svgr = require("@svgr/rollup").default;
const reactJsx = require("vite-react-jsx").default;

const viteConfig = defineConfig({
    resolve: {
        alias: {
            "@components": resolve(__dirname, "./src/components"),
            "@utilities": resolve(__dirname, "./src/utilities"),
        },
    },
    plugins: [
        reactJsx(),
        svgr({
            memo: true,
            icon: true,
            template: IconTemplate,
            svgProps: {
                className: "{customClassName}",
            },
        }),
    ],
});

module.exports = viteConfig;
