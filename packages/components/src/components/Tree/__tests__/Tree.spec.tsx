/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tree } from '../Tree';

const TREE_TEST_ID = 'test-tree';
const TREE_TEXT = 'sample tree';

describe('Tree Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Tree data-test-id={TREE_TEST_ID}>{TREE_TEXT}</Tree>);
        const component = getByTestId(TREE_TEST_ID);
        expect(component).toContain(TREE_TEXT);
    });
});
