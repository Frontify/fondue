/* (c) Copyright Frontify Ltd., all rights reserved. */

//@ts-ignore
const { alias } = require("../vite.config");
const { dependencies, peerDependencies } = require("../package.json");
const { resolve } = require("path");

module.exports = {
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
        "@storybook/addon-postcss",
    ],
    async viteFinal(config: any) {
        config.resolve.alias = {
            ...config.resolve.alias,
            ...alias,
        };

        config.cacheDir = resolve(__dirname, "../node_modules/.cache/vite");

        config.optimizeDeps = {
            ...(config.optimizeDeps || {}),
            include: [
                "@storybook/addon-actions",
                "@storybook/theming/create",
                "react-color/lib/helpers/color",
                "react-color/lib/components/common",
                ...Object.keys(dependencies),
                ...Object.keys(peerDependencies),
                ...(config.optimizeDeps?.include || []),
            ],
        };

        return config;
    },
};
