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

describe('truncateTextLabel with maxLength', () => {
    it('should truncate at a custom length, ellipsis included', () => {
        expect(truncateTextLabel('Brand assistant', 14)).toEqual('Brand assis...');
    });

    it('should not truncate a label that fits the custom length', () => {
        expect(truncateTextLabel('Brand assistant', 15)).toEqual('Brand assistant');
    });

    it('should not truncate when maxLength is Infinity', () => {
        expect(truncateTextLabel('A very very long label indeed', Infinity)).toEqual('A very very long label indeed');
    });

    it('should keep the default behaviour when maxLength is omitted', () => {
        expect(truncateTextLabel('Brand assistant')).toEqual('Brand ass...');
    });
});
