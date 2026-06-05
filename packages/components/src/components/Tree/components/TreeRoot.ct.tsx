/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Tree } from '../Tree';

import { TestHarness } from './testutils/TestHarness';

test.describe('TreeRoot rendering', () => {
    test('renders each item and folder as a treeitem with its label', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" label="Alpha" />
                <Tree.Folder id="f" label="Folder">
                    <Tree.Item id="2" label="Beta" />
                </Tree.Folder>
            </Tree.Root>,
        );

        await expect(component.getByRole('treeitem', { name: /Alpha/ })).toBeVisible();
        await expect(component.getByRole('treeitem', { name: /Folder/ })).toBeVisible();
    });

    test('hides children of a collapsed folder', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f" label="Folder">
                    <Tree.Item id="hidden" label="HiddenChild" />
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem', { name: /HiddenChild/ })).toHaveCount(0);
    });

    test('shows children of an expanded folder', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f" label="Folder" isExpanded>
                    <Tree.Item id="visible" label="VisibleChild" />
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem', { name: /VisibleChild/ })).toBeVisible();
    });

    test('marks an active item with aria-current="page"', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" label="Active" isActive />
                <Tree.Item id="2" label="Other" />
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem', { name: /Active/ })).toHaveAttribute('aria-current', 'page');
        await expect(component.getByRole('treeitem', { name: /Other/ })).not.toHaveAttribute('aria-current', 'page');
    });
});

test.describe('TreeRoot row click', () => {
    test('fires per-item onClick when the row is clicked', async ({ mount }) => {
        let clickCount = 0;
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" label="Row" onClick={() => (clickCount += 1)} />
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
                <Tree.Item id="1" label="One" />
                <Tree.Item id="2" label="Two" />
            </Tree.Root>,
        );
        await expect(off.getByRole('checkbox')).toHaveCount(0);
        await off.unmount();

        const on = await mount(
            <Tree.Root multiSelect>
                <Tree.Item id="1" label="One" />
                <Tree.Item id="2" label="Two" />
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
                <Tree.Folder id="f" label="Folder" onExpandChange={(v) => calls.push(v)}>
                    <Tree.Item id="child" label="Child" />
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
                <Tree.Folder id="f" label="Folder" isExpanded>
                    <Tree.Loading />
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByText('Loading', { exact: false })).toBeVisible();
    });

    test('does not render a loading row when the folder is collapsed', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f" label="Folder">
                    <Tree.Loading />
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByText('Loading', { exact: false })).toHaveCount(0);
    });

    test('renders a root-level loading row when <Tree.Loading> is a direct child', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" label="Existing" />
                <Tree.Loading />
            </Tree.Root>,
        );
        await expect(component.getByText('Loading', { exact: false })).toBeVisible();
    });
});

test.describe('TreeRoot item actions', () => {
    test('renders <Tree.ItemAction> content', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" label="Row">
                    <Tree.ItemAction>
                        <button type="button" data-test-id="row-action">
                            do-thing
                        </button>
                    </Tree.ItemAction>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.getByTestId('row-action')).toBeVisible();
    });

    test('does not bubble clicks from the action area to the row', async ({ mount }) => {
        let rowClicks = 0;
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" label="Row" onClick={() => (rowClicks += 1)}>
                    <Tree.ItemAction>
                        <button type="button" data-test-id="row-action">
                            go
                        </button>
                    </Tree.ItemAction>
                </Tree.Item>
            </Tree.Root>,
        );

        await component.getByTestId('row-action').click();
        expect(rowClicks).toBe(0);
    });
});

test.describe('TreeRoot reorderable mode', () => {
    test('renders draggable rows only when reorderable', async ({ mount }) => {
        const without = await mount(
            <Tree.Root>
                <Tree.Item id="1" label="Row" />
            </Tree.Root>,
        );
        await expect(without.locator('[draggable="true"]')).toHaveCount(0);
        await without.unmount();

        const reorderable = await mount(
            <Tree.Root reorderable>
                <Tree.Item id="1" label="Row" />
            </Tree.Root>,
        );
        await expect(reorderable.locator('[draggable="true"]')).toHaveCount(1);
    });

    test('exposes a screen-reader hint announcing checkbox / reorder shortcuts', async ({ mount }) => {
        const component = await mount(
            <Tree.Root multiSelect reorderable>
                <Tree.Item id="1" label="Row" />
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
                <Tree.Item id="1" label="Row" />
            </Tree.Root>,
        );
        await expect(component.getByRole('treeitem', { name: /Row/ })).toBeVisible();
    });
});
