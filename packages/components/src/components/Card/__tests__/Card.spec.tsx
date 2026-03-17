/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Card } from '../Card';

const CARD_TEST_ID = 'test-card';
const CARD_TITLE_TEXT = 'Card Title';
const CARD_DESCRIPTION_TEXT = 'Card Description';

describe('Card Component', () => {
    it('should render the card root', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID)).toBeInTheDocument();
    });

    it('should render title text correctly', () => {
        render(
            <Card.Root>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByText(CARD_TITLE_TEXT)).toBeInTheDocument();
    });

    it('should render description text correctly', () => {
        render(
            <Card.Root>
                <Card.Description>{CARD_DESCRIPTION_TEXT}</Card.Description>
            </Card.Root>,
        );
        expect(screen.getByText(CARD_DESCRIPTION_TEXT)).toBeInTheDocument();
    });

    it('should render banner with image', () => {
        render(
            <Card.Root>
                <Card.Banner size="large">
                    <Card.BannerImage src="https://example.com/image.jpg" alt="Test image" fit="cover" />
                </Card.Banner>
            </Card.Root>,
        );
        expect(screen.getByAltText('Test image')).toBeInTheDocument();
    });

    it('should render banner icon', () => {
        render(
            <Card.Root>
                <Card.Banner>
                    <Card.BannerIcon>
                        <svg />
                    </Card.BannerIcon>
                </Card.Banner>
            </Card.Root>,
        );
        expect(screen.getByTestId('fondue-card-banner-icon')).toBeInTheDocument();
    });

    it('should render badges', () => {
        render(
            <Card.Root>
                <Card.Badges>
                    <span>Badge content</span>
                </Card.Badges>
            </Card.Root>,
        );
        expect(screen.getByText('Badge content')).toBeInTheDocument();
    });

    it('should render thumbnail image', () => {
        render(
            <Card.Root>
                <Card.ThumbnailImage src="https://example.com/thumb.jpg" alt="Thumbnail" />
            </Card.Root>,
        );
        expect(screen.getByAltText('Thumbnail')).toBeInTheDocument();
    });

    it('should render thumbnail icon', () => {
        render(
            <Card.Root>
                <Card.ThumbnailIcon>
                    <svg />
                </Card.ThumbnailIcon>
            </Card.Root>,
        );
        expect(screen.getByTestId('fondue-card-thumbnail-icon')).toBeInTheDocument();
    });

    it('should render action button with aria-label', () => {
        render(
            <Card.Root>
                <Card.Action>
                    <Card.ActionButton aria-label="Settings">
                        <svg data-testid="settings-icon" />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>,
        );
        expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
    });

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
        render(
            <Card.Root href="/some-page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link')).toHaveAttribute('href', '/some-page');
    });

    it('should set data-interactive to true when href is provided', () => {
        render(
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
        render(
            <Card.Root selected href="/page" onSelect={() => {}} aria-label="Go to page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        // When selected with onSelect, the overlay is a button, not a link
        expect(screen.queryByRole('link')).not.toBeInTheDocument();
    });

    it('should render a checkbox when both href and onSelect are provided', () => {
        const handleClick = vi.fn();
        render(
            <Card.Root href="/page" onSelect={handleClick} aria-label="Go to page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link', { name: 'Go to page' })).toHaveAttribute('href', '/page');
        expect(screen.getByRole('button', { name: 'Select' })).toBeInTheDocument();
    });

    it('should call onSelect on the checkbox when both href and onSelect are provided', async () => {
        const handleClick = vi.fn();
        render(
            <Card.Root href="/page" onSelect={handleClick} aria-label="Go to page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Select' }));
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should not render a checkbox when only href is provided', () => {
        render(
            <Card.Root href="/page" aria-label="Go to page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link')).toBeInTheDocument();
        expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('should render link overlay when not selected and both href and onClick are provided', () => {
        render(
            <Card.Root href="/page" onSelect={() => {}} selected={false} aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link', { name: 'Card' })).toHaveAttribute('href', '/page');
    });

    it('should render button overlay when selected and both href and onClick are provided', () => {
        const handleClick = vi.fn();
        render(
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
        render(
            <Card.Root href="/page" onSelect={handleClick} selected aria-label="Card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Card' }));
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should have data-selected true when selected with onSelect', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" selected onSelect={() => {}}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.selected).toBe('true');
    });

    it('should have data-selected false when not selected', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" selected={false} onSelect={() => {}}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.selected).toBe('false');
    });

    it('should set data-selectable to true when onSelect is provided', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID} href="/page" onSelect={() => {}}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.selectable).toBe('true');
    });

    it('should set data-selectable to false when only href is provided', () => {
        render(
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

    it('should render banner with small size', () => {
        render(
            <Card.Root>
                <Card.Banner size="small" data-test-id="banner">
                    <Card.BannerImage src="https://example.com/image.jpg" alt="Small banner" />
                </Card.Banner>
            </Card.Root>,
        );
        expect(screen.getByTestId('banner').dataset.size).toBe('small');
    });

    it('should render multiple action buttons', () => {
        render(
            <Card.Root>
                <Card.Action>
                    <Card.ActionButton aria-label="Favorite">
                        <svg />
                    </Card.ActionButton>
                </Card.Action>
                <Card.Action>
                    <Card.ActionButton aria-label="Settings">
                        <svg />
                    </Card.ActionButton>
                </Card.Action>
            </Card.Root>,
        );
        expect(screen.getByRole('button', { name: 'Favorite' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Settings' })).toBeInTheDocument();
    });
});
