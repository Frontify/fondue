import { defineConfig } from "vite";
import { resolve } from "path";

export const alias = {
    "@elements": resolve(__dirname, "./src/elements"),
    "@components": resolve(__dirname, "./src/components"),
    "@compositions": resolve(__dirname, "./src/compositions"),
    "@utilities": resolve(__dirname, "./src/utilities"),
    "@hooks": resolve(__dirname, "./src/hooks"),
};

export default defineConfig({
    resolve: {
        alias,
    },
    css: {
        postcss: {
            to: resolve(__dirname, "./dist/index.css"),
        },
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
            },
        },
    },
});
