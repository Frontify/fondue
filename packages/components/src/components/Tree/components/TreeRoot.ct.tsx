/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tree } from '../Tree';

import { TestHarness } from './testutils/TestHarness';

test.describe('TreeRoot rendering', () => {
    test('renders each item and folder as a treeitem with its label', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>Alpha</Tree.Label>
                </Tree.Item>
                <Tree.Folder id="f">
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                    </Tree.FolderHeader>
                    <Tree.Item id="2">
                        <Tree.Label>Beta</Tree.Label>
                    </Tree.Item>
                </Tree.Folder>
            </Tree.Root>,
        );

        await expect(component.getByRole('treeitem', { name: /Alpha/ })).toBeVisible();
        await expect(component.getByRole('treeitem', { name: /Folder/ })).toBeVisible();
    });

    test('hides children of a collapsed folder', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f">
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                    </Tree.FolderHeader>
                    <Tree.Item id="hidden">
                        <Tree.Label>HiddenChild</Tree.Label>
                    </Tree.Item>
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem', { name: /HiddenChild/ })).toHaveCount(0);
    });

    test('shows children of an expanded folder', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f" isExpanded>
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                    </Tree.FolderHeader>
                    <Tree.Item id="visible">
                        <Tree.Label>VisibleChild</Tree.Label>
                    </Tree.Item>
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem', { name: /VisibleChild/ })).toBeVisible();
    });

    test('moves the selected highlight to the clicked row in single-select mode', async ({ mount }) => {
        const component = await mount(
            <TestHarness
                initial={[
                    { id: '1', name: 'First', isFolder: false, isSelected: true },
                    { id: '2', name: 'Second', isFolder: false },
                ]}
            />,
        );

        const first = component.getByRole('treeitem', { name: /First/ });
        const second = component.getByRole('treeitem', { name: /Second/ });
        await expect(first).toHaveAttribute('aria-selected', 'true');
        await expect(second).toHaveAttribute('aria-selected', 'false');

        await second.click();
        await expect(first).toHaveAttribute('aria-selected', 'false');
        await expect(second).toHaveAttribute('aria-selected', 'true');
    });
});

test.describe('TreeRoot row click', () => {
    test('fires per-item onClick when the row is clicked', async ({ mount }) => {
        let clickCount = 0;
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" onClick={() => (clickCount += 1)}>
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await component.getByRole('treeitem', { name: /Row/ }).click();
        expect(clickCount).toBe(1);
    });
});

test.describe('TreeRoot multi-select', () => {
    test('renders a checkbox per row only when multiSelect is set', async ({ mount }) => {
        const off = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>One</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Two</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(off.getByRole('checkbox')).toHaveCount(0);
        await off.unmount();

        const on = await mount(
            <Tree.Root multiSelect>
                <Tree.Item id="1">
                    <Tree.Label>One</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Two</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(on.getByRole('checkbox')).toHaveCount(2);
    });

    test('toggles aria-checked when a checkbox is clicked', async ({ mount }) => {
        const component = await mount(
            <TestHarness
                multiSelect
                initial={[
                    { id: '1', name: 'One', isFolder: false },
                    { id: '2', name: 'Two', isFolder: false },
                ]}
            />,
        );

        const firstCheckbox = component.getByRole('checkbox').first();
        await expect(firstCheckbox).toHaveAttribute('aria-checked', 'false');
        await firstCheckbox.click();
        await expect(firstCheckbox).toHaveAttribute('aria-checked', 'true');
    });

    test('emits onChange with toggled isSelected', async ({ mount }) => {
        const onChange: Array<{ id: string; isSelected?: boolean }[]> = [];
        const component = await mount(
            <TestHarness
                multiSelect
                initial={[
                    { id: '1', name: 'One', isFolder: false },
                    { id: '2', name: 'Two', isFolder: false },
                ]}
                onChange={(state) => {
                    onChange.push(state.map((node) => ({ id: node.id, isSelected: node.isSelected })));
                }}
            />,
        );

        await component.getByRole('checkbox').first().click();

        const last = onChange[onChange.length - 1] ?? [];
        expect(last.find((node) => node.id === '1')?.isSelected).toBe(true);
        expect(last.find((node) => node.id === '2')?.isSelected).toBe(false);
    });

    test('folder checkbox cascades to descendants', async ({ mount }) => {
        const component = await mount(
            <TestHarness
                multiSelect
                initial={[
                    {
                        id: 'f',
                        name: 'Folder',
                        isFolder: true,
                        isExpanded: true,
                        children: [
                            { id: 'a', name: 'A', isFolder: false },
                            { id: 'b', name: 'B', isFolder: false },
                        ],
                    },
                ]}
            />,
        );

        const checkboxes = component.getByRole('checkbox');
        await expect(checkboxes).toHaveCount(3);

        await checkboxes.first().click();
        await expect(checkboxes.nth(1)).toHaveAttribute('aria-checked', 'true');
        await expect(checkboxes.nth(2)).toHaveAttribute('aria-checked', 'true');
    });
});

test.describe('TreeRoot expansion', () => {
    test('clicks toggle a folder open and fire onExpandChange', async ({ mount }) => {
        const calls: boolean[] = [];
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f" onExpandChange={(v) => calls.push(v)}>
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                    </Tree.FolderHeader>
                    <Tree.Item id="child">
                        <Tree.Label>Child</Tree.Label>
                    </Tree.Item>
                </Tree.Folder>
            </Tree.Root>,
        );

        await expect(component.getByRole('treeitem', { name: /Child/ })).toHaveCount(0);
        await component.getByRole('treeitem', { name: /Folder/ }).click();
        expect(calls).toEqual([true]);
    });
});

