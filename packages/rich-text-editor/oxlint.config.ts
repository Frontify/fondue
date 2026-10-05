/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types available for oxlint-config-react
import reactConfig from '@frontify/oxlint-config-react';
import { defineConfig } from 'oxlint';

export default defineConfig({
    extends: [reactConfig],
    plugins: ['typescript', 'eslint', 'promise', 'unicorn', 'import', 'jsx-a11y', 'react'],
    options: {
        typeAware: true,
    },
    ignorePatterns: [
        'dist/',
        'playwright/.cache/',
        'playwright-report/',
        'test-results/',
        'storybook-static/',
        'coverage/',
        'fixtures/',
    ],
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
                // The shared config lowers this to `warn` for TypeScript files; the public types hold no `any`.
                'typescript/no-explicit-any': 'error',
            },
        },
    ],
});
