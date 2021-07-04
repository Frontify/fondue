/* (c) Copyright Frontify Ltd., all rights reserved. */

const viteConfig = require("../vite.config");

module.exports = {
    core: {
        builder: "storybook-builder-vite",
    },
    stories: ["../src/components/**/*.stories.tsx"],
    addons: ["@storybook/addon-postcss", "@storybook/addon-links", "@storybook/addon-essentials"],
    async viteFinal(config) {
        config.resolve.alias = {
            ...config.resolve.alias,
            ...viteConfig.resolve.alias,
        };

        config.plugins = [...config.plugins, ...viteConfig.plugins];

        return config;
    },
};
