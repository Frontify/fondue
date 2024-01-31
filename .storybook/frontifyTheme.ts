//@ts-ignore
import { create } from '@storybook/theming/create';

export const light = create({
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
    brandImage: '/img/logo-charcoal.svg',
});

export const dark = create({
    base: 'dark',

    colorPrimary: '#fafafa',
    colorSecondary: '#825fff',

    // UI
    appBg: '#1a1c1c',
    appBorderColor: '#424747',
    appBorderRadius: 4,

    // Typography
    fontBase:
        "'Space Grotesk Frontify', Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'",
    fontCode: 'Menlo, Courier, monospace',

    // Text colors
    textColor: '#fafafa',

    // Toolbar default and active colors
    barTextColor: '#fafafa',
    barSelectedColor: '#fafafa',
    barBg: '#1a1d1d',

    // Form colors
    inputBg: '#1a1c1c',
    inputBorder: '#424747',
    inputTextColor: '#fafafa',
    inputBorderRadius: 4,

    brandTitle: 'Frontify Storybook',
    brandUrl: 'https://frontify.com',
    brandImage: '/img/logo-white.svg',
});
