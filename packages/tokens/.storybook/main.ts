/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type StorybookConfig } from '@storybook/react-vite';

const productionPathPrefix = process.env.STORYBOOK_PATH_PREFIX ? `${process.env.STORYBOOK_PATH_PREFIX}tokens/` : '/';

export default {
    stories: ['../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    staticDirs: ['assets'],
    addons: [
        '@etchteam/storybook-addon-status',
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@storybook/addon-docs',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        defaultName: 'Documentation',
    },
    features: {
        backgrounds: false,
        outline: false,
        measure: false,
    },
    managerHead: (head, { configType }) => {
        if (configType === 'PRODUCTION' && process.env.STORYBOOK_PATH_PREFIX) {
            const injections = [
                `<link rel="shortcut icon" type="image/x-icon" href="${productionPathPrefix}favicon.ico">`,
                `<script>window.PREVIEW_URL = '${productionPathPrefix}iframe.html'</script>`,
                `<base href="${productionPathPrefix}">`,
            ];
            return `${head}${injections.join('')}`;
        }

        return head;
    },
    viteFinal(config, { configType }) {
        if (configType === 'PRODUCTION' && process.env.STORYBOOK_PATH_PREFIX) {
            config.base = productionPathPrefix;
        }

        // @ts-expect-error untyped name property
        config.plugins = (config.plugins ?? []).filter((plugin) => plugin?.name !== 'vite:dts');

        if (config.optimizeDeps) {
            config.optimizeDeps.exclude = ['./node_modules/.cache/storybook'];
        }

        return config;
    },
} satisfies StorybookConfig;
