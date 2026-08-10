/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FrontifyBlockNode, type FrontifySelection } from './document';

/**
 * The API exposed to plugins. This is the seam that hides the engine: if
 * the engine is swapped, this interface stays stable and only the adapter
 * changes. Plugin code never imports from the engine, only from here.
 */
export type EditorControlApi = {
    /** Toggle a mark on the selection. `value` sets the mark's attrs when turning it on (e.g. `{ href }` for links). */
    toggleMark(key: string, value?: Record<string, unknown>): void;
    isMarkActive(key: string): boolean;

    setBlockType(type: string, attrs?: Record<string, unknown>): void;
    isBlockActive(type: string, attrs?: Record<string, unknown>): boolean;
    /** Insert a new block at the selection (the way to add void blocks like images). */
    insertBlock(type: string, attrs?: Record<string, unknown>): void;
    /** Insert a void inline element at the selection (the way to add mentions). */
    insertInline(type: string, attrs?: Record<string, unknown>): void;
    /** The block the selection starts in — type and attributes only, no children. For toolbar state (e.g. a heading-level dropdown). */
    getCurrentBlock(): FrontifyBlockNode | null;

    /**
     * The selection in document terms. Capture it before opening UI that
     * steals focus (a link popover's input), pass it back to setSelection
     * to restore before applying the edit.
     */
    getSelection(): FrontifySelection | null;
    setSelection(selection: FrontifySelection): void;
    isSelectionCollapsed(): boolean;

    /** Return focus to the editor, e.g. after closing plugin UI. */
    focus(): void;
};
