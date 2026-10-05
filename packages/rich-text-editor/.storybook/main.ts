/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type StorybookConfig } from '@storybook/react-vite';

export default {
    // Lint fixtures named `*.stories.tsx` are not stories.
    stories: ['../src/**/!(__lint-fixtures__)/*.stories.@(ts|tsx)'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
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
