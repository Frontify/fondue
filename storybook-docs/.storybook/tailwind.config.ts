/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Config } from 'tailwindcss';

import componentsTailwindConfig from '../../packages/components/tailwind.config';

/**
 * One Tailwind build for every merged package: they all share the components config
 * (tokens preset, `tw-` prefix), only the scanned files are widened here.
 */
export default {
    ...componentsTailwindConfig,
    content: {
        relative: true,
        files: [
            '../../packages/components/src/**/*.{ts,tsx}',
            '../../packages/components/.storybook/**/*.{ts,tsx,mdx}',
            '../../packages/tokens/stories/**/*.{ts,tsx}',
            '../../packages/icons/src/**/*.stories.tsx',
            '../../packages/icons/.storybook/**/*.mdx',
            '../../packages/charts/src/**/*.stories.tsx',
            '../../packages/rich-text-editor/src/**/*.stories.tsx',
            './**/*.{ts,tsx,mdx}',
            '../stories/**/*.{ts,tsx,mdx}',
        ],
    },
} satisfies Config;
