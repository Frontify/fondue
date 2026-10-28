/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentNodeJSON, type JsonObject, type JsonValue, type RichTextDocument } from '#/model';

import {
    type AuthoringPolicy,
    type CaptureTargetOptions,
    type CommandOptions,
    type CommandResult,
    type CommandState,
    type SelectionHandle,
    type SelectionSummary,
    type UploadStatus,
} from '../types';

import { positionsOf } from './editorApi';

declare const rangeBrand: unique symbol;
/** A stretch of the document as it was when read, such as a whole mark run: an overlay anchors to it, a target captures it. */
export type EditorRange = {
    readonly [rangeBrand]: true;
};

/** The whole run of one mark around the selection or an element. */
export type MarkRunValue = {
    attrs: JsonObject;
    text: string;
    range: EditorRange;
};

/** One node with the stretch it covers. */
export type NodeValue = {
    nodeId: string | null;
    attrs: JsonObject;
    range: EditorRange;
};

/** One block of a type, in document order. */
export type BlockValue = {
    text: string;
} & NodeValue;

/** A node around the selection's start. */
export type AncestorValue = {
    type: string;
    attrs: JsonObject;
    nodeId: string | null;
    /** Its index in its parent. */
    index: number;
    childCount: number;
    /** Whether it is its parent's last child. */
    last: boolean;
    /** Whether it holds no content. */
    empty: boolean;
};

/** The selection summary the editor publishes, with the context of the selection's start. */
export type SelectionValue = {
    /** The nodes that hold the selection's start, outermost first, its textblock last; the document is none of them. */
    ancestors: readonly AncestorValue[];
    /** Whether the selection starts at the start of its textblock. */
    atStart: boolean;
    /** Whether the selection ends at the end of its textblock. */
    atEnd: boolean;
    /** The node right before the selection's start in its parent, such as a hard break, or `null`. */
    nodeBefore: { type: string; attrs: JsonObject; nodeId: string | null } | null;
    /** Whether the textblock of the selection's start keeps white space as typed, as a code block does. */
    verbatim: boolean;
} & SelectionSummary;

/** Where a write goes: a range, or the node with `nodeId`, whole or before, after, or at the start or end of its content. */
export type WriteTarget = EditorRange | { nodeId: string; at?: 'before' | 'after' | 'start' | 'end' };

/** What running another command gave: the whole `CommandResult` from plugin UI, inside a command whether it applied. */
export type CommandOutcome =
    | { status: 'applied' | 'no-op' }
    | { status: 'rejected'; code: Extract<CommandResult, { status: 'rejected' }>['code'] };

/** What a content write gave: once applied, the range it wrote, which a command can select inside. */
export type WriteOutcome =
    | { status: 'applied'; range: EditorRange }
    | { status: 'no-op' }
    | { status: 'rejected'; code: string };

/** Where `insert.node` puts a block: at the selection, as typing would, or after the top-level block that holds it. */
export type InsertPlace = 'selection' | 'after-top-level-block';

/** Where `uploads.begin` puts pasted or dropped files: new images at `range`. */
export type UploadTarget = {
    origin: 'paste' | 'drop';
    range: EditorRange;
};

/**
 * The document half of `EditorApi`: reads of the selection and content, and writes that each run as one undo step
 * through the commit path, or inside a command as part of its one step.
 */
