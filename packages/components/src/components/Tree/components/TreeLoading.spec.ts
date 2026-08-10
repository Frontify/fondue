/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { TreeLoading } from './TreeLoading';

describe('TreeLoading', () => {
    it('renders null', () => {
        expect(TreeLoading()).toBe(null);
    });

    it('declares displayName="Tree.Loading"', () => {
        expect(TreeLoading.displayName).toBe('Tree.Loading');
    });
});
