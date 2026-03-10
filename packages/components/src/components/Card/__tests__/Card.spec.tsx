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

    it('should have selected state when selected is true', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID} selected={true} onClick={() => {}}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.selected).toBe('true');
    });

    it('should have data-selected false when selected is false', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID} selected={false} onClick={() => {}}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.selected).toBe('false');
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

    it('should render a button overlay when onClick is provided', () => {
        render(
            <Card.Root data-test-id={CARD_TEST_ID} onClick={() => {}}>
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByTestId(CARD_TEST_ID).dataset.interactive).toBe('true');
    });

    it('should render an anchor overlay when href is provided', () => {
        render(
            <Card.Root href="/some-page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link')).toHaveAttribute('href', '/some-page');
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

    it('should call onClick when the card overlay is clicked', async () => {
        const handleClick = vi.fn();
        render(
            <Card.Root onClick={handleClick} aria-label="Select card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        await userEvent.click(screen.getByRole('button', { name: 'Select card' }));
        expect(handleClick).toHaveBeenCalledOnce();
    });

    it('should set aria-pressed on button overlay when selected', () => {
        render(
            <Card.Root selected onClick={() => {}} aria-label="Select card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('button', { name: 'Select card' })).toHaveAttribute('aria-pressed', 'true');
    });

    it('should set aria-current on anchor overlay when selected', () => {
        render(
            <Card.Root selected href="/page" aria-label="Go to page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link', { name: 'Go to page' })).toHaveAttribute('aria-current', 'true');
    });

    it('should render a checkbox button when both href and onClick are provided', () => {
        const handleClick = vi.fn();
        render(
            <Card.Root href="/page" onClick={handleClick} aria-label="Go to page">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('link', { name: 'Go to page' })).toHaveAttribute('href', '/page');
        expect(screen.getByRole('button', { name: 'Select' })).toBeInTheDocument();
    });

    it('should call onClick on the checkbox when both href and onClick are provided', async () => {
        const handleClick = vi.fn();
        render(
            <Card.Root href="/page" onClick={handleClick} aria-label="Go to page">
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

    it('should not render a checkbox when only onClick is provided', () => {
        render(
            <Card.Root onClick={() => {}} aria-label="Select card">
                <Card.Title>{CARD_TITLE_TEXT}</Card.Title>
            </Card.Root>,
        );
        expect(screen.getByRole('button', { name: 'Select card' })).toBeInTheDocument();
        expect(screen.queryByRole('button', { name: 'Select' })).not.toBeInTheDocument();
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
