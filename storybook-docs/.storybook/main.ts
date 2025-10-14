/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type StorybookConfig } from '@storybook/react-vite';

const pathPrefix = process.env.STORYBOOK_PATH_PREFIX || '/';

const config: StorybookConfig = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
    addons: [
        '@vueless/storybook-dark-mode',
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@etchteam/storybook-addon-status',
        '@storybook/addon-docs',
    ],
    staticDirs: ['assets'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    features: {
        backgrounds: false,
        outline: false,
        measure: false,
    },
    docs: {
        defaultName: 'Documentation',
    },
    core: {
        disableTelemetry: true,
    },
    refs: (_config, { configType }) => {
        if (configType === 'DEVELOPMENT') {
            return {
                current: {
                    title: 'Current',
                    url: 'http://localhost:6006',
                    type: 'auto-inject',
                    expanded: true,
                },
                icons: {
                    title: 'Icons',
                    url: 'http://localhost:6007',
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
            current: {
                title: 'Current',
                url: `${pathPrefix}new`,
                expanded: true,
            },
            icons: {
                title: 'Icons',
                url: `${pathPrefix}icons`,
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
