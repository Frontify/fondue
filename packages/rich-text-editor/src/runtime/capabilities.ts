/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark as toggleEngineMark, wrapIn as wrapInEngine } from 'prosemirror-commands';
import { GapCursor, gapCursor } from 'prosemirror-gapcursor';
import { Fragment, type MarkType, type Node, NodeRange, type NodeType, type ResolvedPos } from 'prosemirror-model';
import { liftListItem, sinkListItem, wrapRangeInList } from 'prosemirror-schema-list';
import { type EditorState, Plugin, PluginKey, Selection, TextSelection, type Transaction } from 'prosemirror-state';
import { liftTarget } from 'prosemirror-transform';

import { type CapabilityImplementation, type CapabilityImplementations } from '#/definition';
import {
    BASE_KEYS_PLUGIN,
    CODE_KEYS_PLUGIN,
    CODE_SYNTAX_PLUGIN,
    CONTAINER_KEYS_PLUGIN,
    GAP_CURSOR_PLUGIN,
    HISTORY_PLUGIN,
    INPUT_RULES_PLUGIN,
    LIST_KEYS_PLUGIN,
    SUGGESTIONS_PLUGIN,
} from '#/model/capabilities';
import { isRecord } from '#/model/values';

import { codeKeysPlugin } from './code-keys';
import { codeSyntaxPlugin } from './code-syntax';
import { columnsOf } from './columns';
import { historyPlugin, redo, undo } from './history';
import { inputRulesPlugin, undoInputRule } from './input-rules';
import { baseKeysPlugin, containerKeysPlugin, listKeysPlugin } from './keys';
import { listAround, repeated } from './lists';
import { nearest, positionOf } from './positions';
import { suggestionsPlugin } from './suggestions/plugin';
import { carrySelection } from './transactions';

interface TextRange {
    readonly from: number;
    readonly to: number;
    readonly marked: boolean;
}

/** Whether all of `total` items match, some of them, or none. */
const tristate = (matching: number, total: number): boolean | 'mixed' => {
    if (matching === 0) {
        return false;
    }
    if (matching === total) {
        return true;
    }
    return 'mixed';
};

/** The selected parts of text nodes whose parent allows `type`: a mark toggle acts on text only. */
const markableText = (state: EditorState, type: MarkType): TextRange[] => {
    const texts: TextRange[] = [];
    for (const { $from, $to } of state.selection.ranges) {
        state.doc.nodesBetween($from.pos, $to.pos, (node, pos, parent) => {
            if (node.isText && parent !== null && parent.type.allowsMarkType(type)) {
                const from = Math.max(pos, $from.pos);
                const to = Math.min(pos + node.nodeSize, $to.pos);
                texts.push({ from, to, marked: type.isInSet(node.marks) !== undefined });
            }
        });
    }
    return texts;
};

/** Whether every selected text carries `type`, some of it, or none; at a caret, the marks the next typed text gets. */
const markState = (state: EditorState, type: MarkType): boolean | 'mixed' => {
    if (state.selection.empty) {
        let marks = state.storedMarks;
        if (marks === null) {
            marks = state.selection.$from.marks();
        }
        return type.isInSet(marks) !== undefined;
    }
    const texts = markableText(state, type);
    return tristate(texts.filter((text) => text.marked).length, texts.length);
};

