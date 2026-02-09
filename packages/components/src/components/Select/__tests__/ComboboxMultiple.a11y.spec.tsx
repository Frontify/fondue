/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '#/components/Select';

const renderMultiCombobox = (props: Partial<Parameters<typeof Select.Combobox.Multiple>[0]> = {}) => {
    return render(
        <Select.Combobox.Multiple {...props}>
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

describe('ComboboxMultiple - Accessibility', () => {
    describe('ARIA attributes', () => {
        it('has role="combobox" on the input', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            expect(screen.getByRole('combobox')).toBeInTheDocument();
        });

        it('passes aria-label to the input element', () => {
            renderMultiCombobox({ 'aria-label': 'Search fruits' });

            expect(screen.getByRole('combobox', { name: 'Search fruits' })).toBeInTheDocument();
        });

        it('passes aria-labelledby to the input element', () => {
            render(
                <>
                    <label id="my-label">Choose your fruits</label>
                    <Select.Combobox.Multiple aria-labelledby="my-label">
                        <Select.Slot name="menu">
                            <Select.Item value="apple">Apple</Select.Item>
                        </Select.Slot>
                    </Select.Combobox.Multiple>
                </>,
            );

            const input = screen.getByRole('combobox');
            expect(input).toHaveAttribute('aria-labelledby', 'my-label');
        });

        it('sets aria-expanded="true" when menu is open', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);

            expect(input).toHaveAttribute('aria-expanded', 'true');
        });

        it('sets aria-expanded="false" when menu is closed', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            expect(input).toHaveAttribute('aria-expanded', 'false');
        });

        it('links input to the menu via aria-controls', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);

            const ariaControls = input.getAttribute('aria-controls');
            expect(ariaControls).toBeTruthy();
            const menu = screen.getByTestId('fondue-select-menu');
            expect(menu).toHaveAttribute('id', ariaControls);
        });

        it('sets aria-describedby pointing to selection description when items are selected', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker', value: ['apple', 'banana'] });

            const input = screen.getByRole('combobox');
            const describedBy = input.getAttribute('aria-describedby');
            expect(describedBy).toBeTruthy();

            const description = document.getElementById(describedBy!);
            expect(description).toBeInTheDocument();
            expect(description).toHaveTextContent('2 selected: Apple, Banana');
        });

        it('does not set aria-describedby when no items are selected', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker', value: [] });

            const input = screen.getByRole('combobox');
            expect(input).not.toHaveAttribute('aria-describedby');
        });

        it('sets aria-autocomplete="list" on the input', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            expect(input).toHaveAttribute('aria-autocomplete', 'list');
        });
    });

    describe('menu ARIA attributes', () => {
        it('renders the menu with role="listbox"', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            await user.click(screen.getByRole('combobox'));

            expect(screen.getByRole('listbox')).toBeInTheDocument();
        });

        it('renders menu items with role="option"', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            await user.click(screen.getByRole('combobox'));

            const options = screen.getAllByRole('option');
            expect(options.length).toBe(3);
        });

        it('marks selected items with aria-selected="true"', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.click(getMenuOption('Apple'));

            const options = screen.getAllByRole('option');
            const appleOption = options.find((opt) => within(opt).queryByText('Apple'));
            expect(appleOption).toHaveAttribute('aria-selected', 'true');
        });

        it('marks unselected items with aria-selected="false"', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.click(getMenuOption('Apple'));

            const options = screen.getAllByRole('option');
            const bananaOption = options.find((opt) => within(opt).queryByText('Banana'));
            expect(bananaOption).toHaveAttribute('aria-selected', 'false');
        });

        it('updates aria-activedescendant as highlight moves', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);

            const firstActive = input.getAttribute('aria-activedescendant');

            await user.keyboard('{ArrowDown}');

            const secondActive = input.getAttribute('aria-activedescendant');
            expect(secondActive).not.toBe(firstActive);
        });
    });

    describe('screen reader announcements', () => {
        it('has a live region with aria-live="polite"', () => {
            const { container } = renderMultiCombobox({
                'aria-label': 'Fruit picker',
                value: ['apple'],
            });

            const liveRegion = container.querySelector('[aria-live="polite"]');
            expect(liveRegion).toBeInTheDocument();
        });

        it('has aria-atomic="true" on the live region', () => {
            const { container } = renderMultiCombobox({
                'aria-label': 'Fruit picker',
                value: ['apple'],
            });

            const liveRegion = container.querySelector('[aria-atomic="true"]');
            expect(liveRegion).toBeInTheDocument();
        });

        it('announces singular count for one selected item', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker', value: ['apple'] });

            expect(screen.getByText('1 item selected')).toBeInTheDocument();
        });

        it('announces plural count for multiple selected items', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker', value: ['apple', 'banana'] });

            expect(screen.getByText('2 items selected')).toBeInTheDocument();
        });

        it('provides a hidden description listing all selected labels', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker', value: ['apple', 'cherry'] });

            expect(screen.getByText('2 selected: Apple, Cherry')).toBeInTheDocument();
        });
    });

    describe('keyboard navigation', () => {
        it('opens the menu when typing in the input', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.type(input, 'a');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('opens the menu when pressing ArrowDown', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            input.focus();
            await user.keyboard('{ArrowDown}');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('selects highlighted item with Enter and keeps menu open', async () => {
            const onSelect = vi.fn();
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker', onSelect });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.keyboard('{Enter}');

            // Menu should remain open in multiple mode
            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
            expect(onSelect).toHaveBeenCalled();
        });

        it('navigates items with ArrowDown', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);

            const firstActive = input.getAttribute('aria-activedescendant');

            await user.keyboard('{ArrowDown}');

            const secondActive = input.getAttribute('aria-activedescendant');
            expect(secondActive).not.toBe(firstActive);
        });

        it('navigates items with ArrowUp', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');

            const afterTwoDown = input.getAttribute('aria-activedescendant');

            await user.keyboard('{ArrowUp}');

            const afterUp = input.getAttribute('aria-activedescendant');
            expect(afterUp).not.toBe(afterTwoDown);
        });

        it('closes the menu with Escape', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);
            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();

            await user.keyboard('{Escape}');

            expect(screen.queryByTestId('fondue-select-menu')).not.toBeInTheDocument();
        });

        it('calls onEscapeKeyDown when Escape is pressed', async () => {
            const onEscapeKeyDown = vi.fn();
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker', onEscapeKeyDown });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.keyboard('{Escape}');

            expect(onEscapeKeyDown).toHaveBeenCalledOnce();
        });

        it('clears input text after selecting in multiple mode', async () => {
            const user = userEvent.setup();
            renderMultiCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.type(input, 'App');
            await user.keyboard('{Enter}');

            expect(input).toHaveValue('');
        });

        it('disables the input when disabled prop is set', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker', disabled: true });

            expect(screen.getByRole('combobox')).toBeDisabled();
        });
    });

    describe('badge accessibility', () => {
        it('each badge has a dismiss button with accessible label', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker', value: ['apple', 'banana'] });

            expect(screen.getByRole('button', { name: /Dismiss Apple/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Dismiss Banana/i })).toBeInTheDocument();
        });

        it('badges have aria-label matching the item label', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker', value: ['apple'] });

            const badges = screen
                .getAllByTestId('badge')
                .filter((el) => el.getAttribute('data-dismissable') === 'true');
            expect(badges[0]).toHaveAttribute('aria-label', 'Apple');
        });

        it('overflow badge has aria-hidden="true" to avoid confusion', () => {
            renderMultiCombobox({ 'aria-label': 'Fruit picker', value: ['apple', 'banana'] });

            const overflowBadges = screen
                .getAllByTestId('badge')
                .filter((el) => el.getAttribute('data-dismissable') === 'false');

            if (overflowBadges.length > 0) {
                expect(overflowBadges[0]).toHaveAttribute('aria-hidden', 'true');
            }
        });
    });

    describe('clear button accessibility', () => {
        it('clear button has aria-label="Clear selection"', () => {
            render(
                <Select.Combobox.Multiple aria-label="Fruit picker" defaultValue={['apple']}>
                    <Select.Slot name="menu">
                        <Select.Item value="apple">Apple</Select.Item>
                    </Select.Slot>
                    <Select.Slot name="clear">
                        <button type="button">X</button>
                    </Select.Slot>
                </Select.Combobox.Multiple>,
            );

            const clearButton = screen.getByRole('button', { name: 'Clear selection' });
            expect(clearButton).toHaveAttribute('aria-label', 'Clear selection');
        });
    });
});
