/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { ariaCheckedFor } from './ariaCheckedFor';

describe('ariaCheckedFor', () => {
    it('maps true → "true"', () => {
        expect(ariaCheckedFor(true)).toBe('true');
    });

    it('maps false → "false"', () => {
        expect(ariaCheckedFor(false)).toBe('false');
    });

    it('maps \'indeterminate\' → "mixed"', () => {
        expect(ariaCheckedFor('indeterminate')).toBe('mixed');
    });
});