const toggleMark: CapabilityImplementation = (args, schema) => {
    // Compilation checked that the model declares the mark.
    const type = schema.marks[args.mark as string] as MarkType;
    let attrs = null;
    if (isRecord(args.attrs)) {
        attrs = args.attrs;
    }
    // At a caret ProseMirror toggles the stored mark.
    const engineToggle = toggleEngineMark(type, attrs);
    // The mark this one replaces, such as superscript for subscript, when the model installs it.
    const yielding: MarkType[] = [];
    if (typeof args.removes === 'string') {
        const other = schema.marks[args.removes];
        if (other !== undefined) {
            yielding.push(other);
        }
    }
    return {
        run: (state, dispatch) => {
            if (state.selection.empty) {
                const stored = state.storedMarks ?? state.selection.$from.marks();
                const giving = yielding.filter((other) => other.isInSet(stored) !== undefined);
                if (giving.length === 0 || type.isInSet(stored) !== undefined) {
                    return engineToggle(state, dispatch);
                }
                const transaction = state.tr;
                for (const other of giving) {
                    transaction.removeStoredMark(other);
                }
                dispatch?.(transaction.addStoredMark(type.create(attrs)));
                return true;
            }
            const texts = markableText(state, type);
            if (texts.length === 0) {
                return false;
            }
            if (dispatch === undefined) {
                return true;
            }
            // Adds unless every selected text has the mark, edge whitespace included.
            const add = texts.some((text) => !text.marked);
            const transaction = state.tr;
            for (const { from, to } of texts) {
                if (add) {
                    for (const other of yielding) {
                        transaction.removeMark(from, to, other);
                    }
                    transaction.addMark(from, to, type.create(attrs));
                } else {
                    transaction.removeMark(from, to, type);
                }
            }
            dispatch(transaction.scrollIntoView());
            return true;
        },
        active: (state) => markState(state, type),
    };
};

/** The textblocks the selection touches, with their positions. */
const selectedTextblocks = (state: EditorState): { readonly node: Node; readonly pos: number }[] => {
    const blocks: { readonly node: Node; readonly pos: number }[] = [];
    for (const { $from, $to } of state.selection.ranges) {
        state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (node.isTextblock) {
                blocks.push({ node, pos });
            }
        });
    }
    return blocks;
};

/** The attributes a block keeps as `target`: its own ones that `target` declares, with `over` applied on top. */
const carried = (block: Node, target: NodeType, over: Readonly<Record<string, unknown>>) => {
    const attrs: Record<string, unknown> = {};
    for (const name of Object.keys(target.spec.attrs ?? {})) {
        if (Object.hasOwn(block.attrs, name)) {
            attrs[name] = block.attrs[name];
        }
    }
    for (const [name, value] of Object.entries(over)) {
        attrs[name] = value;
    }
    return attrs;
};

const setBlock: CapabilityImplementation = (args, schema) => {
    // Compilation checked that the model declares the node.
    const type = schema.nodes[args.node as string] as NodeType;
    const paragraph = schema.nodes.paragraph as NodeType;
    let fixed: Readonly<Record<string, unknown>> = {};
    if (isRecord(args.attrs)) {
        fixed = args.attrs;
    }
    // The payload's fields are attributes of the node, such as `level` for `heading.set`.
    const attrsOf = (payload: unknown) => {
        const attrs: Record<string, unknown> = { ...fixed };
        if (isRecord(payload)) {
            for (const [name, value] of Object.entries(payload)) {
                attrs[name] = value;
            }
        }
        return attrs;
    };
    const matches = (block: Node, attrs: Readonly<Record<string, unknown>>) =>
        block.type === type && Object.entries(attrs).every(([name, value]) => block.attrs[name] === value);
    /** The selected textblocks and what they become: the node, or a paragraph when the toggle finds them all set. */
    const planOf = (state: EditorState, payload: unknown) => {
        const blocks = selectedTextblocks(state);
        if (args.toggle === true && blocks.length > 0 && blocks.every(({ node }) => matches(node, attrsOf(payload)))) {
            return { blocks, target: paragraph, over: {} };
        }
        return { blocks, target: type, over: attrsOf(payload) };
    };
    return {
        run: (state, dispatch, payload) => {
            const { blocks, target, over } = planOf(state, payload);
            const applicable = blocks.some(({ node, pos }) => {
                if (node.hasMarkup(target, carried(node, target, over))) {
                    return false;
                }
                const $pos = state.doc.resolve(pos);
                return node.type === target || $pos.parent.canReplaceWith($pos.index(), $pos.index() + 1, target);
            });
            if (!applicable) {
                return false;
            }
            if (dispatch !== undefined) {
                // `setBlockType` takes a function of the old node for its attributes, so each block keeps its own.
                const transaction = state.tr;
                for (const { $from, $to } of state.selection.ranges) {
                    transaction.setBlockType($from.pos, $to.pos, target, (node) => carried(node, target, over));
                }
                dispatch(transaction.scrollIntoView());
            }
            return true;
        },
        active: (state, payload) => {
            const attrs = attrsOf(payload);
            const blocks = selectedTextblocks(state);
            return tristate(blocks.filter(({ node }) => matches(node, attrs)).length, blocks.length);
        },
        // `setBlockType` drops the marks and inline nodes the target refuses, such as a mention turned into code.
        refuses: (state, payload) => {
            const { blocks, target } = planOf(state, payload);
            return blocks.some(({ node }) => node.type !== target && !target.validContent(node.content));
        },
    };
};

