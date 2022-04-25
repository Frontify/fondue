/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from "vite";
import { PreRenderedAsset } from "rollup";
import { dependencies as dependenciesMap, peerDependencies as peerDependenciesMap } from "./package.json";
import { resolve } from "path";
import dts from "vite-plugin-dts";

const peerDependencies = Object.keys(peerDependenciesMap);
const dependencies = Object.keys(dependenciesMap);

export const alias = {
    "@components": resolve(__dirname, "./src/components"),
    "@foundation": resolve(__dirname, "./src/foundation"),
    "@hooks": resolve(__dirname, "./src/hooks"),
    "@layout": resolve(__dirname, "./src/layout"),
    "@typography": resolve(__dirname, "./src/typography"),
    "@utilities": resolve(__dirname, "./src/utilities"),
};

export const globals = {
    react: "React",
    "react-dom": "ReactDOM",
};

// eslint-disable-next-line import/no-default-export
export default defineConfig({
    resolve: {
        alias,
    },
    plugins: [dts({ insertTypesEntry: true })],
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            fileName: (format: string) => `index.${format}.js`,
            formats: ["es", "umd", "cjs"],
            name: "Arcade",
        },
        sourcemap: true,
        minify: true,
        rollupOptions: {
            external: [...dependencies, ...peerDependencies],
            output: {
                assetFileNames: (chunkInfo: PreRenderedAsset): string => {
                    if (chunkInfo.name === "style.css") {
                        return "styles.css";
                    }
                    return chunkInfo.name ?? "UnknownFileName";
                },
                globals,
            },
        },
    },
});
