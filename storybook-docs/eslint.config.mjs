/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

// @ts-expect-error No types available
import frontifyConfig from '@frontify/eslint-config-react';
import headerPlugin from '@tony.ganchev/eslint-plugin-header';
import { defineConfig } from 'eslint/config';

export default defineConfig(
    {
        ignores: [
            'storybook-static/',
            'node_modules/',
            '**/*.mdx/**.ts',
            '**/*.mdx/**.tsx',
            '**/*.md/**.ts',
            '**/*.md/**.tsx',
        ],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    frontifyConfig,
    {
        files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts', '**/*.cjs'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        plugins: {
            '@tony.ganchev': headerPlugin,
        },
        rules: {
            // Copyright header rules
            '@tony.ganchev/header': [
                'error',
                {
                    header: {
                        commentType: 'block',
                        lines: [' (c) Copyright Frontify Ltd., all rights reserved. '],
                    },
                    trailingEmptyLines: {
                        minimum: 2,
                    },
                },
            ],
        },
    },
);
