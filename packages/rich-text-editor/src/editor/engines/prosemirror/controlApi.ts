/* (c) Copyright Frontify Ltd., all rights reserved. */

import { setBlockType as pmSetBlockType, toggleMark as pmToggleMark } from 'prosemirror-commands';
import { type Mark as PmMark, type MarkType as PmMarkType, type Schema } from 'prosemirror-model';
import { type EditorState, NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi, type PluginRegistry, type RteSelectionSnapshot } from '#/core';

import { markValueOf, shallowBlock, valueAttrsFor } from './documentConversion';
import { createListApi, liftOutOfLists } from './lists';
import { warnUnknownType } from './warnings';

/**
 * The `EditorControlApi`: the one seam a feature drives the editor through.
 * Every method reads the live view when it runs, so there is no state to keep
 * in sync.
 *
 * The view is reached through a getter because the api is built BEFORE the
 * view: the view's constructor paints the initial node views, which are handed
 * this api. No method is called until the view exists.
 *
 * Layout: `createControlApi` (the whole api) is at the bottom, assembled from
 * the selection snapshot, then marks, then blocks. Lists live in `./lists.ts`.
 */

// --- Selection snapshot: what all feature UI renders from ---

/**
 * The marks a caret would type with, or the marks EVERY text in a range
 * carries — a half-bold range is not bold. Each with the first value found, so
 * a mark spanning differently-valued runs reads as the one the range starts in.
 */
const marksAt = (state: EditorState): Record<string, Record<string, unknown>> => {
    const { from, to, empty, $from } = state.selection;
    if (empty) {
        // Stored marks (a toggle not yet typed into), else what is behind the caret.
        return Object.fromEntries(
            (state.storedMarks ?? $from.marks()).map((mark) => [mark.type.name, markValueOf(mark)]),
        );
    }

    // Only text contributes: the document stores no marks on inline elements.
    const runs: (readonly PmMark[])[] = [];
    state.doc.nodesBetween(from, to, (node) => {
        if (node.isText) {
            runs.push(node.marks);
        }
    });
    const [first = [], ...rest] = runs;
    const carried = first.filter((mark) => rest.every((marks) => mark.type.isInSet(marks) !== undefined));
    return Object.fromEntries(carried.map((mark) => [mark.type.name, markValueOf(mark)]));
};

/** The chain of blocks around the selection, and which of them is *the* one. */
const blocksAt = (state: EditorState): Pick<RteSelectionSnapshot, 'block' | 'blocks'> => {
    const { $from } = state.selection;
    const blocks: RteSelectionSnapshot['blocks'] = [];
    let block: RteSelectionSnapshot['block'] = null;

    // Down to 1: depth 0 is the document, which is not a block.
    for (let depth = $from.depth; depth >= 1; depth--) {
        const node = $from.node(depth);
        const shallow = shallowBlock(node);
        blocks.push(shallow);
        // The innermost node the document accepts as a block. A list item is
        // deliberately out of that group (invariant (4) in schema.ts), so
        // `block` is the paragraph inside an item rather than the item itself.
        if (block === null && node.type.spec.group === 'block') {
            block = shallow;
        }
    }

    // A selected void block (a column break): the selection sits at doc level, so
    // there is no ancestor to have found it as.
    const selected = $from.nodeAfter;
    if (block === null && selected?.type.spec.group === 'block') {
        block = shallowBlock(selected);
        blocks.unshift(block);
    }

    return { block, blocks };
};

const snapshotOf = (state: EditorState): RteSelectionSnapshot => {
    const { from, to, empty } = state.selection;
    return {
        isCollapsed: empty,
        // Void nodes (a mention, a line break) contribute nothing: only readable text.
        text: empty ? '' : state.doc.textBetween(from, to, ' '),
        ...blocksAt(state),
        marks: marksAt(state),
    };
};

