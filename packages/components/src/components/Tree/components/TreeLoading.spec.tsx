/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { TreeLoading } from './TreeLoading';

describe('TreeLoading', () => {
    it('renders nothing outside a Tree collect pass', () => {
        const { container } = render(<TreeLoading />);
        expect(container).toBeEmptyDOMElement();
    });

    it('declares displayName="Tree.Loading"', () => {
        expect(TreeLoading.displayName).toBe('Tree.Loading');
    });
});
