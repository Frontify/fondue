/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Switch } from '../Switch';

const SWITCH_TEST_ID = 'test-switch';
const SWITCH_TEXT = 'sample switch';

describe('Switch Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Switch data-test-id={SWITCH_TEST_ID}>{SWITCH_TEXT}</Switch>);
        const component = getByTestId(SWITCH_TEST_ID);
        expect(component).toContain(SWITCH_TEXT);
    });
});
