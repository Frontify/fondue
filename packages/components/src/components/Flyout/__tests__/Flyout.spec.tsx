/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Flyout } from '../Flyout';

const FLYOUT_TEST_ID = 'test-flyout';
const FLYOUT_TEXT = 'sample flyout';

describe('Flyout Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Flyout data-test-id={FLYOUT_TEST_ID}>{FLYOUT_TEXT}</Flyout>);
        const component = getByTestId(FLYOUT_TEST_ID);
        expect(component).toContain(FLYOUT_TEXT);
    });
});
