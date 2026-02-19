/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type StorybookConfig } from '@storybook/react-vite';

const getAbsolutePath = (packageName: string): string => {
    return dirname(fileURLToPath(import.meta.resolve(packageName)));
};

const domain = process.env.STORYBOOK_DOMAIN ?? 'ffy-fondue.test';
const prefix = process.env.URL_PREFIX ? `${process.env.URL_PREFIX}.` : '';

const buildRefUrl = (subdomain: string): string => `http://${prefix}${subdomain}.${domain}/`;

const config: StorybookConfig = {
    stories: ['../stories/**/*.mdx'],
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
        console.log('[storybook refs]', {
            configType,
            URL_PREFIX: process.env.URL_PREFIX,
            STORYBOOK_DOMAIN: process.env.STORYBOOK_DOMAIN,
            domain,
            prefix,
            exampleUrl: buildRefUrl('components'),
        });

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
                url: buildRefUrl('tokens'),
                expanded: true,
            },
            icons: {
                title: 'Icons',
                url: buildRefUrl('icons'),
                expanded: true,
            },
            current: {
                title: 'Components',
                url: buildRefUrl('components'),
                expanded: true,
            },
            charts: {
                title: 'Charts',
                url: buildRefUrl('charts'),
                expanded: true,
            },
            legacy: {
                title: 'Legacy',
                url: buildRefUrl('legacy'),
                expanded: true,
            },
            rte: {
                title: 'Rich Text Editor',
                url: buildRefUrl('rte'),
                expanded: true,
            },
        };
    },
    managerHead: (head, { configType }) => {
        if (configType === 'PRODUCTION') {
            return `${head}<script>window.PREVIEW_URL = '/iframe.html'</script>`;
        }

        return head;
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
