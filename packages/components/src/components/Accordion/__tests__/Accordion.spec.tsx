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

    it('should default to the "default" variant', () => {
        render(
            <Accordion.Root data-test-id={ACCORDION_TEST_ID}>
                <Accordion.Item value="1">
                    <Accordion.Header>{ACCORDION_TEXT}</Accordion.Header>
                </Accordion.Item>
            </Accordion.Root>,
        );
        expect(screen.getByTestId(ACCORDION_TEST_ID)).toHaveAttribute('data-accordion-variant', 'default');
    });

    it('should apply the pill variant', () => {
        render(
            <Accordion.Root data-test-id={ACCORDION_TEST_ID} variant="pill">
                <Accordion.Item value="1">
                    <Accordion.Header>{ACCORDION_TEXT}</Accordion.Header>
                </Accordion.Item>
            </Accordion.Root>,
        );
        expect(screen.getByTestId(ACCORDION_TEST_ID)).toHaveAttribute('data-accordion-variant', 'pill');
    });

    it('should default stickyBackground to false', () => {
        render(
            <Accordion.Root data-test-id={ACCORDION_TEST_ID} variant="pill" sticky>
                <Accordion.Item value="1">
                    <Accordion.Header>{ACCORDION_TEXT}</Accordion.Header>
                </Accordion.Item>
            </Accordion.Root>,
        );
        expect(screen.getByTestId(ACCORDION_TEST_ID)).toHaveAttribute('data-sticky-background', 'false');
    });

    it('should apply stickyBackground when enabled', () => {
        render(
            <Accordion.Root data-test-id={ACCORDION_TEST_ID} variant="pill" sticky stickyBackground>
                <Accordion.Item value="1">
                    <Accordion.Header>{ACCORDION_TEXT}</Accordion.Header>
                </Accordion.Item>
            </Accordion.Root>,
        );
        expect(screen.getByTestId(ACCORDION_TEST_ID)).toHaveAttribute('data-sticky-background', 'true');
    });

    it('should default caretAlignment to inline', () => {
        render(
            <Accordion.Root data-test-id={ACCORDION_TEST_ID}>
                <Accordion.Item value="1">
                    <Accordion.Header>{ACCORDION_TEXT}</Accordion.Header>
                </Accordion.Item>
            </Accordion.Root>,
        );
        expect(screen.getByTestId('fondue-accordion-header')).toHaveAttribute('data-caret-alignment', 'inline');
    });

    it('should apply caretAlignment to headers regardless of whether they render slots', () => {
        render(
            <Accordion.Root data-test-id={ACCORDION_TEST_ID} caretAlignment="end">
                <Accordion.Item value="1">
                    <Accordion.Header>
                        {ACCORDION_TEXT}
                        <Accordion.Slot>slot content</Accordion.Slot>
                    </Accordion.Header>
                </Accordion.Item>
            </Accordion.Root>,
        );
        expect(screen.getByTestId('fondue-accordion-header')).toHaveAttribute('data-caret-alignment', 'end');
    });
});
