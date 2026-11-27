/* (c) Copyright Frontify Ltd., all rights reserved. */

import { chainCommands, setBlockType as pmSetBlockType } from 'prosemirror-commands';
import { closeHistory, redo, redoDepth, undo, undoDepth } from 'prosemirror-history';
import { undoInputRule } from 'prosemirror-inputrules';
import {
    type Mark as PmMark,
    type MarkType as PmMarkType,
    type Node as PmNode,
    type NodeType as PmNodeType,
    type Schema,
} from 'prosemirror-model';
import {
    type Command,
    type EditorState,
    NodeSelection,
    Selection,
    TextSelection,
    type Transaction,
} from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import {
    type ClearMarksOptions,
    type ClearMarksScope,
    type EditorControlApi,
    INLINE_PLACEHOLDER,
    type PluginRegistry,
    type RteMarkState,
    type RteSelectionSnapshot,
} from '#/core';

import { keepCarriedAttrs } from './carriedAttrs';
import { type Dispatch } from './dispatch';
import { blockToEngine, markValueOf, shallowBlock, valueAttrsFor } from './documentConversion';
import { createGridApi, gridOfSelection, textOfSelectedSlots } from './grid';
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
 * the selection snapshot, then marks, then blocks. Lists live in `./lists.ts`,
 * grids in `./grid.ts`.
 */

// --- Selection snapshot: what all feature UI renders from ---

type TextRun = { from: number; to: number; marks: readonly PmMark[] };

/** Marks live on text only, so inline elements are skipped. */
const textRunsBetween = (doc: PmNode, from: number, to: number): TextRun[] => {
    const runs: TextRun[] = [];
    doc.nodesBetween(from, to, (node, position) => {
        if (node.isText) {
            runs.push({
                from: Math.max(position, from),
                to: Math.min(position + node.nodeSize, to),
                marks: node.marks,
            });
        }
    });
    return runs;
};

const BLANK_TEXT = /^\s*$/;

/**
 * The marks a caret would type with, or the marks EVERY text in a range
 * carries with one value — a half-bold range is not bold, and a red-and-blue
 * range has no one colour. A range also reports the marks only some of its
 * text carries, or carries with different values.
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

    const textRuns = textRunsBetween(state.doc, from, to);
    // Whitespace does not decide a mark, unless the whole range is whitespace.
    let counted = textRuns.filter((run) => !BLANK_TEXT.test(state.doc.textBetween(run.from, run.to)));
    if (counted.length === 0) {
        counted = textRuns;
    }
    const runs = counted.map((run) => run.marks);
    const [first = [], ...rest] = runs;
    const carried = first.filter((mark) => rest.every((marks) => mark.isInSet(marks)));
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

const kindOf = (state: EditorState, grid: RteSelectionSnapshot['grid']): RteSelectionSnapshot['kind'] => {
    if (grid !== null) {
        return 'grid';
    }
    return state.selection instanceof NodeSelection ? 'node' : 'text';
};

const selectedTextOf = (state: EditorState, grid: RteSelectionSnapshot['grid']): string => {
    const { selection } = state;
    if (selection.empty) {
        return '';
    }
    // Selected slots are read one by one, so slots outside the selection stay out.
    if (grid !== null) {
        return textOfSelectedSlots(state.doc, selection);
    }
    // Void nodes (a mention, a line break) contribute nothing: only readable text.
    return state.doc.textBetween(selection.from, selection.to, ' ');
};

const snapshotOf = (state: EditorState): RteSelectionSnapshot => {
    const grid = gridOfSelection(state.selection);
    return {
        kind: kindOf(state, grid),
        grid,
        isCollapsed: state.selection.empty,
        text: selectedTextOf(state, grid),
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

type MarkToggle = 'caretOff' | 'caretOn' | 'rangeOff' | 'rangeOn';

const markToggleFor = (state: EditorState, type: string): MarkToggle => {
    // Same rule as the toolbar: a mark on only part of the selection counts as off.
    const isOn = marksAt(state)[type]?.coverage === 'all';
    if (state.selection.empty) {
        if (isOn) {
            return 'caretOff';
        }
        return 'caretOn';
    }
    if (isOn) {
        return 'rangeOff';
    }
    return 'rangeOn';
};

const markToggleTransaction = (
    state: EditorState,
    markType: PmMarkType,
    value: Record<string, unknown> | undefined,
): Transaction => {
    const { selection, tr } = state;
    switch (markToggleFor(state, markType.name)) {
        case 'caretOff': {
            return tr.removeStoredMark(markType);
        }
        case 'caretOn': {
            return tr.addStoredMark(markType.create(valueAttrsFor(value)));
        }
        case 'rangeOff': {
            for (const range of selection.ranges) {
                tr.removeMark(range.$from.pos, range.$to.pos, markType);
            }
            return tr;
        }
        case 'rangeOn': {
            const mark = markType.create(valueAttrsFor(value));
            for (const range of selection.ranges) {
                for (const run of textRunsBetween(state.doc, range.$from.pos, range.$to.pos)) {
                    tr.addMark(run.from, run.to, mark);
                }
            }
            return tr;
        }
    }
};

/** The selection, or with scope `'block'` at a caret, its whole text block. */
const clearRangeOf = (state: EditorState, scope: ClearMarksScope): { from: number; to: number } => {
    const { from, to, empty, $from } = state.selection;
    switch (scope) {
        case 'typing': {
            return { from, to };
        }
        case 'block': {
            if (empty && $from.parent.isTextblock) {
                return { from: $from.start(), to: $from.end() };
            }
            return { from, to };
        }
    }
};

