/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type StorybookConfig } from '@storybook/react-vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

export default {
    stories: ['../src/**/*.stories.@(ts|tsx)'],
    addons: ['@storybook/addon-a11y'],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    features: {
        backgrounds: false,
        outline: false,
        measure: false,
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

        return {
            ...config,
            /**
             * Tailwind lives here and nowhere else: the stories use it for their
             * own chrome, while the package itself is styled with SCSS modules.
             * Declaring it in Storybook's config — rather than in a
             * `postcss.config.*` the library build would also pick up — is what
             * keeps utility CSS out of the published bundle. The CSS module
             * options (`rte-<module>__<class>` names) come from `vite.config.ts`
             * untouched.
             */
            css: {
                ...config.css,
                postcss: { plugins: [tailwindcss(), autoprefixer()] },
            },
        };
    },
} satisfies StorybookConfig;
