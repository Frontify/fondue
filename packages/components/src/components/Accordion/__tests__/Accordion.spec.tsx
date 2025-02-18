/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Accordion } from '../Accordion';

const ACCORDION_TEST_ID = 'test-accordion';
const ACCORDION_TEXT = 'sample accordion';

describe('Accordion Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(
            <Accordion.Root data-test-id={ACCORDION_TEST_ID}>{ACCORDION_TEXT}</Accordion.Root>,
        );
        const component = getByTestId(ACCORDION_TEST_ID);
        expect(component).toContain(ACCORDION_TEXT);
    });
});
