import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: [
        '@storybook/addon-onboarding',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@chromatic-com/storybook',
        '@storybook/addon-interactions',
    ],
    framework: {
        name: '@storybook/react-vite',
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
    refs: (config, { configType }) => {
        if (configType === 'DEVELOPMENT') {
            return {
                legacy: {
                    title: 'Legacy',
                    url: 'http://localhost:6011',
                },
            };
        }
        return {
            legacy: {
                title: 'Old Storybook',
                url: 'https://your-production-angular-storybook-url',
            },
        }
    }
};
export default config;
