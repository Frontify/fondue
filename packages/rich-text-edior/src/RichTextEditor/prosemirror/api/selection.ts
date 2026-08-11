/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark as PmMark } from 'prosemirror-model';
import { type EditorState, TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi, type RteBlockNode, type RteSelectionSnapshot } from '#/domain';

import { definedAttrs, shallowBlockFromPm } from '../document';

/**
 * The selection half of the control API: the snapshot every plugin renders from,
 * and the one write that is about the selection rather than what it holds.
 */

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
        const shallow = shallowBlockFromPm(node);
        blocks.push(shallow);
        // The innermost node the document accepts as a block. A list item is
        // deliberately out of that group, which is what makes `block` the
        // paragraph inside an item rather than the item itself.
        if (block === null && node.type.spec.group === 'block') {
            block = shallow;
        }
    }

    // A selected void block (an image): the selection sits at doc level, so
    // there is no ancestor to have found it as.
    const selected = $from.nodeAfter;
    if (block === null && selected?.type.spec.group === 'block') {
        block = shallowBlockFromPm(selected);
        blocks.unshift(block);
    }

    return { block, blocks };
};

const snapshotOf = (state: EditorState): RteSelectionSnapshot => {
    const { from, to, empty } = state.selection;
    return {
        isCollapsed: empty,
        // Void nodes in between (a mention, a line break) contribute nothing, so
        // what comes back is what the user can actually read.
        text: empty ? '' : state.doc.textBetween(from, to, ' '),
        ...blocksAt(state),
        marks: marksAt(state),
    };
};

export const createSelectionApi = (view: EditorView): EditorControlApi['selection'] => {
    // Every plugin's UI reads the snapshot and they all read the same one, so it
    // is built once per editor state. Keying on the state itself is what makes
    // that safe: the engine's state is immutable, so a new one is a new identity.
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
            // Positions count text in the same units as a JS string, so the end
            // of the inserted run is simply `from` plus its length.
            const transaction = view.state.tr.insertText(text, from, to);
            transaction.setSelection(TextSelection.create(transaction.doc, from, from + text.length));
            view.dispatch(transaction);
            view.focus();
        },
    };
};
