/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig } from 'oxlint';

export default defineConfig({
    extends: [reactConfig],
    options: {
        typeAware: true,
    },
    ignorePatterns: ['dist/', 'coverage/'],
    overrides: [
        {
            files: ['**/*.{js,jsx,ts,tsx,mts,cts,cjs}'],
            jsPlugins: ['@tony.ganchev/eslint-plugin-header'],
            rules: {
                '@tony.ganchev/header/header': [
                    'error',
                    {
                        header: {
                            commentType: 'block',
                            lines: [' (c) Copyright Frontify Ltd., all rights reserved. '],
                        },
                        trailingEmptyLines: { minimum: 2 },
                    },
                ],
            },
        },
    ],
});
