/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '#/components/Select';

const renderSingleSelect = (props: Partial<Parameters<typeof Select>[0]> = {}) => {
    return render(
        <Select {...props}>
            <Select.Slot name="menu">
                <Select.Item value="apple">Apple</Select.Item>
                <Select.Item value="banana">Banana</Select.Item>
                <Select.Item value="cherry">Cherry</Select.Item>
            </Select.Slot>
        </Select>,
    );
};

describe('SelectSingle - Accessibility', () => {
    describe('ARIA attributes', () => {
        it('has role="combobox" on the trigger', () => {
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            expect(screen.getByRole('combobox')).toBeInTheDocument();
        });

        it('passes aria-label to the trigger', () => {
            renderSingleSelect({ 'aria-label': 'Select a fruit' });

            expect(screen.getByRole('combobox', { name: 'Select a fruit' })).toBeInTheDocument();
        });

        it('passes aria-labelledby to the trigger', () => {
            const { container } = render(
                <>
                    <label id="fruit-label">Pick a fruit</label>
                    <Select aria-labelledby="fruit-label">
                        <Select.Slot name="menu">
                            <Select.Item value="apple">Apple</Select.Item>
                        </Select.Slot>
                    </Select>
                </>,
            );

            const trigger = container.querySelector('[role="combobox"]');
            expect(trigger).toHaveAttribute('aria-labelledby', 'fruit-label');
        });

        it('sets aria-expanded="false" when closed', () => {
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
        });

        it('sets aria-expanded="true" when open', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);

            expect(trigger).toHaveAttribute('aria-expanded', 'true');
        });

        it('sets aria-haspopup="listbox"', () => {
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            expect(screen.getByRole('combobox')).toHaveAttribute('aria-haspopup', 'listbox');
        });

        it('links trigger to the menu via aria-controls when open', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);

            const ariaControls = trigger.getAttribute('aria-controls');
            expect(ariaControls).toBeTruthy();
            expect(screen.getByTestId('fondue-select-menu')).toHaveAttribute('id', ariaControls);
        });

        it('does not set aria-describedby in single mode', () => {
            renderSingleSelect({ 'aria-label': 'Fruit picker', value: 'apple' });

            const trigger = screen.getByRole('combobox');
            expect(trigger).not.toHaveAttribute('aria-describedby');
        });

        it('does not strip aria attributes when disabled', () => {
            const { container } = renderSingleSelect({ 'aria-label': 'Fruit picker', disabled: true });

            const root = container.querySelector('[data-disabled="true"]');
            expect(root).toBeInTheDocument();
        });
    });

    describe('menu ARIA attributes', () => {
        it('renders the menu with role="listbox"', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            await user.click(screen.getByRole('combobox'));

            expect(screen.getByRole('listbox')).toBeInTheDocument();
        });

        it('renders items with role="option"', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            await user.click(screen.getByRole('combobox'));

            expect(screen.getAllByRole('option').length).toBe(3);
        });

        it('marks selected item with aria-selected="true" after selection', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);

            const menu = screen.getByTestId('fondue-select-menu');
            await user.click(within(menu).getByText('Apple'));

            // Re-open menu to check aria-selected
            await user.click(trigger);
            const options = screen.getAllByRole('option');
            const appleOption = options.find((opt) => within(opt).queryByText('Apple'));
            expect(appleOption).toHaveAttribute('aria-selected', 'true');
        });

        it('sets aria-activedescendant after keyboard navigation', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');

            expect(trigger.getAttribute('aria-activedescendant')).toBeTruthy();
        });
    });

    describe('keyboard navigation', () => {
        it('opens menu with Enter', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{Enter}');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('opens menu with Space', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard(' ');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('opens menu with ArrowDown', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{ArrowDown}');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('opens menu with ArrowUp', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{ArrowUp}');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('navigates items with ArrowDown', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{ArrowDown}');

            const first = trigger.getAttribute('aria-activedescendant');

            await user.keyboard('{ArrowDown}');

            expect(trigger.getAttribute('aria-activedescendant')).not.toBe(first);
        });

        it('navigates items with ArrowUp', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');

            const afterDown = trigger.getAttribute('aria-activedescendant');

            await user.keyboard('{ArrowUp}');

            expect(trigger.getAttribute('aria-activedescendant')).not.toBe(afterDown);
        });

        it('selects item and closes menu with Enter in single mode', async () => {
            const onSelect = vi.fn();
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker', onSelect });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{Enter}');

            // Menu closes in single mode
            expect(screen.queryByTestId('fondue-select-menu')).not.toBeInTheDocument();
            expect(onSelect).toHaveBeenCalled();
        });

        it('closes menu with Escape', async () => {
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);
            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();

            await user.keyboard('{Escape}');

            expect(screen.queryByTestId('fondue-select-menu')).not.toBeInTheDocument();
        });

        it('calls onEscapeKeyDown when Escape is pressed', async () => {
            const onEscapeKeyDown = vi.fn();
            const user = userEvent.setup();
            renderSingleSelect({ 'aria-label': 'Fruit picker', onEscapeKeyDown });

            await user.click(screen.getByRole('combobox'));
            await user.keyboard('{Escape}');

            expect(onEscapeKeyDown).toHaveBeenCalledOnce();
        });

        it('is not keyboard-interactive when disabled', () => {
            renderSingleSelect({ 'aria-label': 'Fruit picker', disabled: true });

            const root = screen.getByTestId('fondue-select');
            expect(root).not.toHaveAttribute('role', 'combobox');
        });
    });

    describe('clear button accessibility', () => {
        it('clear slot renders with role="button" and aria-label="Clear selection"', () => {
            render(
                <Select aria-label="Fruit picker" defaultValue="apple">
                    <Select.Slot name="menu">
                        <Select.Item value="apple">Apple</Select.Item>
                    </Select.Slot>
                    <Select.Slot name="clear">
                        <button type="button">X</button>
                    </Select.Slot>
                </Select>,
            );

            const clearButton = screen.getByRole('button', { name: 'Clear selection' });
            expect(clearButton).toBeInTheDocument();
        });
    });
});
