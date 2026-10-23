/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark as toggleEngineMark, wrapIn as wrapInEngine } from 'prosemirror-commands';
import {
    Fragment,
    type MarkType,
    type Node,
    NodeRange,
    type NodeType,
    type ResolvedPos,
    type Schema,
} from 'prosemirror-model';
import { liftListItem, sinkListItem, wrapRangeInList } from 'prosemirror-schema-list';
import { type EditorState, type Transaction } from 'prosemirror-state';
import { liftTarget } from 'prosemirror-transform';

import { type CommandLookup, type EngineCommand, type EngineImplementations } from '#/definition';
import { type JsonObject } from '#/model';
import {
    BASE_KEYS_PLUGIN,
    BLOCK_DECORATIONS_PLUGIN,
    CONTAINER_KEYS_PLUGIN,
    HISTORY_PLUGIN,
    INPUT_RULES_PLUGIN,
    SUGGESTIONS_PLUGIN,
} from '#/model/capabilities';
import { isRecord } from '#/model/values';

import { blockDecorationsPlugin } from './decorations';
import { historyPlugin, redo, undo } from './history';
import { enterRules, inputRulesPlugin, undoInputRule } from './input-rules';
import { baseKeysPlugin, containerKeysPlugin } from './keys';
import { liftItems, listAround, repeatWhile } from './lists';
import { inCodeTextblock, nearest, positionOf } from './positions';
import { suggestionsPlugin } from './suggestions/plugin';
import { carrySelection } from './transactions';

