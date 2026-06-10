/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { TreeItemAction } from './TreeItemAction';

describe('TreeItemAction', () => {
    it('renders null', () => {
        expect(TreeItemAction({ children: null })).toBe(null);
    });

    it('declares displayName="Tree.ItemAction"', () => {
        expect(TreeItemAction.displayName).toBe('Tree.ItemAction');
    });
});
