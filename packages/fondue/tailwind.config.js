/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error Untyped
import frontifyTailwindConfig from '@frontify/fondue-tokens/tailwind';
import resolveConfig from 'tailwindcss/resolveConfig';

import legacyComponentsTailwindConfig from './legacyTokens/legacyTokens.tailwind.config';

const resolvedLegacyConfig = resolveConfig(legacyComponentsTailwindConfig);

export default {
    presets: [
        frontifyTailwindConfig,
        {
            ...resolvedLegacyConfig,
            presets: [frontifyTailwindConfig],
            theme: {
                extend: {
                    ...resolvedLegacyConfig.theme,
                },
            },
        },
    ],
    content: ['./src/**/*.{js,ts,tsx}'],
    prefix: 'tw-',
};
