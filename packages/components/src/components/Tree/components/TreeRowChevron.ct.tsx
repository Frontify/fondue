/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tree } from '../Tree';

/**
 * The chevron column is structural — it reserves space on every row so that folder and
 * leaf labels line up. Only folders render a glyph inside the column; collapsed folders
 * render the "right" caret, expanded folders render the "down" caret, and leaves render
 * nothing inside the column.
 */

test.describe('TreeRowChevron', () => {
    test('a leaf renders no chevron glyph (svg)', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>Leaf</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        // Rows have no icons unless a <Tree.Icon> is passed, so the only possible svg
        // is the caret glyph — and leaves render none.
        const row = component.getByRole('treeitem', { name: /Leaf/ });
        await expect(row.locator('svg')).toHaveCount(0);
    });

    test('a collapsed folder renders the right-caret', async ({ mount }) => {
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
        // The caret is the folder row's only svg.
        const row = component.getByRole('treeitem', { name: /Folder/ });
        await expect(row.locator('svg')).toHaveCount(1);
        await expect(row.locator('svg')).toHaveAttribute('data-test-id', 'fondue-icons-caret-right');
    });

    test('an expanded folder renders the down-caret', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f" isExpanded>
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                    </Tree.FolderHeader>
                    <Tree.Item id="x">
                        <Tree.Label>X</Tree.Label>
                    </Tree.Item>
                </Tree.Folder>
            </Tree.Root>,
        );
        const row = component.getByRole('treeitem', { name: /Folder/ });
        await expect(row.locator('svg')).toHaveCount(1);
        await expect(row.locator('svg')).toHaveAttribute('data-test-id', 'fondue-icons-caret-down');
    });
});