/** Builds the engine command of one edit from its arguments. */
export type CapabilityImplementation = (args: JsonObject, schema: Schema, command: CommandLookup) => EngineCommand;

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
    return {
        run: (state, dispatch) => {
            if (state.selection.empty) {
                return engineToggle(state, dispatch);
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
    // The payload's fields are attributes of the node, such as `level` for `heading.set`.
    const attrsOf = (payload: unknown) => {
        const attrs: Record<string, unknown> = {};
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
    return {
        run: (state, dispatch, payload) => {
            const { $from, $to } = state.selection;
            const range = rangeIn($from, $to, type);
            if (range === undefined) {
                // The payload holds the attributes of the new container.
                let attrs: Readonly<Record<string, unknown>> | undefined;
                if (isRecord(payload)) {
                    attrs = payload;
                }
                return wrapInEngine(type, attrs)(state, dispatch);
            }
            const target = liftTarget(range);
            if (target === null) {
                return false;
            }
            dispatch?.(state.tr.lift(range, target).scrollIntoView());
            return true;
        },
        active: (state, payload) => {
            let attrs: Readonly<Record<string, unknown>> = {};
            if (isRecord(payload)) {
                attrs = payload;
            }
            const blocks = selectedTextblocks(state);
            const within = blocks.filter(({ pos }) => {
                const $pos = state.doc.resolve(pos);
                for (let depth = $pos.depth; depth > 0; depth -= 1) {
                    const node = $pos.node(depth);
                    if (
                        node.type === type &&
                        Object.entries(attrs).every(([name, value]) => node.attrs[name] === value)
                    ) {
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
const convertList = (
    state: EditorState,
    around: NonNullable<ReturnType<typeof listAround>>,
    list: NodeType,
    item: NodeType,
    payload: unknown,
) => {
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
            const around = listAround(state.selection.$from);
            if (around === undefined) {
                transaction = wrapInList(state, list, item, payload);
            } else if (isList(state)) {
                // The selected items leave every level of this list type and become paragraphs.
                transaction = repeatWhile(state, liftItems(item), isList);
            } else {
                transaction = convertList(state, around, list, item, payload);
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

const indentItem: CapabilityImplementation = (args, schema) => {
    const item = schema.nodes[args.item as string] as NodeType;
    const sink = sinkListItem(item);
    return {
        run: (state, dispatch) =>
            !inCodeTextblock(state.selection.$from) && inListOf(state, item) && sink(state, dispatch),
        active: () => false,
    };
};

const outdentItem: CapabilityImplementation = (args, schema) => {
    const item = schema.nodes[args.item as string] as NodeType;
    const lift = liftListItem(item);
    return {
        run: (state, dispatch) =>
            !inCodeTextblock(state.selection.$from) && inListOf(state, item) && lift(state, dispatch),
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

/** The targets that declare at least one of `attrs`, which the others skip. */
const declaring = (targets: Located[], attrs: Readonly<Record<string, unknown>>): Located[] =>
    targets.filter(({ node }) => Object.keys(attrs).some((name) => node.type.spec.attrs?.[name] !== undefined));

/**
 * Sets the payload's other fields on the node its `nodeId` names, else on the selected nodes of the listed types,
 * else on the nearest node of one; with `toggle`, removes the values when every target already has them.
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
            const targets = declaring(attributeTargets(state, types, parts.nodeId), parts.attrs);
            const removes =
                args.toggle === true && targets.length > 0 && targets.every(({ node }) => has(node, parts.attrs));
            const changes = targets.flatMap(({ node, pos }) =>
                Object.entries(parts.attrs)
                    .filter(([name]) => node.type.spec.attrs?.[name] !== undefined)
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
            const targets = declaring(attributeTargets(state, types, parts.nodeId), parts.attrs);
            return tristate(targets.filter(({ node }) => has(node, parts.attrs)).length, targets.length);
        },
    };
};

/** Removes every mark of `types` from the selected text, or from the stored marks at a caret. */
const clearMarks = (
    state: EditorState,
    dispatch: ((transaction: Transaction) => void) | undefined,
    types: readonly MarkType[],
): boolean => {
    if (state.selection.empty) {
        const stored = state.storedMarks ?? state.selection.$from.marks();
        const held = types.flatMap((type) => {
            if (type.isInSet(stored) === undefined) {
                return [];
            }
            return [{ type }];
        });
        if (held.length === 0) {
            return false;
        }
        if (dispatch !== undefined) {
            const transaction = state.tr;
            for (const { type } of held) {
                transaction.removeStoredMark(type);
            }
            dispatch(transaction.scrollIntoView());
        }
        return true;
    }
    const ranges = types.flatMap((type) => {
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

const history: CapabilityImplementation = (args) => {
    let command = undo;
    if (args.action === 'redo') {
        command = redo;
    }
    return { run: (state, dispatch) => command(state, dispatch), active: () => false };
};

/** Removes the listed marks the model installs as one undo step. */
const removeMark: CapabilityImplementation = (args, schema) => {
    const types = markTypesOf(args.installed, schema);
    return {
        run: (state, dispatch) => {
            return clearMarks(state, dispatch, types);
        },
        active: () => false,
    };
};

/** The editor API's edits, each built from its arguments for a model's schema. */
export const EDITS = {
    block,
    history,
    indentItem,
    indentLines,
    insertText,
    outdentItem,
    removeMark,
    setAttributes,
    setBlock,
    toggleList,
    toggleMark,
    wrapIn,
} as const;

/** The package plugins the runtime builds, by plugin ID. */
export const RUNTIME_PLUGINS: EngineImplementations = {
    plugins: {
        // Backspace right after a rule fired undoes it before any list or block key sees it.
        [HISTORY_PLUGIN.id]: ({ inputRules }) =>
            historyPlugin({ Backspace: undoInputRule, Enter: enterRules(inputRules) }),
        [INPUT_RULES_PLUGIN.id]: inputRulesPlugin,
        [CONTAINER_KEYS_PLUGIN.id]: containerKeysPlugin,
        [BASE_KEYS_PLUGIN.id]: baseKeysPlugin,
        [BLOCK_DECORATIONS_PLUGIN.id]: blockDecorationsPlugin,
        [SUGGESTIONS_PLUGIN.id]: suggestionsPlugin,
    },
};
