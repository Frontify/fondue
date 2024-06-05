/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Section } from '../Section';

const SECTION_TEST_ID = 'test-section';
const SECTION_TEXT = 'sample section';

describe('Section Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Section data-test-id={SECTION_TEST_ID}>{SECTION_TEXT}</Section>);
        const component = getByTestId(SECTION_TEST_ID);
        expect(component).toContain(SECTION_TEXT);
    });
});
