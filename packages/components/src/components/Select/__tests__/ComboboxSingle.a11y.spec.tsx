/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '#/components/Select';

const renderSingleCombobox = (props: Partial<Parameters<typeof Select.Combobox>[0]> = {}) => {
    return render(
        <Select.Combobox {...props}>
            <Select.Slot name="menu">
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="banana">Banana</Select.Item>
                <Select.Item value="cherry">Cherry</Select.Item>
            </Select.Slot>
        </Select.Combobox>,
    );
};

describe('ComboboxSingle - Accessibility', () => {
    describe('ARIA attributes', () => {
        it('has role="combobox" on the input', () => {
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            expect(screen.getByRole('combobox')).toBeInTheDocument();
        });

        it('passes aria-label to the input', () => {
            renderSingleCombobox({ 'aria-label': 'Search fruits' });

            expect(screen.getByRole('combobox', { name: 'Search fruits' })).toBeInTheDocument();
        });

        it('passes aria-labelledby to the input', () => {
            render(
                <>
                    <label id="fruit-label" htmlFor="fruit-combobox">
                        Pick a fruit
                    </label>
                    <Select.Combobox id="fruit-combobox" aria-labelledby="fruit-label">
                        <Select.Slot name="menu">
                            <Select.Item value="apple">Apple</Select.Item>
                        </Select.Slot>
                    </Select.Combobox>
                </>,
            );

            expect(screen.getByRole('combobox')).toHaveAttribute('aria-labelledby', 'fruit-label');
        });

        it('sets aria-expanded="false" when closed', () => {
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
        });

        it('sets aria-expanded="true" when open', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);

            expect(input).toHaveAttribute('aria-expanded', 'true');
        });

        it('sets aria-autocomplete="list" on the input', () => {
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            expect(screen.getByRole('combobox')).toHaveAttribute('aria-autocomplete', 'list');
        });

        it('links input to the menu via aria-controls', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);

            const ariaControls = input.getAttribute('aria-controls');
            expect(ariaControls).toBeTruthy();
            expect(screen.getByTestId('fondue-select-menu')).toHaveAttribute('id', ariaControls);
        });

        it('does not set aria-describedby in single mode', () => {
            renderSingleCombobox({ 'aria-label': 'Fruit picker', value: 'apple' });

            expect(screen.getByRole('combobox')).not.toHaveAttribute('aria-describedby');
        });
    });

    describe('menu ARIA attributes', () => {
        it('renders the menu with role="listbox"', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            await user.click(screen.getByRole('combobox'));

            expect(screen.getByRole('listbox')).toBeInTheDocument();
        });

        it('renders items with role="option"', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            await user.click(screen.getByRole('combobox'));

            expect(screen.getAllByRole('option').length).toBe(3);
        });

        it('marks selected item with aria-selected="true"', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);

            const menu = screen.getByTestId('fondue-select-menu');
            await user.click(within(menu).getByText('Apple'));

            // Re-open to check selection state
            await user.click(input);
            const options = screen.getAllByRole('option');
            const appleOption = options.find((opt) => within(opt).queryByText('Apple'));
            expect(appleOption).toHaveAttribute('aria-selected', 'true');
        });

        it('tracks active descendant with aria-activedescendant', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);

            expect(input.getAttribute('aria-activedescendant')).toBeTruthy();
        });
    });

    describe('keyboard navigation', () => {
        it('opens menu when typing', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.type(input, 'a');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('opens menu with ArrowDown', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            input.focus();
            await user.keyboard('{ArrowDown}');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('navigates items with ArrowDown', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);

            const first = input.getAttribute('aria-activedescendant');
            await user.keyboard('{ArrowDown}');

            expect(input.getAttribute('aria-activedescendant')).not.toBe(first);
        });

        it('navigates items with ArrowUp', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');

            const afterDown = input.getAttribute('aria-activedescendant');
            await user.keyboard('{ArrowUp}');

            expect(input.getAttribute('aria-activedescendant')).not.toBe(afterDown);
        });

        it('selects item and closes menu with Enter in single mode', async () => {
            const onSelect = vi.fn();
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker', onSelect });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.keyboard('{Enter}');

            // Menu closes in single mode
            expect(screen.queryByTestId('fondue-select-menu')).not.toBeInTheDocument();
            expect(onSelect).toHaveBeenCalled();
        });

        it('closes menu with Escape', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);
            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();

            await user.keyboard('{Escape}');

            expect(screen.queryByTestId('fondue-select-menu')).not.toBeInTheDocument();
        });

        it('calls onEscapeKeyDown callback', async () => {
            const onEscapeKeyDown = vi.fn();
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker', onEscapeKeyDown });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.keyboard('{Escape}');

            expect(onEscapeKeyDown).toHaveBeenCalledOnce();
        });

        it('filters items as user types', async () => {
            const user = userEvent.setup();
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            const input = screen.getByRole('combobox');
            await user.click(input);
            await user.type(input, 'Ban');

            const menu = screen.getByTestId('fondue-select-menu');
            expect(within(menu).getByText('Banana')).toBeInTheDocument();
            expect(within(menu).queryByText('Cherry')).not.toBeInTheDocument();
        });

        it('disables input when disabled prop is set', () => {
            renderSingleCombobox({ 'aria-label': 'Fruit picker', disabled: true });

            expect(screen.getByRole('combobox')).toBeDisabled();
        });
    });

    describe('toggle button accessibility', () => {
        it('has a toggle button with accessible label', () => {
            renderSingleCombobox({ 'aria-label': 'Fruit picker' });

            // Downshift's toggle button has aria-label "toggle menu"
            const toggleButtons = screen.getAllByRole('button');
            const toggleButton = toggleButtons.find((btn) =>
                btn.getAttribute('aria-label')?.toLowerCase().includes('toggle'),
            );
            expect(toggleButton).toBeInTheDocument();
        });
    });

    describe('clear button accessibility', () => {
        it('clear slot has role="button" and aria-label="Clear selection"', () => {
            render(
                <Select.Combobox aria-label="Fruit picker" defaultValue="apple">
                    <Select.Slot name="menu">
                        <Select.Item value="apple">Apple</Select.Item>
                    </Select.Slot>
                    <Select.Slot name="clear">
                        <button type="button">X</button>
                    </Select.Slot>
                </Select.Combobox>,
            );

            const clearButton = screen.getByRole('button', { name: 'Clear selection' });
            expect(clearButton).toBeInTheDocument();
        });
    });
});
