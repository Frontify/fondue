/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, test } from 'vitest';

import { truncateTextLabel } from './';

describe('truncateTextLabel', () => {
    test('should truncate', () => {
        const result = truncateTextLabel('Truncated text');
        expect(result).toEqual('Truncated...');
    });

    test('should not truncate', () => {
        const result = truncateTextLabel('No truncate');
        expect(result).toEqual('No truncate');
    });
});