/** A range `from`–`to` in one parent that a block replaces; an empty range inserts it there. */
interface BlockSpot {
    readonly from: number;
    readonly to: number;
}

/**
 * Where a block goes, in order of preference: in place of the empty textblock at a caret, before a textblock with the
 * caret at its start, then after the block that holds the selection end at the deepest level that takes it; with
 * `topLevel`, only after the top-level block. A selection between blocks, such as a selected node, is that spot.
 */
const blockSpots = (state: EditorState, topLevel: boolean): BlockSpot[] => {
    const { selection } = state;
    const $end = selection.$to;
    const spots: BlockSpot[] = [];
    if (!$end.parent.inlineContent) {
        if (topLevel && $end.depth > 0) {
            return [{ from: $end.after(1), to: $end.after(1) }];
        }
        spots.push({ from: $end.pos, to: $end.pos });
    } else if (!topLevel && selection.empty) {
        if ($end.parent.content.size === 0) {
            spots.push({ from: $end.before(), to: $end.after() });
        } else if ($end.parentOffset === 0) {
            spots.push({ from: $end.before(), to: $end.before() });
        }
    }
    for (let depth = $end.depth; depth >= 1; depth -= 1) {
        if (!topLevel || depth === 1) {
            spots.push({ from: $end.after(depth), to: $end.after(depth) });
        }
    }
    return spots;
};

/** Whether `type` may replace the range of `spot`. */
const takes = (doc: Node, spot: BlockSpot, type: NodeType) => {
    const $from = doc.resolve(spot.from);
    let end = $from.index();
    if (spot.to > spot.from) {
        end += 1;
    }
    return $from.parent.canReplaceWith($from.index(), end, type);
};

/** How many nodes of `type` the document holds. */
const countOf = (doc: Node, type: NodeType) => {
    let count = 0;
    doc.descendants((node) => {
        if (node.type === type) {
            count += 1;
        }
    });
    return count;
};

// The pinned prosemirror-gapcursor declares `GapCursor.valid` internal, so its types leave it out.
const gapCursorValid = ($pos: ResolvedPos): boolean =>
    (GapCursor as unknown as { readonly valid: (at: ResolvedPos) => boolean }).valid($pos);

/**
 * Puts `node` at `spot`, adds an empty paragraph after it when it ends up last, and puts the selection after it: a
 * caret in a textblock that follows, else a gap cursor, so typing never replaces a selected leaf such as a column break.
 */
const insertBlock = (state: EditorState, spot: BlockSpot, node: Node): Transaction => {
    const transaction = state.tr.replaceWith(spot.from, spot.to, node);
    const after = spot.from + node.nodeSize;
    const $after = transaction.doc.resolve(after);
    if ($after.nodeAfter !== null) {
        if (!$after.nodeAfter.isTextblock && gapCursorValid($after)) {
            return transaction.setSelection(new GapCursor($after)).scrollIntoView();
        }
        return transaction.setSelection(Selection.near($after, 1)).scrollIntoView();
    }
    const paragraph = $after.parent.contentMatchAt($after.index()).defaultType;
    if (paragraph === null || !paragraph.isTextblock) {
        return transaction.setSelection(Selection.near($after, -1)).scrollIntoView();
    }
    transaction.insert(after, paragraph.create());
    return transaction.setSelection(TextSelection.create(transaction.doc, after + 1)).scrollIntoView();
};

