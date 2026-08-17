/* (c) Copyright Frontify Ltd., all rights reserved. */

import { setBlockType as pmSetBlockType, toggleMark as pmToggleMark } from 'prosemirror-commands';
import { type Mark as PmMark, type MarkType as PmMarkType, type Schema } from 'prosemirror-model';
import { type EditorState, TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi, type RteBlockNode, type RteSelectionSnapshot } from '#/core';

import { definedAttrs, shallowBlock } from './documentConversion';
import { createListApi } from './lists';
import { type SchemaBundle } from './schema';

/**
 * The `EditorControlApi`: the one seam a feature drives the editor through.
 * Every method closes over the live view, so a feature always reads and writes
 * the current state — there is nothing to keep in sync.
 *
 * Read top to bottom: the read side first (the snapshot all feature UI renders
 * from), then the writes, grouped by what they act on. Lists are the exception,
 * and live in `./lists.ts`.
 */

// The read side: one snapshot of the selection, which all feature UI renders
// from

/** The marks a caret would type with, or every mark a range carries. */
const marksAt = (state: EditorState): Record<string, Record<string, unknown>> => {
    const marks: Record<string, Record<string, unknown>> = {};
    // First value wins, so a mark spanning differently-valued runs reads as the
    // one the selection starts in.
    const record = (found: readonly PmMark[]): void => {
        for (const mark of found) {
            marks[mark.type.name] ??= definedAttrs(mark.attrs);
        }
    };

    const { from, to, empty, $from } = state.selection;
    if (empty) {
        // Stored marks are what a caret is about to type with — set by a toggle
        // not yet typed into — and otherwise it inherits what is behind it.
        record(state.storedMarks ?? $from.marks());
    } else {
        // Every inline node, not only text: an atom (a mention) carries marks
        // too, so a link around one is found even where no text is covered.
        state.doc.nodesBetween(from, to, (node) => {
            if (node.isInline) {
                record(node.marks);
            }
        });
    }
    return marks;
};

/** The chain of blocks around the selection, and which of them is *the* one. */
const blocksAt = (state: EditorState): Pick<RteSelectionSnapshot, 'block' | 'blocks'> => {
    const { $from } = state.selection;
    const blocks: RteBlockNode[] = [];
    let block: RteBlockNode | null = null;

    // Down to 1: depth 0 is the document, which is not a block.
    for (let depth = $from.depth; depth >= 1; depth--) {
        const node = $from.node(depth);
        const shallow = shallowBlock(node);
        blocks.push(shallow);
        // The innermost node the document accepts as a block. A list item is
        // deliberately out of that group (invariant (4) in setup/schema.ts), so
        // `block` is the paragraph inside an item rather than the item itself.
        if (block === null && node.type.spec.group === 'block') {
            block = shallow;
        }
    }

    // A selected void block (an image): the selection sits at doc level, so
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
        // Void nodes in between (a mention, a line break) contribute nothing,
        // so what comes back is what the user can actually read.
        text: empty ? '' : state.doc.textBetween(from, to, ' '),
        ...blocksAt(state),
        marks: marksAt(state),
    };
};

const createSelectionApi = (view: EditorView): EditorControlApi['selection'] => {
    // Every feature's UI reads the same snapshot, so it is built once per
    // editor state. Keying on the state is safe because the engine's state is
    // immutable: a new state is a new identity.
    let cached: { state: EditorState; snapshot: RteSelectionSnapshot } | null = null;

    return {
        get() {
            if (cached?.state !== view.state) {
                cached = { state: view.state, snapshot: snapshotOf(view.state) };
            }
            return cached.snapshot;
        },
        replaceWithText(text) {
            if (text === '') {
                return;
            }
            const { from, to } = view.state.selection;
            // Positions count text in the same units as a JS string, so the run
            // ends at `from` plus its length.
            const transaction = view.state.tr.insertText(text, from, to);
            transaction.setSelection(TextSelection.create(transaction.doc, from, from + text.length));
            view.dispatch(transaction);
            view.focus();
        },
    };
};

// Marks
//
// Note what is NOT here: a mark applied by typing `**bold**` never comes
// through this api. The toolbar button and the hotkey call `toggle` below; the
// markdown shortcut builds its own transaction. See the header of
// setup/keystrokes.ts.

