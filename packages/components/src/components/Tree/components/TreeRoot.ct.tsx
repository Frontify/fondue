/* (c) Copyright Frontify Ltd., all rights reserved. */

import { expect, test } from '@playwright/experimental-ct-react';

import { Dropdown } from '#/index';

import { Tree, type TreeMoveInfo } from '../Tree';

import { ExpandedSiblingDropFixture } from './testutils/ExpandedSiblingDropFixture';
import { RejectingSiblingFixture } from './testutils/RejectingSiblingFixture';
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

    test('moves the tab stop to the next row when the focused row is removed', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>First</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Second</Tree.Label>
                </Tree.Item>
                <Tree.Item id="3">
                    <Tree.Label>Third</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await component.getByRole('treeitem', { name: /Second/ }).click();
        await component.update(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>First</Tree.Label>
                </Tree.Item>
                <Tree.Item id="3">
                    <Tree.Label>Third</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await expect(component.getByRole('treeitem', { name: /Third/ })).toHaveAttribute('tabindex', '0');
    });

    test('leaves DOM focus outside the tree when the focused row is removed', async ({ mount }) => {
        const component = await mount(
            <div>
                <button type="button">Outside</button>
                <Tree.Root>
                    <Tree.Item id="1">
                        <Tree.Label>First</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="2">
                        <Tree.Label>Second</Tree.Label>
                    </Tree.Item>
                </Tree.Root>
            </div>,
        );

        const outside = component.getByRole('button', { name: 'Outside' });
        await outside.focus();
        await component.update(
            <div>
                <button type="button">Outside</button>
                <Tree.Root>
                    <Tree.Item id="2">
                        <Tree.Label>Second</Tree.Label>
                    </Tree.Item>
                </Tree.Root>
            </div>,
        );

        await expect(component.getByRole('treeitem', { name: /Second/ })).toHaveAttribute('tabindex', '0');
        await expect(outside).toBeFocused();
    });

    test('Tab lands on the selected row, then arrows navigate from there', async ({ mount, page }) => {
        const component = await mount(
            <div>
                <button type="button">Outside</button>
                <Tree.Root>
                    <Tree.Item id="1">
                        <Tree.Label>First</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="2">
                        <Tree.Label>Second</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="3" isSelected>
                        <Tree.Label>Third</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="4">
                        <Tree.Label>Fourth</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="5">
                        <Tree.Label>Fifth</Tree.Label>
                    </Tree.Item>
                </Tree.Root>
            </div>,
        );

        await component.getByRole('button', { name: 'Outside' }).focus();
        await page.keyboard.press('Tab');
        await expect(component.getByRole('treeitem', { name: /Third/ })).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(component.getByRole('treeitem', { name: /Fourth/ })).toBeFocused();
    });

    test('a prop-driven selection change moves the tab stop while focus is outside the tree', async ({
        mount,
        page,
    }) => {
        const component = await mount(
            <div>
                <button type="button">Outside</button>
                <Tree.Root>
                    <Tree.Item id="1">
                        <Tree.Label>First</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="2">
                        <Tree.Label>Second</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="3">
                        <Tree.Label>Third</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="4">
                        <Tree.Label>Fourth</Tree.Label>
                    </Tree.Item>
                </Tree.Root>
            </div>,
        );

        await component.getByRole('treeitem', { name: /First/ }).click();
        await component.getByRole('button', { name: 'Outside' }).focus();
        await component.update(
            <div>
                <button type="button">Outside</button>
                <Tree.Root>
                    <Tree.Item id="1">
                        <Tree.Label>First</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="2">
                        <Tree.Label>Second</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="3">
                        <Tree.Label>Third</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="4" isSelected>
                        <Tree.Label>Fourth</Tree.Label>
                    </Tree.Item>
                </Tree.Root>
            </div>,
        );

        await page.keyboard.press('Tab');
        await expect(component.getByRole('treeitem', { name: /Fourth/ })).toBeFocused();
    });

    test('a prop-driven selection change does not move DOM focus while focus is inside the tree', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>First</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2" isSelected>
                    <Tree.Label>Second</Tree.Label>
                </Tree.Item>
                <Tree.Item id="3">
                    <Tree.Label>Third</Tree.Label>
                </Tree.Item>
                <Tree.Item id="4">
                    <Tree.Label>Fourth</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await component.getByRole('treeitem', { name: /Second/ }).click();
        await expect(component.getByRole('treeitem', { name: /Second/ })).toBeFocused();

        await component.update(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>First</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Second</Tree.Label>
                </Tree.Item>
                <Tree.Item id="3">
                    <Tree.Label>Third</Tree.Label>
                </Tree.Item>
                <Tree.Item id="4" isSelected>
                    <Tree.Label>Fourth</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await expect(component.getByRole('treeitem', { name: /Second/ })).toBeFocused();
    });

    test('a selected row hidden in a collapsed folder does not take the tab stop', async ({ mount, page }) => {
        const component = await mount(
            <div>
                <button type="button">Outside</button>
                <Tree.Root>
                    <Tree.Item id="1">
                        <Tree.Label>First</Tree.Label>
                    </Tree.Item>
                    <Tree.Folder id="f">
                        <Tree.FolderHeader>
                            <Tree.Label>Folder</Tree.Label>
                        </Tree.FolderHeader>
                        <Tree.Item id="hidden" isSelected>
                            <Tree.Label>HiddenChild</Tree.Label>
                        </Tree.Item>
                    </Tree.Folder>
                </Tree.Root>
            </div>,
        );

        await component.getByRole('button', { name: 'Outside' }).focus();
        await page.keyboard.press('Tab');
        await expect(component.getByRole('treeitem', { name: /First/ })).toBeFocused();
    });

    test('Tabbing back in after leaving the tree returns to the selected row, not the last-focused one', async ({
        mount,
        page,
    }) => {
        const component = await mount(
            <div>
                <Tree.Root>
                    <Tree.Item id="a">
                        <Tree.Label>A</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="b" isSelected>
                        <Tree.Label>B</Tree.Label>
                    </Tree.Item>
                    <Tree.Item id="c">
                        <Tree.Label>C</Tree.Label>
                    </Tree.Item>
                </Tree.Root>
                <button type="button">After</button>
            </div>,
        );

        await component.getByRole('treeitem', { name: /C/ }).click();
        await expect(component.getByRole('treeitem', { name: /C/ })).toBeFocused();

        await page.keyboard.press('Tab');
        await expect(component.getByRole('button', { name: 'After' })).toBeFocused();

        await page.keyboard.press('Shift+Tab');
        await expect(component.getByRole('treeitem', { name: /B/ })).toBeFocused();
    });

    test('a same-row DOM blur/focus round trip does not desync ArrowDown from the visibly focused row', async ({
        mount,
        page,
    }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="0" isSelected>
                    <Tree.Label>Row0</Tree.Label>
                </Tree.Item>
                <Tree.Item id="1">
                    <Tree.Label>Row1</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Row2</Tree.Label>
                </Tree.Item>
                <Tree.Item id="3">
                    <Tree.Label>Row3</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await component.getByRole('treeitem', { name: /Row0/ }).click();
        await page.keyboard.press('ArrowDown');
        await page.keyboard.press('ArrowDown');
        await expect(component.getByRole('treeitem', { name: /Row2/ })).toBeFocused();

        // No Tab in between: the window losing and regaining focus (or a browser
        // extension stealing focus) fires this same blur/focus pair on the same row.
        await page.evaluate(() => {
            const element = document.activeElement as HTMLElement | null;
            element?.blur();
            element?.focus();
        });

        await page.keyboard.press('ArrowDown');
        await expect(component.getByRole('treeitem', { name: /Row3/ })).toBeFocused();
    });

    test('Escape closing a portalled Dropdown does not desync ArrowDown from the row that regains focus', async ({
        mount,
        page,
    }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isSelected>
                    <Tree.Label>Row1</Tree.Label>
                </Tree.Item>
                <Tree.Item id="2">
                    <Tree.Label>Row2</Tree.Label>
                </Tree.Item>
                <Tree.Item id="3">
                    <Tree.Label>Row3</Tree.Label>
                    <Tree.Action>
                        <Dropdown.Root>
                            <Dropdown.Trigger>
                                <button type="button">Row3 actions</button>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Item onSelect={() => {}}>Do thing</Dropdown.Item>
                            </Dropdown.Content>
                        </Dropdown.Root>
                    </Tree.Action>
                </Tree.Item>
                <Tree.Item id="4">
                    <Tree.Label>Row4</Tree.Label>
                </Tree.Item>
                <Tree.Item id="5">
                    <Tree.Label>Row5</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        await component.getByRole('button', { name: 'Row3 actions' }).click();
        // The menu portals to `document.body`, outside `component`'s scoped locator.
        await expect(page.getByRole('menuitem', { name: 'Do thing' })).toBeVisible();

        // Default Radix behaviour: Escape returns focus to the trigger, i.e. row 3.
        await page.keyboard.press('Escape');
        await expect(component.getByRole('button', { name: 'Row3 actions' })).toBeFocused();

        await page.keyboard.press('ArrowDown');
        await expect(component.getByRole('treeitem', { name: /Row4/ })).toBeFocused();
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
        const onChange: Array<{ id: string; isSelected?: boolean | 'indeterminate' }[]> = [];
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

    test("emits onChange with 'indeterminate' on a partially checked folder", async ({ mount }) => {
        const folderStates: Array<boolean | 'indeterminate' | undefined> = [];
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
                onChange={(state) => {
                    folderStates.push(state.find((node) => node.id === 'f')?.isSelected);
                }}
            />,
        );

        const checkboxes = component.getByRole('checkbox');
        // Check one of the folder's two leaves: the folder renders mixed and is reported as such.
        await checkboxes.nth(1).click();
        await expect(checkboxes.first()).toHaveAttribute('aria-checked', 'mixed');
        expect(folderStates[folderStates.length - 1]).toBe('indeterminate');

        // Checking the second leaf completes the set: the folder is reported as selected.
        await checkboxes.nth(2).click();
        await expect(checkboxes.first()).toHaveAttribute('aria-checked', 'true');
        expect(folderStates[folderStates.length - 1]).toBe(true);
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

test.describe('TreeRoot item decorators', () => {
    test('renders <Tree.Decorator> content after the label', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1">
                    <Tree.Label>Row</Tree.Label>
                    <Tree.Decorator>
                        <span data-test-id="row-decorator">hidden</span>
                    </Tree.Decorator>
                </Tree.Item>
            </Tree.Root>,
        );
        await expect(component.getByTestId('row-decorator')).toBeVisible();
    });

    test('renders <Tree.Decorator> from a folder header', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Folder id="f">
                    <Tree.FolderHeader>
                        <Tree.Label>Folder</Tree.Label>
                        <Tree.Decorator>
                            <span data-test-id="folder-decorator">hidden</span>
                        </Tree.Decorator>
                    </Tree.FolderHeader>
                    <Tree.Item id="x">
                        <Tree.Label>X</Tree.Label>
                    </Tree.Item>
                </Tree.Folder>
            </Tree.Root>,
        );
        await expect(component.getByTestId('folder-decorator')).toBeVisible();
    });

    test('bubbles clicks from the decorator to the row (unlike actions)', async ({ mount }) => {
        let rowClicks = 0;
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" onClick={() => (rowClicks += 1)}>
                    <Tree.Label>Row</Tree.Label>
                    <Tree.Decorator>
                        <span data-test-id="row-decorator">hidden</span>
                    </Tree.Decorator>
                </Tree.Item>
            </Tree.Root>,
        );

        await component.getByTestId('row-decorator').click();
        expect(rowClicks).toBe(1);
    });

    test('hides the decorator while the row is renaming', async ({ mount }) => {
        const component = await mount(
            <Tree.Root>
                <Tree.Item id="1" isRenaming onRename={() => {}}>
                    <Tree.Label>Row</Tree.Label>
                    <Tree.Decorator>
                        <span data-test-id="row-decorator">hidden</span>
                    </Tree.Decorator>
                </Tree.Item>
            </Tree.Root>,
        );

        await expect(component.getByRole('textbox')).toBeVisible();
        await expect(component.getByTestId('row-decorator')).toBeHidden();
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

    test('clicking outside while renaming a non-selected row does not pull focus to the selected row', async ({
        mount,
        page,
    }) => {
        const component = await mount(
            <TestHarness
                renameable
                initial={[
                    { id: '1', name: 'First', isFolder: false, isSelected: true },
                    { id: '2', name: 'Second', isFolder: false },
                ]}
                onRename={() => {}}
            />,
        );

        await component.getByRole('button', { name: 'Rename Second' }).click();
        await component.getByRole('textbox').fill('Renamed');
        await page.mouse.click(5, 400);

        await expect(component.getByRole('textbox')).toHaveCount(0);
        await page.waitForTimeout(600);
        await expect(component.getByRole('treeitem', { name: /First/ })).not.toBeFocused();
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

    test('exposes separate screen-reader hints announcing checkbox / reorder shortcuts', async ({ mount }) => {
        const component = await mount(
            <Tree.Root multiSelect reorderable>
                <Tree.Item id="1">
                    <Tree.Label>Row</Tree.Label>
                </Tree.Item>
            </Tree.Root>,
        );

        const row = component.getByRole('treeitem', { name: /Row/ });
        const hintIds = ((await row.getAttribute('aria-describedby')) ?? '').split(' ').filter(Boolean);
        expect(hintIds).toHaveLength(2);
        const hintTexts = await Promise.all(
            hintIds.map(async (id) => {
                const hint = component.locator(`[id="${id}"]`);
                await expect(hint).toBeAttached();
                return (await hint.textContent()) ?? '';
            }),
        );
        expect(hintTexts.join(' ')).toContain('press Tab to focus the checkbox');
        expect(hintTexts.join(' ')).toContain('Press Control Shift D to move');
    });

    test('drops right before the header of an expanded sibling folder that rejects it', async ({ mount, page }) => {
        const moves: TreeMoveInfo[] = [];
        const component = await mount(<ExpandedSiblingDropFixture onMoveB={(info) => moves.push(info)} />);

        const handleBox = await component
            .getByRole('treeitem', { name: /^B$/ })
            .locator('span[class*="handle"]')
            .boundingBox();
        const cBox = await component.getByRole('treeitem', { name: /^C$/ }).boundingBox();
        if (handleBox === null || cBox === null) {
            throw new Error('the dragged row and the drop target were not both laid out');
        }

        const startX = handleBox.x + 1;
        const startY = handleBox.y + handleBox.height / 2;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(startX, startY + 4, { steps: 4 });
        // Top of C's row: the reorder-above area of an ExpandedFolder drop target.
        await page.mouse.move(cBox.x + cBox.width / 2, cBox.y + cBox.height * 0.1, { steps: 10 });
        await page.mouse.up();

        expect(moves).toEqual([{ parentId: 'root', index: 0 }]);
    });

    test('drops right after the header of an expanded sibling folder that rejects it', async ({ mount, page }) => {
        const moves: TreeMoveInfo[] = [];
        const component = await mount(<ExpandedSiblingDropFixture onMoveB={(info) => moves.push(info)} />);

        const handleBox = await component
            .getByRole('treeitem', { name: /^B$/ })
            .locator('span[class*="handle"]')
            .boundingBox();
        const aBox = await component.getByRole('treeitem', { name: /^A$/ }).boundingBox();
        if (handleBox === null || aBox === null) {
            throw new Error('the dragged row and the drop target were not both laid out');
        }

        const startX = handleBox.x + 1;
        const startY = handleBox.y + handleBox.height / 2;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(startX, startY + 4, { steps: 4 });
        // Bottom of A's row: A rejects folders, so this is the reorder-below area, not its body.
        await page.mouse.move(aBox.x + aBox.width / 2, aBox.y + aBox.height * 0.9, { steps: 10 });
        await page.mouse.up();

        expect(moves).toEqual([{ parentId: 'root', index: 2 }]);
    });

    test('hides the drag line and every row highlight while hovering a rejected position after an allowed one', async ({
        mount,
        page,
    }) => {
        const component = await mount(<RejectingSiblingFixture />);

        const handleBox = await component
            .getByRole('treeitem', { name: /^F$/ })
            .locator('span[class*="handle"]')
            .boundingBox();
        const xBox = await component.getByRole('treeitem', { name: /^X$/ }).boundingBox();
        const pBox = await component.getByRole('treeitem', { name: /^P$/ }).boundingBox();
        const aBox = await component.getByRole('treeitem', { name: /^A$/ }).boundingBox();
        if (handleBox === null || xBox === null || pBox === null || aBox === null) {
            throw new Error('the dragged row and the drop targets were not all laid out');
        }

        const startX = handleBox.x + 1;
        const startY = handleBox.y + handleBox.height / 2;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(startX, startY + 4, { steps: 4 });
        // Allowed: reorders past X, at the root level, so the line shows.
        await page.mouse.move(xBox.x + xBox.width / 2, xBox.y + xBox.height * 0.9, { steps: 10 });
        await expect(component.locator('div[class*="dragline"]')).toBeVisible();

        // Rejected: A's own `accepts` blocks it; walking through P first settles reliably on A as the drop target.
        await page.mouse.move(pBox.x + pBox.width / 2, pBox.y + pBox.height / 2, { steps: 10 });
        await page.mouse.move(aBox.x + aBox.width / 2, aBox.y + aBox.height / 2, { steps: 10 });
        await expect(component.locator('div[class*="dragline"]')).toBeHidden();
        // headless-tree's dnd state doesn't update on a rejected canDrop, so a stale highlight from X must not survive either.
        await expect(component.locator('[class*="item"][data-drop="true"]')).toHaveCount(0);

        await page.mouse.up();
    });

    test('a keyboard drag after a pointer drag released over a rejected row still shows the drag line', async ({
        mount,
        page,
    }) => {
        const component = await mount(<RejectingSiblingFixture />);

        const handleBox = await component
            .getByRole('treeitem', { name: /^F$/ })
            .locator('span[class*="handle"]')
            .boundingBox();
        const pBox = await component.getByRole('treeitem', { name: /^P$/ }).boundingBox();
        const aBox = await component.getByRole('treeitem', { name: /^A$/ }).boundingBox();
        if (handleBox === null || pBox === null || aBox === null) {
            throw new Error('the dragged row and the drop targets were not all laid out');
        }

        const startX = handleBox.x + 1;
        const startY = handleBox.y + handleBox.height / 2;
        await page.mouse.move(startX, startY);
        await page.mouse.down();
        await page.mouse.move(startX, startY + 4, { steps: 4 });
        await page.mouse.move(pBox.x + pBox.width / 2, pBox.y + pBox.height / 2, { steps: 10 });
        await page.mouse.move(aBox.x + aBox.width / 2, aBox.y + aBox.height / 2, { steps: 10 });
        await page.mouse.up();

        // A stale rejection from the pointer drag must not hide the line for the unrelated keyboard drag below.
        await component.getByRole('treeitem', { name: /^F$/ }).click();
        await page.keyboard.press('Control+Shift+D');
        // The keyboard drag's first candidate is F's own current position (a no-op, hidden by design); move past it.
        await page.keyboard.press('ArrowDown');
        await expect(component.locator('div[class*="dragline"]')).toBeVisible();
    });

    test('a foreign drag over a row does not hide the drag line of a later keyboard drag', async ({ mount, page }) => {
        const component = await mount(<RejectingSiblingFixture />);

        const dt = await page.evaluateHandle(() => new DataTransfer());
        await component.getByRole('treeitem', { name: /^X$/ }).dispatchEvent('dragover', { dataTransfer: dt });

        await component.getByRole('treeitem', { name: /^F$/ }).click();
        await page.keyboard.press('Control+Shift+D');
        await page.keyboard.press('ArrowDown');
        await expect(component.locator('div[class*="dragline"]')).toBeVisible();
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
