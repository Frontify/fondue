/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tree } from '../Tree';

/**
 * TreeRow is internal — exercised here through a minimal `<Tree.Root>` wrapper. Tests
 * focus on behavior owned by the row itself: ARIA contract, keyboard activation,
 * data-attribute outputs, and action-area click insulation.
 */

test.describe('TreeRow', () => {
    test('exposes role="treeitem" with explicit aria-selected', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" label="Row" />
            </Tree.Root>,
        );

        const row = component.getByRole('treeitem', { name: /Row/ });
        await expect(row).toHaveAttribute('aria-selected', 'false');
    });

    test('reflects aria-selected=true when isSelected is passed', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" label="Selected" isSelected />
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem', { name: /Selected/ })).toHaveAttribute('aria-selected', 'true');
    });

    test('Enter on the focused row triggers a click', async ({ mount }) => {
        let clicks = 0;
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" label="Row" onClick={() => (clicks += 1)} />
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
                <Tree.Item id="1" label="Row" onClick={() => (clicks += 1)} />
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
                <Tree.Folder id="f" label="Folder">
                    <Tree.Item id="x" label="X" />
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.locator('[data-folder="true"]')).toHaveCount(1);
    });
});
