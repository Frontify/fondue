/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { ROOT_ID } from '../constants';
import { type TreeChangeState, type TreeItemData } from '../types';

import { useTreeController } from './useTreeController';

/**
 * `useTreeController` is the thin headless-tree wrapper. We can't drive a full drag-and-
 * drop sequence from a hook test, but we can verify the contract that consumers rely
 * on: a usable `TreeInstance` is returned, the synthetic root is wired up, and changes
 * to the input items are reflected via `getItems()`.
 */

const baseItems: TreeItemData[] = [
    { id: '1', name: 'One', isFolder: false, parentId: ROOT_ID },
    { id: '2', name: 'Two', isFolder: false, parentId: ROOT_ID },
];

// `onChange` flushes in a microtask; run the interaction and await the flush.
const interact = (callback: () => void) =>
    act(async () => {
        callback();
        await Promise.resolve();
    });

describe('useTreeController', () => {
    it('returns a TreeInstance exposing the visible top-level items', () => {
        const { result } = renderHook(() => useTreeController({ items: baseItems }));
        const ids = result.current.getItems().map((item) => item.getId());
        expect(ids).toEqual(['1', '2']);
    });

    it('does not expose the synthetic root in getItems()', () => {
        const { result } = renderHook(() => useTreeController({ items: baseItems }));
        const ids = result.current.getItems().map((item) => item.getId());
        expect(ids).not.toContain(ROOT_ID);
    });

    it('treats items without a parentId as top-level children of the root', () => {
        const items: TreeItemData[] = [
            { id: 'orphan', name: 'Orphan', isFolder: false },
            { id: 'a', name: 'A', isFolder: false, parentId: ROOT_ID },
        ];
        const { result } = renderHook(() => useTreeController({ items }));
        const ids = result.current.getItems().map((item) => item.getId());
        expect(ids).toContain('orphan');
        expect(ids).toContain('a');
    });

    it('rebuilds when the items structure changes', () => {
        const { result, rerender } = renderHook(({ items }) => useTreeController({ items }), {
            initialProps: { items: baseItems },
        });
        expect(result.current.getItems()).toHaveLength(2);

        const next: TreeItemData[] = [...baseItems, { id: '3', name: 'Three', isFolder: false, parentId: ROOT_ID }];
        rerender({ items: next });

        expect(result.current.getItems().map((item) => item.getId())).toEqual(['1', '2', '3']);
    });

    it('emits onChange with the assembled state when a checkbox toggles', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const { result } = renderHook(() => useTreeController({ items: baseItems, onChange, multiSelect: true }));

        await interact(() => {
            // Directly drive the checkbox state via the tree's setter — equivalent to a click,
            // without depending on rendered DOM.
            result.current.setCheckedItems(['1']);
        });

        expect(onChange).toHaveBeenCalled();
        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        expect(last.find((node) => node.id === '1')?.isSelected).toBe(true);
        expect(last.find((node) => node.id === '2')?.isSelected).toBe(false);
    });

    it('moves single-select state and fires onSelectChange diffs', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const onSelectA = vi.fn();
        const onSelectB = vi.fn();
        const items: TreeItemData[] = [
            { id: '1', name: 'One', isFolder: false, parentId: ROOT_ID, isSelected: true, onSelectChange: onSelectA },
            { id: '2', name: 'Two', isFolder: false, parentId: ROOT_ID, onSelectChange: onSelectB },
        ];
        const { result } = renderHook(() => useTreeController({ items, onChange }));

        await interact(() => {
            result.current.setSelectedItems(['2']);
        });

        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        expect(last.find((node) => node.id === '1')?.isSelected).toBe(false);
        expect(last.find((node) => node.id === '2')?.isSelected).toBe(true);
        expect(onSelectA).toHaveBeenCalledWith(false);
        expect(onSelectB).toHaveBeenCalledWith(true);
    });

    it("ignores 'indeterminate' as an isSelected input in both modes", () => {
        const items: TreeItemData[] = [
            { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, isSelected: 'indeterminate' },
            { id: '1', name: 'One', isFolder: false, parentId: 'folder', isSelected: 'indeterminate' },
        ];

        const multi = renderHook(() => useTreeController({ items, multiSelect: true }));
        expect(multi.result.current.getState().checkedItems).toEqual([]);

        const single = renderHook(() => useTreeController({ items }));
        expect(single.result.current.getState().selectedItems).toEqual([]);
    });

    it('pins single-select to the last id even when the setter receives multiple', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const { result } = renderHook(() => useTreeController({ items: baseItems, onChange }));

        await interact(() => {
            result.current.setSelectedItems(['1', '2']);
        });

        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        expect(last.find((node) => node.id === '1')?.isSelected).toBe(false);
        expect(last.find((node) => node.id === '2')?.isSelected).toBe(true);
    });

    it('coalesces several setter calls in one event into a single onChange', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const items: TreeItemData[] = [
            { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, children: ['1'] },
            { id: '1', name: 'One', isFolder: false, parentId: 'folder' },
        ];
        const { result } = renderHook(() => useTreeController({ items, onChange }));

        // What a folder click does: select and expand in the same event.
        await interact(() => {
            result.current.setSelectedItems(['folder']);
            result.current.getItemInstance('folder').expand();
        });

        expect(onChange).toHaveBeenCalledTimes(1);
        const state = onChange.mock.calls[0]?.[0] ?? [];
        expect(state.find((node) => node.id === 'folder')).toMatchObject({ isSelected: true, isExpanded: true });
    });

    it('skips onChange when an interaction leaves the state unchanged', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const items: TreeItemData[] = [{ id: '1', name: 'One', isFolder: false, parentId: ROOT_ID, isSelected: true }];
        const { result } = renderHook(() => useTreeController({ items, onChange }));

        // Re-clicking the already selected row.
        await interact(() => {
            result.current.setSelectedItems(['1']);
        });

        expect(onChange).not.toHaveBeenCalled();
    });
});

