/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error Untyped
import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';
import tailwindForms from '@tailwindcss/forms';
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
    presets: [frontifyTailwindConfig as Config],
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './.storybook/DocumentationTemplate.mdx'],
    plugins: [
        tailwindForms({
            strategy: 'class',
        }),
    ],
    theme: {
        extend: {
            ringColor: {
                blue: '#4196fb',
            },
            outlineColor: {
                blue: '#4196fb',
            },
            colors: {
                current: 'currentColor',
            },
            fontSize: {
                xxs: ['0.75rem', { letterSpacing: '0.02rem', lineHeight: '1rem' }],
                xs: ['0.813rem', '1rem'],
                s: ['0.875rem', '1rem'],
                m: ['1rem', '1.25rem'],
                l: ['1.125rem', '1.5rem'],
                xl: ['1.5rem', '2rem'],
                xxl: ['2rem', '2.5rem'],
                xxxl: ['3rem', '3.5rem'],
            },
            transitionProperty: {
                height: 'height',
                width: 'width',
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
