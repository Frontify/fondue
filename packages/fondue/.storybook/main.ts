/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { UserConfig } from 'vite';
import type { StorybookConfig } from '@storybook/react-vite';
import eslint from 'vite-plugin-eslint';
import ts from 'typescript';

export default <StorybookConfig>{
    framework: '@storybook/react-vite',
    stories: ['../src/**/*.stories.tsx'],
    addons: ['storybook-dark-mode', '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
    staticDirs: ['assets'],
    docs: {
        autodocs: 'tag',
    },
    typescript: {
        reactDocgenTypescriptOptions: {
            componentNameResolver: (expression: ts.Symbol) => expression.getName(),
        },
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