/**
 * The stretch of text around the selection start that carries a mark, or null
 * when the mark is not there. A run is a stretch of consecutive children rather
 * than a single node, because other marks may split the text — so a partly-bold
 * link still counts as one link.
 *
 * Exported because floating UI anchored to a mark is positioned over its run.
 */
export const findMarkRange = (state: EditorState, markType: PmMarkType): { from: number; to: number } | null => {
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
const createMarkApi = (view: EditorView, schema: Schema): EditorControlApi['marks'] => ({
    toggle(key, value) {
        const markType = schema.marks[key];
        if (markType) {
            pmToggleMark(markType, value)(view.state, view.dispatch);
            view.focus();
        }
    },
    removeAll() {
        const { from, to, empty } = view.state.selection;
        const transaction = empty ? view.state.tr.setStoredMarks([]) : view.state.tr.removeMark(from, to, null);
        view.dispatch(transaction);
        view.focus();
    },
    getRun(key) {
        const markType = schema.marks[key];
        const range = markType ? findMarkRange(view.state, markType) : null;
        if (!markType || range === null) {
            return null;
        }
        // The run starts at a text node carrying the mark, so its attributes
        // are the run's.
        const first = view.state.doc.resolve(range.from).nodeAfter;
        const mark = first ? markType.isInSet(first.marks) : null;
        return {
            value: mark ? definedAttrs(mark.attrs) : {},
            // Void nodes in between contribute nothing, as with the snapshot's
            // text.
            text: view.state.doc.textBetween(range.from, range.to, ' '),
        };
    },
    select(key) {
        const markType = schema.marks[key];
        if (!markType) {
            return false;
        }
        const { $from, empty } = view.state.selection;
        if (!empty) {
            return markType.isInSet($from.marks()) !== undefined;
        }
        const range = findMarkRange(view.state, markType);
        if (range === null) {
            return false;
        }
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, range.from, range.to)));
        return true;
    },
});

// Blocks

/**
 * Block types and the attributes on them. Which block the selection is in is
 * not here: features read that off the selection snapshot.
 */
const createBlockApi = (view: EditorView, bundle: SchemaBundle): EditorControlApi['blocks'] => {
    const { schema, attributes } = bundle;

    /** Every text block the selection touches, with the given attributes applied. */
    const applyToTextBlocks = (attrs: Record<string, unknown>): void => {
        const { from, to } = view.state.selection;
        const transaction = view.state.tr;
        view.state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.isTextblock) {
                // Attributes a node type never declared are ignored by the
                // engine, so this is safe across mixed selections.
                transaction.setNodeMarkup(pos, undefined, { ...node.attrs, ...attrs });
            }
        });
        if (transaction.docChanged) {
            view.dispatch(transaction);
        }
        view.focus();
    };

    return {
        setType(type, attrs) {
            const nodeType = schema.nodes[type];
            if (nodeType) {
                pmSetBlockType(nodeType, attrs ?? {})(view.state, view.dispatch);
                view.focus();
            }
        },
        updateAttributes: applyToTextBlocks,
        resetAttributes() {
            // Generic on purpose: whichever attributes features inject into
            // every text block are the ones reset, so nothing here names
            // `align`.
            applyToTextBlocks(
                Object.fromEntries(attributes.map((attribute) => [attribute.type, attribute.default ?? null])),
            );
        },
    };
};

// The whole api

/** The flat members act on the editor as a whole rather than on one kind of thing in it. */
export const createControlApi = (view: EditorView, bundle: SchemaBundle): EditorControlApi => ({
    selection: createSelectionApi(view),
    marks: createMarkApi(view, bundle.schema),
    blocks: createBlockApi(view, bundle),
    lists: createListApi(view, bundle),

    insert(type, attrs) {
        const nodeType = bundle.schema.nodes[type];
        if (nodeType) {
            view.dispatch(view.state.tr.replaceSelectionWith(nodeType.create(attrs)));
            view.focus();
        }
    },
    insertText(text) {
        view.dispatch(view.state.tr.insertText(text));
        view.focus();
    },
    focus() {
        view.focus();
    },
    blur() {
        view.dom.blur();
    },
});
