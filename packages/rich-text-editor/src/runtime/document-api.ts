/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentNodeJSON, type JsonObject } from '#/model';

import { positionsOf } from './editor-api';
import { type CommandOptions, type CommandState, type SelectionSummary } from './types';

declare const rangeBrand: unique symbol;
/** A stretch of the document as it was when read, such as a whole mark run: an overlay anchors to it, a target captures it. */
export interface EditorRange {
    readonly [rangeBrand]: true;
}

/** One node with the stretch it covers. */
export interface NodeValue {
    readonly nodeId: string | null;
    readonly attrs: JsonObject;
    readonly range: EditorRange;
}

/** A node around the selection's start. */
export interface AncestorValue {
    readonly type: string;
    readonly attrs: JsonObject;
    readonly nodeId: string | null;
    /** Its index in its parent. */
    readonly index: number;
    readonly childCount: number;
    /** Whether it is its parent's last child. */
    readonly last: boolean;
    /** Whether it holds no content. */
    readonly empty: boolean;
}

/** The selection summary the editor publishes, with the context of the selection's start. */
export interface SelectionValue extends SelectionSummary {
    /** The nodes that hold the selection's start, outermost first, its textblock last; the document is none of them. */
    readonly ancestors: readonly AncestorValue[];
    /** Whether the selection starts at the start of its textblock. */
    readonly atStart: boolean;
    /** Whether the selection ends at the end of its textblock. */
    readonly atEnd: boolean;
    /** The node right before the selection's start in its parent, such as a hard break, or `null`. */
    readonly nodeBefore: { readonly type: string; readonly attrs: JsonObject; readonly nodeId: string | null } | null;
    /** Whether the textblock of the selection's start keeps white space as typed, as a code block does. */
    readonly verbatim: boolean;
}

/** Where a write goes: a range, or the node with `nodeId`, whole or before, after, or at the start or end of its content. */
export type WriteTarget = EditorRange | { readonly nodeId: string; readonly at?: 'before' | 'after' | 'start' | 'end' };

/** What running another command gave: the whole `CommandResult` from plugin UI, inside a command whether it applied. */
export type CommandOutcome =
    | { readonly status: 'applied' | 'no-op' }
    | { readonly status: 'rejected'; readonly code: string };

/** What a content write gave: once applied, the range it wrote, which a command can select inside. */
export type WriteOutcome =
    | { readonly status: 'applied'; readonly range: EditorRange }
    | { readonly status: 'no-op' }
    | { readonly status: 'rejected'; readonly code: string };

/**
 * The document half of `EditorApi`: reads of the selection and content, and writes that each run as one undo step
 * through the commit path, or inside a command as part of its one step.
 */
