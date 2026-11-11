/* (c) Copyright Frontify Ltd., all rights reserved. */

import { chainCommands, setBlockType as pmSetBlockType, toggleMark as pmToggleMark } from 'prosemirror-commands';
import { closeHistory, redo, redoDepth, undo, undoDepth } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import {
    type Mark as PmMark,
    type MarkType as PmMarkType,
    type Node as PmNode,
    type NodeType as PmNodeType,
    type Schema,
} from 'prosemirror-model';
import { type Command, type EditorState, NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import {
    type BlockAttributeToggle,
    type EditorControlApi,
    INLINE_PLACEHOLDER,
    isEmpty,
    type PluginRegistry,
    type RteMarkState,
    type RteSelectionSnapshot,
} from '#/core';

import { type Dispatch } from './dispatch';
import { EXTRA_ATTR, markValueOf, shallowBlock, toRteDocument, valueAttrsFor } from './documentConversion';
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

const BLANK_TEXT = /^\s*$/;

/**
 * The marks a caret would type with, or the marks EVERY text in a range
 * carries — a half-bold range is not bold. Each with the first value found, so
 * a mark spanning differently-valued runs reads as the one the range starts in.
 * A range also reports the marks only some of its text carries.
 */
const marksAt = (state: EditorState): RteSelectionSnapshot['marks'] => {
    const { from, to, empty, $from } = state.selection;
    if (empty) {
        // Stored marks (a toggle not yet typed into), else what is behind the caret.
        return Object.fromEntries(
            (state.storedMarks ?? $from.marks()).map((mark): [string, RteMarkState] => [
                mark.type.name,
                { coverage: 'all', value: markValueOf(mark) },
            ]),
        );
    }

    // Only text contributes: the document stores no marks on inline elements.
    const textRuns: { marks: readonly PmMark[]; blank: boolean }[] = [];
    state.doc.nodesBetween(from, to, (node, pos) => {
        if (node.isText) {
            const text = node.textBetween(Math.max(from - pos, 0), Math.min(to - pos, node.nodeSize));
            textRuns.push({ marks: node.marks, blank: BLANK_TEXT.test(text) });
        }
    });
    // A toggle passes over whitespace-only runs, so the state it acts on does too; all-blank ranges keep them.
    let counted = textRuns.filter((run) => !run.blank);
    if (counted.length === 0) {
        counted = textRuns;
    }
    const runs = counted.map((run) => run.marks);
    const [first = [], ...rest] = runs;
    const carried = first.filter((mark) => rest.every((marks) => mark.type.isInSet(marks) !== undefined));
    const marks: RteSelectionSnapshot['marks'] = Object.fromEntries(
        carried.map((mark): [string, RteMarkState] => [mark.type.name, { coverage: 'all', value: markValueOf(mark) }]),
    );
    for (const run of runs) {
        for (const mark of run) {
            if (!(mark.type.name in marks)) {
                marks[mark.type.name] = { coverage: 'some' };
            }
        }
    }
    return marks;
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
        history: { canUndo: undoDepth(state) > 0, canRedo: redoDepth(state) > 0 },
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
    // The mark the open run carries: a neighbour with other values (a second
    // link right after the first) starts a run of its own.
    let runMark: PmMark | null = null;
    const closeRun = (): void => {
        if (runFrom !== null && $from.pos >= runFrom && $from.pos <= runTo) {
            range = { from: runFrom, to: runTo };
        }
        runFrom = null;
        runMark = null;
    };
    for (let index = 0; index < block.childCount; index++) {
        const child = block.child(index);
        const mark = markType.isInSet(child.marks);
        if (mark && runMark !== null && !mark.eq(runMark)) {
            closeRun();
        }
        if (mark) {
            runFrom ??= position;
            runMark ??= mark;
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
const createMarkApi = (getView: () => EditorView, schema: Schema, dispatch: Dispatch): EditorControlApi['marks'] => ({
    toggle(type, value) {
        const markType = schema.marks[type];
        if (!markType) {
            warnUnknownType('marks.toggle', type);
            return;
        }
        const view = getView();
        // On unless ALL of the selection carries it, matching the snapshot.
        pmToggleMark(markType, valueAttrsFor(value), { removeWhenPresent: false })(view.state, dispatch);
        view.focus();
    },
    set(type, value) {
        const markType = schema.marks[type];
        if (!markType) {
            warnUnknownType('marks.set', type);
            return;
        }
        const view = getView();
        const { selection, tr } = view.state;
        // A mark excludes others of its type, so adding it replaces their value.
        const mark = markType.create(valueAttrsFor(value));
        if (selection.empty) {
            tr.addStoredMark(mark);
        } else {
            for (const range of selection.ranges) {
                tr.addMark(range.$from.pos, range.$to.pos, mark);
            }
        }
        dispatch(tr);
        view.focus();
    },
    removeAll({ except = [] } = {}) {
        const view = getView();
        const { state } = view;
        const { from, to, empty, $from } = state.selection;
        let range = { from, to };
        if (empty && $from.parent.isTextblock) {
            // A caret clears its whole text block, so a reset leaves no half-formatted paragraph.
            range = { from: $from.start(), to: $from.end() };
        }
        const transaction = state.tr;
        for (const markType of Object.values(schema.marks)) {
            if (!except.includes(markType.name)) {
                transaction.removeMark(range.from, range.to, markType);
            }
        }
        if (empty) {
            // What typing here would carry, as far as it is kept.
            const kept = (state.storedMarks ?? $from.marks()).filter((mark) => except.includes(mark.type.name));
            transaction.setStoredMarks(kept);
        }
        dispatch(transaction);
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
 * Attributes for a block turned into another type: the ones every text block
 * carries (alignment) stay as they were, under the new type's own. Per block,
 * as the engine's `setBlockType` takes them, since blocks differ.
 */
export const keepCarriedAttrs =
    (
        { blockAttributes }: PluginRegistry,
        nodeType: PmNodeType,
        attributes: Record<string, unknown> | undefined,
    ): ((node: PmNode) => Record<string, unknown>) =>
    (node) => ({
        ...Object.fromEntries(
            // The extras ride along: they are the block's stored keys no plugin declares.
            [...blockAttributes.keys(), EXTRA_ATTR]
                .filter((name) => name in node.attrs && name in (nodeType.spec.attrs ?? {}))
                .map((name) => [name, node.attrs[name]]),
        ),
        ...attributes,
    });

/**
 * Block types and the attributes on them. Which block the selection is in is
 * not here: features read that off the selection snapshot.
 */
const createBlockApi = (
    getView: () => EditorView,
    schema: Schema,
    registry: PluginRegistry,
    dispatch: Dispatch,
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
            dispatch(transaction);
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
            // The engine's command only says whether the type can be set here;
            // the change itself keeps each block's carried attributes.
            const applied = pmSetBlockType(nodeType, value ?? {})(current);
            if (applied) {
                const typed = current.tr;
                for (const { $from, $to } of current.selection.ranges) {
                    typed.setBlockType($from.pos, $to.pos, nodeType, keepCarriedAttrs(registry, nodeType, value));
                }
                for (const step of typed.steps) {
                    combined.step(step);
                }
            }
            // Lifting alone is not enough: if the type cannot be set, nothing changes.
            if (applied && combined.docChanged) {
                dispatch(combined.scrollIntoView());
            }
            view.focus();
        },
        updateAttributes: applyToTextBlocks,
        toggleAttribute(name, value): BlockAttributeToggle {
            const view = getView();
            const { from, to } = view.state.selection;
            let declaring = 0;
            let holding = 0;
            view.state.doc.nodesBetween(from, to, (node) => {
                if (node.isTextblock && name in node.attrs) {
                    declaring++;
                    if ((node.attrs[name] ?? null) === (value ?? null)) {
                        holding++;
                    }
                }
            });
            if (declaring === 0) {
                return 'unchanged';
            }
            if (holding === declaring) {
                applyToTextBlocks({ [name]: null });
                return 'removed';
            }
            applyToTextBlocks({ [name]: value });
            return 'set';
        },
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

// --- History ---

/** Takes a typing rewrite back first, as Backspace right after one does; Mod-z runs it too. */
export const undoStep: Command = chainCommands(undoInputRule, undo);

const createHistoryApi = (getView: () => EditorView): EditorControlApi['history'] => ({
    undo() {
        const view = getView();
        undoStep(view.state, view.dispatch);
        // The button may disable itself; focus goes back to the text, as after any toolbar command.
        view.focus();
    },
    redo() {
        const view = getView();
        redo(view.state, view.dispatch);
        view.focus();
    },
});

// --- The whole api ---

/** The undo group: none running, running with no change yet, or running after its first change. */
type GroupState = { kind: 'idle' } | { kind: 'open' } | { kind: 'joined'; first: Transaction };

// prosemirror-history joins a transaction carrying this meta into the undo step of the one it names.
const APPENDED_TRANSACTION_META = 'appendedTransaction';

type CaretSide = 'before' | 'after';

/**
 * The text of the caret's block on one side of it; empty unless the selection is a caret in a text block.
 */
const textAroundCaret = (state: EditorState, side: CaretSide): string => {
    const { $from, empty } = state.selection;
    if (!empty || !$from.parent.isTextblock) {
        return '';
    }
    switch (side) {
        case 'before': {
            return $from.parent.textBetween(0, $from.parentOffset, undefined, INLINE_PLACEHOLDER);
        }
        case 'after': {
            return $from.parent.textBetween(
                $from.parentOffset,
                $from.parent.content.size,
                undefined,
                INLINE_PLACEHOLDER,
            );
        }
    }
};

/** Which type's editing UI is open, and how to redraw the views that show it. */
export type OpenEditors = { type: string | null; repaint: () => void };

/** The flat members act on the editor as a whole rather than on one kind of thing in it. */
export const createControlApi = (
    getView: () => EditorView,
    schema: Schema,
    registry: PluginRegistry,
    openEditors: OpenEditors,
    announce: EditorControlApi['announce'],
): EditorControlApi => {
    // Inside a group, the document changes after the first join that one's undo step.
    let groupState: GroupState = { kind: 'idle' };
    const dispatch: Dispatch = (transaction) => {
        switch (groupState.kind) {
            case 'idle': {
                break;
            }
            case 'open': {
                if (transaction.docChanged) {
                    // Keeps the group's step apart from the edit before it.
                    closeHistory(transaction);
                    groupState = { kind: 'joined', first: transaction };
                }
                break;
            }
            case 'joined': {
                transaction.setMeta(APPENDED_TRANSACTION_META, groupState.first);
                break;
            }
        }
        getView().dispatch(transaction);
    };

    const endGroup = (): void => {
        // Keeps the next input out of the group's step.
        if (groupState.kind === 'joined') {
            getView().dispatch(closeHistory(getView().state.tr));
        }
        groupState = { kind: 'idle' };
    };

    return {
        selection: createSelectionApi(getView),
        marks: createMarkApi(getView, schema, dispatch),
        blocks: createBlockApi(getView, schema, registry, dispatch),
        lists: createListApi(getView, schema, registry, dispatch),
        history: createHistoryApi(getView),

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
            dispatch(transaction.replaceSelectionWith(nodeType.create(engineAttrs), !nodeType.isInline));
            view.focus();
        },
        insertText(text, marks = {}) {
            const view = getView();
            const transaction = view.state.tr;
            const from = transaction.selection.from;
            transaction.insertText(text);
            for (const [type, value] of Object.entries(marks)) {
                const markType = schema.marks[type];
                if (markType) {
                    // Adding replaces a mark of the same type the caret carried.
                    transaction.addMark(from, from + text.length, markType.create(valueAttrsFor(value)));
                } else {
                    warnUnknownType('insertText', type);
                }
            }
            dispatch(transaction);
            view.focus();
        },
        text: {
            beforeCaret() {
                return textAroundCaret(getView().state, 'before');
            },
            afterCaret() {
                return textAroundCaret(getView().state, 'after');
            },
            deleteBefore(count) {
                const view = getView();
                const { $from, empty } = view.state.selection;
                const length = Math.min(count, $from.parentOffset);
                if (empty && $from.parent.isTextblock && length > 0) {
                    dispatch(view.state.tr.delete($from.pos - length, $from.pos));
                }
            },
        },
        isEmpty: () => isEmpty(toRteDocument(getView().state.doc)),
        group(run) {
            if (groupState.kind !== 'idle') {
                run();
                return;
            }
            groupState = { kind: 'open' };
            try {
                run();
            } finally {
                endGroup();
            }
        },
        announce,
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
    };
};
