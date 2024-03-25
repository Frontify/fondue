/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  refs: (config, { configType }) => {
    if (configType === 'DEVELOPMENT') {
        return {
            new: {
                title: 'New',
                url: 'http://localhost:6010',
                type: "auto-inject",
                expanded: true,
            },
        };
    }
    return {
        new: {
            title: 'New',
            url: '/new',
            expanded: true,
        },
    }
}
};
export default config;
