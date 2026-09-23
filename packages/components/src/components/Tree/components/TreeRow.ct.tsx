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

test.describe('TreeRow column order', () => {
    const nestedTree = (
        <Tree.Root reorderable>
            <Tree.Folder id="outer" isExpanded>
                <Tree.FolderHeader>
                    <Tree.Label>Outer</Tree.Label>
                </Tree.FolderHeader>
                <Tree.Folder id="inner" isExpanded>
                    <Tree.FolderHeader>
                        <Tree.Label>Inner</Tree.Label>
                    </Tree.FolderHeader>
                    <Tree.Item id="leaf">
                        <Tree.Label>Leaf</Tree.Label>
                    </Tree.Item>
                </Tree.Folder>
            </Tree.Folder>
        </Tree.Root>
    );

    test('renders the grab handle to the right of the indent', async ({ mount }) => {
        const component = await mount(nestedTree);

        const row = component.getByRole('treeitem', { name: /Inner/ });
        const handleBox = await row.locator('span[class*="handle"]').boundingBox();
        const indentBox = await row.locator('[class*="indent"]').boundingBox();
        if (handleBox === null || indentBox === null) {
            throw new Error('the level-1 row did not render both an indent and a handle');
        }

        expect(handleBox.x).toBeGreaterThan(indentBox.x + indentBox.width);
    });

    test('keeps the handle outside the reparent zone of its level', async ({ mount }) => {
        const component = await mount(nestedTree);

        // 32px: level 2 times INDENT_STEP_PX, the reparent boundary headless-tree uses.
        const row = component.getByRole('treeitem', { name: /Leaf/ });
        const handleBox = await row.locator('span[class*="handle"]').boundingBox();
        const rowBox = await row.boundingBox();
        if (handleBox === null || rowBox === null) {
            throw new Error('the level-2 row did not render a handle');
        }

        expect(handleBox.x - rowBox.x).toBeGreaterThanOrEqual(2 * 16);
    });
});
