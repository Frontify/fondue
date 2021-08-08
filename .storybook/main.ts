/* (c) Copyright Frontify Ltd., all rights reserved. */

//@ts-ignore
import { alias, plugins } from "../vite.config";
import { peerDependencies, dependencies } from "../package.json";
import { resolve } from "path";

const reactAria = [
    "@react-aria/checkbox",
    "@react-aria/focus",
    "@react-aria/radio",
    "@react-aria/visually-hidden",
    "@react-stately/collections",
    "@react-stately/radio",
    "@react-stately/toggle",
    "@react-stately/tree",
];

export default {
    core: {
        builder: "storybook-builder-vite",
    },
    stories: [
        "../src/elements/**/*.stories.tsx",
        "../src/components/**/*.stories.tsx",
        "../src/compositions/**/*.stories.tsx",
    ],
    addons: [
        "storybook-dark-mode",
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        {
            name: "@storybook/addon-postcss",
            options: {
                postcssLoaderOptions: {
                    implementation: require("postcss"),
                },
            },
        },
    ],
    async viteFinal(config: any) {
        return {
            ...config,
            resolve: { alias },
            cacheDir: resolve(__dirname, "../node_modules/.cache/vite"),
            plugins: [...config.plugins, ...plugins],
            optimizeDeps: {
                ...(config.optimizeDeps || {}),
                include: [
                    ...Object.keys(peerDependencies),
                    ...Object.keys(dependencies),
                    ...reactAria,
                    ...(config.optimizeDeps?.include || {}),
                ],
            },
        };
    },
};
