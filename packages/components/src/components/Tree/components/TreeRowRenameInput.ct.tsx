/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tree } from '../Tree';

/**
 * TreeRowRenameInput is internal — exercised through `<Tree.Root>` with a row whose
 * controlled `isRenaming` is set. Commit/cancel flows that need the consumer round-trip
 * live in `TreeRoot.ct.tsx` (via `TestHarness`); these tests pin the input element's
 * own contract.
 */

test.describe('TreeRowRenameInput', () => {
    test('is focused with the full label pre-selected on mount', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isRenaming onRename={() => {}}>
                    <Tree.Label>Document</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const input = component.getByRole('textbox');
        await expect(input).toBeFocused();
        await expect(input).toHaveValue('Document');
        const selection = await input.evaluate((element: HTMLInputElement) => ({
            start: element.selectionStart,
            end: element.selectionEnd,
        }));
        expect(selection).toEqual({ start: 0, end: 'Document'.length });
    });

    test('the programmatic focus on mount does not show the TextInput focus ring', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isRenaming onRename={() => {}}>
                    <Tree.Label>Document</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const input = component.getByRole('textbox');
        await expect(input).toBeFocused();
        await expect(input).toHaveAttribute('data-show-focus-ring', 'false');
    });

    test('carries a translated aria-label', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isRenaming onRename={() => {}}>
                    <Tree.Label>Document</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.getByRole('textbox')).toHaveAttribute('aria-label', 'New name');
    });

    test('typing replaces the selected text', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isRenaming onRename={() => {}}>
                    <Tree.Label>Document</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const input = component.getByRole('textbox');
        await input.pressSequentially('New');
        await expect(input).toHaveValue('New');
    });

    test('clicking into the input does not select or toggle the row', async ({ mount }) => {
        let rowClicks = 0;
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isRenaming onRename={() => {}} onClick={() => (rowClicks += 1)}>
                    <Tree.Label>Document</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await component.getByRole('textbox').click();
        expect(rowClicks).toBe(0);
    });

    test('the row is not draggable while renaming', async ({ mount }) => {
        const component = await mount(
            <Tree.Root reorderable>
                <Tree.Item id="1" isRenaming onRename={() => {}}>
                    <Tree.Label>Document</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Other</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await expect(component.getByRole('treeitem', { name: /Other/ })).toHaveAttribute('draggable', 'true');
        await expect(component.locator('[role="treeitem"][draggable="false"]')).toHaveCount(1);
    });
});
