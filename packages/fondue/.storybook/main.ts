/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { StorybookConfig } from '@storybook/react-vite';
import ts from 'typescript';

export default <StorybookConfig>{
    framework: '@storybook/react-vite',
    stories: ['../src/components/DatePicker/**/*.stories.tsx'],
    addons: [
        '@etchteam/storybook-addon-status',
        '@storybook/addon-a11y',
        '@storybook/addon-essentials',
        '@storybook/addon-links',
        'storybook-dark-mode',
    ],
    staticDirs: ['assets'],
    docs: {
        autodocs: 'tag',
    },
    typescript: {
        reactDocgenTypescriptOptions: {
            componentNameResolver: (expression: ts.Symbol) => expression.getName(),
        },
    },
    viteFinal(config) {
        // @ts-expect-error untyped name property
        config.plugins = (config.plugins ?? []).filter((plugin) => plugin?.name !== 'vite:dts');

        return config;
    },
};
