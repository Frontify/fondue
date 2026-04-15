/* (c) Copyright Frontify Ltd., all rights reserved. */

import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { RouterProvider } from '../../RouterProvider/RouterProvider';
import { Card } from '../Card';

const CARD_TEST_ID = 'test-card';
const CARD_TITLE_TEXT = 'Card Title';

const navigateStub = vi.fn();
const useHrefStub = (path: string) => path;

const renderWithRouter = (ui: React.ReactNode) =>
    render(
        <RouterProvider navigate={navigateStub} useHref={useHrefStub}>
            {ui}
        </RouterProvider>,
    );

describe('Card Component', () => {
    it('should call onClick when action button is clicked', async () => {
        const handleClick = vi.fn();
        render(
            <Card.Root>
                <Card.Action>
                    <Card.ActionButton aria-label="Settings" onClick={handleClick}>
                        <svg />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Settings' }));
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should render an anchor overlay when href is provided', () => {
        renderWithRouter(
            <Card.Root href="/some-page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link')).toHaveAttribute('href', '/some-page');
    });

    it('should set data-interactive to true when href is provided', () => {
        renderWithRouter(
            <Card.Root data-test-id={CARD_TEST_ID} href="/page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.interactive).toBe('true');
    });

    it('should not render an overlay when non-interactive', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.interactive).toBe('false');
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should set aria-current on anchor overlay when selected', () => {
        renderWithRouter(
            <Card.Root selected href="/page" onSelect={() => {}} aria-label="Go to page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        // When selected with onSelect, the overlay is a button, not a link
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should render a checkbox when both href and onSelect are provided', () => {
        const handleClick = vi.fn();
        renderWithRouter(
            <Card.Root href="/page" onSelect={handleClick} aria-label="Go to page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link', { name: 'Go to page' })).toHaveAttribute('href', '/page');
        expect(screen.getByRole('button', { name: 'Select' })).toBeInTheDocument();
    });

    it('should call onSelect on the checkbox when both href and onSelect are provided', async () => {
        const handleClick = vi.fn();
        renderWithRouter(
            <Card.Root href="/page" onSelect={handleClick} aria-label="Go to page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Select' }));
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should not render a checkbox when only href is provided', () => {
        renderWithRouter(
            <Card.Root href="/page" aria-label="Go to page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render link overlay when not selected and both href and onClick are provided', () => {
        renderWithRouter(
            <Card.Root href="/page" onSelect={() => {}} selected={false} aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link', { name: 'Card' })).toHaveAttribute('href', '/page');
    });

    it('should render button overlay when selected and both href and onClick are provided', () => {
        const handleClick = vi.fn();
        renderWithRouter(
            <Card.Root href="/page" onSelect={handleClick} selected aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        // When selected, overlay switches to a button that fires onSelect
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Card' })).toBeInTheDocument();
    });

    it('should call onSelect on the button overlay when card is selected', async () => {
        const handleClick = vi.fn();
        renderWithRouter(
            <Card.Root href="/page" onSelect={handleClick} selected aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Card' }));
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should have data-selected true when selected with onSelect', () => {
        renderWithRouter(
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" selected onSelect={() => {}}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.selected).toBe('true');
    });

    it('should have data-selected false when not selected', () => {
        renderWithRouter(
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" selected={false} onSelect={() => {}}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.selected).toBe('false');
    });

    it('should set data-selectable to true when onSelect is provided', () => {
        renderWithRouter(
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" onSelect={() => {}}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.selectable).toBe('true');
    });

    it('should set data-selectable to false when only href is provided', () => {
        renderWithRouter(
            <Card.Root data-test-id={CARD_TEST_ID} href="/page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.selectable).toBe('false');
    });

    it('should set data-selectable to false when non-interactive', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.selectable).toBe('false');
    });

    it('should set data-interactive to true when href is provided with onSelect and selected', () => {
        renderWithRouter(
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" onSelect={() => {}} selected>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.interactive).toBe('true');
    });

    it('should call onSelect when button overlay is activated via Enter key', async () => {
        const handleSelect = vi.fn();
        renderWithRouter(
            <Card.Root href="/page" onSelect={handleSelect} selected aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        screen.getByRole('button', { name: 'Card' }).focus();
        await userEvent.keyboard('{Enter}');
        expect(handleSelect).toHaveBeenCalledOnce();
    });

    it('should call onSelect when button overlay is activated via Space key', async () => {
        const handleSelect = vi.fn();
        renderWithRouter(
            <Card.Root href="/page" onSelect={handleSelect} selected aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        screen.getByRole('button', { name: 'Card' }).focus();
        await userEvent.keyboard(' ');
        expect(handleSelect).toHaveBeenCalledOnce();
    });

    it('should call onSelect when checkbox is activated via Enter key', async () => {
        const handleSelect = vi.fn();
        renderWithRouter(
            <Card.Root href="/page" onSelect={handleSelect} aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        screen.getByRole('button', { name: 'Select' }).focus();
        await userEvent.keyboard('{Enter}');
        expect(handleSelect).toHaveBeenCalledOnce();
    });

    it('should call onClick when action button is activated via Enter key', async () => {
        const handleClick = vi.fn();
        render(
            <Card.Root>
                <Card.Action>
                    <Card.ActionButton aria-label="Settings" onClick={handleClick}>
                        <svg />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>,
        );
        screen.getByRole('button', { name: 'Settings' }).focus();
        await userEvent.keyboard('{Enter}');
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should render actions inside the actions container', () => {
        render(
            <Card.Root>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
                <Card.Action>
                    <Card.ActionButton aria-label="Favorite">
                        <svg />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>,
        );
        const actionsContainer = screen.getByTestId('fondue-card-actions');
        expect(actionsContainer).toContainElement(screen.getByRole('button', { name: 'Favorite' }));
    });

    it('should not render the actions container when there are no actions', () => {
        render(
            <Card.Root>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.queryByTestId('fondue-card-actions')).not.toBeInTheDocument();
    });

    it('should render non-action children outside the actions container', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
                <Card.Action>
                    <Card.ActionButton aria-label="Settings">
                        <svg />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>,
        );
        const title = screen.getByText(CARD_TITLE_TEXT);
        const actionsContainer = screen.getByTestId('fondue-card-actions');
        expect(actionsContainer).not.toContainElement(title);
    });

    it('should call onNavigate when the link overlay is clicked', async () => {
        const handleNavigate = vi.fn();
        renderWithRouter(
            <Card.Root href="/page" onNavigate={handleNavigate} aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        await userEvent.click(screen.getByRole('link', { name: 'Card' }));
        expect(handleNavigate).toHaveBeenCalledOnce();
    });

    it('should call onNavigate with a modifier click without triggering internal navigation', () => {
        const handleNavigate = vi.fn();
        navigateStub.mockClear();
        renderWithRouter(
            <Card.Root href="/page" onNavigate={handleNavigate} aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        fireEvent.click(screen.getByRole('link', { name: 'Card' }), { metaKey: true });
        expect(handleNavigate).toHaveBeenCalledOnce();
        expect(navigateStub).not.toHaveBeenCalled();
    });

    it('should not call onNavigate when the card is selected (overlay is a button)', async () => {
        const handleNavigate = vi.fn();
        renderWithRouter(
            <Card.Root href="/page" onNavigate={handleNavigate} onSelect={() => {}} selected aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Card' }));
        expect(handleNavigate).not.toHaveBeenCalled();
    });

    it('should not navigate when onNavigate calls preventDefault', async () => {
        navigateStub.mockClear();
        renderWithRouter(
            <Card.Root href="/page" onNavigate={(event) => event.preventDefault()} aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        await userEvent.click(screen.getByRole('link', { name: 'Card' }));
        expect(navigateStub).not.toHaveBeenCalled();
    });

    it('should allow tabbing through interactive elements', async () => {
        const handleSelect = vi.fn();
        renderWithRouter(
            <Card.Root href="/page" onSelect={handleSelect} aria-label="Card">
                <Card.Action>
                    <Card.ActionButton aria-label="Settings">
                        <svg />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>,
        );
        await userEvent.tab();
        expect(screen.getByRole('link', { name: 'Card' })).toHaveFocus();
        await userEvent.tab();
        expect(screen.getByRole('button', { name: 'Select' })).toHaveFocus();
        await userEvent.tab();
        expect(screen.getByRole('button', { name: 'Settings' })).toHaveFocus();
    });
});
