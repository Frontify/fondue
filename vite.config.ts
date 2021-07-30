import { defineConfig } from "vite";
import { resolve } from "path";
import reactJsx from "vite-react-jsx";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export const plugins = [reactJsx()];
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
    plugins,
    build: {
        rollupOptions: {
            plugins: [peerDepsExternal()],
        },
    },
});
