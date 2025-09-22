/* (c) Copyright Frontify Ltd., all rights reserved. */

import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';
import { type Config } from 'tailwindcss';

export const screens = {
    xs: '390px',
    sm: '600px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

export default {
    prefix: 'tw-',
    presets: [frontifyTailwindConfig as Config],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './.storybook/DocumentationTemplate.mdx'],
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
            animation: {
                'loading-bar-infinite': 'loading-bar-infinite 1s infinite linear',
            },
            keyframes: {
                'loading-bar-infinite': {
                    '0%': { transform: ' translateX(0) scaleX(0)' },
                    '40%': { transform: 'translateX(0) scaleX(0.4)' },
                    '100%': { transform: 'translateX(100%) scaleX(0.5)' },
                },
            },
            transformOrigin: {
                'left-right': '0% 50%',
            },
        },
        screens,
    },
} satisfies Config;