const insertNode: CapabilityImplementation = (args, schema) => {
    // Compilation checked that the model declares the node.
    const type = schema.nodes[args.node as string] as NodeType;
    if (type.isBlock) {
        const topLevel = args.place === 'after-top-level-block';
        return {
            run: (state, dispatch) => {
                // Breaks past the first `columns - 1` would force no break, so none is added.
                if (args.limit === 'columns' && countOf(state.doc, type) >= columnsOf(state).count - 1) {
                    return false;
                }
                const spot = blockSpots(state, topLevel).find((candidate) => takes(state.doc, candidate, type));
                if (spot === undefined) {
                    return false;
                }
                dispatch?.(insertBlock(state, spot, type.create()));
                return true;
            },
            active: () => false,
        };
    }
    return {
        run: (state, dispatch) => {
            const { $from } = state.selection;
            // A code block keeps a line break as text, as ProseMirror's `newlineInCode` does (Enter by profile).
            if (args.newlineInCode === true && $from.parent.type.spec.code === true) {
                dispatch?.(state.tr.insertText('\n').scrollIntoView());
                return true;
            }
            if (!$from.parent.canReplaceWith($from.index(), $from.index(), type)) {
                return false;
            }
            dispatch?.(state.tr.replaceSelectionWith(type.create()).scrollIntoView());
            return true;
        },
        active: () => false,
    };
};

const insertText: CapabilityImplementation = () => ({
    run: (state, dispatch, payload) => {
        if (!isRecord(payload) || typeof payload.text !== 'string') {
            return false;
        }
        if (dispatch !== undefined) {
            dispatch(state.tr.insertText(payload.text).scrollIntoView());
        }
        return true;
    },
    active: () => false,
});

/** The blocks the selection spans inside the nearest ancestor of `type`, or `undefined` outside one. */
const rangeIn = ($from: ResolvedPos, $to: ResolvedPos, type: NodeType): NodeRange | undefined =>
    $from.blockRange($to, (node) => node.type === type) ?? undefined;

const wrapIn: CapabilityImplementation = (args, schema) => {
    // Compilation checked that the model declares the node.
    const type = schema.nodes[args.node as string] as NodeType;
    const wrap = wrapInEngine(type);
    return {
        run: (state, dispatch) => {
            const { $from, $to } = state.selection;
            const range = rangeIn($from, $to, type);
            if (range === undefined) {
                return wrap(state, dispatch);
            }
            const target = liftTarget(range);
            if (target === null) {
                return false;
            }
            dispatch?.(state.tr.lift(range, target).scrollIntoView());
            return true;
        },
        active: (state) => {
            const blocks = selectedTextblocks(state);
            const within = blocks.filter(({ pos }) => {
                const $pos = state.doc.resolve(pos);
                for (let depth = $pos.depth; depth > 0; depth -= 1) {
                    if ($pos.node(depth).type === type) {
                        return true;
                    }
                }
                return false;
            });
            return tristate(within.length, blocks.length);
        },
    };
};

/** Swaps the blocks the selection spans with their previous or next sibling, so the selection moves with them. */
const block: CapabilityImplementation = (args) => ({
    run: (state, dispatch) => {
        const { $from, $to } = state.selection;
        let range = $from.blockRange($to);
        // Blocks that fill their container, as the only paragraph of a quote does, move with it.
        while (
            range !== null &&
            range.depth > 0 &&
            range.startIndex === 0 &&
            range.endIndex === range.parent.childCount
        ) {
            const { depth } = range;
            range = new NodeRange(
                state.doc.resolve($from.before(depth)),
                state.doc.resolve($from.after(depth)),
                depth - 1,
            );
        }
        if (range === null) {
            return false;
        }
        const { parent, start, end, startIndex, endIndex } = range;
        if (args.action === 'move-up') {
            if (startIndex === 0) {
                return false;
            }
            const previous = parent.child(startIndex - 1);
            dispatch?.(
                state.tr
                    .insert(end, previous)
                    .delete(start - previous.nodeSize, start)
                    .scrollIntoView(),
            );
            return true;
        }
        if (endIndex === parent.childCount) {
            return false;
        }
        const next = parent.child(endIndex);
        dispatch?.(
            state.tr
                .delete(end, end + next.nodeSize)
                .insert(start, next)
                .scrollIntoView(),
        );
        return true;
    },
    active: () => false,
});