/** Whether a mark is *on* is not here: that is a field of the selection snapshot. */
const createMarkApi = (
    getView: () => EditorView,
    schema: Schema,
    registry: PluginRegistry,
    dispatch: Dispatch,
): EditorControlApi['marks'] => ({
    toggle(type, value) {
        const markType = schema.marks[type];
        if (!markType) {
            warnUnknownType('marks.toggle', type);
            return;
        }
        const view = getView();
        dispatch(markToggleTransaction(view.state, markType, value));
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
    remove(type) {
        const markType = schema.marks[type];
        if (!markType) {
            warnUnknownType('marks.remove', type);
            return;
        }
        const view = getView();
        const { selection, tr } = view.state;
        if (selection.empty) {
            tr.removeStoredMark(markType);
        } else {
            for (const range of selection.ranges) {
                tr.removeMark(range.$from.pos, range.$to.pos, markType);
            }
        }
        dispatch(tr);
        view.focus();
    },
    removeAll({ scope = 'typing', keepSurviving = false }: ClearMarksOptions = {}) {
        const view = getView();
        const { state } = view;
        const { empty, $from } = state.selection;
        const range = clearRangeOf(state, scope);
        const keeps = (type: string): boolean => keepSurviving && registry.marks.get(type)?.survivesClear === true;
        const transaction = state.tr;
        // A caret with scope 'typing' covers no text, so only what typing would carry changes.
        if (range.from < range.to) {
            for (const markType of Object.values(schema.marks)) {
                if (!keeps(markType.name)) {
                    transaction.removeMark(range.from, range.to, markType);
                }
            }
        }
        if (empty) {
            const carried = state.storedMarks ?? $from.marks();
            transaction.setStoredMarks(carried.filter((mark) => keeps(mark.type.name)));
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

/** The commands of one synchronous turn: none changed the document yet, or the first change the rest join. */
type TurnState = { kind: 'idle' } | { kind: 'joined'; first: Transaction };

/** prosemirror-history joins a transaction carrying this meta into the undo step of the one it names. */
const APPENDED_TRANSACTION_META = 'appendedTransaction';

/** Which type's editing UI is open, and how to redraw the views that show it. */
export type OpenEditors = { type: string | null; repaint: () => void };

/**
 * A block with its content, as `insert` takes one: in place of a selected
 * top-level block or an empty one, or after the top-level block the caret is
 * in, with the caret at its first place for text.
 */
const insertWhole = (view: EditorView, node: PmNode): Transaction => {
    const { selection } = view.state;
    const { $from } = selection;
    const top = $from.depth >= 1 ? $from.node(1) : null;
    const transaction = view.state.tr;

    let position: number;
    if (selection instanceof NodeSelection && $from.depth === 0) {
        position = selection.from;
        transaction.replaceWith(position, selection.to, node);
    } else if (top !== null && top.isTextblock && top.content.size === 0) {
        position = $from.before(1);
        transaction.replaceWith(position, $from.after(1), node);
    } else {
        position = top === null ? transaction.doc.content.size : $from.after(1);
        transaction.insert(position, node);
    }

    transaction.setSelection(Selection.near(transaction.doc.resolve(position + 1)));
    return transaction.scrollIntoView();
};

/** Where the first node of `type` stands in the range the transaction's step changed, or null when none does. */
const landedPosition = (transaction: Transaction, type: PmNodeType): number | null => {
    let landed: number | null = null;
    // oxlint-disable-next-line unicorn/no-array-for-each -- a step map, not an array; `forEach` is how it lists ranges.
    transaction.mapping.maps[0]?.forEach((_oldStart, _oldEnd, newStart, newEnd) => {
        transaction.doc.nodesBetween(newStart, newEnd, (node, position) => {
            if (landed === null && node.type === type) {
                landed = position;
            }

            return landed === null;
        });
    });

    return landed;
};

/** Whether a separator the transaction inserted stands first in the document or next to one of its own type. */
const separatesNothing = (transaction: Transaction, type: PmNodeType): boolean => {
    const position = landedPosition(transaction, type);
    if (position === null) {
        return false;
    }

    const $position = transaction.doc.resolve(position);
    if ($position.depth === 0 && $position.index() === 0) {
        return true;
    }
    if ($position.nodeBefore?.type === type) {
        return true;
    }

    return $position.parent.maybeChild($position.index() + 1)?.type === type;
};

/** The flat members act on the editor as a whole rather than on one kind of thing in it. */
export const createControlApi = (
    getView: () => EditorView,
    schema: Schema,
    registry: PluginRegistry,
    openEditors: OpenEditors,
): EditorControlApi => {
    // Every change a turn's commands make is one undo step, so a plugin needs no call of its own to group them.
    let turnState: TurnState = { kind: 'idle' };
    const endTurn = (): void => {
        turnState = { kind: 'idle' };
        const view = getView();
        // Keeps the next input out of the turn's step; a view torn down in the meantime has no next input.
        if (!view.isDestroyed) {
            view.dispatch(closeHistory(view.state.tr));
        }
    };
    const dispatch: Dispatch = (transaction) => {
        switch (turnState.kind) {
            case 'idle': {
                if (transaction.docChanged) {
                    // Keeps the turn's step apart from the edit before it.
                    closeHistory(transaction);
                    turnState = { kind: 'joined', first: transaction };
                    queueMicrotask(endTurn);
                }
                break;
            }
            case 'joined': {
                transaction.setMeta(APPENDED_TRANSACTION_META, turnState.first);
                break;
            }
        }
        getView().dispatch(transaction);
    };

    return {
        selection: createSelectionApi(getView),
        marks: createMarkApi(getView, schema, registry, dispatch),
        blocks: createBlockApi(getView, schema, registry, dispatch),
        lists: createListApi(getView, schema, registry, dispatch),
        grid: createGridApi(getView),
        history: createHistoryApi(getView),

        insert(type, value) {
            const nodeType = schema.nodes[type];
            if (!nodeType) {
                warnUnknownType('insert', type);
                return;
            }
            const view = getView();
            const children: unknown = value?.children;
            let transaction: Transaction;
            if (!nodeType.isInline && Array.isArray(children)) {
                transaction = insertWhole(view, blockToEngine({ ...value, type, children }, schema));
            } else {
                transaction = view.state.tr;
                const { selection } = view.state;
                // A block goes in AFTER selected text rather than over it; a selected node is replaced.
                if (!nodeType.isInline && !(selection instanceof NodeSelection) && !selection.empty) {
                    transaction.setSelection(TextSelection.create(transaction.doc, selection.to));
                }
                // Inline elements keep their value in one attribute; blocks keep theirs flat.
                let engineAttrs = value;
                if (nodeType.isInline) {
                    engineAttrs = valueAttrsFor(value);
                }
                // Inline elements carry no marks, so they must not inherit the caret's.
                transaction.replaceSelectionWith(nodeType.create(engineAttrs), !nodeType.isInline);
            }
            if (registry.blocks.get(type)?.separator === true && separatesNothing(transaction, nodeType)) {
                return;
            }
            dispatch(transaction);
            view.focus();
        },
        insertText(text, marks = {}, options = {}) {
            const undoWith = options.undo ?? 'together';
            const view = getView();
            let transaction = view.state.tr;
            transaction.insertText(text);
            // Measured back from the caret after the insert: a selected block is replaced by a new paragraph, which shifts the text.
            const to = transaction.selection.from;
            const from = to - text.length;
            switch (undoWith) {
                case 'together':
                    break;
                case 'marksFirst':
                    // Closed on both sides: the text is a step of its own, and the marks one after it.
                    dispatch(closeHistory(transaction));
                    transaction = closeHistory(view.state.tr);
                    break;
            }
            for (const [type, value] of Object.entries(marks)) {
                const markType = schema.marks[type];
                if (markType) {
                    // Adding replaces a mark of the same type the caret carried.
                    transaction.addMark(from, to, markType.create(valueAttrsFor(value)));
                } else {
                    warnUnknownType('insertText', type);
                }
            }
            dispatch(transaction);
            view.focus();
        },
        text: {
            beforeCaret() {
                const { selection } = getView().state;
                const { $from, empty } = selection;
                if (!empty || !$from.parent.isTextblock) {
                    return '';
                }
                return $from.parent.textBetween(0, $from.parentOffset, undefined, INLINE_PLACEHOLDER);
            },
            afterCaret() {
                const { selection } = getView().state;
                const { $from, empty } = selection;
                if (!empty || !$from.parent.isTextblock) {
                    return '';
                }
                return $from.parent.textBetween(
                    $from.parentOffset,
                    $from.parent.content.size,
                    undefined,
                    INLINE_PLACEHOLDER,
                );
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
