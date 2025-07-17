/* (c) Copyright Frontify Ltd., all rights reserved. */

import { create } from '@storybook/theming/create';

export const dark = create({
    base: 'dark',

    // colorPrimary: 'rgba(215, 215, 208, 1)',
    // colorSecondary: 'rgba(224, 107, 253, 1)',

    // // UI
    // appBg: 'rgba(53, 53, 51, 1)',
    // appContentBg: 'rgba(17, 17, 16, 1)',
    // appBorderColor: 'rgba(191, 191, 184, 0.2)',
    // appBorderRadius: 4,

    // // Typography
    // fontBase:
    //     'Diatype, "Space Grotesk Frontify", Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    // fontCode: 'Menlo, Courier, monospace',

    // // Text colors
    // textColor: 'rgba(248, 248, 245, 1)',
    // textInverseColor: 'red',
    // textMutedColor: 'rgba(225, 225, 219, 1)',

    // // Toolbar default and active colors
    // barTextColor: 'rgba(248, 248, 245, 1)',
    // barHoverColor: 'rgba(236, 161, 254, 1)',
    // barSelectedColor: 'rgba(224, 107, 253, 1)',
    // barBg: 'rgba(53, 53, 51, 1)',

    // // Form colors
    // buttonBg: 'rgba(53, 53, 51, 1)',
    // buttonBorder: 'rgba(191, 191, 184, 0.5)',
    // booleanSelectedBg: 'rgba(17, 17, 16, 1)',
    // booleanBg: 'rgba(53, 53, 51, 1)',
    // inputBg: 'transparent',
    // inputBorder: 'rgba(191, 191, 184, 0.5)',
    // inputTextColor: 'rgba(248, 248, 245, 1)',
    // inputBorderRadius: 4,

    brandTitle: 'Fondue Design System - Frontify',
    brandUrl: 'https://fondue-components.frontify.com',
    brandImage: '/img/fondue-logo.svg',
});

console.log(dark);
