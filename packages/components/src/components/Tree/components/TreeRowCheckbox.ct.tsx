/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tree } from '../Tree';

/**
 * TreeRowCheckbox is rendered only in multiSelect mode. Verified through `<Tree.Root>`
 * because the checkbox depends on headless-tree's roving tabindex and CheckedState
 * derivation, which are wired by the controller.
 */

test.describe('TreeRowCheckbox', () => {
    test('renders one checkbox per row in multi-select mode', async ({ mount }) => {
        const component = await mount(
            <Tree.Root multiSelect>
                <Tree.Item id="1" label="One" />
                <Tree.Item id="2" label="Two" />
            </Tree.Root>,
        );
        await expect(component.getByRole('checkbox')).toHaveCount(2);
    });

    test('clicking the checkbox does not bubble to the row click handler', async ({ mount }) => {
        let rowClicks = 0;
        const component = await mount(
            <Tree.Root multiSelect>
                <Tree.Item id="1" label="Row" onClick={() => (rowClicks += 1)} />
            </Tree.Root>,
        );

        await component.getByRole('checkbox').click();
        expect(rowClicks).toBe(0);
    });

    test('a folder whose descendants are partially selected reports aria-checked="mixed"', async ({ mount }) => {
        const component = await mount(
            <Tree.Root multiSelect>
                <Tree.Folder id="f" label="Folder" isExpanded>
                    <Tree.Item id="a" label="A" isSelected />
                    <Tree.Item id="b" label="B" />
                </Tree.Folder>
            </Tree.Root>,
        );

        await expect(component.getByRole('treeitem', { name: /Folder/ })).toHaveAttribute('aria-checked', 'mixed');
    });

    test('a folder whose descendants are all selected reports aria-checked="true"', async ({ mount }) => {
        const component = await mount(
            <Tree.Root multiSelect>
                <Tree.Folder id="f" label="Folder" isExpanded>
                    <Tree.Item id="a" label="A" isSelected />
                    <Tree.Item id="b" label="B" isSelected />
                </Tree.Folder>
            </Tree.Root>,
        );

        await expect(component.getByRole('treeitem', { name: /Folder/ })).toHaveAttribute('aria-checked', 'true');
    });
});
