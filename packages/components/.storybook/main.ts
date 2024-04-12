import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@etchteam/storybook-addon-status',
        '@storybook/addon-a11y',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-links',
        'storybook-dark-mode',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
        defaultName: 'Documentation',
    },
    viteFinal(config) {
        // @ts-expect-error untyped name property
        config.plugins = (config.plugins ?? []).filter((plugin) => plugin?.name !== 'vite:dts');

        return config;
    },
};

export default config;
