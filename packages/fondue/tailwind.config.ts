/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error Untyped
import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';

import legacyFondueTailwindConfig from './legacyFondue.tailwind.config';

/** @type {import('tailwindcss').Config} */
export default {
    presets: [frontifyTailwindConfig, legacyFondueTailwindConfig],
    content: ['./src/**/*.{js,ts,tsx}'],
};
