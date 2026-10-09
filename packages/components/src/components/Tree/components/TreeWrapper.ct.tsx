/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tree } from '../Tree';

import {
    AllWrapperRoot,
    ContextWrapperTree,
    LazyWrapperTree,
    MixedRoot,
    MultiSelectWrapperTree,
    NestedWrapperTree,
    ToggleWrapperTree,
} from './testutils/WrapperFixtures';

const rowNames = (component: { getByRole: (role: 'treeitem') => { allInnerTexts: () => Promise<string[]> } }) =>
    component.getByRole('treeitem').allInnerTexts();

test.describe('Tree rows inside custom components', () => {
    test('keeps document order when wrapped rows sit between direct rows', async ({ mount }) => {
        const component = await mount(<MixedRoot />);
        await expect(component.getByRole('treeitem')).toHaveCount(4);
        const names = await rowNames(component);
        expect(names.map((text) => text.trim())).toEqual(['A', 'B', 'C', 'D']);
    });

    test('shows wrapped rows in the same task as direct rows (no intermediate paint)', async ({ mount, page }) => {
        await page.evaluate(() => {
            const win = window as unknown as { firstSeen?: number };
            const observer = new MutationObserver(() => {
                const count = document.querySelectorAll('[role="treeitem"]').length;
                if (count > 0 && win.firstSeen === undefined) {
                    win.firstSeen = count;
                    observer.disconnect();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });
        });
        await mount(<MixedRoot />);
        expect(await page.evaluate(() => (window as unknown as { firstSeen?: number }).firstSeen)).toBe(4);
    });

    test('makes the first wrapped row the tab stop when every root row is wrapped', async ({ mount, page }) => {
        const component = await mount(<AllWrapperRoot />);
        await component.getByRole('button', { name: 'before' }).focus();
        await page.keyboard.press('Tab');
        await expect(component.getByRole('treeitem', { name: 'X' })).toBeFocused();
    });

    test('loads folder children owned by a component with its own state', async ({ mount }) => {
        const component = await mount(<LazyWrapperTree />);
        await component.getByRole('treeitem', { name: /Lazy/ }).click();
        await expect(component.getByText('Loading')).toBeVisible();
        await expect(component.getByRole('treeitem', { name: 'lazy-1' })).toBeVisible();
        await expect(component.getByRole('treeitem', { name: 'lazy-2' })).toHaveAttribute('aria-level', '2');
        await expect(component.getByText('Loading')).toHaveCount(0);
    });

    test('keeps keyboard focus on the folder when expanding mounts its first custom component', async ({
        mount,
        page,
    }) => {
        const component = await mount(<LazyWrapperTree />);
        const folder = component.getByRole('treeitem', { name: /Lazy/ });
        await folder.focus();
        await page.keyboard.press('ArrowRight');
        await expect(component.getByRole('treeitem', { name: 'lazy-1' })).toBeVisible();
        await expect(folder).toBeFocused();
        await expect(folder).toHaveAttribute('aria-expanded', 'true');
    });

    test('nests folders declared through recursive components', async ({ mount }) => {
        const component = await mount(<NestedWrapperTree />);
        await expect(component.getByRole('treeitem', { name: 'deep-leaf' })).toHaveAttribute('aria-level', '4');
        await expect(component.getByRole('treeitem', { name: 'after' })).toHaveAttribute('aria-level', '1');
        const names = await rowNames(component);
        expect(names.map((text) => text.trim())).toEqual(['level-3', 'level-2', 'level-1', 'deep-leaf', 'after']);
    });

    test('follows a wrapper re-rendering on its own and unmounting', async ({ mount }) => {
        const component = await mount(<ToggleWrapperTree />);
        await expect(component.getByRole('treeitem', { name: 'g3' })).toBeVisible();
        await component.getByRole('button', { name: 'toggle' }).click();
        await expect(component.getByRole('treeitem')).toHaveCount(1);
        await expect(component.getByRole('treeitem', { name: 'static' })).toBeVisible();
    });

    test('cascades a folder checkbox to wrapped children', async ({ mount }) => {
        const component = await mount(<MultiSelectWrapperTree />);
        await component
            .getByRole('treeitem', { name: /parent/ })
            .getByRole('checkbox')
            .click();
        await expect(component.getByTestId('selected')).toHaveText('c1,c2');
        await expect(component.getByRole('treeitem', { name: 'c1' })).toHaveAttribute('aria-checked', 'true');
    });

    test('renders row parts under Tree.Root, outside a wrapper context provider', async ({ mount }) => {
        const component = await mount(<ContextWrapperTree />);
        await expect(component.getByRole('treeitem', { name: /ctx-row/ }).getByTestId('ctx')).toHaveText('outside');
    });
});

test.describe('Tree without custom components', () => {
    test('renders no collect pass', async ({ mount, page }) => {
        await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>One</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(page.locator('[data-tree-collect-key]')).toHaveCount(0);
        await expect(page.locator('[aria-hidden="true"][hidden]')).toHaveCount(0);
    });

    test('opens fragments statically', async ({ mount, page }) => {
        const component = await mount(
            <Tree.Root>
                <>
                    <Tree.Item id="1">
                        <Tree.Label>One</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="2">
                        <Tree.Label>Two</Tree.Label>
                    </Tree.Item>
                </>
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem')).toHaveCount(2);
        await expect(page.locator('[data-tree-collect-key]')).toHaveCount(0);
    });
});
