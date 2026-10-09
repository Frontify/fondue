/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TreeItem } from './TreeItem';

/**
 * `TreeItem` is a marker component: it renders null and is matched by `displayName` in
 * `parseChildren`. Lock both behaviors here so an accidental rename (e.g. via refactor)
 * surfaces immediately rather than silently breaking the JSX parser.
 */

describe('TreeItem', () => {
    it('renders nothing outside a Tree collect pass', () => {
        const { container } = render(<TreeItem id="x">X</TreeItem>);
        expect(container).toBeEmptyDOMElement();
    });

    it('declares displayName="Tree.Item"', () => {
        expect(TreeItem.displayName).toBe('Tree.Item');
    });
});