const createSelectionApi = (getView: () => EditorView): EditorControlApi['selection'] => {
    // Every feature's UI reads the same snapshot, so it is built once per
    // (immutable, hence identity-keyed) editor state.
    let cached: { state: EditorState; snapshot: RteSelectionSnapshot } | null = null;

    return {
        get() {
            const { state } = getView();
            if (cached?.state !== state) {
                cached = { state, snapshot: snapshotOf(state) };
            }
            return cached.snapshot;
        },
    };
};

// --- Marks ---
//
// A mark applied by typing `**bold**` does not come through this api: the
// markdown shortcut builds its own transaction (see keystrokes.ts).

/**
 * The stretch of text around the selection start that carries a mark, or null
 * when the mark is not there. A run is a stretch of consecutive children rather
 * than a single node, because other marks may split the text — so a partly-bold
 * link still counts as one link.
 */
const findMarkRange = (state: EditorState, markType: PmMarkType): { from: number; to: number } | null => {
    const { $from } = state.selection;
    const block = $from.parent;
    if (!block.isTextblock) {
        return null;
    }
    let position = $from.start();
    let runFrom: number | null = null;
    let runTo = position;
    let range: { from: number; to: number } | null = null;
    const closeRun = (): void => {
        if (runFrom !== null && $from.pos >= runFrom && $from.pos <= runTo) {
            range = { from: runFrom, to: runTo };
        }
        runFrom = null;
    };
    for (let index = 0; index < block.childCount; index++) {
        const child = block.child(index);
        if (markType.isInSet(child.marks)) {
            runFrom ??= position;
            runTo = position + child.nodeSize;
        } else {
            closeRun();
        }
        position += child.nodeSize;
    }
    closeRun();
    return range;
};

/** Whether a mark is *on* is not here: that is a field of the selection snapshot. */
const createMarkApi = (getView: () => EditorView, schema: Schema): EditorControlApi['marks'] => ({
    toggle(type, value) {
        const markType = schema.marks[type];
        if (!markType) {
            warnUnknownType('marks.toggle', type);
            return;
        }
        const view = getView();
        // On unless ALL of the selection carries it, matching the snapshot.
        pmToggleMark(markType, valueAttrsFor(value), { removeWhenPresent: false })(view.state, view.dispatch);
        view.focus();
    },
    removeAll() {
        const view = getView();
        const { from, to, empty } = view.state.selection;
        const transaction = empty ? view.state.tr.setStoredMarks([]) : view.state.tr.removeMark(from, to, null);
        view.dispatch(transaction);
        view.focus();
    },
    getRun(type) {
        const { state } = getView();
        const markType = schema.marks[type];
        const range = markType ? findMarkRange(state, markType) : null;
        if (!markType || range === null) {
            return null;
        }
        // The run starts at a text node carrying the mark: its attributes are the run's.
        const first = state.doc.resolve(range.from).nodeAfter;
        const mark = first ? markType.isInSet(first.marks) : null;
        return {
            value: mark ? markValueOf(mark) : {},
            // Void nodes contribute nothing, as with the snapshot's text.
            text: state.doc.textBetween(range.from, range.to, ' '),
        };
    },
});

// --- Blocks ---

/**
 * Block types and the attributes on them. Which block the selection is in is
 * not here: features read that off the selection snapshot.
 */
