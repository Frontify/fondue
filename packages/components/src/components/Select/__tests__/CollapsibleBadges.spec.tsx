/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { CollapsibleBadges } from '../components/CollapsibleBadges';

describe('CollapsibleBadges', () => {
    const defaultItems = [
        { value: 'a', displayValue: 'Alpha' },
        { value: 'b', displayValue: 'Beta' },
        { value: 'c', displayValue: 'Gamma' },
    ];

    it('renders placeholder when items are empty and no children', () => {
        const { container } = render(<CollapsibleBadges items={[]} placeholder="Pick something" onDismiss={vi.fn()} />);

        expect(container).toHaveTextContent('Pick something');
    });

    it('renders badges for each item', () => {
        render(<CollapsibleBadges items={defaultItems} onDismiss={vi.fn()} />);

        expect(screen.getByText('Alpha')).toBeInTheDocument();
        expect(screen.getByText('Beta')).toBeInTheDocument();
        expect(screen.getByText('Gamma')).toBeInTheDocument();
    });

    it('calls onDismiss with the item value when a badge is dismissed', async () => {
        const onDismiss = vi.fn();
        const user = userEvent.setup();

        render(<CollapsibleBadges items={[{ value: 'a', displayValue: 'Alpha' }]} onDismiss={onDismiss} />);

        const dismissButton = screen.getByRole('button', { name: /Alpha/i });
        await user.click(dismissButton);

        expect(onDismiss).toHaveBeenCalledWith('a', true);
    });

    it('renders children when provided', () => {
        render(
            <CollapsibleBadges items={[]} onDismiss={vi.fn()}>
                <input data-test-id="child-input" placeholder="Search" />
            </CollapsibleBadges>,
        );

        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    it('renders screen reader announcement for selected count', () => {
        render(<CollapsibleBadges items={defaultItems} onDismiss={vi.fn()} selectedCount={3} />);

        expect(screen.getByText('3 items selected')).toBeInTheDocument();
    });

    it('renders singular screen reader announcement for 1 item', () => {
        render(
            <CollapsibleBadges items={[{ value: 'a', displayValue: 'Alpha' }]} onDismiss={vi.fn()} selectedCount={1} />,
        );

        expect(screen.getByText('1 item selected')).toBeInTheDocument();
    });

    it('renders empty screen reader announcement for 0 selected count', () => {
        const { container } = render(<CollapsibleBadges items={defaultItems} onDismiss={vi.fn()} selectedCount={0} />);

        const liveRegion = container.querySelector('[aria-live="polite"]');
        expect(liveRegion).toBeInTheDocument();
        expect(liveRegion).toHaveTextContent('');
    });

    it('does not render placeholder when items are present', () => {
        const { container } = render(
            <CollapsibleBadges items={defaultItems} placeholder="Pick something" onDismiss={vi.fn()} />,
        );

        expect(container).not.toHaveTextContent('Pick something');
    });

    it('stops event propagation when dismissing a badge', async () => {
        const onDismiss = vi.fn();
        const outerClick = vi.fn();
        const user = userEvent.setup();

        render(
            <div onClick={outerClick}>
                <CollapsibleBadges items={[{ value: 'a', displayValue: 'Alpha' }]} onDismiss={onDismiss} />
            </div>,
        );

        const dismissButton = screen.getByRole('button', { name: /Alpha/i });
        await user.click(dismissButton);

        expect(onDismiss).toHaveBeenCalledWith('a', true);
        expect(outerClick).not.toHaveBeenCalled();
    });
});
