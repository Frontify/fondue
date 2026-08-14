/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteBlockNode } from './document';

/**
 * The API exposed to plugins. This is the seam that hides the engine: if the
 * engine is swapped, this interface stays stable and only the adapter changes.
 * Plugin code never imports from the engine, only from here.
 *
 * Reads and writes are shaped differently on purpose. Everything a plugin needs
 * to *know* is one value — `selection.get()` — because its UI only ever asks
 * the one question: what is selected right now. Everything a plugin *does* is
 * one command per act, keyed by the type or mark it acts on, so a feature this
 * editor has never heard of needs nothing added here.
 */

/**
 * What is selected, as one value: everything plugin UI renders itself from,
 * read in one go rather than a property at a time.
 *
 * Read it in a toolbar or floating render function — both run on every editor
 * state change, so what comes back is always current.
 */
export type RteSelectionSnapshot = {
    /** A caret rather than a range, so it covers nothing and `text` is empty. */
    isCollapsed: boolean;
    /** The plain text the selection covers — what plugin UI prefills a text field with. */
    text: string;
    /**
     * The block the selection is in — type and attributes flat on it, no
     * children. What a block-type control acts on, so for a caret in a list
     * item this is the paragraph inside the item rather than the item or its
     * list.
     */
    block: RteBlockNode | null;
    /**
     * Every block around the selection, innermost first: `block` plus what
     * contains it, list items and lists included. This is what a wrapper
     * answers to — a list button is on while the caret sits in a paragraph
     * nested two levels inside the list.
     */
    blocks: RteBlockNode[];
    /**
     * The marks the selection carries, keyed by mark key. Presence is the
     * on/off state (`'bold' in marks`); the value is the mark's attributes, so
     * a plain mark maps to `{}` and a value-carrying one to what it holds
     * (`link: { href }`).
     *
     * On a caret these are the marks typing here would carry; over a range,
     * every mark any part of it carries, each with the first value found.
     */
    marks: Record<string, Record<string, unknown>>;
};

export type EditorControlApi = {
    /** What is selected, and the one write that is about the selection itself. */
    selection: {
        get(): RteSelectionSnapshot;
        /**
         * Replace the selection with text and leave that text selected, so a
         * mark command right after applies to exactly it — how the link flyout
         * attaches a link to text that was typed in it rather than selected in
         * the editor.
         */
        replaceWithText(text: string): void;
    };

    marks: {
        /** Toggle a mark over the selection. `value` sets its attributes when turning it on (`{ href }` for links). */
        toggle(key: string, value?: Record<string, unknown>): void;
        /** Strip every mark from the selection — the formatting half of "reset formatting". */
        removeAll(): void;
        /**
         * The whole run of a mark around the selection — what it carries and
         * what it covers — or null when the mark is not there. The read-only
         * half of `select`, so plugin UI opened on a caret can read the link it
         * sits in without turning that caret into a selection.
         *
         * Unlike the snapshot's `marks` this is about the run rather than the
         * point, so a caret at either *edge* of a link still finds it — which
         * is what UI attached to a link needs, because clicking the end of a
         * word is where a caret routinely lands. The snapshot answers "what
         * would typing here carry" and correctly says nothing there.
         */
        getRun(key: string): { value: Record<string, unknown>; text: string } | null;
        /**
         * Grow the selection to cover the whole run of a mark around the caret,
         * so a collapsed caret inside a link can be edited or removed as a
         * unit. Left alone when the selection is already a range — that is what
         * the user meant. Returns false when the mark is not at the caret.
         */
        select(key: string): boolean;
    };

    blocks: {
        setType(type: string, attrs?: Record<string, unknown>): void;
        /** Set attributes on every block the selection touches — how alignment is applied. */
        updateAttributes(attrs: Record<string, unknown>): void;
        /**
         * Put every attribute that a plugin adds to *all* text blocks
         * (`schema.blockAttributes` — alignment) back to its default, across
         * the selection. The block half of "reset formatting", without having
         * to know which plugins contributed what.
         */
        resetAttributes(): void;
    };

    lists: {
        /**
         * Wrap the selection in a list, or unwrap it when it already is one of
         * that type. Switching between list types converts in place.
         */
        toggle(type: string): void;
        /** Nest the current list item under the one above it. Returns false when there is nothing to nest. */
        indent(): boolean;
        /** Lift the current list item out one level, leaving the list entirely at the top. */
        outdent(): boolean;
        /** Split the current list item in two — Enter inside a list. Returns false outside one. */
        split(): boolean;
        /**
         * Replace every list the selection touches with the blocks its items
         * held. Unlike `outdent`, this works on a selection that merely
         * *contains* lists rather than sitting inside one — what "reset
         * formatting" needs.
         */
        unwrapAll(): boolean;
    };

    /**
     * Insert a node at the selection — how void blocks (images) and inline
     * elements (mentions) get added. A selected node is replaced by it, and the
     * caret ends up after what was inserted.
     */
    insert(type: string, attrs?: Record<string, unknown>): void;
    /** Insert plain text at the selection, marks and all — what a combobox choice usually comes down to. */
    insertText(text: string): void;

    /** Return focus to the editor, e.g. after closing plugin UI. */
    focus(): void;
    /** Give up focus, e.g. to commit a single-line editor on Enter. */
    blur(): void;
};
