/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '#/components/Select';

const renderMultiSelect = (props: Partial<Parameters<typeof Select.Multiple>[0]> = {}) => {
    return render(
        <Select.Multiple aria-label="Test multiselect" {...props}>
            <Select.Slot name="menu">
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="banana">Banana</Select.Item>
                <Select.Item value="cherry">Cherry</Select.Item>
            </Select.Slot>
        </Select.Multiple>,
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

describe('SelectMultiple', () => {
    describe('rendering', () => {
        it('renders the select trigger', () => {
            renderMultiSelect();

            expect(screen.getByRole('combobox', { name: 'Test multiselect' })).toBeInTheDocument();
        });

        it('renders with placeholder', () => {
            renderMultiSelect({ placeholder: 'Choose fruits' });

            expect(screen.getByText('Choose fruits')).toBeInTheDocument();
        });
    });

    describe('uncontrolled selection', () => {
        it('selects an item when clicked', async () => {
            const user = userEvent.setup();
            renderMultiSelect();

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);
            await user.click(getMenuOption('Apple'));

            const badges = getDismissableBadges();
            expect(badges.length).toBe(1);
        });

        it('selects multiple items', async () => {
            const user = userEvent.setup();
            renderMultiSelect();

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);
            await user.click(getMenuOption('Apple'));
            await user.click(getMenuOption('Banana'));

            const badges = getDismissableBadges();
            expect(badges.length).toBe(2);
        });

        it('keeps menu open after selecting in multiple mode', async () => {
            const user = userEvent.setup();
            renderMultiSelect();

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);
            await user.click(getMenuOption('Apple'));

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });
    });

    describe('controlled mode', () => {
        it('renders controlled selected values as badges', () => {
            renderMultiSelect({ value: ['apple', 'banana'] });

            const badges = getDismissableBadges();
            expect(badges.length).toBe(2);
        });

        it('calls onSelect when an item is clicked', async () => {
            const onSelect = vi.fn();
            const user = userEvent.setup();
            renderMultiSelect({ value: ['apple'], onSelect });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);
            await user.click(getMenuOption('Banana'));

            expect(onSelect).toHaveBeenCalled();
        });
    });

    describe('defaultValue', () => {
        it('initializes with defaultValue items selected', () => {
            renderMultiSelect({ defaultValue: ['apple', 'cherry'] });

            const badges = getDismissableBadges();
            expect(badges.length).toBe(2);
        });
    });

    describe('accessibility', () => {
        it('has aria-label on the trigger', () => {
            renderMultiSelect();

            expect(screen.getByRole('combobox', { name: 'Test multiselect' })).toBeInTheDocument();
        });

        it('announces selected count to screen readers when items are selected', () => {
            renderMultiSelect({ value: ['apple', 'banana'] });

            expect(screen.getByText('2 items selected')).toBeInTheDocument();
        });

        it('announces screen reader description with labels', () => {
            renderMultiSelect({ value: ['apple', 'banana'] });

            expect(screen.getByText('2 selected: Apple, Banana')).toBeInTheDocument();
        });
    });

    describe('disabled state', () => {
        it('renders as disabled when disabled prop is true', () => {
            const { container } = renderMultiSelect({ disabled: true });

            const root = container.querySelector('[data-disabled="true"]');
            expect(root).toBeInTheDocument();
        });
    });

    describe('clear functionality', () => {
        it('clears all selections when clear button is clicked', async () => {
            const onSelect = vi.fn();
            const user = userEvent.setup();

            render(
                <Select.Multiple aria-label="Test multiselect" defaultValue={['apple', 'banana']} onSelect={onSelect}>
                    <Select.Slot name="menu">
                        <Select.Item value="apple">Apple</Select.Item>
                        <Select.Item value="banana">Banana</Select.Item>
                    </Select.Slot>
                    <Select.Slot name="clear">
                        <button type="button">Clear all</button>
                    </Select.Slot>
                </Select.Multiple>,
            );

            await user.click(screen.getByText('Clear all'));

            expect(onSelect).toHaveBeenCalledWith([]);
        });
    });
});
