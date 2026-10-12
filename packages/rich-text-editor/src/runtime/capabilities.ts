/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark as toggleEngineMark, wrapIn as wrapInEngine } from 'prosemirror-commands';
import { GapCursor, gapCursor } from 'prosemirror-gapcursor';
import {
    Fragment,
    type Mark,
    type MarkType,
    type Node,
    NodeRange,
    type NodeType,
    type ResolvedPos,
    type Schema,
} from 'prosemirror-model';
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
    LAST_MARK_PLUGIN,
    LIST_KEYS_PLUGIN,
    SUGGESTIONS_PLUGIN,
} from '#/model/capabilities';
import { appliesToOf } from '#/model/styles';
import { isRecord, OBJECT_REPLACEMENT } from '#/model/values';

import { codeKeysPlugin } from './code-keys';
import { codeSyntaxPlugin } from './code-syntax';
import { columnsOf } from './columns';
import { historyPlugin, redo, undo } from './history';
import { enterRules, inputRulesPlugin, undoInputRule } from './input-rules';
import { baseKeysPlugin, containerKeysPlugin, listKeysPlugin } from './keys';
import { linkAt } from './links';
import { listAround, repeated } from './lists';
import { nearest, positionOf } from './positions';
import { stylesOf } from './styles';
import { suggestionsPlugin } from './suggestions/plugin';
import { appendSteps, carrySelection } from './transactions';

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
        run: (state, dispatch, payload) => {
            const { $from } = state.selection;
            // A code block keeps a line break as text, as ProseMirror's `newlineInCode` does (Enter by profile).
            if (args.newlineInCode === true && $from.parent.type.spec.code === true) {
                dispatch?.(state.tr.insertText('\n').scrollIntoView());
                return true;
            }
            if (!$from.parent.canReplaceWith($from.index(), $from.index(), type)) {
                return false;
            }
            if (dispatch === undefined) {
                return true;
            }
            // A node whose `marks` declaration is empty, such as a mention, takes no mark from the text around it.
            const inheritMarks = type.spec.marks !== '';
            const transaction = state.tr.replaceSelectionWith(type.create(declaredIn(type, payload)), inheritMarks);
            if (args.spaceAfter === true) {
                transaction.insertText(' ');
            }
            dispatch(transaction.scrollIntoView());
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

/** The node types a `setAttributes` command names: one, a list, or every textblock type. */
const typesOf = (node: unknown, schema: Schema): readonly NodeType[] => {
    if (node === 'textblocks') {
        return Object.values(schema.nodes).filter((type) => type.isTextblock);
    }
    const names = Array.isArray(node) ? (node as readonly unknown[]) : [node];
    return names.flatMap((name) => {
        const type = typeof name === 'string' ? schema.nodes[name] : undefined;
        if (type === undefined) {
            return [];
        }
        return [type];
    });
};

type Located = { readonly node: Node; readonly pos: number };

/** The default of a node type's attribute, which a toggle that removes a value restores. */
const defaultOf = (type: NodeType, name: string): unknown => {
    const specs = type.spec.attrs;
    if (specs === undefined) {
        return null;
    }
    const spec = specs[name];
    if (spec === undefined) {
        return null;
    }
    return spec.default;
};

/** The innermost node of `types` that holds the textblock at `pos`, or that textblock itself. */
const holderOf = (doc: Node, pos: number, types: readonly NodeType[]): Located | undefined => {
    const $inside = doc.resolve(pos + 1);
    for (let depth = $inside.depth; depth > 0; depth -= 1) {
        const node = $inside.node(depth);
        if (types.includes(node.type)) {
            return { node, pos: $inside.before(depth) };
        }
    }
    return undefined;
};

/**
 * The nodes of `types` the selection touches, in document order: each selected atom of a type, and for each selected
 * textblock the innermost node of a type that holds it, so a caret in a nested list names that list only.
 */
const selectedOf = (state: EditorState, types: readonly NodeType[]): Located[] => {
    const found = new Map<number, Located>();
    for (const { $from, $to } of state.selection.ranges) {
        state.doc.nodesBetween($from.pos, $to.pos, (node, pos) => {
            if (node.isTextblock) {
                const holder = holderOf(state.doc, pos, types);
                if (holder !== undefined) {
                    found.set(holder.pos, holder);
                }
            } else if (node.isAtom && types.includes(node.type)) {
                found.set(pos, { node, pos });
            }
        });
    }
    return [...found.values()].sort((a, b) => a.pos - b.pos);
};

/** The nodes a `setAttributes` command changes: the one `nodeId` names, else the selected nodes of `types`, else the nearest node of `types`. */
const attributeTargets = (state: EditorState, types: readonly NodeType[], nodeId: unknown): Located[] => {
    if (typeof nodeId === 'string') {
        const pos = positionOf(state.doc, nodeId);
        if (pos === undefined) {
            return [];
        }
        const node = state.doc.nodeAt(pos);
        if (node === null || !types.includes(node.type)) {
            return [];
        }
        return [{ node, pos }];
    }
    const selected = selectedOf(state, types);
    if (selected.length > 0) {
        return selected;
    }
    for (const type of types) {
        const found = nearest(state, type);
        if (found !== undefined) {
            return [found];
        }
    }
    return [];
};

/** The targets a brand style lands on: those whose node type its `appliesTo` names, when the session holds the style. */
const styleTargets = (state: EditorState, targets: Located[], attrs: Readonly<Record<string, unknown>>): Located[] => {
    if (typeof attrs.styleId !== 'string') {
        return targets;
    }
    const applies = appliesToOf(stylesOf(state), attrs.styleId);
    if (applies === undefined) {
        return targets;
    }
    return targets.filter(({ node }) => applies.includes(node.type.name));
};

/**
 * Sets the payload's other fields on the node its `nodeId` names, else on the selected nodes of the listed types,
 * else on the nearest node of one; with `toggle`, removes the values when every target already has them. A `styleId`
 * of a session style lands only on the node types the style applies to.
 */
const setAttributes: CapabilityImplementation = (args, schema) => {
    const types = typesOf(args.node, schema);
    const has = (node: Node, attrs: Readonly<Record<string, unknown>>) =>
        Object.entries(attrs).every(([name, value]) => node.attrs[name] === value);
    const split = (payload: unknown) => {
        if (!isRecord(payload)) {
            return undefined;
        }
        const { nodeId, ...attrs } = payload;
        return { nodeId, attrs };
    };
    return {
        run: (state, dispatch, payload) => {
            const parts = split(payload);
            if (parts === undefined) {
                return false;
            }
            const targets = styleTargets(state, attributeTargets(state, types, parts.nodeId), parts.attrs);
            const removes =
                args.toggle === true && targets.length > 0 && targets.every(({ node }) => has(node, parts.attrs));
            const changes = targets.flatMap(({ node, pos }) =>
                Object.entries(parts.attrs)
                    .map(([name, value]) => {
                        if (removes) {
                            return { pos, name, value: defaultOf(node.type, name) };
                        }
                        return { pos, name, value };
                    })
                    .filter(({ name, value }) => node.attrs[name] !== value),
            );
            if (changes.length === 0) {
                return false;
            }
            if (dispatch !== undefined) {
                const transaction = state.tr;
                for (const { pos, name, value } of changes) {
                    transaction.setNodeAttribute(pos, name, value);
                }
                dispatch(transaction);
            }
            return true;
        },
        active: (state, payload) => {
            const parts = split(payload);
            if (parts === undefined) {
                return false;
            }
            const targets = styleTargets(state, attributeTargets(state, types, parts.nodeId), parts.attrs);
            return tristate(targets.filter(({ node }) => has(node, parts.attrs)).length, targets.length);
        },
    };
};

/** The transaction meta that carries the mark a `setMark` command set, which the last-mark plugin keeps. */
const LAST_MARK_META = 'rte.last-mark';
const lastMarkKey = new PluginKey<readonly Mark[]>('rte.last-mark');

/** Keeps the last mark of each type that a `setMark` command set in the session, the latest first. */
const lastMarkPlugin = () =>
    new Plugin<readonly Mark[]>({
        key: lastMarkKey,
        state: {
            init: () => [],
            apply: (transaction, marks) => {
                const mark = transaction.getMeta(LAST_MARK_META) as Mark | undefined;
                if (mark === undefined) {
                    return marks;
                }
                return [mark, ...marks.filter((other) => other.type !== mark.type)];
            },
        },
    });

/**
 * The range of the run of text with one mark of `type`, equal attributes included, that holds the caret or starts at
 * it, so a neighbouring passage with other attributes stays outside.
 */
const markRangeAt = (
    state: EditorState,
    type: MarkType,
): { readonly from: number; readonly to: number } | undefined => {
    const { $from } = state.selection;
    const { parent } = $from;
    const index = $from.index();
    if (index >= parent.childCount) {
        return undefined;
    }
    const mark = type.isInSet(parent.child(index).marks);
    if (mark === undefined) {
        return undefined;
    }
    const holds = (at: number) => at >= 0 && at < parent.childCount && mark.isInSet(parent.child(at).marks);
    let first = index;
    while (holds(first - 1)) {
        first -= 1;
    }
    let last = index;
    while (holds(last + 1)) {
        last += 1;
    }
    let from = $from.start();
    for (let child = 0; child < first; child += 1) {
        from += parent.child(child).nodeSize;
    }
    let to = from;
    for (let child = first; child <= last; child += 1) {
        to += parent.child(child).nodeSize;
    }
    return { from, to };
};

/**
 * The whole run of `type` that the selection lies in, a caret or a range inside it, or `undefined` when the selection
 * leaves that run or holds no such mark.
 */
const enclosingRange = (
    state: EditorState,
    type: MarkType,
): { readonly from: number; readonly to: number } | undefined => {
    // A caret at a link's trailing edge still edits the link the link bubble shows there; a passage's end stays outside.
    const range = type.name === 'link' ? linkAt(state) : markRangeAt(state, type);
    const { from, to } = state.selection;
    if (range === undefined || from < range.from || to > range.to) {
        return undefined;
    }
    return range;
};

/** The marks other than `type` that every text node between `from` and `to` carries. */
const sharedMarks = (doc: Node, from: number, to: number, type: MarkType): readonly Mark[] => {
    let shared: readonly Mark[] | undefined;
    doc.nodesBetween(from, to, (node) => {
        if (node.isText) {
            const own = node.marks.filter((mark) => mark.type !== type);
            shared = shared === undefined ? own : shared.filter((mark) => mark.isInSet(own));
        }
    });
    return shared ?? [];
};

/**
 * Puts `mark` on `from` to `to`. Visible `text` that differs from the text there replaces it, with the marks that
 * covered all of it, so text kept as it was keeps its inner marks; text across blocks is never replaced.
 */
const markRange = (transaction: Transaction, from: number, to: number, mark: Mark, text: string | undefined) => {
    const { doc } = transaction;
    const $from = doc.resolve(from);
    // A hard break or other leaf in the range counts as nothing too, as the popover prefills the text without it.
    const replaces =
        text !== undefined &&
        text !== '' &&
        $from.sameParent(doc.resolve(to)) &&
        doc.textBetween(from, to, undefined, OBJECT_REPLACEMENT) !== text &&
        doc.textBetween(from, to, undefined, '') !== text;
    if (!replaces) {
        transaction.addMark(from, to, mark);
        return;
    }
    const marks = mark.addToSet(sharedMarks(doc, from, to, mark.type));
    transaction.replaceWith(from, to, mark.type.schema.text(text, marks));
    transaction.setSelection(TextSelection.create(transaction.doc, from, from + text.length));
};

/**
 * Adds `mark` to the selected text, or to the stored marks at a caret, as one transaction that records it as the last
 * mark. With `extend`, a selection inside one run of the mark acts on the whole run. Visible `text` at a caret outside
 * the mark inserts that text with the mark, or the mark's `href` when it is empty.
 */
const applyMark = (
    state: EditorState,
    dispatch: ((transaction: Transaction) => void) | undefined,
    mark: Mark,
    extend: boolean,
    text?: string,
): boolean => {
    const { type } = mark;
    const range = extend ? enclosingRange(state, type) : undefined;
    if (range !== undefined) {
        if (dispatch !== undefined) {
            const transaction = state.tr;
            markRange(transaction, range.from, range.to, mark, text);
            dispatch(transaction.setMeta(LAST_MARK_META, mark).scrollIntoView());
        }
        return true;
    }
    if (state.selection.empty) {
        const { $from } = state.selection;
        if (!$from.parent.type.allowsMarkType(type)) {
            return false;
        }
        if (text === undefined) {
            dispatch?.(state.tr.addStoredMark(mark).setMeta(LAST_MARK_META, mark));
            return true;
        }
        let inserted = text;
        if (inserted === '' && typeof mark.attrs.href === 'string') {
            inserted = mark.attrs.href;
        }
        if (inserted === '') {
            return false;
        }
        const marks = mark.addToSet((state.storedMarks ?? $from.marks()).filter((other) => other.type !== type));
        dispatch?.(
            state.tr
                .insert($from.pos, type.schema.text(inserted, marks))
                .setMeta(LAST_MARK_META, mark)
                .scrollIntoView(),
        );
        return true;
    }
    const texts = markableText(state, type);
    if (texts.length === 0) {
        return false;
    }
    if (dispatch !== undefined) {
        const transaction = state.tr;
        const { from, to, $from, $to } = state.selection;
        if ($from.sameParent($to)) {
            markRange(transaction, from, to, mark, text);
        } else {
            for (const range of texts) {
                transaction.addMark(range.from, range.to, mark);
            }
        }
        dispatch(transaction.setMeta(LAST_MARK_META, mark).scrollIntoView());
    }
    return true;
};

/** Removes every mark of `types` from the selected text, or from the stored marks at a caret. */
const clearMarks = (
    state: EditorState,
    dispatch: ((transaction: Transaction) => void) | undefined,
    types: readonly MarkType[],
    extend: boolean,
): boolean => {
    if (state.selection.empty) {
        const stored = state.storedMarks ?? state.selection.$from.marks();
        const held = types.flatMap((type) => {
            const range = extend ? enclosingRange(state, type) : undefined;
            if (range === undefined && type.isInSet(stored) === undefined) {
                return [];
            }
            return [{ type, range }];
        });
        if (held.length === 0) {
            return false;
        }
        if (dispatch !== undefined) {
            const transaction = state.tr;
            for (const { type, range } of held) {
                if (range === undefined) {
                    transaction.removeStoredMark(type);
                } else {
                    transaction.removeMark(range.from, range.to, type);
                }
            }
            dispatch(transaction);
        }
        return true;
    }
    const ranges = types.flatMap((type) => {
        const run = extend ? enclosingRange(state, type) : undefined;
        if (run !== undefined) {
            return [{ ...run, type }];
        }
        return markableText(state, type)
            .filter((text) => text.marked)
            .map((text) => ({ ...text, type }));
    });
    if (ranges.length === 0) {
        return false;
    }
    if (dispatch !== undefined) {
        const transaction = state.tr;
        for (const { from, to, type } of ranges) {
            transaction.removeMark(from, to, type);
        }
        dispatch(transaction.scrollIntoView());
    }
    return true;
};

/** Whether every selected text carries `type` with `attrs`, some of it, or none; at a caret, the marks the next typed text gets. */
const markWithAttrs = (state: EditorState, type: MarkType, attrs: Readonly<Record<string, unknown>>) => {
    const matches = (marks: readonly Mark[]) => {
        const found = type.isInSet(marks);
        return found !== undefined && Object.entries(attrs).every(([name, value]) => found.attrs[name] === value);
    };
    if (state.selection.empty) {
        return matches(state.storedMarks ?? state.selection.$from.marks());
    }
    const texts: boolean[] = [];
    for (const { $from, $to } of state.selection.ranges) {
        state.doc.nodesBetween($from.pos, $to.pos, (node, _pos, parent) => {
            if (node.isText && parent !== null && parent.type.allowsMarkType(type)) {
                texts.push(matches(node.marks));
            }
        });
    }
    return tristate(texts.filter(Boolean).length, texts.length);
};

/** A payload's attributes, and its `text` field, the visible text, unless the mark declares a `text` attribute. */
const splitText = (type: MarkType, payload: Readonly<Record<string, unknown>>) => {
    if (Object.hasOwn(type.spec.attrs ?? {}, 'text') || !Object.hasOwn(payload, 'text')) {
        return { attrs: payload, text: undefined };
    }
    const { text, ...attrs } = payload;
    return { attrs, text: typeof text === 'string' ? text : undefined };
};

/**
 * Sets the mark with the payload's fields as attributes, or removes it for a null payload; a `text` field is the
 * visible text that `applyMark` inserts or replaces.
 */
const setMark: CapabilityImplementation = (args, schema) => {
    const type = schema.marks[args.mark as string] as MarkType;
    const extend = args.extendToMarkRange === true;
    return {
        run: (state, dispatch, payload) => {
            if (payload === null) {
                return clearMarks(state, dispatch, [type], extend);
            }
            if (!isRecord(payload)) {
                return false;
            }
            const { attrs, text } = splitText(type, payload);
            return applyMark(state, dispatch, type.create(attrs), extend, text);
        },
        active: (state, payload) => {
            if (!isRecord(payload)) {
                return false;
            }
            return markWithAttrs(state, type, splitText(type, payload).attrs);
        },
    };
};

const markTypesOf = (marks: unknown, schema: Schema): MarkType[] => {
    const names = Array.isArray(marks) ? (marks as readonly unknown[]) : [marks];
    return names.flatMap((name) => {
        const type = typeof name === 'string' ? schema.marks[name] : undefined;
        if (type === undefined) {
            return [];
        }
        return [type];
    });
};

/** Sets again the last mark of the listed types that a `setMark` command set in this session. */
const reapplyMark: CapabilityImplementation = (args, schema) => {
    const types = markTypesOf(args.installed, schema);
    return {
        run: (state, dispatch) => {
            const last = (lastMarkKey.getState(state) ?? []).find((mark) => types.includes(mark.type));
            if (last === undefined) {
                return false;
            }
            return applyMark(state, dispatch, last, false);
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

// An island mark stays, because it holds content the model cannot store as itself.
const clearedMarks = (schema: Schema): readonly MarkType[] =>
    Object.values(schema.marks).filter((type) => type.name !== 'unsupported_mark');

const take = (outer: Transaction, current: EditorState, next: Transaction | undefined): EditorState => {
    if (next === undefined || (!next.docChanged && !next.storedMarksSet)) {
        return current;
    }
    appendSteps(outer, next);
    if (next.storedMarksSet) {
        outer.setStoredMarks(next.storedMarks);
    }
    return current.apply(next);
};

/** Lifts the item of the selected textblock at `pos` one level out of its list, or returns `undefined` outside a list. */
const liftItemAt = (state: EditorState, pos: number): Transaction | undefined => {
    const $inside = state.doc.resolve(pos + 1);
    const around = listAround($inside);
    if (around === undefined) {
        return undefined;
    }
    const item = $inside.node(around.depth + 1).type;
    // `liftListItem` lifts the items of the selection's block range, which a selection that leaves the list lacks.
    const caret = state.apply(state.tr.setSelection(TextSelection.create(state.doc, pos + 1)));
    const built: Transaction[] = [];
    liftListItem(item)(caret, (next) => {
        built.push(next);
    });
    const next = built[0];
    if (next === undefined || !next.docChanged) {
        return undefined;
    }
    return next;
};

/** Lifts every selected item, nested ones included, one level at a time until no selected textblock sits in a list. */
const liftLists = (state: EditorState): Transaction | undefined => {
    const transaction = state.tr;
    let current = state;
    for (;;) {
        let next: Transaction | undefined;
        for (const { pos } of selectedTextblocks(current)) {
            next = liftItemAt(current, pos);
            if (next !== undefined) {
                break;
            }
        }
        if (next === undefined) {
            break;
        }
        appendSteps(transaction, next);
        const selection = current.selection.map(next.doc, next.mapping);
        current = current.apply(next);
        current = current.apply(current.tr.setSelection(selection));
    }
    if (!transaction.docChanged) {
        return undefined;
    }
    return transaction.setSelection(carrySelection(transaction.doc, current.selection));
};

// The block attributes clearing all formatting restores to their declared defaults.
const CLEARED_ATTRIBUTES = ['align', 'indent'];

/** Turns the selected textblocks into paragraphs and restores alignment and indent to their defaults. */
const plainParagraphs = (state: EditorState): Transaction | undefined => {
    const paragraph = state.schema.nodes.paragraph;
    if (paragraph === undefined) {
        return undefined;
    }
    const cleared = CLEARED_ATTRIBUTES.filter((name) => Object.hasOwn(paragraph.spec.attrs ?? {}, name));
    const blocks = selectedTextblocks(state);
    const needs = blocks.some(
        ({ node }) =>
            node.type !== paragraph || cleared.some((name) => node.attrs[name] !== defaultOf(paragraph, name)),
    );
    if (!needs) {
        return undefined;
    }
    const { $from, $to } = state.selection;
    const transaction = state.tr.setBlockType($from.pos, $to.pos, paragraph, (node) => {
        const attrs = carried(node, paragraph, {});
        for (const name of cleared) {
            attrs[name] = defaultOf(paragraph, name);
        }
        return attrs;
    });
    if (!transaction.docChanged) {
        return undefined;
    }
    return transaction;
};

/** The selected range, or at a caret the whole textblocks around it. */
const blockRanges = (state: EditorState): { readonly from: number; readonly to: number }[] => {
    if (!state.selection.empty) {
        return [{ from: state.selection.from, to: state.selection.to }];
    }
    const blocks = selectedTextblocks(state);
    if (blocks.length > 0) {
        return blocks.map(({ node, pos }) => ({ from: pos + 1, to: pos + 1 + node.content.size }));
    }
    const { $from } = state.selection;
    if ($from.parent.isTextblock) {
        return [{ from: $from.start(), to: $from.end() }];
    }
    return [{ from: state.selection.from, to: state.selection.to }];
};

const clearStored = (transaction: Transaction, state: EditorState, types: readonly MarkType[]) => {
    if (!state.selection.empty) {
        return;
    }
    const stored = state.storedMarks ?? state.selection.$from.marks();
    const kept = stored.filter((mark) => !types.includes(mark.type));
    if (kept.length !== stored.length) {
        transaction.setStoredMarks(kept);
    }
};

/** Removes every mark but an island's, lifts the selection out of lists and leaves plain paragraphs, as one undo step. */
const clearAll: CapabilityImplementation = (_args, schema) => {
    const types = clearedMarks(schema);
    return {
        run: (state, dispatch) => {
            const transaction = state.tr;
            let current = take(transaction, state, liftLists(state));
            current = take(transaction, current, plainParagraphs(current));
            const marks = current.tr;
            for (const range of blockRanges(current)) {
                for (const type of types) {
                    if (range.from !== range.to) {
                        marks.removeMark(range.from, range.to, type);
                    }
                }
            }
            clearStored(marks, current, types);
            current = take(transaction, current, marks);
            if (!transaction.docChanged && !transaction.storedMarksSet) {
                return false;
            }
            transaction.setSelection(carrySelection(transaction.doc, current.selection));
            dispatch?.(transaction.scrollIntoView());
            return true;
        },
        active: () => false,
    };
};

/** Removes the listed marks the model installs as one undo step, or with `scope: 'all'` clears all formatting. */
const removeMark: CapabilityImplementation = (args, schema, command) => {
    if (args.scope === 'all') {
        return clearAll(args, schema, command);
    }
    const types = markTypesOf(args.installed, schema);
    const extend = args.extendToMarkRange === true;
    return {
        run: (state, dispatch) => clearMarks(state, dispatch, types, extend),
        active: () => false,
    };
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
    reapplyMark,
    removeMark,
    setAttributes,
    setBlock,
    setMark,
    toggleList,
    toggleMark,
    toggleTask,
    wrapIn,
    plugins: {
        [LAST_MARK_PLUGIN.id]: lastMarkPlugin,
        // Backspace right after a rule fired undoes it before any list or block key sees it.
        [HISTORY_PLUGIN.id]: ({ inputRules }) =>
            historyPlugin({ Backspace: undoInputRule, Enter: enterRules(inputRules) }),
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
