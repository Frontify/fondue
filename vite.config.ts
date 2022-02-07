/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from "vite";
import { peerDependencies as peerDependenciesMap } from "./package.json";
import { resolve } from "path";
import fastGlob from "fast-glob";
import dts from "vite-plugin-dts";

const peerDependencies = Object.keys(peerDependenciesMap);

export const alias = {
    "@components": resolve(__dirname, "./src/components"),
    "@foundation": resolve(__dirname, "./src/foundation"),
    "@hooks": resolve(__dirname, "./src/hooks"),
    "@layout": resolve(__dirname, "./src/layout"),
    "@utilities": resolve(__dirname, "./src/utilities"),
    "@typography": resolve(__dirname, "./src/typography"),
};

export const globals = {
    react: "React",
    "react-dom": "ReactDOM",
};

export const componentsPath = fastGlob.sync(
    [
        "src/foundation/**/index.ts",
        "src/components/**/index.ts",
        "src/hooks/index.ts",
        "src/types/index.ts",
        "src/utilities/index.ts",
    ],
    {
        objectMode: true,
        ignore: ["src/**/*.spec.ts", "src/**/*.spec.tsx", "src/**/*.stories.tsx"],
    },
);

export default defineConfig({
    resolve: {
        alias,
    },
    plugins: [dts({ insertTypesEntry: true })],
    build: {
        sourcemap: true,
        minify: true,
        rollupOptions: {
            input: [...componentsPath.map((element) => element.path), "src/styles.css", "tailwind.config.js"],
            external: peerDependencies,
            output: {
                dir: "dist",
                format: "es",
                globals,
                manualChunks: undefined,
                assetFileNames: "[name].[ext]",
                entryFileNames: "[name].js",
                exports: "named",
                preserveModules: true,
            },
            preserveEntrySignatures: "strict",
        },
    },
});
