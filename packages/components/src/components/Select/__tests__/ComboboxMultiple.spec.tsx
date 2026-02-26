/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '#/components/Select';

const renderMultiCombobox = (props: Partial<Parameters<typeof Select.Combobox.Multiple>[0]> = {}) => {
    return render(
        <Select.Combobox.Multiple aria-label="Test combobox" {...props}>
            <Select.Slot name="menu">
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="banana">Banana</Select.Item>
                <Select.Item value="cherry">Cherry</Select.Item>
            </Select.Slot>
        </Select.Combobox.Multiple>,
    );
};

const getMenuOption = (name: string): HTMLElement => {
    const menu = screen.getByTestId('fondue-select-menu');
    return within(menu).getByText(name);
};

/** Returns only the dismissable selection badges (excludes the overflow "+N" badge). */
const getDismissableBadges = (): HTMLElement[] => {
    return screen.getAllByTestId('badge').filter((el) => el.getAttribute('data-dismissable') === 'true');
};

describe('ComboboxMultiple', () => {
    describe('rendering', () => {
        it('renders the combobox input', () => {
            renderMultiCombobox();

            expect(screen.getByRole('combobox', { name: 'Test combobox' })).toBeInTheDocument();
        });

        it('renders with placeholder when no items are selected', () => {
            renderMultiCombobox({ placeholder: 'Search fruits...' });

            expect(screen.getByPlaceholderText('Search fruits...')).toBeInTheDocument();
        });

        it('hides placeholder when items are selected', () => {
            renderMultiCombobox({ placeholder: 'Search fruits...', value: ['apple'] });

            expect(screen.getByRole('combobox')).toHaveAttribute('placeholder', '');
        });
    });

    describe('uncontrolled selection', () => {
        it('selects an item when clicked', async () => {
            const user = userEvent.setup();
            renderMultiCombobox();

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.click(getMenuOption('Apple'));

            const badges = getDismissableBadges();
            expect(badges.length).toBe(1);
        });

        it('selects multiple items', async () => {
            const user = userEvent.setup();
            renderMultiCombobox();

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.click(getMenuOption('Apple'));
            await user.click(getMenuOption('Banana'));

            const badges = getDismissableBadges();
            expect(badges.length).toBe(2);
        });

        it('keeps menu open after selecting an item in multiple mode', async () => {
            const user = userEvent.setup();
            renderMultiCombobox();

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.click(getMenuOption('Apple'));

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('clears the input text after selecting an item', async () => {
            const user = userEvent.setup();
            renderMultiCombobox();

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.type(input, 'App');
            await user.click(getMenuOption('Apple'));

            expect(input).toHaveValue('');
        });
    });

    describe('controlled mode', () => {
        it('renders badges for controlled selected values', () => {
            renderMultiCombobox({ value: ['apple', 'banana'] });

            const badges = getDismissableBadges();
            expect(badges.length).toBe(2);
        });

        it('calls onSelect when an item is selected', async () => {
            const onSelect = vi.fn();
            const user = userEvent.setup();
            renderMultiCombobox({ value: [], onSelect });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.click(getMenuOption('Apple'));

            expect(onSelect).toHaveBeenCalled();
        });

        it('calls onSelect when an item is deselected', async () => {
            const onSelect = vi.fn();
            const user = userEvent.setup();
            renderMultiCombobox({ value: ['apple'], onSelect });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.click(getMenuOption('Apple'));

            expect(onSelect).toHaveBeenCalled();
        });
    });

    describe('defaultValue', () => {
        it('initializes with defaultValue items as badges', () => {
            renderMultiCombobox({ defaultValue: ['apple', 'cherry'] });

            const badges = getDismissableBadges();
            expect(badges.length).toBe(2);
        });
    });

    describe('filtering', () => {
        it('filters items based on typed text', async () => {
            const user = userEvent.setup();
            renderMultiCombobox();

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.type(input, 'Ban');

            const menu = screen.getByTestId('fondue-select-menu');
            expect(within(menu).getByText('Banana')).toBeInTheDocument();
            expect(within(menu).queryByText('Cherry')).not.toBeInTheDocument();
        });
    });

    describe('accessibility', () => {
        it('has aria-label on the combobox input', () => {
            renderMultiCombobox();

            expect(screen.getByRole('combobox', { name: 'Test combobox' })).toBeInTheDocument();
        });

        it('announces selected count to screen readers', () => {
            renderMultiCombobox({ value: ['apple', 'banana'] });

            expect(screen.getByText('2 items selected')).toBeInTheDocument();
        });

        it('includes aria-describedby for selection description', () => {
            renderMultiCombobox({ value: ['apple', 'banana'] });

            expect(screen.getByText('2 selected: Apple, Banana')).toBeInTheDocument();
        });
    });

    describe('disabled state', () => {
        it('disables the combobox input when disabled prop is true', () => {
            renderMultiCombobox({ disabled: true });

            expect(screen.getByRole('combobox')).toBeDisabled();
        });
    });

    describe('clear functionality', () => {
        it('clears all selections when clear button is clicked', async () => {
            const onSelect = vi.fn();
            const user = userEvent.setup();

            render(
                <Select.Combobox.Multiple
                    aria-label="Test combobox"
                    defaultValue={['apple', 'banana']}
                    onSelect={onSelect}
                >
                    <Select.Slot name="menu">
                        <Select.Item value="apple">Apple</Select.Item>
                        <Select.Item value="banana">Banana</Select.Item>
                    </Select.Slot>
                    <Select.Slot name="clear">
                        <button type="button">Clear all</button>
                    </Select.Slot>
                </Select.Combobox.Multiple>,
            );

            await user.click(screen.getByText('Clear all'));

            expect(onSelect).toHaveBeenCalledWith([]);
        });
    });

    describe('badge dismissal', () => {
        it('removes an item when its badge dismiss button is clicked', async () => {
            const onSelect = vi.fn();
            const user = userEvent.setup();
            renderMultiCombobox({ defaultValue: ['apple', 'banana'], onSelect });

            const dismissButton = screen.getByRole('button', { name: /Dismiss Apple/i });
            await user.click(dismissButton);

            expect(onSelect).toHaveBeenCalled();
        });
    });
});
