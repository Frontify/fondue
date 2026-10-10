/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types for oxfmt-config
import { defineConfig as untypedDefineConfig } from '@frontify/oxfmt-config';

import tsconfig from './tsconfig.json' with { type: 'json' };

const defineConfig = untypedDefineConfig as (config: Record<string, unknown>) => Record<string, unknown>;

const internalPatterns = Object.keys(tsconfig.compilerOptions.paths).map((path) => path.replace('/*', '/**'));

export default defineConfig({
    internalPatterns,
    ignorePatterns: ['src/model/__tests__/fixtures/model-versions.json'],
    trailingComma: 'all',
    arrowParens: 'always',
    endOfLine: 'lf',
    overrides: [
        {
            files: ['tsconfig.json', 'tsconfig.*.json'],
            options: {
                trailingComma: 'none',
            },
        },
    ],
});
