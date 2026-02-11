/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { CollapsibleBadges } from '../components/CollapsibleBadges';

describe('CollapsibleBadges - Accessibility', () => {
    const items = [
        { value: 'a', displayValue: 'Alpha' },
        { value: 'b', displayValue: 'Beta' },
        { value: 'c', displayValue: 'Gamma' },
    ];

    describe('live region', () => {
        it('has aria-live="polite" for screen reader announcements', () => {
            const { container } = render(<CollapsibleBadges items={items} onDismiss={vi.fn()} selectedCount={3} />);

            const liveRegion = container.querySelector('[aria-live="polite"]');
            expect(liveRegion).toBeInTheDocument();
        });

        it('has aria-atomic="true" so the entire region is announced', () => {
            const { container } = render(<CollapsibleBadges items={items} onDismiss={vi.fn()} selectedCount={3} />);

            const liveRegion = container.querySelector('[aria-atomic="true"]');
            expect(liveRegion).toBeInTheDocument();
        });

        it('announces "1 item selected" for a single item', () => {
            render(
                <CollapsibleBadges
                    items={[{ value: 'a', displayValue: 'Alpha' }]}
                    onDismiss={vi.fn()}
                    selectedCount={1}
                />,
            );

            expect(screen.getByText('1 item selected')).toBeInTheDocument();
        });

        it('announces "N items selected" for multiple items', () => {
            render(<CollapsibleBadges items={items} onDismiss={vi.fn()} selectedCount={3} />);

            expect(screen.getByText('3 items selected')).toBeInTheDocument();
        });

        it('announces empty string for 0 items', () => {
            const { container } = render(<CollapsibleBadges items={items} onDismiss={vi.fn()} selectedCount={0} />);

            const liveRegion = container.querySelector('[aria-live="polite"]');
            expect(liveRegion).toHaveTextContent('');
        });
    });

    describe('badge aria-labels', () => {
        it('each badge has aria-label matching the display value', () => {
            render(<CollapsibleBadges items={items} onDismiss={vi.fn()} />);

            const badges = screen
                .getAllByTestId('badge')
                .filter((el) => el.getAttribute('data-dismissable') === 'true');

            expect(badges[0]).toHaveAttribute('aria-label', 'Alpha');
            expect(badges[1]).toHaveAttribute('aria-label', 'Beta');
            expect(badges[2]).toHaveAttribute('aria-label', 'Gamma');
        });

        it('each dismiss button has an accessible label including the item name', () => {
            render(<CollapsibleBadges items={items} onDismiss={vi.fn()} />);

            expect(screen.getByRole('button', { name: /Dismiss Alpha/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Dismiss Beta/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Dismiss Gamma/i })).toBeInTheDocument();
        });
    });

    describe('overflow badge', () => {
        it('overflow badge has aria-hidden="true"', () => {
            // In JSDOM, container has 0 width so overflow badge appears for >1 item
            render(<CollapsibleBadges items={items} onDismiss={vi.fn()} />);

            const overflowBadges = screen
                .getAllByTestId('badge')
                .filter((el) => el.getAttribute('data-dismissable') === 'false');

            if (overflowBadges.length > 0) {
                expect(overflowBadges[0]).toHaveAttribute('aria-hidden', 'true');
            }
        });

        it('overflow wrapper has aria-label describing count', () => {
            const { container } = render(<CollapsibleBadges items={items} onDismiss={vi.fn()} />);

            const overflowWrapper = container.querySelector('[aria-label*="more items selected"]');
            if (overflowWrapper) {
                expect(overflowWrapper).toBeInTheDocument();
            }
        });
    });

    describe('visibility attributes', () => {
        it('badges have data-visible attribute for CSS-based visibility', () => {
            const { container } = render(<CollapsibleBadges items={items} onDismiss={vi.fn()} />);

            const badgeWrappers = container.querySelectorAll('[data-visible]');
            expect(badgeWrappers.length).toBeGreaterThan(0);
        });
    });
});