/** The payload's fields that `type` declares as attributes, such as `start` for `ordered_list`. */
const declaredIn = (type: NodeType, payload: unknown) => {
    const attrs: Record<string, unknown> = {};
    if (isRecord(payload)) {
        for (const [name, value] of Object.entries(payload)) {
            if (Object.hasOwn(type.spec.attrs ?? {}, name)) {
                attrs[name] = value;
            }
        }
    }
    return attrs;
};

/** Whether the innermost list at the selection holds items of `item`, so a key of another list's items passes on. */
const inListOf = (state: EditorState, item: NodeType) => {
    const around = listAround(state.selection.$from);
    return around !== undefined && around.list.firstChild?.type === item;
};

/**
 * Wraps the selected blocks in the list, with headings and other textblocks first turned into paragraphs, which keeps
 * their inline content and references.
 */
const wrapInList = (state: EditorState, list: NodeType, item: NodeType, payload: unknown) => {
    const paragraph = state.schema.nodes.paragraph as NodeType;
    const { $from, $to } = state.selection;
    const transaction = state.tr.setBlockType($from.pos, $to.pos, paragraph, (node) => carried(node, paragraph, {}));
    const range = transaction.doc
        .resolve(transaction.mapping.map($from.pos))
        .blockRange(transaction.doc.resolve(transaction.mapping.map($to.pos)));
    if (range === null || !wrapRangeInList(transaction, range, list, declaredIn(list, payload))) {
        return undefined;
    }
    // A rule's payload, such as `checked` from `[x] `, applies to the new items.
    const itemAttrs = Object.entries(declaredIn(item, payload));
    const { start, end } = range;
    transaction.doc.nodesBetween(transaction.mapping.map(start), transaction.mapping.map(end), (node, pos) => {
        if (node.type === item) {
            for (const [name, value] of itemAttrs) {
                transaction.setNodeAttribute(pos, name, value);
            }
        }
        return node.type !== item;
    });
    return transaction.scrollIntoView();
};

/**
 * Turns the list at the selection's depth into `list`, keeping items, nesting and children: an ordered list takes the
 * payload's `start`, new task items are unchecked unless a rule's `checked` names the item at the caret, and items that
 * leave a task list drop `checked`.
 */
const convertList = (state: EditorState, list: NodeType, item: NodeType, payload: unknown) => {
    const around = listAround(state.selection.$from);
    if (around === undefined) {
        return undefined;
    }
    const caret = state.selection.$from.index(around.depth);
    const content = Fragment.from(
        around.list.children.map((child, index) => {
            let attrs = {};
            if (index === caret) {
                attrs = declaredIn(item, payload);
            }
            return item.create(attrs, child.content, child.marks);
        }),
    );
    if (!list.validContent(content)) {
        return undefined;
    }
    const pos = state.selection.$from.before(around.depth);
    const transaction = state.tr.replaceWith(
        pos,
        pos + around.list.nodeSize,
        list.create(declaredIn(list, payload), content),
    );
    // Items and lists keep their sizes, so every position, and the selection with them, stays the same.
    return transaction.setSelection(carrySelection(transaction.doc, state.selection)).scrollIntoView();
};

