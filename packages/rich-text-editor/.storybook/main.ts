/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type StorybookConfig } from '@storybook/react-vite';

export default {
    // Lint fixtures named `*.stories.tsx` are not stories.
    stories: ['../src/**/!(__lint-fixtures__)/*.stories.@(ts|tsx)'],
    addons: ['@etchteam/storybook-addon-status', '@storybook/addon-a11y', '@storybook/addon-docs'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        defaultName: 'Documentation',
    },
    core: {
        disableTelemetry: true,
    },
    viteFinal(config) {
        // @ts-expect-error untyped name property
        config.plugins = (config.plugins ?? []).filter((plugin) => plugin?.name !== 'vite:dts');
        return config;
    },
} satisfies StorybookConfig;
