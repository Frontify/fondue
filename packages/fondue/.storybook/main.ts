/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { StorybookConfig } from '@storybook/react-vite';
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
    viteFinal(config) {
        // @ts-expect-error untyped name property
        config.plugins = (config.plugins ?? []).filter((plugin) => plugin?.name !== 'vite:dts');

        return config;
    },
    refs: (config, { configType }) => {
        if (configType === 'DEVELOPMENT') {
            return {
                new: {
                    title: 'New',
                    url: 'http://localhost:6010',
                    type: "auto-inject",
                },
            };
        }
        return {
            new: {
                title: 'New',
                url: 'https://new-fondue-components.netlify.app/',
                expanded: true,
            },
        }
    }
};
