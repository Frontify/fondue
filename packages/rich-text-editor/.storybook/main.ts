/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type StorybookConfig } from '@storybook/react-vite';

const getAbsolutePath = (packageName: string): string => {
    return dirname(fileURLToPath(import.meta.resolve(packageName)));
};

const config: StorybookConfig = {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
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
    viteFinal(config) {
        const mdxReactShimPath = join(getAbsolutePath('@storybook/addon-docs'), 'mdx-react-shim.js');
        const plugins = (config.plugins ?? []).filter((plugin) => {
            if (plugin === null || plugin === undefined || plugin === false || Array.isArray(plugin)) {
                return true;
            }
            if (typeof plugin !== 'object' || !('name' in plugin)) {
                return true;
            }
            return plugin.name !== 'vite:dts';
        });

        return {
            ...config,
            plugins: [
                ...plugins,
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
};

export default config;
