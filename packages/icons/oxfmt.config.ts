/* (c) Copyright Frontify Ltd., all rights reserved. */

// @ts-expect-error - No types for oxfmt-config
import { defineConfig as defineConfigImpl } from '@frontify/oxfmt-config';

type OxfmtTrailingComma = 'all' | 'es5' | 'none';
type OxfmtConfig = {
    trailingComma?: OxfmtTrailingComma;
    ignorePatterns?: string[];
    overrides?: Array<{
        files: string[];
        options?: { trailingComma?: OxfmtTrailingComma };
    }>;
};

const defineConfig = defineConfigImpl as (config: OxfmtConfig) => OxfmtConfig;

export default defineConfig({
    trailingComma: 'all',
    ignorePatterns: ['icons/**/*', 'src/icons/**/*'],
    overrides: [
        {
            files: ['tsconfig.json', 'tsconfig.*.json'],
            options: {
                trailingComma: 'none',
            },
        },
    ],
});
