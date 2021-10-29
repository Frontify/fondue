/* (c) Copyright Frontify Ltd., all rights reserved. */

import { defineConfig } from "vite";
import { resolve } from "path";
import { PreRenderedAsset } from "rollup";

export const alias = {
    "@components": resolve(__dirname, "./src/components"),
    "@foundation": resolve(__dirname, "./src/foundation"),
    "@hooks": resolve(__dirname, "./src/hooks"),
    "@utilities": resolve(__dirname, "./src/utilities"),
};

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
            },
        },
    },
});
