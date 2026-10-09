/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TreeFolder } from './TreeFolder';

describe('TreeFolder', () => {
    it('renders nothing outside a Tree collect pass', () => {
        const { container } = render(<TreeFolder id="f">{null}</TreeFolder>);
        expect(container).toBeEmptyDOMElement();
    });

    it('declares displayName="Tree.Folder"', () => {
        expect(TreeFolder.displayName).toBe('Tree.Folder');
    });
});
