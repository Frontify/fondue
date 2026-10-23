/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type StorybookConfig } from '@storybook/react-vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import tsConfigPaths from 'vite-tsconfig-paths';

const getAbsolutePath = (packageName: string): string => {
    return dirname(fileURLToPath(import.meta.resolve(packageName)));
};

const storybookDir = dirname(fileURLToPath(import.meta.url));
const packagesRoot = resolve(storybookDir, '../../packages');
const packagePath = (...segments: string[]): string => join(packagesRoot, ...segments);

const getSubpackageURL = (subpackage: string): string => {
    if (process.env.CONTEXT === 'deploy-preview' && process.env.REVIEW_ID) {
        return `https://deploy-preview-${process.env.REVIEW_ID}.${subpackage}.fondue-components.frontify.com/`;
    } else {
        return `https://${subpackage}.fondue-components.frontify.com/`;
    }
};

const config: StorybookConfig = {
    // Story files carry their full sidebar path in `title`; the order lives in `storySort` in preview.tsx.
    stories: [
        '../stories/**/*.mdx',
        '../stories/**/*.stories.@(ts|tsx)',
        '../../packages/tokens/stories/**/*.stories.@(ts|tsx)',
        '../../packages/icons/src/**/*.stories.@(ts|tsx)',
        '../../packages/components/src/**/*.stories.@(ts|tsx)',
        '../../packages/charts/src/**/*.stories.@(ts|tsx)',
        '../../packages/rich-text-editor/src/**/*.mdx',
        '../../packages/rich-text-editor/src/**/*.stories.@(ts|tsx)',
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-a11y',
        '@etchteam/storybook-addon-status',
        '@storybook/addon-docs',
    ],
    staticDirs: ['assets', '../static'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    features: {
        backgrounds: false,
        outline: false,
        measure: false,
        experimentalCodeExamples: true,
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
                rte: {
                    title: 'Rich Text Editor',
                    url: 'http://localhost:6011',
                    type: 'auto-inject',
                    expanded: true,
                },
            };
        }

        return {
            rte: {
                title: 'Rich Text Editor',
                url: `${getSubpackageURL('rte')}`,
                expanded: true,
            },
        };
    },
    viteFinal: (viteConfig) => {
        const mdxReactShimPath = join(getAbsolutePath('@storybook/addon-docs'), 'mdx-react-shim.js');

        return {
            ...viteConfig,
            resolve: {
                ...viteConfig.resolve,
                alias: [
                    // Stories that import the published entry render the same copy of the
                    // components as the ones imported from source, so they share one ThemeProvider.
                    {
                        find: /^@frontify\/fondue-components$/,
                        replacement: packagePath('components/src/index.ts'),
                    },
                    {
                        find: /^@frontify\/fondue-components\/locales$/,
                        replacement: packagePath('components/src/locales/index.ts'),
                    },
                ],
            },
            css: {
                ...viteConfig.css,
                preprocessorOptions: {
                    scss: {
                        api: 'modern-compiler',
                    },
                },
                postcss: {
                    plugins: [tailwindcss(join(storybookDir, 'tailwind.config.ts')), autoprefixer()],
                },
            },
            plugins: [
                ...(viteConfig.plugins ?? []),
                // Resolves each package's own aliases (`#/`, `#storybook/`, `@components/`).
                tsConfigPaths({
                    root: packagesRoot,
                    projects: ['components/tsconfig.json', 'charts/tsconfig.json', 'rich-text-editor/tsconfig.json'],
                }),
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
