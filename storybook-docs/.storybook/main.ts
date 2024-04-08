import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        {
            name: "@storybook/addon-essentials",
            options: {
                backgrounds: false,
                outline: false,
                measure: false,
            },
        },
        "@storybook/addon-links",
        "@storybook/addon-interactions",
        "storybook-dark-mode",
        "@storybook/addon-a11y"
    ],
    staticDirs: ["assets"],
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    docs: {
        autodocs: "tag",
        defaultName: "Documentation",
    },
    refs: (config, { configType }) => {
        if (configType === 'DEVELOPMENT') {
            return {
                legacy: {
                    title: 'Legacy',
                    url: 'http://localhost:6006',
                    type: "auto-inject",
                    expanded: true,
                },
                current: {
                    title: 'Current',
                    url: 'http://localhost:6007',
                    type: "auto-inject",
                    expanded: true,
                },
            };
        }
        return {
            legacy: {
                title: 'Legacy',
                url: '/legacy',
                expanded: true,
            },
            current: {
                title: 'Current',
                url: '/new',
                expanded: true,
            },
        }
    }
};
export default config;
