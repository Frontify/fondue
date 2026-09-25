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
                <Tree.Folder id="f" isExpanded>
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                    </Tree.FolderHeader>
                    <Tree.Loading />
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByText('Loading', { exact: false })).toBeVisible();
    });

    test('is omitted when the surrounding folder is collapsed', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f">
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                    </Tree.FolderHeader>
                    <Tree.Loading />
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByText('Loading', { exact: false })).toHaveCount(0);
    });
});

test.describe('TreeLoadingRow alignment', () => {
    test("lines its chevron slot up with a real row's chevron", async ({ mount }) => {
        const component = await mount(
            <Tree.Root multiSelect reorderable>
                <Tree.Folder id="f" isExpanded>
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                    </Tree.FolderHeader>
                    <Tree.Item id="1">
                        <Tree.Label>Sibling</Tree.Label>
                    </Tree.Item>
                    <Tree.Loading />
                </Tree.Folder>
            </Tree.Root>,
        );

        const realRow = component.locator('[role="treeitem"]').filter({ hasText: 'Sibling' });
        const loadingRow = component.locator('[aria-busy="true"]');

        const realChevronBox = await realRow.locator('span[class*="chevron"]').boundingBox();
        const loadingChevronBox = await loadingRow.locator('span[class*="chevron"]').boundingBox();
        const realIndentBox = await realRow.locator('span[class*="indent"]').boundingBox();
        const loadingIndentBox = await loadingRow.locator('span[class*="indent"]').boundingBox();
        if (
            realChevronBox === null ||
            loadingChevronBox === null ||
            realIndentBox === null ||
            loadingIndentBox === null
        ) {
            throw new Error('the row did not render all of its placeholder columns');
        }

        expect(Math.abs(realChevronBox.x - loadingChevronBox.x)).toBeLessThan(0.5);
        expect(Math.abs(realIndentBox.x - loadingIndentBox.x)).toBeLessThan(0.5);
    });
});
