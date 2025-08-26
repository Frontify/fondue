/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type StorybookConfig } from '@storybook/react-vite';

const pathPrefix = process.env.STORYBOOK_PATH_PREFIX || '/';

const config: StorybookConfig = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        {
            name: '@storybook/addon-essentials',
            options: {
                backgrounds: false,
                outline: false,
                measure: false,
            },
        },
        '@storybook/addon-links',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',
        '@storybook/addon-storysource',
        '@etchteam/storybook-addon-status',
    ],
    staticDirs: ['assets'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
        defaultName: 'Documentation',
    },
    refs: (_config, { configType }) => {
        if (configType === 'DEVELOPMENT') {
            return {
                tokens: {
                    title: 'Tokens',
                    url: 'http://localhost:6005',
                    type: 'auto-inject',
                    expanded: true,
                },
                icons: {
                    title: 'Icons',
                    url: 'http://localhost:6007',
                    type: 'auto-inject',
                    expanded: true,
                },
                current: {
                    title: 'Components',
                    url: 'http://localhost:6006',
                    type: 'auto-inject',
                    expanded: true,
                },
                charts: {
                    title: 'Charts',
                    url: 'http://localhost:6008',
                    type: 'auto-inject',
                    expanded: true,
                },
                legacy: {
                    title: 'Legacy',
                    url: 'http://localhost:6009',
                    type: 'auto-inject',
                    expanded: true,
                },
            };
        }

        return {
            tokens: {
                title: 'Tokens',
                url: `${pathPrefix}tokens/`,
                expanded: true,
            },
            icons: {
                title: 'Icons',
                url: `${pathPrefix}icons`,
                expanded: true,
            },
            current: {
                title: 'Components',
                url: `${pathPrefix}new`,
                expanded: true,
            },
            charts: {
                title: 'Charts',
                url: `${pathPrefix}charts`,
                expanded: true,
            },
            legacy: {
                title: 'Legacy',
                url: `${pathPrefix}legacy`,
                expanded: true,
            },
        };
    },
};

export default config;