describe('useTreeController renaming', () => {
    const renameItems = (overrides?: Partial<TreeItemData>): TreeItemData[] => [
        { id: '1', name: 'One', isFolder: false, parentId: ROOT_ID, onRename: vi.fn(), ...overrides },
        { id: '2', name: 'Two', isFolder: false, parentId: ROOT_ID },
    ];

    const typeRenameValue = (tree: ReturnType<typeof useTreeController>, value: string) => {
        // Drive the rename input's controlled onChange the way the DOM input would.
        const inputProps = tree.getItemInstance('1').getRenameInputProps() as {
            onChange: (event: { target: { value: string } }) => void;
        };
        inputProps.onChange({ target: { value } });
    };

    it('enters rename mode when an item with onRename mounts with isRenaming', () => {
        const items = renameItems({ isRenaming: true });
        const { result } = renderHook(() => useTreeController({ items }));

        expect(result.current.isRenamingItem()).toBe(true);
        expect(result.current.getRenamingItem()?.getId()).toBe('1');
        expect(result.current.getRenamingValue()).toBe('One');
    });

    it('does not enter rename mode without an onRename handler', () => {
        const items = renameItems({ isRenaming: true, onRename: undefined });
        const { result } = renderHook(() => useTreeController({ items }));

        expect(result.current.isRenamingItem()).toBe(false);
    });

    it('enters rename mode when isRenaming flips on a later render', () => {
        const { result, rerender } = renderHook(({ items }) => useTreeController({ items }), {
            initialProps: { items: renameItems() },
        });
        expect(result.current.isRenamingItem()).toBe(false);

        rerender({ items: renameItems({ isRenaming: true }) });
        expect(result.current.isRenamingItem()).toBe(true);
    });

    it('commits a changed name: fires onRename, onRenamingChange(false), and onChange with the new name', () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const onRename = vi.fn();
        const onRenamingChange = vi.fn();
        const items = renameItems({ isRenaming: true, onRename, onRenamingChange });
        const { result } = renderHook(() => useTreeController({ items, onChange }));

        act(() => {
            typeRenameValue(result.current, 'Renamed');
        });
        act(() => {
            result.current.completeRenaming();
        });

        expect(onRename).toHaveBeenCalledExactlyOnceWith('Renamed');
        // Starts are never echoed (the consumer set isRenaming itself) — only the end.
        expect(onRenamingChange).toHaveBeenCalledExactlyOnceWith(false);
        expect(result.current.isRenamingItem()).toBe(false);
        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        expect(last.find((node) => node.id === '1')?.name).toBe('Renamed');
        expect(last.find((node) => node.id === '2')?.name).toBe('Two');
    });

    it('trims the committed name', () => {
        const onRename = vi.fn();
        const items = renameItems({ isRenaming: true, onRename });
        const { result } = renderHook(() => useTreeController({ items }));

        act(() => {
            typeRenameValue(result.current, '  Renamed  ');
        });
        act(() => {
            result.current.completeRenaming();
        });

        expect(onRename).toHaveBeenCalledExactlyOnceWith('Renamed');
    });

    it('treats unchanged and empty names as no-ops (no onRename, no onChange)', () => {
        for (const value of ['One', '   ', ''] as const) {
            const onChange = vi.fn<(state: TreeChangeState) => void>();
            const onRename = vi.fn();
            const items = renameItems({ isRenaming: true, onRename });
            const { result } = renderHook(() => useTreeController({ items, onChange }));

            act(() => {
                typeRenameValue(result.current, value);
            });
            act(() => {
                result.current.completeRenaming();
            });

            expect(onRename).not.toHaveBeenCalled();
            expect(onChange).not.toHaveBeenCalled();
            // The rename session still ends.
            expect(result.current.isRenamingItem()).toBe(false);
        }
    });

    it('aborting fires onRenamingChange(false) without onRename', () => {
        const onRename = vi.fn();
        const onRenamingChange = vi.fn();
        const items = renameItems({ isRenaming: true, onRename, onRenamingChange });
        const { result } = renderHook(() => useTreeController({ items }));

        act(() => {
            typeRenameValue(result.current, 'Discarded');
        });
        act(() => {
            result.current.abortRenaming();
        });

        expect(onRename).not.toHaveBeenCalled();
        expect(onRenamingChange).toHaveBeenCalledWith(false);
        expect(result.current.isRenamingItem()).toBe(false);
    });

    it('does not re-enter rename mode when the prop is still true after the tree ended the rename', () => {
        const items = renameItems({ isRenaming: true });
        const { result, rerender } = renderHook(({ items: current }) => useTreeController({ items: current }), {
            initialProps: { items },
        });

        act(() => {
            result.current.abortRenaming();
        });
        expect(result.current.isRenamingItem()).toBe(false);

        // Consumer re-renders without having cleared its flag yet — must stay ended.
        rerender({ items: renameItems({ isRenaming: true }) });
        expect(result.current.isRenamingItem()).toBe(false);
    });
});

