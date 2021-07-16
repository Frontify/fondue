/* eslint-disable @typescript-eslint/no-var-requires */
const defineConfig = require("vite").defineConfig;
const IconTemplate = require("./src/elements/Icon/IconTemplate");
const resolve = require("path").resolve;
const svgr = require("@svgr/rollup").default;
const reactJsx = require("vite-react-jsx").default;

const viteConfig = defineConfig({
    resolve: {
        alias: {
            "@elements": resolve(__dirname, "./src/elements"),
            "@components": resolve(__dirname, "./src/components"),
            "@compositions": resolve(__dirname, "./src/compositions"),
            "@utilities": resolve(__dirname, "./src/utilities"),
            "@hooks": resolve(__dirname, "./src/hooks"),
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
