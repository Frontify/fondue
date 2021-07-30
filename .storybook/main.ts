/* (c) Copyright Frontify Ltd., all rights reserved. */

//@ts-ignore
import { alias, plugins } from "../vite.config";

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
        config.resolve.alias = {
            ...config.resolve.alias,
            ...alias,
        };

        config.plugins = [...config.plugins, ...plugins];

        return config;
    },
};
