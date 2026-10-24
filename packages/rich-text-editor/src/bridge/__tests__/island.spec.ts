/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { islandReplacement } from '../island';

const text = (value: string) => ({ type: 'text', text: value });
const callout = (...lines: readonly string[]) => ({
    type: 'callout',
    content: lines.map((line) => ({ type: 'paragraph', content: [text(line)] })),
});

describe('islandReplacement', () => {
    it('gives a block island one paragraph per line of its text', () => {
        expect(islandReplacement(false, callout('First', 'Second'))).toEqual([
            { type: 'paragraph', content: [text('First')] },
            { type: 'paragraph', content: [text('Second')] },
        ]);
    });

    it('gives a block island with no text one empty paragraph', () => {
        expect(islandReplacement(false, { type: 'poll', attrs: { id: 1 } })).toEqual([{ type: 'paragraph' }]);
    });

    it('gives an inline island its text with line breaks as spaces', () => {
        expect(islandReplacement(true, { type: 'sticker', content: [text('one\ntwo')] })).toEqual([text('one two')]);
    });

    it('gives an inline island with no text nothing to write', () => {
        expect(islandReplacement(true, { type: 'sticker' })).toEqual([]);
    });
});
