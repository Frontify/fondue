/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error Untyped
import legacyTailwindConfig from '@frontify/fondue-tokens/legacy/tailwind';
// @ts-expect-error Untyped
import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';
import { type Config } from 'tailwindcss';

export default {
    prefix: 'tw-',
    presets: [legacyTailwindConfig as Config, frontifyTailwindConfig as Config],
    content: ['./src/**/*.{ts,tsx}'],
} satisfies Config;