const createBlockApi = (
    getView: () => EditorView,
    schema: Schema,
    registry: PluginRegistry,
): EditorControlApi['blocks'] => {
    /** Every text block the selection touches, with the given attributes applied. */
    const applyToTextBlocks = (attributes: Record<string, unknown>): void => {
        const view = getView();
        const { from, to } = view.state.selection;
        const transaction = view.state.tr;
        view.state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.isTextblock) {
                // Undeclared attributes are ignored, so mixed selections are safe.
                // Unchanged blocks are skipped so a no-op adds no undo step.
                const changes = Object.entries(attributes).some(
                    ([name, value]) => name in node.attrs && (node.attrs[name] ?? null) !== (value ?? null),
                );
                if (changes) {
                    transaction.setNodeMarkup(pos, undefined, { ...node.attrs, ...attributes });
                }
            }
        });
        if (transaction.docChanged) {
            view.dispatch(transaction);
        }
        view.focus();
    };

    return {
        setType(type, value) {
            const nodeType = schema.nodes[type];
            if (!nodeType) {
                warnUnknownType('blocks.setType', type);
                return;
            }
            const view = getView();
            // A list item cannot hold the new type, so the blocks leave their lists
            // first. Everything is one transaction: one undo restores the list.
            const combined = view.state.tr;
            let current = view.state;
            const lifts = liftOutOfLists(current, registry, schema);
            for (const lift of lifts) {
                for (const step of lift.steps) {
                    combined.step(step);
                }
                current = current.apply(lift);
            }
            const typed: Transaction[] = [];
            const applied = pmSetBlockType(nodeType, value ?? {})(current, (transaction) => typed.push(transaction));
            for (const step of typed.flatMap((transaction) => transaction.steps)) {
                combined.step(step);
            }
            // Lifting alone is not enough: if the type cannot be set, nothing changes.
            if (applied && combined.docChanged) {
                view.dispatch(combined.scrollIntoView());
            }
            view.focus();
        },
        updateAttributes: applyToTextBlocks,
        resetAttributes() {
            // Resets whichever attributes features inject into text blocks; names none.
            applyToTextBlocks(
                Object.fromEntries(
                    [...registry.blockAttributes].map(([name, attribute]) => [name, attribute.default ?? null]),
                ),
            );
        },
    };
};

// --- The whole api ---

/** Which type's editing UI is open, and how to redraw the views that show it. */
export type OpenEditors = { type: string | null; repaint: () => void };

/** The flat members act on the editor as a whole rather than on one kind of thing in it. */
export const createControlApi = (
    getView: () => EditorView,
    schema: Schema,
    registry: PluginRegistry,
    openEditors: OpenEditors,
): EditorControlApi => ({
    selection: createSelectionApi(getView),
    marks: createMarkApi(getView, schema),
    blocks: createBlockApi(getView, schema, registry),
    lists: createListApi(getView, schema, registry),

    insert(type, value) {
        const nodeType = schema.nodes[type];
        if (!nodeType) {
            warnUnknownType('insert', type);
            return;
        }
        const view = getView();
        const transaction = view.state.tr;
        const { selection } = view.state;
        // A block goes in AFTER selected text rather than over it; a selected node is replaced.
        if (!nodeType.isInline && !(selection instanceof NodeSelection) && !selection.empty) {
            transaction.setSelection(TextSelection.create(transaction.doc, selection.to));
        }
        // Inline elements keep their value in one attribute; blocks keep theirs flat.
        const engineAttrs = nodeType.isInline ? valueAttrsFor(value) : value;
        // Inline elements carry no marks, so they must not inherit the caret's.
        view.dispatch(transaction.replaceSelectionWith(nodeType.create(engineAttrs), !nodeType.isInline));
        view.focus();
    },
    insertText(text) {
        const view = getView();
        view.dispatch(view.state.tr.insertText(text));
        view.focus();
    },
    text: {
        beforeCaret() {
            const { selection } = getView().state;
            const { $from, empty } = selection;
            return empty && $from.parent.isTextblock
                ? $from.parent.textBetween(0, $from.parentOffset, undefined, '￼')
                : '';
        },
        afterCaret() {
            const { selection } = getView().state;
            const { $from, empty } = selection;
            return empty && $from.parent.isTextblock
                ? $from.parent.textBetween($from.parentOffset, $from.parent.content.size, undefined, '￼')
                : '';
        },
        deleteBefore(count) {
            const view = getView();
            const { $from, empty } = view.state.selection;
            const length = Math.min(count, $from.parentOffset);
            if (empty && $from.parent.isTextblock && length > 0) {
                view.dispatch(view.state.tr.delete($from.pos - length, $from.pos));
            }
        },
    },
    focus() {
        getView().focus();
    },
    editors: {
        open(type) {
            openEditors.type = type;
            openEditors.repaint();
        },
        close() {
            openEditors.type = null;
            openEditors.repaint();
        },
    },
    blur() {
        getView().dom.blur();
    },
});
