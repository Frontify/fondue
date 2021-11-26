/* (c) Copyright Frontify Ltd., all rights reserved. */

import alias from "@rollup/plugin-alias";
import commonJs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { join, resolve } from "path";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const rollupConfig = [
    {
        input: "src/index.ts",
        plugins: [
            alias({
                entries: [
                    { find: "@components", replacement: resolve(__dirname, "./src/components") },
                    { find: "@foundation", replacement: resolve(__dirname, "./src/foundation") },
                    { find: "@hooks", replacement: resolve(__dirname, "./src/hooks") },
                    { find: "@utilities", replacement: resolve(__dirname, "./src/utilities") },
                ],
            }),
            dts(),
        ],
        external: [join(__dirname, "src", "styles.css")],
        output: {
            file: "dist/index.d.ts",
            format: "es",
        },
    },
    {
        input: "src/tailwind-config.ts",
        external: ["react", "react-dom"],
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
        ],
        output: {
            file: "dist/config.js",
            format: "es",
            sourcemap: true,
        },
    },
];

module.exports = rollupConfig;
