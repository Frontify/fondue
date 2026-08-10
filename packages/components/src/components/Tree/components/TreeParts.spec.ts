/* (c) Copyright Frontify Ltd., all rights reserved. */

import { describe, expect, it } from 'vitest';

import { TreeDecorator } from './TreeDecorator';
import { TreeFolderHeader } from './TreeFolderHeader';
import { TreeIcon } from './TreeIcon';
import { TreeLabel } from './TreeLabel';

describe('Tree anatomy parts', () => {
    it.each([
        ['Tree.Icon', TreeIcon, { children: null }],
        ['Tree.Decorator', TreeDecorator, { children: null }],
        ['Tree.FolderHeader', TreeFolderHeader, { children: null }],
    ] as const)('%s renders null and declares its displayName', (displayName, Part, props) => {
        expect(Part(props as never)).toBe(null);
        expect(Part.displayName).toBe(displayName);
    });

    it('Tree.Label renders null and declares its displayName', () => {
        expect(TreeLabel({ children: 'Label' })).toBe(null);
        expect(TreeLabel.displayName).toBe('Tree.Label');
    });
});
