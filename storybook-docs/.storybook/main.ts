/** @type { import('@storybook/react-vite').StorybookConfig } */
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: [
        "../stories/**/*.mdx",
        "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
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
                new: {
                    title: 'New',
                    url: 'http://localhost:6007',
                    type: "auto-inject",
                    expanded: true,
                },
                legacy: {
                    title: 'Legacy',
                    url: 'http://localhost:6006',
                    type: "auto-inject",
                    expanded: true,
                },
            };
        }
        return {
            new: {
                title: 'New',
                url: '/new',
                expanded: true,
            },
            legacy: {
                title: 'Legacy',
                url: '/legacy',
                expanded: true,
            },
        }
    }
};
export default config;
