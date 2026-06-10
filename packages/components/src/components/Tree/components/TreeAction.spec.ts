/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { TreeAction } from './TreeAction';

describe('TreeAction', () => {
    it('renders null', () => {
        expect(TreeAction({ children: null })).toBe(null);
    });

    it('declares displayName="Tree.Action"', () => {
        expect(TreeAction.displayName).toBe('Tree.Action');
    });
});
