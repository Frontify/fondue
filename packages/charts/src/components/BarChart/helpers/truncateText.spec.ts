/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { truncateTextLabel } from './';

describe('truncateTextLabel', () => {
    it('should truncate', () => {
        const result = truncateTextLabel('Truncated text');
        expect(result).toEqual('Truncated...');
    });

    it('should not truncate', () => {
        const result = truncateTextLabel('No truncate');
        expect(result).toEqual('No truncate');
    });
});
