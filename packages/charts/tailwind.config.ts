/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Config } from 'tailwindcss';

export default {
    presets: [require('@frontify/fondue-tokens/tailwind')],
    content: ['./src/**/*.{ts,tsx}'],
} satisfies Config;
