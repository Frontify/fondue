/* (c) Copyright Frontify Ltd., all rights reserved. */

import type { StorybookConfig } from '@storybook/react-vite';
import ts from 'typescript';

const productionPathPrefix = process.env.STORYBOOK_PATH_PREFIX ? `${process.env.STORYBOOK_PATH_PREFIX}legacy/` : '/';

export default <StorybookConfig>{
    framework: '@storybook/react-vite',
    stories: ['../src/**/*.stories.tsx'],
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
