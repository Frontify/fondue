/* eslint-disable @typescript-eslint/no-var-requires */
const alias = require("@rollup/plugin-alias");
const dts = require("rollup-plugin-dts").default;
const esbuild = require("rollup-plugin-esbuild");
const nodeResolve = require("@rollup/plugin-node-resolve").nodeResolve;
const commonJs = require("@rollup/plugin-commonjs");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const pkg = require("./package.json");
const postcss = require("rollup-plugin-postcss");
const resolve = require("path").resolve;

const name = pkg.main.replace(/\.js$/, "");

const bundle = (config) => ({
    input: "src/index.ts",
    ...config,
    external: (id) => !/^([./]|@elements|@components|@compositions|@utilities|@hooks)/.test(id),
    plugins: [
        nodeResolve({
            extensions: [".js", ".ts", ".tsx", ".json"],
        }),
        alias({
            entries: [
                { find: "@elements", replacement: resolve(__dirname, "./src/elements") },
                { find: "@components", replacement: resolve(__dirname, "./src/components") },
                { find: "@compositions", replacement: resolve(__dirname, "./src/compositions") },
                { find: "@utilities", replacement: resolve(__dirname, "./src/utilities") },
                { find: "@hooks", replacement: resolve(__dirname, "./src/hooks") },
            ],
        }),
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
            postcss(),
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
    {
        input: "src/tailwind-config.ts",
        plugins: [
            nodeResolve({
                extensions: [".js", ".ts"],
            }),
            commonJs(),
            esbuild({
                include: /\.[jt]s?$/,
                exclude: /node_modules/,
                minify: process.env.NODE_ENV === "production",
            }),
            peerDepsExternal(),
        ],
        output: [
            {
                file: "dist/config.js",
                format: "cjs",
                sourcemap: true,
            },
        ],
    },
];

module.exports = rollupConfig;
