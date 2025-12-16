/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type StorybookConfig } from '@storybook/react-vite';

const pathPrefix = process.env.STORYBOOK_PATH_PREFIX || '/';

const getAbsolutePath = (packageName: string): string => {
    return dirname(fileURLToPath(import.meta.resolve(packageName)));
};

const config: StorybookConfig = {
    stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@etchteam/storybook-addon-status',
        '@storybook/addon-docs',
    ],
    staticDirs: ['assets'],
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
    refs: (_config, { configType }) => {
        if (configType === 'DEVELOPMENT') {
            return {
                tokens: {
                    title: 'Tokens',
                    url: 'http://localhost:6005',
                    type: 'auto-inject',
                    expanded: true,
                },
                icons: {
                    title: 'Icons',
                    url: 'http://localhost:6007',
                    type: 'auto-inject',
                    expanded: true,
                },
                current: {
                    title: 'Components',
                    url: 'http://localhost:6006',
                    type: 'auto-inject',
                    expanded: true,
                },
                charts: {
                    title: 'Charts',
                    url: 'http://localhost:6008',
                    type: 'auto-inject',
                    expanded: true,
                },
                legacy: {
                    title: 'Legacy',
                    url: 'http://localhost:6009',
                    type: 'auto-inject',
                    expanded: true,
                },
                rte: {
                    title: 'Rich Text Editor',
                    url: 'http://localhost:6011',
                    type: 'auto-inject',
                    expanded: true,
                },
            };
        }

        return {
            tokens: {
                title: 'Tokens',
                url: `${pathPrefix}tokens/`,
                expanded: true,
            },
            icons: {
                title: 'Icons',
                url: `${pathPrefix}icons`,
                expanded: true,
            },
            current: {
                title: 'Components',
                url: `${pathPrefix}new`,
                expanded: true,
            },
            charts: {
                title: 'Charts',
                url: `${pathPrefix}charts`,
                expanded: true,
            },
            legacy: {
                title: 'Legacy',
                url: `${pathPrefix}legacy`,
                expanded: true,
            },
            rte: {
                title: 'Rich Text Editor',
                url: `${pathPrefix}rte`,
                expanded: true,
            },
        };
    },
    viteFinal: (viteConfig) => {
        const mdxReactShimPath = join(getAbsolutePath('@storybook/addon-docs'), 'mdx-react-shim.js');

        return {
            ...viteConfig,
            plugins: [
                ...(viteConfig.plugins ?? []),
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
