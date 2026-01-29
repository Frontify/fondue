/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error Untyped
import legacyTailwindConfig from '@frontify/fondue-tokens/legacy/tailwind';
// @ts-expect-error Untyped
import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';
import { type Config } from 'tailwindcss';

export default {
    presets: [frontifyTailwindConfig as Config, legacyTailwindConfig as Config],
    content: ['./src/**/*.{ts,tsx}', './.storybook/DocumentationTemplate.mdx'],
    prefix: 'tw-',
    theme: {
        extend: {
            colors: {
                white: '#ffffff',
            },
        },
    },
} satisfies Config;