export interface DocumentApi {
    /** The selection summary the editor publishes, with the context of the selection's start. */
    selection(): SelectionValue;
    /** The selected text when the selection lies in one textblock, else empty. */
    selectedText(): string;
    /** The selection as a range, which `sameRange` tells apart from where it was before. */
    selectedRange(): EditorRange;
    /** Whether the author can edit now: the editor is ready and neither read-only nor disabled. */
    editable(): boolean;
    /** The options of an installed feature, defaulted, or `undefined` when the model does not install it. */
    optionsOf(featureId: string): JsonObject | undefined;
    readonly marks: {
        /** Whether all of the selection carries `mark`, part of it, or none; at a caret, what typing gets. */
        active(mark: string): boolean | 'mixed';
        /** Whether the selection can carry `mark`: its selected text, or the content where it stands, takes it. */
        allowed(mark: string): boolean;
        toggle(mark: string, attrs?: JsonObject): boolean;
        remove(marks: string | readonly string[]): boolean;
    };
    /**
     * `set` acts on textblocks, so `node` is a textblock type such as `heading`; `wrap` acts on wrapping, so `node` is
     * a container such as `blockquote`; `active` reads blocks of any type.
     */
    readonly blocks: {
        /**
         * Whether all of the selected textblocks are `node` with `attrs`, part of them, or none; for a type that is no
         * textblock, such as `blockquote` or `bullet_list`, whether they sit inside one.
         */
        active(node: string, attrs?: JsonObject): boolean | 'mixed';
        /** Turns the selected textblocks into `node`; with `toggle`, back into paragraphs when they already are. */
        set(node: string, attrs?: JsonObject, options?: { readonly toggle?: boolean }): boolean;
        /**
         * Wraps the selected blocks in `node` with `attrs`, which a container with a required attribute needs, or lifts
         * them out when they already are inside one.
         */
        wrap(node: string, attrs?: JsonObject): boolean;
        /** Swaps the blocks the selection spans, or the container they fill, with the block before or after them. */
        move(direction: 'up' | 'down'): boolean;
    };
    readonly attributes: {
        /**
         * Sets `attrs` on the node `nodeId` names, else on the selected nodes of `nodes`, else on the nearest one;
         * `textblocks` names every textblock type. With `toggle`, restores the defaults when every target has them.
         */
        set(
            nodes: string | readonly string[],
            attrs: JsonObject,
            options?: { readonly nodeId?: string; readonly toggle?: boolean },
        ): boolean;
    };
    readonly insert: {
        /** Inserts the inline `node` at the selection, as typing would; a block type is rejected as `invalid`. */
        node(node: string, attrs?: JsonObject): WriteOutcome;
        text(text: string): boolean;
    };
    /** List edits, where `list` is a list type such as `bullet_list` and `item` its item type such as `list_item`. */
    readonly lists: {
        /** Whether the innermost list at the selection is a `list`. */
        active(list: string): boolean;
        /**
         * Wraps the selected blocks in a `list` of `item`s, turns the innermost list at the selection into one, or turns
         * its selected items into paragraphs when it already is one; `attrs` go to the list and to the item at the caret.
         */
        toggle(list: string, item: string, attrs?: JsonObject): boolean;
        /** Nests the selected `item`s under their previous sibling, keeping their children. */
        indent(item: string): boolean;
        /**
         * Moves the selected `item`s one level out, or out of the list as paragraphs at the top level; with `atStart`,
         * only from a caret at the start of its own first block, and never right after a column break.
         */
        outdent(item: string, options?: { readonly atStart?: boolean }): boolean;
        /**
         * Splits the `item` whose own block holds the selection, with a new task item unchecked; an empty one that holds
         * only that block moves one level out instead.
         */
        split(item: string): boolean;
    };
    /**
     * Writes stored JSON nodes, checked as decode checks them but refused rather than cleaned: a write that breaks the
     * vocabulary, the URL policy or a limit changes nothing and is rejected as `invalid`, `policy` or `limit`. Only content
     * that fits where it goes as it is is written.
     */
    readonly content: {
        /**
         * The stored JSON nodes under `range`, each node it only partly covers cut to it, which `replace` writes back;
         * attributes left out of written JSON take their declared defaults. `undefined` for a range the writer refuses.
         */
        read(range: WriteTarget): readonly ContentNodeJSON[] | undefined;
        replace(range: WriteTarget, nodes: readonly ContentNodeJSON[]): WriteOutcome;
        delete(range: WriteTarget): WriteOutcome;
        /** Inserts `nodes` at the end of a range, or after the node unless `at` says otherwise. */
        insert(at: WriteTarget, nodes: readonly ContentNodeJSON[]): WriteOutcome;
    };
    /**
     * The selected node of `node`, else the nearest one around the selection; `node` may be a container. With `nodeId`,
     * the node itself or the nearest ancestor of `node` around the node with that ID.
     */
    nearest(node: string, nodeId?: string): NodeValue | undefined;
    readonly commands: {
        /** Runs another installed command with a payload, as the host's `execute` does. */
        execute(id: string, payload?: unknown, options?: CommandOptions): CommandOutcome;
        query(id: string, payload?: unknown, options?: CommandOptions): CommandState;
    };
    /** The session's undo history. */
    readonly history: {
        undo(): boolean;
        redo(): boolean;
        canUndo(): boolean;
        canRedo(): boolean;
    };
}

/** Whether two ranges, or two absent ones, cover the same stretch. */
export const sameRange = (a: EditorRange | undefined, b: EditorRange | undefined): boolean => {
    if (a === undefined || b === undefined) {
        return a === b;
    }
    const first = positionsOf(a);
    const second = positionsOf(b);
    return first !== undefined && second !== undefined && first.from === second.from && first.to === second.to;
};
