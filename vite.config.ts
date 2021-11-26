/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from "vite";
import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from "./package.json";
import { PreRenderedAsset } from "rollup";
import { resolve } from "path";
import fastGlob from "fast-glob";

const dependencies = Object.keys(dependenciesMap);
const peerDependencies = Object.keys(peerDependenciesMap);

const renderVendorChunks = (dependencies: string[]): Record<string, string> => {
    return dependencies.reduce((stack, key) => {
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

const componentsPath = [
    fastGlob.sync(["src/foundation/**/*.ts", "src/foundation/**/[a-zA-Z]*.tsx", "src/components/**/[a-zA-Z]*.tsx"], {
        ignore: ["src/**/*.spec.ts", "src/**/*.spec.tsx", "src/**/*.stories.tsx"],
    }),
    "src/index.ts",
].flat();

export default defineConfig({
    resolve: {
        alias,
    },
    build: {
        sourcemap: true,
        minify: true,
        rollupOptions: {
            input: componentsPath,
            external: peerDependencies,
            output: {
                dir: "dist",
                format: "es",
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                },
                assetFileNames: (assetInfo: PreRenderedAsset): string => {
                    if (assetInfo.name == "style.css") {
                        return "index.css";
                    }
                    return assetInfo.name ?? "unknown";
                },
                manualChunks: {
                    vendor: peerDependencies, // Externals
                    ...renderVendorChunks(dependencies),
                },
                entryFileNames: "[name].js",
                chunkFileNames: "vendors/[name].js",
            },
            preserveEntrySignatures: "strict",
        },
    },
});
