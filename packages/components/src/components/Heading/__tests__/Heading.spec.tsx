/* (c) Copyright Frontify Ltd., all rights reserved. */

import { screen, render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Heading } from '../Heading';

const HEADING_TEST_ID = 'test-heading';
const HEADING_TEXT = 'sample heading';

describe('Heading Component', () => {
    it('should render correctly', () => {
        render(<Heading data-test-id={HEADING_TEST_ID}>{HEADING_TEXT}</Heading>);

        const component = screen.getByTestId(HEADING_TEST_ID);

        expect(component).toBeInTheDocument();
        expect(component.tagName).toBe('SPAN');
        expect(screen.getByText(HEADING_TEXT)).toBeInTheDocument();
    });

    it('should render h1 correctly', () => {
        render(
            <Heading as="p" data-test-id={HEADING_TEST_ID}>
                {HEADING_TEXT}
            </Heading>,
        );

        const component = screen.getByTestId(HEADING_TEST_ID);

        expect(component).toBeInTheDocument();
        expect(component.tagName).toBe('P');
    });

    it('should render h1 correctly', () => {
        render(
            <Heading as="h1" data-test-id={HEADING_TEST_ID}>
                {HEADING_TEXT}
            </Heading>,
        );

        const component = screen.getByTestId(HEADING_TEST_ID);

        expect(component).toBeInTheDocument();
        expect(component.tagName).toBe('H1');
    });
});
