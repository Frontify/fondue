/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error Untyped
import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';

export default {
    presets: [frontifyTailwindConfig],
    content: ['./src/**/*.{js,ts,tsx}'],
    prefix: 'tw-',
};
