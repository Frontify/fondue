/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { TreeItem } from './TreeItem';

/**
 * `TreeItem` is a marker component: it renders null and is matched by `displayName` in
 * `parseChildren`. Lock both behaviors here so an accidental rename (e.g. via refactor)
 * surfaces immediately rather than silently breaking the JSX parser.
 */

describe('TreeItem', () => {
    it('renders null', () => {
        expect(TreeItem({ id: 'x', children: 'X' })).toBe(null);
    });

    it('declares displayName="Tree.Item"', () => {
        expect(TreeItem.displayName).toBe('Tree.Item');
    });
});
