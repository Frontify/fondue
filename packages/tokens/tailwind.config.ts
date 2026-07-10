/* (c) Copyright Frontify Ltd., all rights reserved. */

import deprecatedTailwindConfig from './dist/legacy/deprecatedTailwindConfig.js';
import tokenConfig from './dist/tailwind/tailwind.config.js';

/** @type {import('tailwindcss').Config} */
export default {
    presets: [tokenConfig, deprecatedTailwindConfig],
    content: ['./stories/**/*.{js,ts,jsx,tsx}'],
    prefix: 'tw-',
    plugins: [],
};
