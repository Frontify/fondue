import alias from "@rollup/plugin-alias";
import commonJs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { join, resolve } from "path";
import dts from "rollup-plugin-dts";
import esbuild from "rollup-plugin-esbuild";

const rollupConfig = [
    // .d.ts
    {
        input: "src/index.ts",
        plugins: [
            alias({
                entries: [
                    { find: "@elements", replacement: resolve(__dirname, "./src/elements") },
                    { find: "@components", replacement: resolve(__dirname, "./src/components") },
                    { find: "@compositions", replacement: resolve(__dirname, "./src/compositions") },
                    { find: "@utilities", replacement: resolve(__dirname, "./src/utilities") },
                    { find: "@hooks", replacement: resolve(__dirname, "./src/hooks") },
                ],
            }),
            dts(),
        ],
        external: [join(__dirname, "src", "styles.css")],
        output: {
            file: "index.d.ts",
            format: "es",
        },
    },

    // Tailwind config
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
        output: [
            {
                file: "dist/config.umd.js",
                format: "umd",
                name: "ArcadeConfig",
                sourcemap: true,
            },
            {
                file: "dist/config.es.js",
                format: "es",
                sourcemap: true,
            },
        ],
    },
];

module.exports = rollupConfig;