test.describe('TreeRoot loading rows', () => {
    test('renders a loading row inside an expanded folder that contains <Tree.Loading>', async ({ mount }) => {
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

    test('does not render a loading row when the folder is collapsed', async ({ mount }) => {
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

    test('renders a root-level loading row when <Tree.Loading> is a direct child', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>Existing</Tree.Label>
                </Tree.Item>
                <Tree.Loading />
            </Tree.Root>,
        );
        await expect(component.getByText('Loading', { exact: false })).toBeVisible();
    });
});

test.describe('TreeRoot item actions', () => {
    test('renders <Tree.Action> content', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>Row</Tree.Label>
                    <Tree.Action>
                        <button type="button" data-test-id="row-action">
                            do-thing
                        </button>
                    </Tree.Action>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.getByTestId('row-action')).toBeVisible();
    });

    test('renders <Tree.Action> from a folder header', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f">
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                        <Tree.Action>
                            <button type="button" data-test-id="folder-action">
                                do-thing
                            </button>
                        </Tree.Action>
                    </Tree.FolderHeader>
                    <Tree.Item id="x">
                        <Tree.Label>X</Tree.Label>
                    </Tree.Item>
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByTestId('folder-action')).toBeVisible();
    });

    test('does not bubble clicks from the action area to the row', async ({ mount }) => {
        let rowClicks = 0;
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" onClick={() => (rowClicks += 1)}>
                    <Tree.Label>Row</Tree.Label>
                    <Tree.Action>
                        <button type="button" data-test-id="row-action">
                            go
                        </button>
                    </Tree.Action>
                </Tree.Item>
            </Tree.Root>,
        );

        await component.getByTestId('row-action').click();
        expect(rowClicks).toBe(0);
    });
});