describe('useTreeController disabled rows', () => {
    it('keeps a disabled leaf unchecked when a folder cascade tries to check it', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const onSelectDisabled = vi.fn();
        const items: TreeItemData[] = [
            { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, children: ['a', 'b'] },
            {
                id: 'a',
                name: 'A',
                isFolder: false,
                parentId: 'folder',
                isDisabled: true,
                onSelectChange: onSelectDisabled,
            },
            { id: 'b', name: 'B', isFolder: false, parentId: 'folder' },
        ];
        const { result } = renderHook(() => useTreeController({ items, onChange, multiSelect: true }));

        await interact(() => {
            // What headless-tree's folder cascade emits: every leaf descendant.
            result.current.setCheckedItems(['a', 'b']);
        });

        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        const folder = last.find((node) => node.id === 'folder');
        expect(folder?.children?.find((node) => node.id === 'a')?.isSelected).toBe(false);
        expect(folder?.children?.find((node) => node.id === 'b')?.isSelected).toBe(true);
        // The frozen leaf still counts toward the folder's derived state.
        expect(folder?.isSelected).toBe('indeterminate');
        expect(onSelectDisabled).not.toHaveBeenCalled();
    });

    it('keeps a disabled checked leaf checked when a cascade tries to uncheck it', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const onSelectDisabled = vi.fn();
        const items: TreeItemData[] = [
            { id: 'folder', name: 'Folder', isFolder: true, parentId: ROOT_ID, children: ['a', 'b'] },
            {
                id: 'a',
                name: 'A',
                isFolder: false,
                parentId: 'folder',
                isDisabled: true,
                isSelected: true,
                onSelectChange: onSelectDisabled,
            },
            { id: 'b', name: 'B', isFolder: false, parentId: 'folder', isSelected: true },
        ];
        const { result } = renderHook(() => useTreeController({ items, onChange, multiSelect: true }));

        await interact(() => {
            result.current.setCheckedItems([]);
        });

        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        const folder = last.find((node) => node.id === 'folder');
        expect(folder?.children?.find((node) => node.id === 'a')?.isSelected).toBe(true);
        expect(folder?.children?.find((node) => node.id === 'b')?.isSelected).toBe(false);
        expect(folder?.isSelected).toBe('indeterminate');
        expect(onSelectDisabled).not.toHaveBeenCalled();
    });

    it('keeps the current single-select highlight when a disabled row is clicked', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const onSelectDisabled = vi.fn();
        const items: TreeItemData[] = [
            { id: '1', name: 'One', isFolder: false, parentId: ROOT_ID, isSelected: true },
            {
                id: '2',
                name: 'Two',
                isFolder: false,
                parentId: ROOT_ID,
                isDisabled: true,
                onSelectChange: onSelectDisabled,
            },
        ];
        const { result } = renderHook(() => useTreeController({ items, onChange }));

        await interact(() => {
            // What selectionFeature emits for a plain click on row '2'.
            result.current.setSelectedItems(['2']);
        });

        // The highlight stays where it was — a no-op interaction, so no onChange at all.
        expect(onChange).not.toHaveBeenCalled();
        expect(onSelectDisabled).not.toHaveBeenCalled();
    });

    it('skips disabled ids when single-select receives multiple (Ctrl+A)', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const items: TreeItemData[] = [
            { id: '1', name: 'One', isFolder: false, parentId: ROOT_ID },
            { id: '2', name: 'Two', isFolder: false, parentId: ROOT_ID, isDisabled: true },
        ];
        const { result } = renderHook(() => useTreeController({ items, onChange }));

        await interact(() => {
            result.current.setSelectedItems(['1', '2']);
        });

        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        expect(last.find((node) => node.id === '1')?.isSelected).toBe(true);
        expect(last.find((node) => node.id === '2')?.isSelected).toBe(false);
    });

    it('does not allow renaming a disabled row even with an onRename handler', () => {
        const items: TreeItemData[] = [
            { id: '1', name: 'One', isFolder: false, parentId: ROOT_ID, onRename: vi.fn(), isDisabled: true },
        ];
        const { result } = renderHook(() => useTreeController({ items }));

        expect(result.current.getItemInstance('1').canRename()).toBe(false);
    });

    it('does not enter rename mode when isRenaming is set on a disabled row', () => {
        const items: TreeItemData[] = [
            {
                id: '1',
                name: 'One',
                isFolder: false,
                parentId: ROOT_ID,
                onRename: vi.fn(),
                isRenaming: true,
                isDisabled: true,
            },
        ];
        const { result } = renderHook(() => useTreeController({ items }));

        expect(result.current.isRenamingItem()).toBe(false);
    });

    it('rejects dragging disabled rows via canDrag when reorderable', () => {
        const items: TreeItemData[] = [
            { id: '1', name: 'One', isFolder: false, parentId: ROOT_ID, isDisabled: true },
            { id: '2', name: 'Two', isFolder: false, parentId: ROOT_ID },
        ];
        const { result } = renderHook(() => useTreeController({ items, reorderable: true }));

        const canDrag = result.current.getConfig().canDrag;
        expect(canDrag?.([result.current.getItemInstance('1')])).toBe(false);
        expect(canDrag?.([result.current.getItemInstance('2')])).toBe(true);
    });
});

