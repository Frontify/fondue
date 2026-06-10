/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tree } from '../Tree';

/**
 * The loading row is rendered when `<Tree.Loading>` is declared as a (direct or nested)
 * child of `<Tree.Root>`. It always uses the translated `Tree_loading` string — there is
 * no per-row label override. Behavior is verified through `<Tree.Root>` because the
 * insertion position is computed by `computeLoadingInsertions`.
 */

test.describe('TreeLoadingRow', () => {
    test('renders the translated loading label', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Loading />
            </Tree.Root>,
        );
        await expect(component.getByText('Loading', { exact: false })).toBeVisible();
    });

    test('declares aria-live="polite" and aria-busy="true" for assistive tech', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Loading />
            </Tree.Root>,
        );
        const live = component.locator('[aria-live="polite"]');
        await expect(live).toHaveCount(1);
        await expect(live).toHaveAttribute('aria-busy', 'true');
    });

    test('renders inside an expanded folder when nested', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f" label="Folder" isExpanded>
                    <Tree.Loading />
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByText('Loading', { exact: false })).toBeVisible();
    });

    test('is omitted when the surrounding folder is collapsed', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f" label="Folder">
                    <Tree.Loading />
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByText('Loading', { exact: false })).toHaveCount(0);
    });
});
