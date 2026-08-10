/* (c) Copyright Frontify Ltd., all rights reserved. */

/**
 * Loads the token manifest from @frontify/fondue-tokens and normalizes it
 * into the SDK token shape.
 */

import { createRequire } from 'node:module';

import { duplicateErrors } from './utils';

interface RawToken {
    id: string;
    category: string;
    type: string;
    keyPath: string[];
    value: string;
    output: string;
    cssVariable: string | null;
    tailwindClass: string;
    themeable: boolean;
}

export interface SdkTokenUtility {
    id: string;
    keyPath: string[];
    properties: unknown[];
    tailwindClass: string;
    themeable: boolean;
}

/** The normalized token shape emitted into data.ts (drops the build-system `output` field). */
export type SdkToken = Omit<RawToken, 'output'>;

const require = createRequire(import.meta.url);

const validateTokens = (rawTokens: readonly RawToken[], utilities: readonly SdkTokenUtility[]): string[] => {
    const errors = duplicateErrors(
        'token id',
        rawTokens.map((token) => token.id),
    );
    for (const token of rawTokens) {
        if (!token.id) {
            errors.push('token with empty id');
        }
        if (!token.category) {
            errors.push(`token "${token.id}" has no category`);
        }
        if (token.output !== 'variable' && token.output !== 'value') {
            errors.push(`token "${token.id}" has invalid output "${token.output}"`);
        }
        if ((token.output === 'variable') !== (token.cssVariable !== null)) {
            errors.push(`token "${token.id}" output "${token.output}" is inconsistent with cssVariable`);
        }
        if (!token.tailwindClass) {
            errors.push(`token "${token.id}" has no tailwindClass`);
        }
    }

    errors.push(
        ...duplicateErrors(
            'token utility id',
            utilities.map((utility) => utility.id),
        ),
    );
    for (const utility of utilities) {
        if (!utility.tailwindClass) {
            errors.push(`token utility "${utility.id}" has no tailwindClass`);
        }
    }
    return errors;
};

export interface GeneratedTokens {
    tokens: SdkToken[];
    tokenUtilities: SdkTokenUtility[];
    errors: string[];
}

export const generateTokens = (): GeneratedTokens => {
    const tokensManifest = require('@frontify/fondue-tokens/manifest.json') as {
        tokens: RawToken[];
        utilities?: SdkTokenUtility[];
    };
    const tokenUtilities = tokensManifest.utilities ?? [];

    // `output` is a build-system concern — consumers only need `cssVariable`'s
    // nullability (null ⇢ inlined literal). Validate against it, but strip it
    // from the published data.
    const tokens = tokensManifest.tokens.map(({ output: _output, ...token }): SdkToken => token);

    return {
        tokens,
        tokenUtilities,
        errors: validateTokens(tokensManifest.tokens, tokenUtilities),
    };
};
