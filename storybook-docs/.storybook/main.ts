/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type StorybookConfig } from '@storybook/react-vite';

const pathPrefix = process.env.STORYBOOK_PATH_PREFIX || '/';

const getAbsolutePath = (packageName: string): string => {
    return dirname(fileURLToPath(import.meta.resolve(packageName)));
};

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
                url: `http://${process.env.URL_PREFIX ? `${process.env.URL_PREFIX}.` : ''}tokens.ffy-fondue.test/`,
                expanded: true,
            },
            icons: {
                title: 'Icons',
                url: `http://${process.env.URL_PREFIX ? `${process.env.URL_PREFIX}.` : ''}icons.ffy-fondue.test/`,
                expanded: true,
            },
            current: {
                title: 'Components',
                url: `http://${process.env.URL_PREFIX ? `${process.env.URL_PREFIX}.` : ''}components.ffy-fondue.test/`,
                expanded: true,
            },
            charts: {
                title: 'Charts',
                url: `http://${process.env.URL_PREFIX ? `${process.env.URL_PREFIX}.` : ''}charts.ffy-fondue.test/`,
                expanded: true,
            },
            legacy: {
                title: 'Legacy',
                url: `http://${process.env.URL_PREFIX ? `${process.env.URL_PREFIX}.` : ''}legacy.ffy-fondue.test/`,
                expanded: true,
            },
            rte: {
                title: 'Rich Text Editor',
                url: `http://${process.env.URL_PREFIX ? `${process.env.URL_PREFIX}.` : ''}rte.ffy-fondue.test/`,
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
