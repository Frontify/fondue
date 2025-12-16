/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type StorybookConfig } from '@storybook/react-vite';

const productionPathPrefix = process.env.STORYBOOK_PATH_PREFIX ? `${process.env.STORYBOOK_PATH_PREFIX}new/` : '/';

const getAbsolutePath = (packageName: string): string => {
    return dirname(fileURLToPath(import.meta.resolve(packageName)));
};

export default {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
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
    features: {
        backgrounds: false,
        outline: false,
        measure: false,
    },
    docs: {
        defaultName: 'Documentation',
    },
    core: {
        disableTelemetry: true,
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

        const mdxReactShimPath = join(getAbsolutePath('@storybook/addon-docs'), 'mdx-react-shim.js');

        return {
            ...config,
            plugins: [
                ...(config.plugins ?? []),
                {
                    name: 'fix-mdx-file-imports',
                    enforce: 'pre',
                    resolveId(source) {
                        if (source.startsWith('file://') && source.includes('mdx-react-shim')) {
                            return mdxReactShimPath;
                        }
                        return null;
                    },
                },
            ],
        };
    },
} satisfies StorybookConfig;
