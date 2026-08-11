/* (c) Copyright Frontify Ltd., all rights reserved. */

import tokensTailwindPreset from '@frontify/fondue-tokens/tailwind';
import { type Config } from 'tailwindcss';

/**
 * Tailwind is a Storybook-only concern here — the stories use it for their own
 * chrome, while the package itself is styled with SCSS modules and ships them as
 * `dist/style.css`. It is wired up in `.storybook/main.ts` rather than in a
 * `postcss.config.*`, which is what keeps utility CSS out of the library build;
 * only the stories (in `src`) and the Storybook preview are scanned.
 */
export default {
    prefix: 'tw-',
    presets: [tokensTailwindPreset],
    content: ['./src/**/*.stories.tsx', './.storybook/**/*.{ts,tsx}'],
} satisfies Config;
