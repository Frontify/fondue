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

test.describe('TreeRow non-draggable rows', () => {
    test('marks a row with isDraggable={false} as draggable="false" and drops its grab handle', async ({ mount }) => {
        const component = await mount(
            <Tree.Root reorderable>
                <Tree.Item id="1" isDraggable={false}>
                    <Tree.Label>Fixed</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Movable</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const fixedRow = component.getByRole('treeitem', { name: /Fixed/ });
        await expect(fixedRow).toHaveAttribute('draggable', 'false');
        const handle = fixedRow.locator('[data-hidden="true"]');
        await expect(handle).toHaveCount(1);
        await expect(handle.locator('svg')).toHaveCount(0);
        await expect(component.getByRole('treeitem', { name: /Movable/ })).toHaveAttribute('draggable', 'true');
    });

    test('describes a fixed row with the checkbox hint only, the movable row with both', async ({ mount }) => {
        const component = await mount(
            <Tree.Root multiSelect reorderable>
                <Tree.Item id="1" isDraggable={false}>
                    <Tree.Label>Fixed</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Movable</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const describedByText = async (name: RegExp) => {
            const ids = ((await component.getByRole('treeitem', { name }).getAttribute('aria-describedby')) ?? '')
                .split(' ')
                .filter(Boolean);
            const texts = await Promise.all(ids.map((id) => component.locator(`[id="${id}"]`).textContent()));
            return { ids, text: texts.join(' ') };
        };

        const movable = await describedByText(/Movable/);
        expect(movable.ids).toHaveLength(2);
        expect(movable.text).toContain('press Tab to focus the checkbox');
        expect(movable.text).toContain('Press Control Shift D to move');

        const fixed = await describedByText(/Fixed/);
        expect(fixed.ids).toHaveLength(1);
        expect(fixed.text).toContain('press Tab to focus the checkbox');
        expect(fixed.text).not.toContain('Press Control Shift D to move');
    });

    test('leaves a fixed row undescribed in a reorderable single-select tree', async ({ mount }) => {
        const component = await mount(
            <Tree.Root reorderable>
                <Tree.Item id="1" isDraggable={false}>
                    <Tree.Label>Fixed</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Movable</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await expect(component.getByRole('treeitem', { name: /Fixed/ })).not.toHaveAttribute('aria-describedby');
        await expect(component.getByRole('treeitem', { name: /Movable/ })).toHaveAttribute('aria-describedby', /.+/);
    });

    test('still fires onClick on a row with isDraggable={false}', async ({ mount }) => {
        let clicks = 0;
        const component = await mount(
            <Tree.Root reorderable>
                <Tree.Item id="1" isDraggable={false} onClick={() => (clicks += 1)}>
                    <Tree.Label>Fixed</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await component.getByRole('treeitem', { name: /Fixed/ }).click();
        expect(clicks).toBe(1);
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
