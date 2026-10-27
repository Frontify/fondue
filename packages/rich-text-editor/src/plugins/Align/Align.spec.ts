/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { alignPlugin } from './Align';

const align = alignPlugin().blockAttributes?.align;

describe('the align attribute', () => {
    it('styles the block with one of the four alignments', () => {
        expect(align?.style('center')).toEqual({ 'text-align': 'center' });
    });

    it('writes no style for any other value', () => {
        for (const value of ['center; background: url(x)', 'start', '', 1]) {
            expect(align?.style(value as string)).toEqual({});
        }
    });
});
