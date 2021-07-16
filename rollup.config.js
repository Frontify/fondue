/* eslint-disable @typescript-eslint/no-var-requires */
const alias = require("@rollup/plugin-alias");
const dts = require("rollup-plugin-dts").default;
const esbuild = require("rollup-plugin-esbuild");
const IconTemplate = require("./src/components/Icon/IconTemplate");
const nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve;
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const pkg = require("./package.json");
const postcss = require("rollup-plugin-postcss");
const svgr = require("@svgr/rollup").default;
const resolve = require("path").resolve;
const url = require("@rollup/plugin-url");

const name = pkg.main.replace(/\.js$/, "");

const bundle = (config) => ({
    ...config,
    input: "src/index.ts",
    external: (id) => !/^([./]|@components|@utilities|@hooks)/.test(id),
    plugins: [
        nodeResolve({
            extensions: [".js", ".ts", ".tsx", ".json"],
        }),
        alias({
            entries: [
                { find: "@components", replacement: resolve(__dirname, "./src/components") },
                { find: "@utilities", replacement: resolve(__dirname, "./src/utilities") },
                { find: "@hooks", replacement: resolve(__dirname, "./src/hooks") },
            ],
        }),
        url(),
        svgr({
            memo: true,
            icon: true,
            template: IconTemplate,
            svgProps: {
                className: "{customClassName}",
            },
        }),
        postcss(),
        ...config.plugins,
    ],
});

const rollupConfig = [
    bundle({
        plugins: [
            nodeResolve({
                extensions: [".js", ".ts", ".tsx", ".json"],
            }),
            esbuild({
                include: /\.[jt]sx?$/,
                exclude: /node_modules/,
                jsx: "transform",
                jsxFactory: "React.createElement",
                jsxFragment: "React.Fragment",
                minify: process.env.NODE_ENV === "production",
                loaders: {
                    ".json": "json",
                },
            }),
            peerDepsExternal(),
        ],
        output: [
            {
                file: `${name}.js`,
                format: "cjs",
                sourcemap: true,
            },
            {
                file: `${name}.mjs`,
                format: "es",
                sourcemap: true,
            },
        ],
    }),
    bundle({
        plugins: [dts()],
        output: {
            file: `${name}.d.ts`,
            format: "es",
        },
    }),
];

module.exports = rollupConfig;