test.describe('TreeRoot renaming', () => {
    const initial = [
        { id: '1', name: 'First', isFolder: false },
        { id: '2', name: 'Second', isFolder: false },
    ];

    test('starting a rename from an action, typing, and pressing Enter commits', async ({ mount }) => {
        const renames: Array<[string, string]> = [];
        const renamingChanges: Array<[string, boolean]> = [];
        const component = await mount(
            <TestHarness
                renameable
                initial={initial}
                onRename={(id, newName) => renames.push([id, newName])}
                onRenamingChange={(id, isRenaming) => renamingChanges.push([id, isRenaming])}
            />,
        );

        await component.getByRole('button', { name: 'Rename First' }).click();
        const input = component.getByRole('textbox');
        await expect(input).toBeFocused();
        await input.fill('Renamed');
        await input.press('Enter');

        await expect(component.getByRole('textbox')).toHaveCount(0);
        await expect(component.getByRole('treeitem', { name: /Renamed/ })).toBeVisible();
        expect(renames).toEqual([['1', 'Renamed']]);
        expect(renamingChanges).toEqual([['1', false]]);
    });

    test('focus returns to the renamed row on commit, not the first row', async ({ mount }) => {
        const component = await mount(<TestHarness renameable initial={initial} onRename={() => {}} />);

        await component.getByRole('button', { name: 'Rename Second' }).click();
        const input = component.getByRole('textbox');
        await input.fill('Renamed');
        await input.press('Enter');

        await expect(component.getByRole('textbox')).toHaveCount(0);
        const row = component.getByRole('treeitem', { name: /Renamed/ });
        await expect(row).toBeFocused();
        // The restored focus is programmatic, not user navigation — the row carries the
        // suppression marker so no focus ring is drawn.
        await expect(row).toHaveAttribute('data-show-focus-ring', 'false');
    });

    test('clicking outside the tree commits without stealing focus back', async ({ mount, page }) => {
        const renames: Array<[string, string]> = [];
        const component = await mount(
            <TestHarness renameable initial={initial} onRename={(id, newName) => renames.push([id, newName])} />,
        );

        await component.getByRole('button', { name: 'Rename First' }).click();
        await component.getByRole('textbox').fill('Outside');
        // Raw coordinates well below the two rendered rows — clicking empty page space
        // outside the tree (body click targeting would fail: the body only wraps the
        // component, so the point would land on <html>).
        await page.mouse.click(5, 400);

        await expect(component.getByRole('textbox')).toHaveCount(0);
        expect(renames).toEqual([['1', 'Outside']]);
        // The focus restore polls for up to 500ms — wait it out before asserting that
        // focus was not pulled back into the tree.
        await page.waitForTimeout(600);
        await expect(component.getByRole('treeitem', { name: /Outside/ })).not.toBeFocused();
    });

    test('onChange carries the new name on commit', async ({ mount }) => {
        const names: string[][] = [];
        const component = await mount(
            <TestHarness renameable initial={initial} onChange={(state) => names.push(state.map((n) => n.name))} />,
        );

        await component.getByRole('button', { name: 'Rename Second' }).click();
        const input = component.getByRole('textbox');
        await input.fill('Updated');
        await input.press('Enter');

        await expect(component.getByRole('textbox')).toHaveCount(0);
        expect(names[names.length - 1]).toEqual(['First', 'Updated']);
    });

    test('Escape cancels without firing onRename', async ({ mount }) => {
        const renames: Array<[string, string]> = [];
        const component = await mount(
            <TestHarness renameable initial={initial} onRename={(id, newName) => renames.push([id, newName])} />,
        );

        await component.getByRole('button', { name: 'Rename First' }).click();
        const input = component.getByRole('textbox');
        await input.fill('Discarded');
        await input.press('Escape');

        await expect(component.getByRole('textbox')).toHaveCount(0);
        await expect(component.getByRole('treeitem', { name: /First/ })).toBeVisible();
        expect(renames).toEqual([]);
    });

    test('blur commits the edit', async ({ mount }) => {
        const renames: Array<[string, string]> = [];
        const component = await mount(
            <TestHarness renameable initial={initial} onRename={(id, newName) => renames.push([id, newName])} />,
        );

        await component.getByRole('button', { name: 'Rename First' }).click();
        const input = component.getByRole('textbox');
        await input.fill('Blurred');
        await component.getByRole('treeitem', { name: /Second/ }).click();

        await expect(component.getByRole('textbox')).toHaveCount(0);
        expect(renames).toEqual([['1', 'Blurred']]);
    });

    test('committing an unchanged name fires no onRename', async ({ mount }) => {
        const renames: Array<[string, string]> = [];
        const component = await mount(
            <TestHarness renameable initial={initial} onRename={(id, newName) => renames.push([id, newName])} />,
        );

        await component.getByRole('button', { name: 'Rename First' }).click();
        await component.getByRole('textbox').press('Enter');

        await expect(component.getByRole('textbox')).toHaveCount(0);
        expect(renames).toEqual([]);
    });
});

test.describe('TreeRoot reorderable mode', () => {
    test('renders draggable rows only when reorderable', async ({ mount }) => {
        const without = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(without.locator('[draggable="true"]')).toHaveCount(0);
        await without.unmount();

        const reorderable = await mount(
            <Tree.Root reorderable>
                <Tree.Item id="1">
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(reorderable.locator('[draggable="true"]')).toHaveCount(1);
    });

    test('exposes a screen-reader hint announcing checkbox / reorder shortcuts', async ({ mount }) => {
        const component = await mount(
            <Tree.Root multiSelect reorderable>
                <Tree.Item id="1">
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const row = component.getByRole('treeitem', { name: /Row/ });
        const hintId = await row.getAttribute('aria-describedby');
        expect(hintId).toBeTruthy();
        const hint = component.locator(`[id="${hintId ?? ''}"]`);
        await expect(hint).toBeAttached();
    });
});

test.describe('TreeRoot accepts predicate', () => {
    test('mounts without crashing when a custom root `accepts` predicate is provided', async ({ mount }) => {
        const component = await mount(
            <Tree.Root reorderable accepts={() => false}>
                <Tree.Item id="1">
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem', { name: /Row/ })).toBeVisible();
    });
});