const toggleList: CapabilityImplementation = (args, schema) => {
    // Compilation checked that the model declares both nodes.
    const list = schema.nodes[args.list as string] as NodeType;
    const item = schema.nodes[args.item as string] as NodeType;
    const isList = (state: EditorState) => listAround(state.selection.$from)?.list.type === list;
    return {
        run: (state, dispatch, payload) => {
            let transaction: Transaction | undefined;
            if (listAround(state.selection.$from) === undefined) {
                transaction = wrapInList(state, list, item, payload);
            } else if (isList(state)) {
                // The selected items leave every level of this list type and become paragraphs.
                transaction = repeated(state, liftListItem(item), isList);
            } else {
                transaction = convertList(state, list, item, payload);
            }
            if (transaction === undefined) {
                return false;
            }
            dispatch?.(transaction);
            return true;
        },
        active: (state) => isList(state),
    };
};

/** Tab and the list indent keys pass through a code block, so they never move an item that contains one. */
const inCodeTextblock = (state: EditorState) => state.selection.$from.parent.type.spec.code === true;

const indentItem: CapabilityImplementation = (args, schema) => {
    const item = schema.nodes[args.item as string] as NodeType;
    const sink = sinkListItem(item);
    return {
        run: (state, dispatch) => !inCodeTextblock(state) && inListOf(state, item) && sink(state, dispatch),
        active: () => false,
    };
};

const outdentItem: CapabilityImplementation = (args, schema) => {
    const item = schema.nodes[args.item as string] as NodeType;
    const lift = liftListItem(item);
    return {
        run: (state, dispatch) => !inCodeTextblock(state) && inListOf(state, item) && lift(state, dispatch),
        active: () => false,
    };
};

/** The lines of `text` the range `from`–`to` touches. A collapsed range is its own line. */
const touchedLines = (text: string, from: number, to: number): { readonly start: number; readonly end: number }[] => {
    const lines: { readonly start: number; readonly end: number }[] = [];
    let lineStart = 0;
    const consider = (lineEnd: number) => {
        const touches = from === to ? from >= lineStart && from <= lineEnd : from <= lineEnd && to > lineStart;
        if (touches) {
            lines.push({ start: lineStart, end: lineEnd });
        }
    };
    for (let index = 0; index < text.length; index += 1) {
        if (text[index] === '\n') {
            consider(index);
            lineStart = index + 1;
        }
    }
    consider(text.length);
    return lines;
};

/** How many leading spaces an outdent removes: two, one, or none. */
const leadingSpaces = (line: string): number => {
    if (line.startsWith('  ')) {
        return 2;
    }
    if (line.startsWith(' ')) {
        return 1;
    }
    return 0;
};

const indentLines: CapabilityImplementation = (args) => ({
    run: (state, dispatch) => {
        const { $from, $to } = state.selection;
        const block = $from.parent;
        if (block !== $to.parent || block.type.spec.code !== true || !block.isTextblock) {
            return false;
        }
        const text = block.textContent;
        const lines = touchedLines(text, $from.parentOffset, $to.parentOffset);
        const indent = args.direction !== 'outdent';
        // `remove` of 0 inserts two spaces. Later lines are edited first, so earlier offsets stay valid.
        const edits: { readonly at: number; readonly remove: number }[] = [];
        for (const line of lines) {
            if (indent) {
                edits.push({ at: line.start, remove: 0 });
            } else {
                const remove = leadingSpaces(text.slice(line.start, line.end));
                if (remove > 0) {
                    edits.push({ at: line.start, remove });
                }
            }
        }
        if (edits.length === 0) {
            return false;
        }
        if (dispatch !== undefined) {
            const origin = $from.start();
            const transaction = state.tr;
            for (const edit of [...edits].reverse()) {
                if (edit.remove === 0) {
                    transaction.insertText('  ', origin + edit.at);
                } else {
                    transaction.delete(origin + edit.at, origin + edit.at + edit.remove);
                }
            }
            dispatch(transaction.scrollIntoView());
        }
        return true;
    },
    active: () => false,
});

