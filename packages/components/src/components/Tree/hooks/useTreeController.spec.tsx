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

    it('emits onChange with the assembled state when a checkbox toggles', () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const { result } = renderHook(() => useTreeController({ items: baseItems, onChange, multiSelect: true }));

        act(() => {
            // Directly drive the checkbox state via the tree's setter — equivalent to a click,
            // without depending on rendered DOM.
            result.current.setCheckedItems(['1']);
        });

        expect(onChange).toHaveBeenCalled();
        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        expect(last.find((node) => node.id === '1')?.isSelected).toBe(true);
        expect(last.find((node) => node.id === '2')?.isSelected).toBe(false);
    });

    it('moves single-select state and fires onSelectChange diffs', () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const onSelectA = vi.fn();
        const onSelectB = vi.fn();
        const items: TreeItemData[] = [
            { id: '1', name: 'One', isFolder: false, parentId: ROOT_ID, isSelected: true, onSelectChange: onSelectA },
            { id: '2', name: 'Two', isFolder: false, parentId: ROOT_ID, onSelectChange: onSelectB },
        ];
        const { result } = renderHook(() => useTreeController({ items, onChange }));

        act(() => {
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

    it('pins single-select to the last id even when the setter receives multiple', () => {
        const onChange = vi.fn<(state: TreeChangeState) => void>();
        const { result } = renderHook(() => useTreeController({ items: baseItems, onChange }));

        act(() => {
            result.current.setSelectedItems(['1', '2']);
        });

        const last = onChange.mock.calls[onChange.mock.calls.length - 1]?.[0] ?? [];
        expect(last.find((node) => node.id === '1')?.isSelected).toBe(false);
        expect(last.find((node) => node.id === '2')?.isSelected).toBe(true);
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
