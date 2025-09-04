/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error Untyped
import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';

import legacyComponentsTailwindConfig from './legacyTokens/legacyTokens.tailwind.config';

export default {
    presets: [frontifyTailwindConfig, legacyComponentsTailwindConfig],
    content: ['./src/**/*.{js,ts,tsx}'],
    prefix: 'tw-',
};
