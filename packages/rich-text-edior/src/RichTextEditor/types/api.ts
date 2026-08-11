/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteBlockNode } from './document';

/**
 * The API exposed to plugins. This is the seam that hides the engine: if the
 * engine is swapped, this interface stays stable and only the adapter changes.
 * Plugin code never imports from the engine, only from here.
 */
export type EditorControlApi = {
    /** Toggle a mark on the selection. `value` sets the mark's attributes when turning it on (`{ href }` for links). */
    toggleMark(key: string, value?: Record<string, unknown>): void;
    isMarkActive(key: string): boolean;
    /**
     * The attributes of a value-carrying mark at the selection (`{ href }` for a
     * link, `{ color }` for font colour), or null when the mark is not there —
     * what plugin UI needs to show the current value instead of just on/off.
     */
    getMarkValue(key: string): Record<string, unknown> | null;
    /**
     * The whole run of a mark around the selection — what it carries and what it
     * covers — or null when the mark is not there. The read-only half of
     * `selectMark`, and the reason it exists: plugin UI opened on a caret can
     * read the link it sits in without turning that caret into a selection.
     *
     * Unlike `getMarkValue` it is about the run rather than the point, so a
     * caret at either *edge* of a link still finds it. That is what UI attached
     * to a link needs, because clicking the end of a word is where a caret
     * routinely lands — while `getMarkValue`, which answers "what would typing
     * here carry", correctly says nothing there.
     */
    getMarkRun(key: string): { value: Record<string, unknown>; text: string } | null;
    /** Strip every mark from the selection — the formatting half of "reset formatting". */
    removeAllMarks(): void;
    /**
     * Grow the selection to cover the whole run of a mark around the caret, so
     * a collapsed caret inside a link can be edited or removed as a unit. Left
     * alone when the selection is already a range — that is what the user meant.
     * Returns false when the mark is not at the caret.
     */
    selectMark(key: string): boolean;

    setBlockType(type: string, attrs?: Record<string, unknown>): void;
    isBlockActive(type: string, attrs?: Record<string, unknown>): boolean;
    /** Set attributes on every block the selection touches — how alignment is applied. */
    updateBlockAttributes(attrs: Record<string, unknown>): void;
    /**
     * Insert a node at the selection — how void blocks (images) and inline
     * elements (mentions) get added. A selected node is replaced by it, and the
     * caret ends up after what was inserted.
     */
    insert(type: string, attrs?: Record<string, unknown>): void;
    /** Insert plain text at the selection, marks and all — what a combobox choice usually comes down to. */
    insertText(text: string): void;
    /** The plain text the selection covers, empty when it is collapsed — what plugin UI prefills a text field with. */
    getSelectedText(): string;
    /**
     * Replace the selection with text and leave that text selected, so a mark
     * command right after applies to exactly it — how the link flyout attaches
     * a link to text that was typed in it rather than selected in the editor.
     */
    replaceSelectionWithText(text: string): void;
    /** The block the selection starts in — type and attributes only, no children. For toolbar state. */
    getCurrentBlock(): RteBlockNode | null;

    /**
     * Wrap the selection in a list, or unwrap it when it already is one of that
     * type. Switching between list types converts in place.
     */
    toggleList(type: string): void;
    /** Nest the current list item under the one above it. Returns false when there is nothing to nest. */
    indentListItem(): boolean;
    /** Lift the current list item out one level, leaving the list entirely at the top. */
    outdentListItem(): boolean;
    /** Split the current list item in two — Enter inside a list. Returns false outside one. */
    splitListItem(): boolean;
    /**
     * Replace every list the selection touches with the blocks its items held.
     * Unlike `outdentListItem`, this works on a selection that merely *contains*
     * lists rather than sitting inside one — what "reset formatting" needs.
     */
    unwrapLists(): boolean;

    isSelectionCollapsed(): boolean;
    /** Return focus to the editor, e.g. after closing plugin UI. */
    focus(): void;
    /** Give up focus, e.g. to commit a single-line editor on Enter. */
    blur(): void;
};