/**
 * Folders with no loaded children — empty, or collapsed while their contents lazy-load —
 * are checkable as their own entity: their `isSelected` prop feeds `checkedItems` and
 * `setChecked`/`setUnchecked` on them round-trips through `onSelectChange`.
 */
describe('useTreeController leafless folders', () => {
    const lazyDoc = (id: string, parentId: string, extra: Partial<TreeItemData> = {}): TreeItemData => ({
        id,
        name: id,
        isFolder: true,
        parentId,
        children: [],
        ...extra,
    });

    it('honors isSelected on a leafless folder as checked state', () => {
        const items: TreeItemData[] = [lazyDoc('doc', ROOT_ID, { isSelected: true })];
        const { result } = renderHook(() => useTreeController({ items, multiSelect: true }));

        expect(result.current.getState().checkedItems).toEqual(['doc']);
    });

    it('ignores isSelected on a folder once it has loaded children', () => {
        const items: TreeItemData[] = [
            { id: 'doc', name: 'Doc', isFolder: true, parentId: ROOT_ID, children: ['page'], isSelected: true },
            { id: 'page', name: 'Page', isFolder: false, parentId: 'doc' },
        ];
        const { result } = renderHook(() => useTreeController({ items, multiSelect: true }));

        expect(result.current.getState().checkedItems).toEqual([]);
    });

    it('checks a leafless folder as its own entity and reports it via onChange', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const onSelectChange = vi.fn();
        const items: TreeItemData[] = [lazyDoc('doc', ROOT_ID, { onSelectChange })];
        const { result } = renderHook(() => useTreeController({ items, onChange, multiSelect: true }));

        await act(async () => {
            await result.current.getItemInstance('doc').setChecked();
        });

        expect(onSelectChange).toHaveBeenCalledWith(true);
        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        expect(last.find((node) => node.id === 'doc')?.isSelected).toBe(true);
    });

    it('unchecks a checked leafless folder', async () => {
        const onSelectChange = vi.fn();
        const items: TreeItemData[] = [lazyDoc('doc', ROOT_ID, { isSelected: true, onSelectChange })];
        const { result } = renderHook(() => useTreeController({ items, multiSelect: true }));

        await act(async () => {
            await result.current.getItemInstance('doc').setUnchecked();
        });

        expect(onSelectChange).toHaveBeenCalledWith(false);
    });

    it('cascades a folder check into leafless descendant folders, keeping the folder itself derived', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const onSelectDoc1 = vi.fn();
        const onSelectDoc2 = vi.fn();
        const onSelectGroup = vi.fn();
        const items: TreeItemData[] = [
            {
                id: 'group',
                name: 'Group',
                isFolder: true,
                parentId: ROOT_ID,
                children: ['doc1', 'doc2'],
                onSelectChange: onSelectGroup,
            },
            lazyDoc('doc1', 'group', { onSelectChange: onSelectDoc1 }),
            lazyDoc('doc2', 'group', { onSelectChange: onSelectDoc2 }),
        ];
        const { result } = renderHook(() => useTreeController({ items, onChange, multiSelect: true }));

        await act(async () => {
            await result.current.getItemInstance('group').setChecked();
        });

        expect(onSelectDoc1).toHaveBeenCalledWith(true);
        expect(onSelectDoc2).toHaveBeenCalledWith(true);
        // The group's own id never enters checkedItems — its state stays derived.
        expect(onSelectGroup).not.toHaveBeenCalled();
        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        expect(last.find((node) => node.id === 'group')?.isSelected).toBe(true);
    });

    it('keeps a disabled leafless folder frozen during a cascade', async () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const onSelectDisabled = vi.fn();
        const items: TreeItemData[] = [
            { id: 'group', name: 'Group', isFolder: true, parentId: ROOT_ID, children: ['doc1', 'doc2'] },
            lazyDoc('doc1', 'group', { isDisabled: true, onSelectChange: onSelectDisabled }),
            lazyDoc('doc2', 'group'),
        ];
        const { result } = renderHook(() => useTreeController({ items, onChange, multiSelect: true }));

        await act(async () => {
            await result.current.getItemInstance('group').setChecked();
        });

        expect(onSelectDisabled).not.toHaveBeenCalled();
        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        expect(last.find((node) => node.id === 'group')?.isSelected).toBe('indeterminate');
    });
});
