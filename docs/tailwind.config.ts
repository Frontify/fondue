/* (c) Copyright Frontify Ltd., all rights reserved. */

import tailwindForms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
    presets: [require('@frontify/fondue-tokens/tailwind')],
    content: ['./src/**/*.{js,ts,tsx}'],
    plugins: [
        tailwindForms({
            strategy: 'class',
        }),
    ],
    theme: {
        extend: {
            outline: {
                violet: '1px solid #825fff',
            },
            boxShadow: {
                large: '0 25px 80px 0 rgba(45, 50, 50, 0.4)',
                mid: '0 3px 10px 0 rgba(8, 8, 8, 0.15)',
                'mid-top': '0 -10px 10px -5px rgba(45, 50, 50, 0.1)',
                'mid-bottom': '0 10px 10px -5px rgba(45, 50, 50, 0.1)',
                'inner-mighty': 'inset 0 0 0 var(--line-width) var(--line-color-mighty)',
                none: 'none',
            },
            ringColor: {
                blue: '#5e9ed6',
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',
                white: '#ffffff',
                black: {
                    DEFAULT: '#2d3232',

                    // Solids
                    superdark: '#1a1d1d',
                    100: '#2d3232',
                    95: '#424747',
                    90: '#575b5b',
                    85: '#5f6363',
                    80: '#6c7070',
                    70: '#818484',
                    60: '#969898',
                    50: '#abadad',
                    40: '#b3b5b5',
                    30: '#c0c2c2',
                    20: '#d5d6d6',
                    10: '#eaebeb',
                    5: '#f7f7f7',
                    0: '#fafafa',
                    warm: '#e6dcdc',
                },
                violet: {
                    // Solids
                    90: '#443185',
                    70: '#6449c4',
                    60: '#825fff',
                    50: '#9088ff',
                    40: '#c8d1ed',
                    20: '#e3e8f6',
                },
                green: {
                    90: '#006452',
                    75: '#00866E',
                    70: '#00a084',
                    60: '#00c8a5',
                    50: '#80dbb7',
                    40: '#bee1d4',
                    20: '#def0e9',
                },

                yellow: {
                    90: '#cc9000',
                    70: '#e6a200',
                    60: '#ffb400',
                    50: '#eec779',
                    40: '#e1d4be',
                    20: '#f0e9de',
                },

                red: {
                    90: '#992136',
                    70: '#cc2c48',
                    65: '#E52144',
                    60: '#ff375a',
                    50: '#ff8066',
                    40: '#e1c4be',
                    20: '#f0e1de',
                },
            },
            fontFamily: {
                sans: [
                    '"Space Grotesk Frontify"',
                    'Arial',
                    '-apple-system',
                    'BlinkMacSystemFont',
                    'Segoe UI',
                    'Roboto',
                    'Helvetica',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                ],
                mono: ['Menlo', 'Courier', 'monospace'],
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
            screens: {
                xs: '480px',
                sm: '600px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            },
        },
    },
} satisfies Config;
