/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Heading } from '../Heading';

const HEADING_TEST_ID = 'test-heading';
const HEADING_TEXT = 'sample heading';

describe('Heading Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Heading data-test-id={HEADING_TEST_ID}>{HEADING_TEXT}</Heading>);
        const component = getByTestId(HEADING_TEST_ID);
        expect(component).toContain(HEADING_TEXT);
    });
});
