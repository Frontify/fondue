/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from "vite";
import { alias, globals } from "./vite.config";
import { resolve } from "path";
import { PreRenderedAsset } from "rollup";

export default defineConfig({
    resolve: {
        alias,
    },
    build: {
        sourcemap: true,
        minify: false,
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "Arcade",
            fileName: (format: string): string => `index.${format}.js`,
        },
        rollupOptions: {
            external: ["react", "react-dom"],
            output: {
                globals,
                assetFileNames: (assetInfo: PreRenderedAsset): string => {
                    if (assetInfo.name == "style.css") {
                        return "index.css";
                    }
                    return assetInfo.name ?? "unknown";
                },
            },
        },
    },
});
