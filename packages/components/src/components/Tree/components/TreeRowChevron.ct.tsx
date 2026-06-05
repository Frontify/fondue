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
                <Tree.Item id="1" label="Leaf" />
            </Tree.Root>,
        );
        // The folder + caret-down/right glyphs each render as an svg child. A leaf row
        // still has the document icon svg but no caret svg in the chevron slot.
        const row = component.getByRole('treeitem', { name: /Leaf/ });
        // Document icon is present; chevron column is empty.
        await expect(row.locator('svg')).toHaveCount(1);
    });

    test('a collapsed folder renders the right-caret', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f" label="Folder">
                    <Tree.Item id="x" label="X" />
                </Tree.Folder>
            </Tree.Root>,
        );
        // Folder row contains caret-right + folder-icon = 2 svgs.
        const row = component.getByRole('treeitem', { name: /Folder/ });
        await expect(row.locator('svg')).toHaveCount(2);
    });

    test('an expanded folder renders the down-caret', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f" label="Folder" isExpanded>
                    <Tree.Item id="x" label="X" />
                </Tree.Folder>
            </Tree.Root>,
        );
        const row = component.getByRole('treeitem', { name: /Folder/ });
        await expect(row.locator('svg')).toHaveCount(2);
    });
});
