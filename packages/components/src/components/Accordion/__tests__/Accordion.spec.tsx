/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Accordion } from '../Accordion';

const ACCORDION_TEST_ID = 'test-accordion';
const ACCORDION_TEXT = 'sample accordion';

describe('Accordion Component', () => {
    it('should render foo text correctly', () => {
        render(
            <Accordion.Root data-test-id={ACCORDION_TEST_ID}>
                <Accordion.Item value="1">
                    <Accordion.Header>
                        <Accordion.Trigger>{ACCORDION_TEXT}</Accordion.Trigger>
                    </Accordion.Header>
                </Accordion.Item>
            </Accordion.Root>,
        );
        expect(screen.getByText(ACCORDION_TEXT)).toBeInTheDocument();
    });
});
