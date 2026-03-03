/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { OrderableList } from '../OrderableList';

const ORDERABLE_LIST_TEST_ID = 'test-orderable-list';
const ORDERABLE_LIST_TEXT = 'sample orderable-list';

describe('OrderableList Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<OrderableList data-test-id={ORDERABLE_LIST_TEST_ID}>{ORDERABLE_LIST_TEXT}</OrderableList>);
        const component = getByTestId(ORDERABLE_LIST_TEST_ID);
        expect(component).toContain(ORDERABLE_LIST_TEXT);
    });
});
