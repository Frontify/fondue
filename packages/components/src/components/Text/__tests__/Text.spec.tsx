/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Text } from '../Text';

const TEXT_TEST_ID = 'test-text';
const TEXT_TEXT = 'sample text';

describe('Text Component', () => {
    it('should render foo text correctly', () => {
        const { getByTestId } = render(<Text data-test-id={TEXT_TEST_ID}>{TEXT_TEXT}</Text>);
        const component = getByTestId(TEXT_TEST_ID);
        expect(component).toContain(TEXT_TEXT);
    });
});
