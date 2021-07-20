/* (c) Copyright Frontify Ltd., all rights reserved. */

const viteConfig = require("../vite.config");

module.exports = {
    core: {
        builder: "storybook-builder-vite",
    },
    stories: ["../src/components/**/*.stories.tsx"],
    addons: [
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
    async viteFinal(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            ...viteConfig.resolve.alias,
        };

        config.plugins = [...config.plugins, ...viteConfig.plugins];

        return config;
    },
};
