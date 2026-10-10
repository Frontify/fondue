/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark as toggleEngineMark, wrapIn as wrapInEngine } from 'prosemirror-commands';
import { type MarkType, type Node, NodeRange, type NodeType, type ResolvedPos } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';
import { liftTarget } from 'prosemirror-transform';

import { type CapabilityImplementation, type CapabilityImplementations } from '#/definition';
import { BASE_KEYS_PLUGIN, CONTAINER_KEYS_PLUGIN, HISTORY_PLUGIN, INPUT_RULES_PLUGIN } from '#/model/capabilities';
import { isRecord } from '#/model/values';

import { historyPlugin, redo, undo } from './history';
import { inputRulesPlugin, undoInputRule } from './input-rules';
import { baseKeysPlugin, containerKeysPlugin } from './keys';

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
            // Adds unless every selected text has the mark, edge whitespace included (SPEC-rich-text-editing/AC-007, AC-008).
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
    return {
        run: (state, dispatch, payload) => {
            const blocks = selectedTextblocks(state);
            let target = type;
            let over = attrsOf(payload);
            if (args.toggle === true && blocks.length > 0 && blocks.every(({ node }) => matches(node, over))) {
                target = paragraph;
                over = {};
            }
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
    };
};

const insertNode: CapabilityImplementation = (args, schema) => {
    // Compilation checked that the model declares the node.
    const type = schema.nodes[args.node as string] as NodeType;
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
    insertNode,
    insertText,
    setBlock,
    toggleMark,
    wrapIn,
    plugins: {
        // Backspace right after a rule fired undoes it before any list or block key sees it (Key precedence row 3).
        [HISTORY_PLUGIN.id]: () => historyPlugin({ Backspace: undoInputRule }),
        [INPUT_RULES_PLUGIN.id]: inputRulesPlugin,
        [CONTAINER_KEYS_PLUGIN.id]: containerKeysPlugin,
        [BASE_KEYS_PLUGIN.id]: baseKeysPlugin,
    },
};
