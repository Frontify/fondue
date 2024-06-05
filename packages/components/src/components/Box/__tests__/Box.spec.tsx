/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Box } from '../Box';

const BOX_TEST_ID = 'test-box';
const BOX_TEXT = 'sample box';

describe('Box Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Box data-test-id={BOX_TEST_ID}>{BOX_TEXT}</Box>);
        const component = getByTestId(BOX_TEST_ID);
        expect(component).toContain(BOX_TEXT);
    });
});