const toggleTask: CapabilityImplementation = (args, schema, command) => {
    const item = schema.nodes[args.item as string] as NodeType;
    const setChecked = args.setChecked as string;
    return {
        run: (state, dispatch) => {
            const found = nearest(state, item);
            const target = command(setChecked);
            if (found === undefined || target === undefined) {
                return false;
            }
            const { nodeId, checked } = found.node.attrs as { readonly nodeId: string; readonly checked: boolean };
            return target.run(state, dispatch, { nodeId, checked: !checked });
        },
        active: () => false,
    };
};

/** Sets the payload's other fields on the node its `nodeId` names, else on the nearest one around the selection. */
const setAttributes: CapabilityImplementation = (args, schema) => {
    const type = schema.nodes[args.node as string] as NodeType;
    return {
        run: (state, dispatch, payload) => {
            if (!isRecord(payload)) {
                return false;
            }
            const { nodeId, ...attrs } = payload;
            let found: { readonly node: Node; readonly pos: number } | undefined;
            if (typeof nodeId === 'string') {
                const pos = positionOf(state.doc, nodeId);
                const node = pos === undefined ? null : state.doc.nodeAt(pos);
                if (pos !== undefined && node?.type === type) {
                    found = { node, pos };
                }
            } else {
                found = nearest(state, type);
            }
            if (found === undefined) {
                return false;
            }
            const { node, pos } = found;
            const changed = Object.entries(attrs).filter(([name, value]) => node.attrs[name] !== value);
            if (changed.length === 0) {
                return false;
            }
            const transaction = state.tr;
            for (const [name, value] of changed) {
                transaction.setNodeAttribute(pos, name, value);
            }
            dispatch?.(transaction);
            return true;
        },
        active: () => false,
    };
};

// The node a control acts on, around the selection, without which its command does not apply. A control with no node,
// such as the emoji picker, inserts inline content and applies where the selection's block takes it.
const CONTROL_NODES: Readonly<Record<string, string>> = { numbering: 'ordered_list' };

const takesInlineContent = (state: EditorState): boolean => {
    const { parent } = state.selection.$from;
    return parent.inlineContent && parent.type.spec.code !== true;
};

/** Applies where its control can act and changes nothing: the editor opens the control. */
const openControl: CapabilityImplementation = (args, schema) => {
    const name = CONTROL_NODES[args.control as string];
    if (name === undefined) {
        return { run: takesInlineContent, active: () => false };
    }
    const type = schema.nodes[name];
    return {
        run: (state) => type !== undefined && nearest(state, type) !== undefined,
        active: () => false,
    };
};

const history: CapabilityImplementation = (args) => {
    let command = undo;
    if (args.action === 'redo') {
        command = redo;
    }
    return { run: (state, dispatch) => command(state, dispatch), active: () => false };
};

/** The command capabilities and package plugins the runtime implements so far, by capability name and plugin ID. */
export const CAPABILITIES: CapabilityImplementations = {
    block,
    history,
    indentItem,
    indentLines,
    insertNode,
    insertText,
    openControl,
    outdentItem,
    setAttributes,
    setBlock,
    toggleList,
    toggleMark,
    toggleTask,
    wrapIn,
    plugins: {
        // Backspace right after a rule fired undoes it before any list or block key sees it.
        [HISTORY_PLUGIN.id]: () => historyPlugin({ Backspace: undoInputRule }),
        [INPUT_RULES_PLUGIN.id]: inputRulesPlugin,
        [LIST_KEYS_PLUGIN.id]: listKeysPlugin,
        [CODE_KEYS_PLUGIN.id]: codeKeysPlugin,
        [CONTAINER_KEYS_PLUGIN.id]: containerKeysPlugin,
        [BASE_KEYS_PLUGIN.id]: baseKeysPlugin,
        [CODE_SYNTAX_PLUGIN.id]: codeSyntaxPlugin,
        // Keyed by its plugin ID, as every package plugin is; `gapCursor()` itself carries no key.
        [GAP_CURSOR_PLUGIN.id]: () =>
            new Plugin({ key: new PluginKey(GAP_CURSOR_PLUGIN.id), props: gapCursor().props }),
        [SUGGESTIONS_PLUGIN.id]: suggestionsPlugin,
    },
};
