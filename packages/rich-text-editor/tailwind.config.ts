/* (c) Copyright Frontify Ltd., all rights reserved. */

import tokensTailwindPreset from '@frontify/fondue-tokens/tailwind';
import { type Config } from 'tailwindcss';

/**
 * Storybook-only: stories use Tailwind for their own chrome; the package itself
 * is SCSS modules. Wired up in `.storybook/main.ts` rather than a
 * `postcss.config.*`, which keeps utility CSS out of the library build.
 *
 * Preflight (Tailwind's reset) is off: a host page has none, and with it on
 * Storybook would hide styles the package forgets to set itself.
 */
export default {
    prefix: 'tw-',
    presets: [tokensTailwindPreset],
    content: ['./src/**/*.stories.tsx', './.storybook/**/*.{ts,tsx}'],
    corePlugins: { preflight: false },
} satisfies Config;
