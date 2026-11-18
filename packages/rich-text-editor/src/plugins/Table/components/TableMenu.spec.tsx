/* (c) Copyright Frontify Ltd., all rights reserved. */

// @vitest-environment happy-dom

import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { type EditorControlApi, type RteSelectionSnapshot } from '#/core';

import { TableMenu } from './TableMenu';

declare global {
    // eslint-disable-next-line no-var
    var IS_REACT_ACT_ENVIRONMENT: boolean;
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const teardown: (() => void)[] = [];
afterEach(() => {
    for (const clean of teardown.splice(0)) {
        clean();
    }
});

const selectionIn = (types: string[]): RteSelectionSnapshot => ({
    kind: 'text',
    grid: null,
    isCollapsed: true,
    text: '',
    block: { type: types[0] ?? 'paragraph' },
    blocks: types.map((type) => ({ type })),
    marks: {},
    history: { canUndo: false, canRedo: false },
});

const IN_TABLE = selectionIn(['paragraph', 'tableCell', 'tableRow', 'table']);

type Shape = NonNullable<ReturnType<EditorControlApi['grid']['shape']>>;

/** A grid with the caret in one slot, no headers, unless told otherwise. */
const shapeOf = (shape: Partial<Shape>): Shape => ({
    rows: 2,
    columns: 2,
    selectedRows: 1,
    selectedColumns: 1,
    headerRow: false,
    headerColumn: false,
    ...shape,
});

const fakeGrid = (shape: Shape | null, can = { merge: true, split: true }) => ({
    shape: () => shape,
    add: vi.fn(() => true),
    removeSelected: vi.fn(() => true),
    removeGrid: vi.fn(() => true),
    toggleHeader: vi.fn(() => true),
    mergeSlots: vi.fn(() => true),
    splitSlot: vi.fn(() => true),
    canMergeSlots: () => can.merge,
    canSplitSlot: () => can.split,
});

const show = (selection: RteSelectionSnapshot, grid: ReturnType<typeof fakeGrid>) => {
    const container = window.document.createElement('div');
    window.document.body.append(container);
    const root = createRoot(container);
    const api = { grid, focus: () => {} } as unknown as EditorControlApi;
    act(() => {
        root.render(<TableMenu api={api} selection={selection} />);
    });
    teardown.push(() => {
        act(() => root.unmount());
        container.remove();
    });
    return container;
};

/** Open the menu from its button, the way a keyboard user does. */
const openMenu = (container: HTMLElement): HTMLElement[] => {
    const trigger = container.querySelector<HTMLElement>('button');
    if (!trigger) {
        throw new Error('no table menu button');
    }
    act(() => trigger.focus());
    act(() => {
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true }));
    });
    return [...window.document.querySelectorAll<HTMLElement>('[role="menuitem"]')];
};

const itemNamed = (items: HTMLElement[], label: string): HTMLElement | undefined =>
    items.find((item) => item.textContent?.startsWith(label));

describe('the table menu', () => {
    it('is not shown outside a table', () => {
        const container = show(selectionIn(['paragraph']), fakeGrid(null));

        expect(container.querySelector('button')).toBeNull();
    });

    it('is shown in a table and runs what is chosen', () => {
        const grid = fakeGrid(shapeOf({}));
        const items = openMenu(show(IN_TABLE, grid));

        expect(items.map((item) => item.textContent)).toEqual([
            'Insert column left',
            'Insert column right',
            'Insert row above',
            'Insert row below',
            'Delete column',
            'Delete row',
            'Merge cells',
            'Split cell',
            'Add header row',
            'Add header column',
            'Delete table',
        ]);
        act(() => itemNamed(items, 'Insert column right')?.click());
        expect(grid.add).toHaveBeenCalledWith('column', 'after');
    });

    it('leaves out deleting the only row', () => {
        const items = openMenu(show(IN_TABLE, fakeGrid(shapeOf({ rows: 1 }))));

        expect(itemNamed(items, 'Delete row')).toBeUndefined();
        expect(itemNamed(items, 'Delete column')).toBeDefined();
    });

    // Deleting them all would leave no table, so the engine refuses; the menu does not offer it.
    it('leaves out deleting columns when the selection covers every column', () => {
        const items = openMenu(show(IN_TABLE, fakeGrid(shapeOf({ rows: 3, columns: 2, selectedColumns: 2 }))));

        expect(itemNamed(items, 'Delete column')).toBeUndefined();
        expect(itemNamed(items, 'Delete row')).toBeDefined();
    });

    it('names each header toggle by what choosing it does', () => {
        const items = openMenu(show(IN_TABLE, fakeGrid(shapeOf({ headerRow: true }))));

        expect(itemNamed(items, 'Remove header row')).toBeDefined();
        expect(itemNamed(items, 'Add header column')).toBeDefined();
    });

    it('leaves out merging and splitting when the selection cannot be merged or split', () => {
        const items = openMenu(show(IN_TABLE, fakeGrid(shapeOf({}), { merge: false, split: false })));

        expect(itemNamed(items, 'Merge cells')).toBeUndefined();
        expect(itemNamed(items, 'Split cell')).toBeUndefined();
        expect(itemNamed(items, 'Delete table')).toBeDefined();
    });

    it('merges when it can', () => {
        const grid = fakeGrid(shapeOf({}));
        const items = openMenu(show(IN_TABLE, grid));

        act(() => itemNamed(items, 'Merge cells')?.click());
        expect(grid.mergeSlots).toHaveBeenCalledTimes(1);
        expect(grid.splitSlot).not.toHaveBeenCalled();
    });

    it('splits when it can', () => {
        const grid = fakeGrid(shapeOf({}));
        const split = itemNamed(openMenu(show(IN_TABLE, grid)), 'Split cell');

        act(() => split?.click());
        expect(grid.splitSlot).toHaveBeenCalledTimes(1);
    });
});
