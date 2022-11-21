/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { UserConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default {
    core: {
        builder: '@storybook/builder-vite',
    },
    framework: '@storybook/react-vite',
    stories: ['../src/**/*.stories.tsx'],
    addons: ['storybook-dark-mode', '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
    staticDirs: ['assets'],
    docsPage: {
        docs: 'automatic',
    },
    viteFinal(config: UserConfig) {
        //@ts-ignore
        config.plugins = (config.plugins ?? []).filter((plugin) => plugin?.name !== 'vite:dts');

        config.plugins.unshift({
            ...eslint({
                include: 'src/**/*.(js|ts|tsx)',
                emitWarning: true,
                failOnError: false,
            }),
            enforce: 'pre',
        });

        return config;
    },
};
