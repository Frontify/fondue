/* (c) Copyright Frontify Ltd., all rights reserved. */

import commonJs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import esbuild from "rollup-plugin-esbuild";

const rollupConfig = [
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
            format: "umd",
            name: "ArcadeConfig",
            sourcemap: true,
        },
    },
];

module.exports = rollupConfig;
