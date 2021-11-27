/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from "vite";
import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from "./package.json";
import { resolve } from "path";
import fastGlob from "fast-glob";
import dts from "vite-plugin-dts";

const dependencies = Object.keys(dependenciesMap);
const peerDependencies = Object.keys(peerDependenciesMap);

const renderVendorChunks = (dependencies: string[]): Record<string, string[]> => {
    return dependencies.reduce((stack: Record<string, string[]>, key: string) => {
        if (!peerDependencies.includes(key)) {
            stack[key] = [key];
        }

        return stack;
    }, {});
};

export const alias = {
    "@components": resolve(__dirname, "./src/components"),
    "@foundation": resolve(__dirname, "./src/foundation"),
    "@hooks": resolve(__dirname, "./src/hooks"),
    "@utilities": resolve(__dirname, "./src/utilities"),
};

export const globals = {
    react: "React",
    "react-dom": "ReactDOM",
};

export const componentsPath = fastGlob.sync(
    ["src/foundation/**/*.ts", "src/foundation/**/[a-zA-Z]*.tsx", "src/components/**/[a-zA-Z]*.tsx"],
    { ignore: ["src/**/*.spec.ts", "src/**/*.spec.tsx", "src/**/*.stories.tsx"] },
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
            input: [...componentsPath, "src/styles.css"],
            external: peerDependencies,
            output: {
                dir: "dist",
                format: "es",
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
                manualChunks: {
                    vendor: peerDependencies, // Externals
                    ...renderVendorChunks(dependencies),
                },
                assetFileNames: "[name].[ext]",
                entryFileNames: "[name].js",
                chunkFileNames: "vendors/[name].js",
                exports: "named",
            },
            preserveEntrySignatures: "strict",
        },
    },
});
