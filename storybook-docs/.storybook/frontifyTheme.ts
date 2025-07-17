/* (c) Copyright Frontify Ltd., all rights reserved. */

import { create } from '@storybook/theming/create';

export const dark = create({
    base: 'dark',

    fontBase:
        'Diatype, Geist, Arial, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontCode: 'Menlo, Courier, monospace',

    brandTitle: 'Fondue Design System - Frontify',
    brandUrl: 'https://fondue-components.frontify.com',
    brandImage: '/img/fondue-logo.svg',
});
