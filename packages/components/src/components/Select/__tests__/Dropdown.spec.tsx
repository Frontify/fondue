/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Dropdown } from '../Select';

const DROPDOWN_TEST_ID = 'test-dropdown';
const DROPDOWN_TEXT = 'sample dropdown';

describe('Dropdown Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Dropdown data-test-id={DROPDOWN_TEST_ID}>{DROPDOWN_TEXT}</Dropdown>);
        const component = getByTestId(DROPDOWN_TEST_ID);
        expect(component).toContain(DROPDOWN_TEXT);
    });
});
