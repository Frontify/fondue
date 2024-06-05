/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Flex } from '../Flex';

const FLEX_TEST_ID = 'test-flex';
const FLEX_TEXT = 'sample flex';

describe('Flex Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Flex data-test-id={FLEX_TEST_ID}>{FLEX_TEXT}</Flex>);
        const component = getByTestId(FLEX_TEST_ID);
        expect(component).toContain(FLEX_TEXT);
    });
});
