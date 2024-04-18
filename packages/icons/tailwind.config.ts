/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error Untyped
import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';
import { type Config } from 'tailwindcss';

export default {
    presets: [frontifyTailwindConfig as Config],
    content: ['./src/**/*.{js,ts,jsx,tsx}', './.storybook/DocumentationTemplate.mdx'],
    theme: {
        extend: {
            colors: {
                white: '#ffffff',
            },
        },
    },
} satisfies Config;
