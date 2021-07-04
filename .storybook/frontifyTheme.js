import { create } from '@storybook/theming/create';

export default create({
    base: 'light',

    colorPrimary: '#2d3232',
    colorSecondary: '#825fff',

    // UI
    appBg: 'white',
    appBorderColor: '#EAEBEE',
    appBorderRadius: 4,

    // Typography
    fontBase:
        "'Space Grotesk Frontify', Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    fontCode: 'Menlo, Courier, monospace',

    // Text colors
    textColor: '#2d3232',

    // Toolbar default and active colors
    barTextColor: '#2d3232',
    barSelectedColor: '#2d3232',
    barBg: '#FFFFFF',

    // Form colors
    inputBg: '#FFFFFF',
    inputBorder: '#EAEBEE',
    inputTextColor: '#2d3232',
    inputBorderRadius: 4,

    brandTitle: 'Frontify Storybook',
    brandUrl: 'https://frontify.com',
    brandImage: '/img/logo.svg',
});
