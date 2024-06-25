/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { StorybookConfig } from '@storybook/react-vite';

const productionPathPrefix = process.env.STORYBOOK_PATH_PREFIX ? `${process.env.STORYBOOK_PATH_PREFIX}new/` : '/';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    staticDirs: ['assets'],
    addons: [
        '@etchteam/storybook-addon-status',
        '@storybook/addon-a11y',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
        'storybook-dark-mode',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
        defaultName: 'Documentation',
    },
    managerHead: (head, { configType }) => {
        if (configType === 'PRODUCTION') {
            const injections = [
                `<link rel="shortcut icon" type="image/x-icon" href="${productionPathPrefix}favicon.ico">`,
                `<script>window.PREVIEW_URL = '${productionPathPrefix}iframe.html'</script>`,
            ];
            return `${head}${injections.join('')}`;
        }

        return head;
    },
    viteFinal(config, { configType }) {
        if (configType === 'PRODUCTION') {
            config.base = productionPathPrefix;
        }

        // @ts-expect-error untyped name property
        config.plugins = (config.plugins ?? []).filter((plugin) => plugin?.name !== 'vite:dts');

        return config;
    },
};

export default config;
