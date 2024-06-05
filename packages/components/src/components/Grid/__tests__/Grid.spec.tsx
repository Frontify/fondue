/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Grid } from '../Grid';

const GRID_TEST_ID = 'test-grid';
const GRID_TEXT = 'sample grid';

describe('Grid Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Grid data-test-id={GRID_TEST_ID}>{GRID_TEXT}</Grid>);
        const component = getByTestId(GRID_TEST_ID);
        expect(component).toContain(GRID_TEXT);
    });
});
