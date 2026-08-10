/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { TreeFolder } from './TreeFolder';

describe('TreeFolder', () => {
    it('renders null', () => {
        expect(TreeFolder({ id: 'f', children: null })).toBe(null);
    });

    it('declares displayName="Tree.Folder"', () => {
        expect(TreeFolder.displayName).toBe('Tree.Folder');
    });
});
