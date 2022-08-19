/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resolve } from "path";
import { dependencies, peerDependencies } from "../package.json";
import { alias } from "../vite.config";
import eslint from "vite-plugin-eslint";

export default {
    core: {
        builder: '@storybook/builder-vite',
    },
    stories: ['../src/**/*.stories.tsx'],
    addons: ['storybook-dark-mode', '@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
    staticDirs: ['assets'],
    async viteFinal(config: any) {
        config.resolve.alias = {
            ...config.resolve.alias,
            ...alias,
        };

        config.cacheDir = resolve(__dirname, '../node_modules/.cache/vite');

        config.optimizeDeps = {
            ...(config.optimizeDeps || {}),
            include: [
                '@storybook/addon-actions',
                '@storybook/theming/create',
                ...Object.keys(dependencies),
                ...Object.keys(peerDependencies),
                ...(config.optimizeDeps?.include || []),
            ],
        };
        config.esbuild = {
            logOverride: { 'this-is-undefined-in-esm': 'silent' },
        };

        config.plugins = [
            {
                ...eslint({
                    include: 'src/components/**/*.+(js|ts|tsx)',
                    exclude: 'src/components/RichTextEditor/**/*.+(js|ts|tsx)',
                    emitWarning: true,
                    failOnError: false
                }),
                enforce: 'pre',
            },
            ...config.plugins,
        ];

        return config;
    },
};
