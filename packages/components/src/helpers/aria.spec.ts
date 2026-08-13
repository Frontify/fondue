/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { mergeAriaIds } from './aria';

describe('mergeAriaIds', () => {
    it('should join multiple ids into a single space separated token list', () => {
        expect(mergeAriaIds('internal-description', 'caller-error-message')).toBe(
            'internal-description caller-error-message',
        );
    });

    it('should keep the given order so the component id is announced first', () => {
        expect(mergeAriaIds('a', 'b', 'c')).toBe('a b c');
    });

    it('should return the single remaining id when the others are absent', () => {
        expect(mergeAriaIds(undefined, 'caller-error-message')).toBe('caller-error-message');
        expect(mergeAriaIds('internal-description', undefined)).toBe('internal-description');
    });

    it('should return undefined when nothing is left, so the attribute is omitted', () => {
        expect(mergeAriaIds()).toBeUndefined();
        expect(mergeAriaIds(undefined, undefined)).toBeUndefined();
    });

    it('should drop `false`, which is what a conditional id expression evaluates to', () => {
        const selectionDescription = '';
        expect(mergeAriaIds(selectionDescription && 'internal-description', 'caller-error-message')).toBe(
            'caller-error-message',
        );
    });

    it('should drop empty and whitespace only ids', () => {
        expect(mergeAriaIds('', '   ', 'caller-error-message')).toBe('caller-error-message');
        expect(mergeAriaIds('', '   ')).toBeUndefined();
    });

    it('should deduplicate repeated ids', () => {
        expect(mergeAriaIds('same-id', 'same-id')).toBe('same-id');
    });
});
