/* (c) Copyright Frontify Ltd., all rights reserved. */

import legacyComponentsTailwindConfig from './legacyTokens.tailwind.config';

export default {
    presets: [legacyComponentsTailwindConfig],
    content: ['./src/**/*.{js,ts,tsx}'],
    prefix: 'tw-',
};
