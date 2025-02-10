/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Text } from '../Text';

const TEXT_TEST_ID = 'test-text';
const TEXT_TEXT = 'sample text';

describe('Text Component', () => {
    it('should render foo text correctly', () => {
        render(<Text data-test-id={TEXT_TEST_ID}>{TEXT_TEXT}</Text>);
        expect(screen.getByText(TEXT_TEXT)).toBeInTheDocument();
        expect(screen.getByTestId(TEXT_TEST_ID)).toBeInTheDocument();
    });
});
