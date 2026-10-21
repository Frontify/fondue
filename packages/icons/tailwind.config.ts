/* (c) Copyright Frontify Ltd., all rights reserved. */

import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';
import { type Config } from 'tailwindcss';

export default {
    prefix: 'tw-',
    presets: [frontifyTailwindConfig],
    content: ['./src/**/*.{ts,tsx}', './.storybook/DocumentationTemplate.mdx'],
    theme: {
        extend: {
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                white: '#ffffff',
                black: {
                    DEFAULT: '#2d3232',
                },
            },
        },
    },
} satisfies Config;
