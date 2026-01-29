/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { colorAccessor } from '@components/Treemap/helpers/accessors';

describe('colorAccessor', () => {
    it('returns transparent if no color is specified', () => {
        const result = colorAccessor(undefined);
        expect(result).toEqual('transparent');
    });

    it('returns color if color is specified', () => {
        const color = 'red';
        const result = colorAccessor(color);
        expect(result).toEqual(color);
    });

    it('returns correct color if color is PRIMARY', () => {
        const result = colorAccessor('PRIMARY');
        expect(result).toEqual('var(--fc-primary-base-color)');
    });

    it('returns correct color if color is SECONDARY', () => {
        const result = colorAccessor('SECONDARY');
        expect(result).toEqual('var(--fc-secondary-base-color)');
    });

    it('returns correct color if color is TERTIARY', () => {
        const result = colorAccessor('TERTIARY');
        expect(result).toEqual('var(--fc-tertiary-base-color)');
    });
});