export type DocumentApi = {
    /** The selection summary the editor publishes, with the context of the selection's start. */
    selection(): SelectionValue;
    /** The selected text when the selection lies in one textblock, else empty. */
    selectedText(): string;
    /** The selection as a range, which `sameRange` tells apart from where it was before. */
    selectedRange(): EditorRange;
    /** The document as stored. */
    document(): RichTextDocument;
    policy(): AuthoringPolicy;
    /** Whether the author can edit now: the editor is ready and neither read-only nor disabled. */
    editable(): boolean;
    /** The options of an installed feature, defaulted, or `undefined` when the model does not install it. */
    optionsOf(featureId: string): JsonObject | undefined;
    marks: {
        /** Whether all of the selection carries `mark`, with `attrs` when given, part of it, or none; at a caret, what typing gets. */
        active(mark: string, attrs?: JsonObject): boolean | 'mixed';
        /** The attributes of `mark` at the selection's start, in the stored marks first, else `undefined`. */
        attrs(mark: string): JsonObject | undefined;
        /** The names of the marks the model installs. */
        installed(): readonly string[];
        /** Whether the selection can carry `mark`: its selected text, or the content where it stands, takes it. */
        allowed(mark: string): boolean;
        /**
         * The whole run of `mark` around the selection, or the run that holds `at`, an element of the surface; with
         * `extendToMarkRange: 'touching'`, a caret at its trailing edge finds it too. Its `range` is what
         * `overlays.open(component, props, run.range)` anchors to, as the handler of a click on the mark does with
         * `at: event.target`.
         */
        run(
            mark: string,
            options?: { extendToMarkRange?: boolean | 'touching'; at?: Element },
        ): MarkRunValue | undefined;
        toggle(mark: string, attrs?: JsonObject): boolean;
        /** Sets `mark` with `attrs`; `text` at a caret outside the mark inserts it, and replaces the run's text when it differs. */
        set(
            mark: string,
            attrs: JsonObject,
            options?: { extendToMarkRange?: boolean | 'touching'; text?: string },
        ): boolean;
        /**
         * With `extendToMarkRange`, the whole run around the selection; with `'touching'`, a run a caret ends too. With
         * `wholeBlocks`, a caret clears them from its whole textblock.
         */
        remove(
            marks: string | readonly string[],
            options?: { extendToMarkRange?: boolean | 'touching'; wholeBlocks?: boolean },
        ): boolean;
        /** Sets again the last of the marks `names` that a command set in this session, `false` when none did. */
        reapply(names: readonly string[]): boolean;
    };
    /**
     * `set` acts on textblocks, so `node` is a textblock type such as `heading`; `wrap` and `lift` act on wrapping, so
     * `node` is a container such as `blockquote`; `active` and `list` read blocks of any type.
     */
    blocks: {
        /**
         * Whether all of the selected textblocks are `node` with `attrs`, part of them, or none; for a type that is no
         * textblock, such as `blockquote` or `bullet_list`, whether they sit inside one.
         */
        active(node: string, attrs?: JsonObject): boolean | 'mixed';
        /** Every block of `node`, in document order, those inside another block of `node` too. */
        list(node: string): readonly BlockValue[];
        /** Turns the selected textblocks into `node`; with `toggle`, back into paragraphs when they already are. */
        set(node: string, attrs?: JsonObject, options?: { toggle?: boolean }): boolean;
        /**
         * Wraps the selected blocks in `node` with `attrs`, which a container with a required attribute needs, or lifts
         * them out when they already are inside one.
         */
        wrap(node: string, attrs?: JsonObject): boolean;
        /** Lifts the selected blocks out of the `node` around them. */
        lift(node: string): boolean;
        /** Turns the selected blocks into paragraphs, lifting them out of lists, and sets the named attributes back to their declared defaults. */
        clear(attributes: readonly string[]): boolean;
        /** Swaps the blocks the selection spans, or the container they fill, with the block before or after them. */
        move(direction: 'up' | 'down'): boolean;
        /** Indents or outdents the lines the selection touches in a textblock that keeps white space, as code does. */
        indentLines(direction: 'indent' | 'outdent'): boolean;
    };
    attributes: {
        /**
         * Sets `attrs` on the node `nodeId` names, else on the selected nodes of `nodes`, else on the nearest one;
         * `textblocks` names every textblock type. With `toggle`, restores the defaults when every target has them.
         */
        set(
            nodes: string | readonly string[],
            attrs: JsonObject,
            options?: { nodeId?: string; toggle?: boolean },
        ): boolean;
        /** Whether all of the nodes `set` would change with `attrs` have them already, part of them, or none. */
        active(nodes: string | readonly string[], attrs: JsonObject, options?: { nodeId?: string }): boolean | 'mixed';
    };
    insert: {
        /**
         * Inserts `node` at `place`, in place of an empty textblock at the caret, else after the block that holds it;
         * a block holds the stored JSON `content` given, else the content its type requires.
         */
        node(
            node: string,
            attrs?: JsonObject,
            options?: { place?: InsertPlace; content?: readonly ContentNodeJSON[] },
        ): WriteOutcome;
        /** Whether `insert.node` finds a spot for `node` at `place`, as an `enabled` check asks. */
        allowed(node: string, options?: { place?: InsertPlace }): boolean;
        text(text: string): boolean;
    };
    /** List edits, where `list` is a list type such as `bullet_list` and `item` its item type such as `list_item`. */
    lists: {
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
        outdent(item: string, options?: { atStart?: boolean }): boolean;
        /**
         * Splits the `item` whose own block holds the selection, with a new task item unchecked; an empty one that holds
         * only that block moves one level out instead.
         */
        split(item: string): boolean;
    };
    /**
     * Writes stored JSON nodes, checked as paste checks them but refused rather than cleaned: a write that breaks the
     * vocabulary, the policy or a limit changes nothing and is rejected as `invalid`, `policy` or `limit`. Only content
     * that fits where it goes as it is is written.
     */
    content: {
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
    /**
     * Moves the selection to `target`: the text a range covers, a caret in its empty textblock included, or the start
     * of the node with `nodeId`, or that node with `at: 'node'`.
     */
    select(target: EditorRange | { nodeId: string; at?: 'start' | 'node' }, options?: { scroll?: boolean }): boolean;
    commands: {
        /** Runs another installed command with a payload, as the host's `execute` does. */
        execute(id: string, payload?: unknown, options?: CommandOptions): CommandOutcome;
        query(id: string, payload?: unknown, options?: CommandOptions): CommandState;
    };
    /** The session's undo history. */
    history: {
        undo(): boolean;
        redo(): boolean;
        canUndo(): boolean;
        canRedo(): boolean;
    };
    /** Targets for work that completes later, which map through every change made meanwhile. */
    targets: {
        /** Captures `range`, else the selection; `undefined` inside a command or while the editor is busy. */
        capture(range?: EditorRange, options?: CaptureTargetOptions): SelectionHandle | undefined;
        release(target: SelectionHandle): void;
    };
    /**
     * Uploads into images over the host's upload and asset services: each file is checked, starts as an image with no
     * asset, one undo step, and its completion and Retry add none. Inside a command, what starts later waits until it has run.
     */
    uploads?: {
        /** Opens the host asset picker, else the file chooser, for new images at the selection, or for the image `nodeId`. */
        pick(nodeId?: string): void;
        /** Starts the uploads of `files` at `at`, once their checks pass; `false` when files cannot upload now. */
        begin(files: readonly File[], at: UploadTarget): boolean;
        /** Ends the running upload of `nodeId` and restores what its start replaced, as one undo step. */
        cancel(nodeId: string): boolean;
        /** Sends the file of the failed or stopped upload of `nodeId` again, with no undo step. */
        retry(nodeId: string): boolean;
        /** How the upload of `nodeId` stands, or `undefined` when none runs, waits, failed or stopped. */
        status(nodeId: string): UploadStatus | undefined;
    };
    /** Flags a plugin keeps on the node `nodeId` for this session, outside the document and its history. */
    nodeState: {
        get(nodeId: string, key: string): JsonValue | undefined;
        /** Sets the flag `key`, or removes it with `null`; never an undo step. */
        set(nodeId: string, key: string, value: JsonValue | null): void;
    };
};

/** Whether two ranges, or two absent ones, cover the same stretch. */
export const sameRange = (left: EditorRange | undefined, right: EditorRange | undefined): boolean => {
    if (left === undefined || right === undefined) {
        return left === right;
    }

    const first = positionsOf(left);
    const second = positionsOf(right);

    return first !== undefined && second !== undefined && first.from === second.from && first.to === second.to;
};
