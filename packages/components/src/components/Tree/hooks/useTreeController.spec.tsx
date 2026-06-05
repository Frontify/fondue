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
        const { result } = renderHook(() => useTreeController({ items: baseItems, onChange }));

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
});
