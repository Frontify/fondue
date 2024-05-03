/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Tooltip } from '../Tooltip';

const TOOLTIP_TEST_ID = 'test-tooltip';
const TOOLTIP_TEXT = 'sample tooltip';

describe('Tooltip Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Tooltip data-test-id={TOOLTIP_TEST_ID}>{TOOLTIP_TEXT}</Tooltip>);
        const component = getByTestId(TOOLTIP_TEST_ID);
        expect(component).toContain(TOOLTIP_TEXT);
    });
});
