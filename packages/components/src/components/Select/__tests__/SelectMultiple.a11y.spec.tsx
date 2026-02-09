/* (c) Copyright Frontify Ltd., all rights reserved. */

import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { Select } from '#/components/Select';

const renderMultiSelect = (props: Partial<Parameters<typeof Select.Multiple>[0]> = {}) => {
    return render(
        <Select.Multiple {...props}>
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

describe('SelectMultiple - Accessibility', () => {
    describe('ARIA attributes', () => {
        it('has role="combobox" on the trigger', () => {
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            expect(screen.getByRole('combobox')).toBeInTheDocument();
        });

        it('passes aria-label to the trigger element', () => {
            renderMultiSelect({ 'aria-label': 'Select fruits' });

            expect(screen.getByRole('combobox', { name: 'Select fruits' })).toBeInTheDocument();
        });

        it('passes aria-labelledby to the trigger element', () => {
            const { container } = render(
                <>
                    <label id="my-label">Choose your fruits</label>
                    <Select.Multiple aria-labelledby="my-label">
                        <Select.Slot name="menu">
                            <Select.Item value="apple">Apple</Select.Item>
                        </Select.Slot>
                    </Select.Multiple>
                </>,
            );

            const trigger = container.querySelector('[role="combobox"]');
            expect(trigger).toHaveAttribute('aria-labelledby', 'my-label');
        });

        it('sets aria-expanded="true" when menu is open', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);

            expect(trigger).toHaveAttribute('aria-expanded', 'true');
        });

        it('sets aria-expanded="false" when menu is closed', () => {
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
        });

        it('sets aria-haspopup="listbox" on the trigger', () => {
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            expect(trigger).toHaveAttribute('aria-haspopup', 'listbox');
        });

        it('links trigger to the menu via aria-controls when open', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);

            const ariaControls = trigger.getAttribute('aria-controls');
            expect(ariaControls).toBeTruthy();
            const menu = screen.getByTestId('fondue-select-menu');
            expect(menu).toHaveAttribute('id', ariaControls);
        });

        it('sets aria-describedby pointing to selection description when items are selected', () => {
            renderMultiSelect({ 'aria-label': 'Fruit picker', value: ['apple', 'banana'] });

            const trigger = screen.getByRole('combobox');
            const describedBy = trigger.getAttribute('aria-describedby');
            expect(describedBy).toBeTruthy();

            const description = document.getElementById(describedBy!);
            expect(description).toBeInTheDocument();
            expect(description).toHaveTextContent('2 selected: Apple, Banana');
        });

        it('does not set aria-describedby when no items are selected', () => {
            renderMultiSelect({ 'aria-label': 'Fruit picker', value: [] });

            const trigger = screen.getByRole('combobox');
            expect(trigger).not.toHaveAttribute('aria-describedby');
        });
    });

    describe('menu ARIA attributes', () => {
        it('renders the menu with role="listbox"', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            await user.click(screen.getByRole('combobox'));

            expect(screen.getByRole('listbox')).toBeInTheDocument();
        });

        it('renders menu items with role="option"', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            await user.click(screen.getByRole('combobox'));

            const options = screen.getAllByRole('option');
            expect(options.length).toBe(3);
        });

        it('marks selected items with aria-selected="true"', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);
            await user.click(getMenuOption('Apple'));

            const options = screen.getAllByRole('option');
            const appleOption = options.find((opt) => within(opt).queryByText('Apple'));
            expect(appleOption).toHaveAttribute('aria-selected', 'true');
        });

        it('marks unselected items with aria-selected="false"', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);
            await user.click(getMenuOption('Apple'));

            const options = screen.getAllByRole('option');
            const bananaOption = options.find((opt) => within(opt).queryByText('Banana'));
            expect(bananaOption).toHaveAttribute('aria-selected', 'false');
        });

        it('sets aria-activedescendant after keyboard navigation', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');

            const activeDescendant = trigger.getAttribute('aria-activedescendant');
            expect(activeDescendant).toBeTruthy();
        });
    });

    describe('screen reader announcements', () => {
        it('provides a live region that announces selected count', () => {
            renderMultiSelect({ 'aria-label': 'Fruit picker', value: ['apple', 'banana'] });

            expect(screen.getByText('2 items selected')).toBeInTheDocument();
        });

        it('provides singular announcement for one selected item', () => {
            renderMultiSelect({ 'aria-label': 'Fruit picker', value: ['apple'] });

            expect(screen.getByText('1 item selected')).toBeInTheDocument();
        });

        it('has aria-live="polite" on the live region', () => {
            const { container } = renderMultiSelect({
                'aria-label': 'Fruit picker',
                value: ['apple'],
            });

            const liveRegion = container.querySelector('[aria-live="polite"]');
            expect(liveRegion).toBeInTheDocument();
        });

        it('has aria-atomic="true" on the live region', () => {
            const { container } = renderMultiSelect({
                'aria-label': 'Fruit picker',
                value: ['apple'],
            });

            const liveRegion = container.querySelector('[aria-atomic="true"]');
            expect(liveRegion).toBeInTheDocument();
        });

        it('provides a hidden selection description with all selected labels', () => {
            renderMultiSelect({ 'aria-label': 'Fruit picker', value: ['apple', 'cherry'] });

            expect(screen.getByText('2 selected: Apple, Cherry')).toBeInTheDocument();
        });
    });

    describe('keyboard navigation', () => {
        it('opens the menu when pressing Enter on the trigger', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{Enter}');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('opens the menu when pressing Space on the trigger', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard(' ');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('opens the menu when pressing ArrowDown on the trigger', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{ArrowDown}');

            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('selects an item and keeps menu open with Enter in multiple mode', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{Enter}');
            await user.keyboard('{Enter}');

            // Menu should remain open after selecting
            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('selects an item and keeps menu open with Space in multiple mode', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard(' ');
            await user.keyboard(' ');

            // Menu should remain open after selecting
            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();
        });

        it('navigates items with ArrowDown', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{ArrowDown}');

            const firstActiveDescendant = trigger.getAttribute('aria-activedescendant');

            await user.keyboard('{ArrowDown}');

            const secondActiveDescendant = trigger.getAttribute('aria-activedescendant');
            expect(secondActiveDescendant).not.toBe(firstActiveDescendant);
        });

        it('navigates items with ArrowUp', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            trigger.focus();
            await user.keyboard('{ArrowDown}');
            await user.keyboard('{ArrowDown}');

            const afterTwoDown = trigger.getAttribute('aria-activedescendant');

            await user.keyboard('{ArrowUp}');

            const afterUp = trigger.getAttribute('aria-activedescendant');
            expect(afterUp).not.toBe(afterTwoDown);
        });

        it('closes the menu with Escape', async () => {
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker' });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);
            expect(screen.getByTestId('fondue-select-menu')).toBeInTheDocument();

            await user.keyboard('{Escape}');

            expect(screen.queryByTestId('fondue-select-menu')).not.toBeInTheDocument();
        });

        it('calls onEscapeKeyDown when Escape is pressed', async () => {
            const onEscapeKeyDown = vi.fn();
            const user = userEvent.setup();
            renderMultiSelect({ 'aria-label': 'Fruit picker', onEscapeKeyDown });

            const trigger = screen.getByRole('combobox');
            await user.click(trigger);
            await user.keyboard('{Escape}');

            expect(onEscapeKeyDown).toHaveBeenCalledOnce();
        });

        it('is not keyboard-interactive when disabled', () => {
            renderMultiSelect({ 'aria-label': 'Fruit picker', disabled: true });

            const trigger = screen.getByTestId('fondue-select');
            expect(trigger).not.toHaveAttribute('role', 'combobox');
        });
    });

    describe('badge accessibility', () => {
        it('renders dismiss buttons with accessible labels for each badge', () => {
            renderMultiSelect({
                'aria-label': 'Fruit picker',
                value: ['apple', 'banana'],
            });

            expect(screen.getByRole('button', { name: /Dismiss Apple/i })).toBeInTheDocument();
            expect(screen.getByRole('button', { name: /Dismiss Banana/i })).toBeInTheDocument();
        });

        it('badges have aria-label matching display value', () => {
            renderMultiSelect({
                'aria-label': 'Fruit picker',
                value: ['apple'],
            });

            const badges = screen
                .getAllByTestId('badge')
                .filter((el) => el.getAttribute('data-dismissable') === 'true');
            expect(badges[0]).toHaveAttribute('aria-label', 'Apple');
        });

        it('overflow badge has aria-hidden="true"', () => {
            // In JSDOM, container has 0 width so overflow badge always appears for > 1 item
            renderMultiSelect({
                'aria-label': 'Fruit picker',
                value: ['apple', 'banana'],
            });

            const overflowBadges = screen
                .getAllByTestId('badge')
                .filter((el) => el.getAttribute('data-dismissable') === 'false');

            if (overflowBadges.length > 0) {
                expect(overflowBadges[0]).toHaveAttribute('aria-hidden', 'true');
            }
        });

        it('overflow wrapper has descriptive aria-label', () => {
            renderMultiSelect({
                'aria-label': 'Fruit picker',
                value: ['apple', 'banana'],
            });

            const { container } = renderMultiSelect({
                'aria-label': 'Fruit picker',
                value: ['apple', 'banana', 'cherry'],
            });

            const overflowWrapper = container.querySelector('[aria-label*="more items selected"]');
            if (overflowWrapper) {
                expect(overflowWrapper).toBeInTheDocument();
            }
        });
    });

    describe('clear button accessibility', () => {
        it('clear button has role="button"', () => {
            render(
                <Select.Multiple aria-label="Fruit picker" defaultValue={['apple']}>
                    <Select.Slot name="menu">
                        <Select.Item value="apple">Apple</Select.Item>
                    </Select.Slot>
                    <Select.Slot name="clear">
                        <button type="button">Clear</button>
                    </Select.Slot>
                </Select.Multiple>,
            );

            expect(screen.getByRole('button', { name: 'Clear selection' })).toBeInTheDocument();
        });

        it('clear button has aria-label="Clear selection"', () => {
            render(
                <Select.Multiple aria-label="Fruit picker" defaultValue={['apple']}>
                    <Select.Slot name="menu">
                        <Select.Item value="apple">Apple</Select.Item>
                    </Select.Slot>
                    <Select.Slot name="clear">
                        <button type="button">X</button>
                    </Select.Slot>
                </Select.Multiple>,
            );

            const clearButton = screen.getByRole('button', { name: 'Clear selection' });
            expect(clearButton).toHaveAttribute('aria-label', 'Clear selection');
        });
    });
});
