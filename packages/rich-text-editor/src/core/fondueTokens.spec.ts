/* (c) Copyright Frontify Ltd., all rights reserved. */

import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

import { describe, expect, it } from 'vitest';

import { fondueToken, fondueTokenValues } from './fondueTokens';

const TOKENS_STYLESHEET = '@frontify/fondue-tokens/styles';
const VARIABLE_REFERENCE = /^var\(--([a-z0-9-]+)\)$/;

/** The value a token has in the stylesheet, following the tokens it points at to a plain value. */
const resolveToken = (stylesheet: string, name: string): string => {
    const declaration = new RegExp(`--${name}:\\s*([^;]+);`).exec(stylesheet);
    if (declaration?.[1] === undefined) {
        throw new Error(`The tokens package does not set --${name}.`);
    }
    const value = declaration[1].trim();
    const reference = VARIABLE_REFERENCE.exec(value);
    if (reference?.[1] === undefined) {
        return value;
    }
    return resolveToken(stylesheet, reference[1]);
};

/** Ignores the space after each comma, which the tokens package and our source write differently. */
const compact = (value: string): string => value.replaceAll(/,\s*/g, ',');

describe('fondueToken', () => {
    it('reads the token with its value as the fallback', () => {
        expect(fondueToken('spacing-x-small')).toBe('var(--spacing-x-small, 0.5rem)');
    });

    it('holds every fallback equal to the tokens package', () => {
        const stylesheet = readFileSync(createRequire(import.meta.url).resolve(TOKENS_STYLESHEET), 'utf8');

        const drifted: string[] = [];
        for (const [name, value] of Object.entries(fondueTokenValues)) {
            if (compact(resolveToken(stylesheet, name)) !== compact(value)) {
                drifted.push(name);
            }
        }

        expect(drifted).toEqual([]);
    });
});
