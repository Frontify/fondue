/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error Untyped
import legacyFondueTailwindConfig from '@frontify/fondue-tokens/legacy/tailwind';
import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';

export default {
    presets: [frontifyTailwindConfig, legacyFondueTailwindConfig],
    darkMode: '',
    content: [
        './src/**/*.{js,ts,tsx}',
        '!./src/components/RichTextEditor/serializer/markdown/__tests__/fixtures/mentions.ts',
    ],
    prefix: 'tw-',
};
