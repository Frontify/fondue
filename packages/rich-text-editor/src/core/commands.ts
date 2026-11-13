/* (c) Copyright Frontify Ltd., all rights reserved. */

// The commands plugins run and the selection they read — the only way plugin
// code reaches the editor.

/**
 * How a mark is carried by the selection. `'all'`: every counted text carries
 * it, or a caret would type with it, and `value` is its attributes. `'some'`:
 * only part of a range carries it.
 */
export type RteMarkState = { coverage: 'all'; value: Record<string, unknown> } | { coverage: 'some' };

/**
 * How a block attribute is carried by the text blocks the selection touches. `'all'`: every one that declares it has
 * the same `value` (`null` when unset). `'some'`: they differ.
 */
export type RteAttributeState = { coverage: 'all'; value: unknown } | { coverage: 'some' };

/**
 * How `insertText` is undone. `'together'`: the text and its marks in one step. `'marksFirst'`: the marks in a step
 * of their own, so the first undo keeps the text, as undoing an autolink does.
 */
export type InsertTextUndo = 'together' | 'marksFirst';

/**
 * Options for `insertText`.
 */
export type InsertTextOptions = {
    /**
     * How the insert is undone.
     * @default 'together'
     */
    undo?: InsertTextUndo;
};

/**
 * What is selected, as one value that plugin UI renders itself from. Read it in a toolbar render function, which runs on every state change.
 */
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
     * The marks the selection carries, by mark type; a mark the selection does
     * not touch is absent. `coverage: 'all'` carries the mark's attributes in
     * `value` (`{}` for a plain mark, `{ href }` for a link).
     *
     * On a caret, every entry is `'all'`: the marks typing here would carry.
     * Over a range, `'all'` is a mark every text in it carries and `'some'` one
     * only part of it carries — a half-bold range is `'some'`, not bold. A mark
     * all of it carries, but with different values, is `'some'` too: a
     * red-and-blue range has no one colour.
     */
    marks: Record<string, RteMarkState>;
    /**
     * The block attributes plugins add to every text block (alignment), by name; one no selected text block declares
     * is absent. On a caret it is the caret's block.
     */
    attributes: Record<string, RteAttributeState>;
    /** Whether the undo history has a change to take back or make again — what undo and redo buttons enable on. */
    history: { canUndo: boolean; canRedo: boolean };
};

/**
 * What `blocks.toggleAttribute` did: put the value on the blocks, took it off them, or found no selected text block that declares the attribute
 */
export type BlockAttributeToggle = 'set' | 'removed' | 'unchanged';

/**
 * How much of the document `marks.removeAll` clears at a caret: `'typing'` only stops the next typed text carrying
 * marks, `'block'` also clears the marks of the caret's whole text block. A range clears what it covers either way.
 */
export type ClearMarksScope = 'typing' | 'block';

/**
 * Options for `marks.removeAll`.
 */
export type ClearMarksOptions = {
    /**
     * How much a caret clears.
     */
    scope: ClearMarksScope;
    /**
     * Leave on the marks that declare `survivesClear`.
     * @default false
     */
    keepSurviving?: boolean;
};

/**
 * The API plugins are handed in their toolbar controls, hotkeys and `edit` views,
 * to drive the editor whatever the engine. Read with `selection.get()`; act with
 * one command per act, keyed by the type it acts on.
 */
export type EditorControlApi = {
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
        /**
         * Put a mark on all of the selection with `value`, replacing the value
         * any of it carried, as one undo step: how a colour is changed.
         */
        set(type: string, value?: Record<string, unknown>): void;
        /**
         * Take a mark off all of the selection, however much of it carried the
         * mark, as one undo step: how a colour is removed.
         */
        remove(type: string): void;
        /**
         * Strip every mark from the selection, except those that declare `survivesClear` when `keepSurviving` is set:
         * the formatting half of "reset formatting".
         *
         * @returns whether any mark was removed, from the document or from the marks the caret would type with
         */
        removeAll(options: ClearMarksOptions): boolean;
        /**
         * The whole run of a mark around the selection (its value and text), or
         * null. Unlike the snapshot's `marks` it is about the run, not the
         * point, so a caret at either edge of a link still finds it.
         */
        getRun(type: string): { value: Record<string, unknown>; text: string } | null;
    };

    blocks: {
        /**
         * Turn every text block the selection touches into this type, with `value` as its attributes.
         * A block inside a list is first taken out of its list, so the result stands on its own, whichever lists
         * the selection spans.
         */
        setType(type: string, value?: Record<string, unknown>): void;
        /** Set attributes on every block the selection touches — how alignment is applied. */
        updateAttributes(attributes: Record<string, unknown>): void;
        /**
         * Set `name` to `value` on every text block the selection touches, or remove it (set it to null) when every one already has that value. Changes nothing when no selected text block declares `name`
         */
        toggleAttribute(name: string, value: unknown): BlockAttributeToggle;
        /**
         * Reset every `blockAttributes` attribute (alignment) to its default across the selection
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
        /**
         * Split the current list item in two or, in an empty item, leave the list (outdent) — Enter inside a list. Returns false outside one.
         */
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
    /**
     * Insert plain text at the selection, replacing what is selected, carrying the marks typing there would plus
     * `marks`. Unknown mark types are ignored.
     * @param marks - Marks to add, by type to value, as in `marks.toggle`.
     * @param options - How the insert is undone.
     */
    insertText(text: string, marks?: Record<string, Record<string, unknown>>, options?: InsertTextOptions): void;

    /** The text around the caret, within its block. */
    text: {
        /** Everything in the caret's block before the caret; empty when the selection is not a caret in text. */
        beforeCaret(): string;
        /** Everything in the caret's block after the caret. */
        afterCaret(): string;
        /** Delete this many characters before the caret, without leaving the block. */
        deleteBefore(count: number): void;
    };

    /** The undo history, the same steps as `UNDO_HOTKEY` and `REDO_HOTKEY`. */
    history: {
        /** Take the last change back; right after a typing rewrite, only the rewrite. */
        undo(): void;
        /** Make the last undone change again. */
        redo(): void;
    };

    /**
     * Whether the document holds nothing to submit: no text, only empty blocks (the exported `isEmpty`)
     */
    isEmpty(): boolean;

    /**
     * Run `run` so every command it performs is one undo step. Groups nested in `run` join it.
     */
    group(run: () => void): void;

    /**
     * Say `message` to screen readers through the editor's polite live region. Saying the same message twice is heard twice.
     */
    announce(message: string): void;

    /**
     * Return focus to the editor, e.g. after closing plugin UI.
     */
    focus(): void;
    /** Give up focus, e.g. to commit a single-line editor on Enter. */
    blur(): void;

    /** Which node's editing UI is open. The editor holds it so a toolbar button can open it; leaving the node closes it. */
    editors: {
        /**
         * Open the `edit` view of the node of this type at the selection
         */
        open(type: string): void;
        close(): void;
    };
};

/** The key that takes the last change back. */
export const UNDO_HOTKEY = 'Mod-z';

/** The key that makes the last undone change again. */
export const REDO_HOTKEY = 'Mod-Shift-z';
