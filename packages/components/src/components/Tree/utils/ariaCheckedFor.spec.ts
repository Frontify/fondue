/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CheckedState } from '@headless-tree/core';
import { describe, expect, it } from 'vitest';

import { ariaCheckedFor } from './ariaCheckedFor';

describe('ariaCheckedFor', () => {
    it('maps Checked → "true"', () => {
        expect(ariaCheckedFor(CheckedState.Checked)).toBe('true');
    });

    it('maps Unchecked → "false"', () => {
        expect(ariaCheckedFor(CheckedState.Unchecked)).toBe('false');
    });

    it('maps Indeterminate → "mixed"', () => {
        expect(ariaCheckedFor(CheckedState.Indeterminate)).toBe('mixed');
    });
});
