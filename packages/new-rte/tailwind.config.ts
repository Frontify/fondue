/* (c) Copyright Frontify Ltd., all rights reserved. */

import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';
import { type Config } from 'tailwindcss';

/**
 * Tailwind is a Storybook-only concern here: the published package ships
 * plain CSS, so only the stories and the Storybook preview are scanned.
 */
export default {
    prefix: 'tw-',
    presets: [frontifyTailwindConfig],
    content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
} satisfies Config;
