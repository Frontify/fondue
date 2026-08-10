/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-check

// @ts-expect-error No types available
import frontifyConfig from '@frontify/eslint-config-react';
import headerPlugin from '@tony.ganchev/eslint-plugin-header';
import { defineConfig } from 'eslint/config';

export default defineConfig(
    {
        ignores: [
            'dist/',
            'coverage/',
            'node_modules/',
            'src/__generated__/',
            '**/*.md',
            '**/*.mdx',
            '**/*.md/**.ts',
            '**/*.md/**.tsx',
        ],
    },
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    frontifyConfig,
    {
        files: ['**/*.js', '**/*.ts', '**/*.mts', '**/*.cts', '**/*.cjs'],
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
