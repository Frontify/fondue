/* (c) Copyright Frontify Ltd., all rights reserved. */

import tokenConfig from './dist/tailwind/tailwind.config.js';

/** @type {import('tailwindcss').Config} */
export default {
    presets: [tokenConfig],
    content: ['./stories/**/*.{js,ts,jsx,tsx}'],
    prefix: 'tw-',
    screens: {
        xs: '390px',
        sm: '600px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
    plugins: [],
};
