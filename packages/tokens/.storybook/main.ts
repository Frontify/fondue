/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type StorybookConfig } from '@storybook/react-vite';

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
        if (configType === 'PRODUCTION') {
            return `${head}<script>window.PREVIEW_URL = '/iframe.html'</script>`;
        }

        return head;
    },
    viteFinal(config) {
        // @ts-expect-error untyped name property
        config.plugins = (config.plugins ?? []).filter((plugin) => plugin?.name !== 'vite:dts');

        if (config.optimizeDeps) {
            config.optimizeDeps.exclude = ['./node_modules/.cache/storybook'];
        }

        return config;
    },
} satisfies StorybookConfig;
