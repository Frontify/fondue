/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconImage } from '@frontify/fondue-icons';
import { expect, test } from '@playwright/experimental-ct-react';

import { Tree } from '../Tree';

/**
 * TreeRow is internal — exercised here through a minimal `<Tree.Root>` wrapper. Tests
 * focus on behavior owned by the row itself: ARIA contract, keyboard activation,
 * data-attribute outputs, icon slot, and action-area click insulation.
 */

test.describe('TreeRow', () => {
    test('exposes role="treeitem" with explicit aria-selected', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const row = component.getByRole('treeitem', { name: /Row/ });
        await expect(row).toHaveAttribute('aria-selected', 'false');
    });

    test('reflects aria-selected=true when isSelected is passed', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isSelected>
                    <Tree.Label>Selected</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem', { name: /Selected/ })).toHaveAttribute('aria-selected', 'true');
    });

    test('Enter on the focused row triggers a click', async ({ mount }) => {
        let clicks = 0;
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" onClick={() => (clicks += 1)}>
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const row = component.getByRole('treeitem', { name: /Row/ });
        await row.focus();
        await row.press('Enter');
        expect(clicks).toBe(1);
    });

    test('Space on the focused row triggers a click', async ({ mount }) => {
        let clicks = 0;
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" onClick={() => (clicks += 1)}>
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const row = component.getByRole('treeitem', { name: /Row/ });
        await row.focus();
        await row.press(' ');
        expect(clicks).toBe(1);
    });

    test('marks folder rows with data-folder="true"', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f">
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                    </Tree.FolderHeader>
                    <Tree.Item id="x">
                        <Tree.Label>X</Tree.Label>
                    </Tree.Item>
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.locator('[data-folder="true"]')).toHaveCount(1);
    });

    test('marks a selected row with data-selected="true" in single-select mode', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isSelected>
                    <Tree.Label>Selected</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Other</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.locator('[data-selected="true"]')).toHaveCount(1);
    });

    test('does not set data-selected in multi-select mode (checkbox is the cue)', async ({ mount }) => {
        const component = await mount(
            <Tree.Root multiSelect>
                <Tree.Item id="1" isSelected>
                    <Tree.Label>Checked</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.locator('[data-selected="true"]')).toHaveCount(0);
    });

    test('renders a <Tree.Icon> when given', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Icon>
                        <IconImage size={16} data-test-id="custom-icon" />
                    </Tree.Icon>
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.getByTestId('custom-icon')).toBeVisible();
    });

    test('renders no icon when <Tree.Icon> is omitted', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem', { name: /Row/ }).locator('svg')).toHaveCount(0);
    });
});

test.describe('TreeRow renaming', () => {
    test('swaps the label for a focused text input while isRenaming', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isRenaming onRename={() => {}}>
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const input = component.getByRole('textbox');
        await expect(input).toBeVisible();
        await expect(input).toHaveValue('Row');
        await expect(input).toBeFocused();
    });

    test('does not enter rename mode without an onRename handler', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isRenaming>
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.getByRole('textbox')).toHaveCount(0);
    });

    test('does not start renaming via the F2 hotkey', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" onRename={() => {}}>
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const row = component.getByRole('treeitem', { name: /Row/ });
        await row.focus();
        await row.press('F2');
        await expect(component.getByRole('textbox')).toHaveCount(0);
    });
});
