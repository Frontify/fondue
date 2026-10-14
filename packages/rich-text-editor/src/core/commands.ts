/* (c) Copyright Frontify Ltd., all rights reserved. */

// The commands plugins run and the selection they read — the only way plugin
// code reaches the editor.

/** What is selected, as one value that plugin UI renders itself from. Read it in a toolbar render function, which runs on every state change. */
export type RteSelectionSnapshot = {
    /** A caret rather than a range, so it covers nothing and `text` is empty. */
    isCollapsed: boolean;
    /** The plain text the selection covers — what plugin UI prefills a text field with. */
    text: string;
    /** The block the selection is in, attributes flat, no children — in a list item, the paragraph inside it. */
    block: { type: string; [attribute: string]: unknown } | null;
    /** Every block around the selection, innermost first (`block`, then its list items and lists) — what a wrapper's active state reads. */
    blocks: { type: string; [attribute: string]: unknown }[];
    /**
     * The marks the selection carries, by mark type. Presence is on/off
     * (`'bold' in marks`); the value is the mark's attributes (`{}` for a plain
     * mark, `{ href }` for a link).
     *
     * On a caret, the marks typing here would carry; over a range, the marks
     * every text in it carries — a half-bold range is not bold.
     */
    marks: Record<string, Record<string, unknown>>;
};

/**
 * The API plugins are handed in their toolbar item, hotkeys and `render.edit`:
 * all a plugin needs to drive the editor, whatever the engine.
 *
 * Reads and writes are shaped differently on purpose: everything to *know* is
 * one value (`selection.get()`); everything to *do* is one command per act,
 * keyed by the type it acts on, so new features need nothing added here.
 */
export type EditorControlApi = {
    /** What is selected. */
    selection: {
        get(): RteSelectionSnapshot;
    };

    marks: {
        /**
         * Toggle a mark over the selection: on when not all of it carries the
         * mark, off otherwise. `value` is what it carries when turning it on
         * (`{ href }` for links).
         */
        toggle(type: string, value?: Record<string, unknown>): void;
        /** Strip every mark from the selection — the formatting half of "reset formatting". */
        removeAll(): void;
        /**
         * The whole run of a mark around the selection (its value and text), or
         * null. Unlike the snapshot's `marks` it is about the run, not the
         * point, so a caret at either edge of a link still finds it.
         */
        getRun(type: string): { value: Record<string, unknown>; text: string } | null;
    };

    blocks: {
        /** Turn every text block the selection touches into this type, with `value` as its attributes. */
        setType(type: string, value?: Record<string, unknown>): void;
        /** Set attributes on every block the selection touches — how alignment is applied. */
        updateAttributes(attributes: Record<string, unknown>): void;
        /** Reset every `blockAttributes` attribute (alignment) to its default across the selection. */
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
        /** Replace every list the selection touches with the blocks its items held, even when the selection merely contains lists. */
        unwrapAll(): boolean;
    };

    /**
     * Insert a node at the selection — how void blocks (a column break) and
     * inline elements (mentions) get added, with `value` as what it stores.
     * The caret ends up after what was inserted.
     */
    insert(type: string, value?: Record<string, unknown>): void;
    /** Insert plain text at the selection, carrying the marks typing there would. */
    insertText(text: string): void;

    /** The text around the caret, within its block. */
    text: {
        /** Everything in the caret's block before the caret; empty when the selection is not a caret in text. */
        beforeCaret(): string;
        /** Everything in the caret's block after the caret. */
        afterCaret(): string;
        /** Delete this many characters before the caret, without leaving the block. */
        deleteBefore(count: number): void;
    };

    /** Return focus to the editor, e.g. after closing plugin UI. */
    focus(): void;
    /** Give up focus, e.g. to commit a single-line editor on Enter. */
    blur(): void;

    /** Which node's editing UI is open. The editor holds it so a toolbar button can open it; leaving the node closes it. */
    editors: {
        /** Open the `render.edit` of the node of this type at the selection. */
        open(type: string): void;
        close(): void;
    };
};
