/* (c) Copyright Frontify Ltd., all rights reserved. */

import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { type StorybookConfig } from '@storybook/react-vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

const getAbsolutePath = (packageName: string): string => {
    return dirname(fileURLToPath(import.meta.resolve(packageName)));
};

export default {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-a11y', '@storybook/addon-docs'],
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
        // @ts-expect-error untyped name property
        config.plugins = (config.plugins ?? []).filter((plugin) => plugin?.name !== 'vite:dts');

        if (config.optimizeDeps) {
            config.optimizeDeps.exclude = ['./node_modules/.cache/storybook'];
        }

        const mdxReactShimPath = join(getAbsolutePath('@storybook/addon-docs'), 'mdx-react-shim.js');

        return {
            ...config,
            /**
             * Tailwind lives here and nowhere else: the stories use it for their
             * own chrome, while the package itself is styled with SCSS modules.
             * Declaring it in Storybook's config — rather than in a
             * `postcss.config.*` the library build would also pick up — is what
             * keeps utility CSS out of the published bundle.
             */
            css: {
                ...config.css,
                postcss: { plugins: [tailwindcss(), autoprefixer()] },
            },
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
