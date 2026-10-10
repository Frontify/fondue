/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    macBaseKeymap,
    pcBaseKeymap,
    toggleMark as toggleEngineMark,
    wrapIn as wrapInEngine,
} from 'prosemirror-commands';
import { keydownHandler } from 'prosemirror-keymap';
import { type MarkType, type Node, type NodeRange, type NodeType, type ResolvedPos } from 'prosemirror-model';
import { type EditorState, Plugin, PluginKey, TextSelection } from 'prosemirror-state';
import { liftTarget } from 'prosemirror-transform';

import { type CapabilityImplementation, type CapabilityImplementations } from '#/definition';
import { BASE_KEYS_PLUGIN, CONTAINER_KEYS_PLUGIN, HISTORY_PLUGIN, INPUT_RULES_PLUGIN } from '#/model/capabilities';
import { isApple, modOn } from '#/model/platform';
import { isRecord } from '#/model/values';

import { historyPlugin, redo, undo } from './history';
import { inputRulesPlugin, undoInputRule } from './input-rules';

interface TextRange {
    readonly from: number;
    readonly to: number;
    readonly marked: boolean;
}

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
    const marked = texts.filter((text) => text.marked).length;
    if (marked === 0) {
        return false;
    }
    if (marked === texts.length) {
        return true;
    }
    return 'mixed';
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
    // A mark that excludes this one, as `superscript` excludes `subscript`, gives way to it, so the exclusion holds both ways.
    const yielding = Object.values(schema.marks).filter((other) => other !== type && other.excludes(type));
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
            const matching = blocks.filter(({ node }) => matches(node, attrs)).length;
            if (matching === 0) {
                return false;
            }
            if (matching === blocks.length) {
                return true;
            }
            return 'mixed';
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
    const wrap = wrapInEngine(type);
    const inside = (state: EditorState) => {
        const { $from, $to } = state.selection;
        return rangeIn($from, $to, type) !== undefined;
    };
    return {
        run: (state, dispatch) => {
            if (args.toggle !== true || !inside(state)) {
                return wrap(state, dispatch);
            }
            const { $from, $to } = state.selection;
            const range = rangeIn($from, $to, type) as NodeRange;
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
            }).length;
            if (within === 0) {
                return false;
            }
            if (within === blocks.length) {
                return true;
            }
            return 'mixed';
        },
    };
};

/** Swaps the blocks the selection spans with their previous or next sibling, so the selection moves with them. */
const block: CapabilityImplementation = (args) => ({
    run: (state, dispatch) => {
        const { $from, $to } = state.selection;
        const range = $from.blockRange($to);
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

/**
 * Whether `type` is a container: a block whose content takes only blocks, such as a quote, and not a list item,
 * table cell or figure, which are no blocks or take other content (SPEC-rich-text-editing/AC-026).
 */
const isContainer = (type: NodeType) =>
    type.isInGroup('block') &&
    !type.isTextblock &&
    Object.values(type.schema.nodes).every(
        (child) => type.contentMatch.matchType(child) === null || child.isInGroup('block'),
    );

/** Enter in the empty last paragraph of a container removes it and puts a new paragraph after the container. */
const containerKeysPlugin = () =>
    new Plugin({
        key: new PluginKey(CONTAINER_KEYS_PLUGIN.id),
        props: {
            handleKeyDown: (view, event) => {
                const { state } = view;
                const { $cursor } = state.selection as TextSelection;
                const plain = !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey;
                if (event.key !== 'Enter' || !plain || $cursor === undefined || $cursor === null || $cursor.depth < 2) {
                    return false;
                }
                const paragraph = $cursor.parent;
                const container = $cursor.node(-1);
                const last = $cursor.index(-1) === container.childCount - 1;
                if (
                    paragraph.type.name !== 'paragraph' ||
                    paragraph.content.size > 0 ||
                    !last ||
                    !isContainer(container.type)
                ) {
                    return false;
                }
                const after = $cursor.after(-1);
                const transaction = state.tr;
                if (container.childCount === 1) {
                    transaction.delete($cursor.before(-1), after);
                } else {
                    transaction.delete($cursor.before(), $cursor.after());
                }
                const at = transaction.mapping.map(after);
                transaction.insert(at, paragraph.type.create());
                view.dispatch(transaction.setSelection(TextSelection.create(transaction.doc, at + 1)).scrollIntoView());
                return true;
            },
        },
    });

/** ProseMirror's base keymap of the platform, with `Mod` bound as the editor's own platform check reads it. */
const baseKeysOf = (keymap: typeof pcBaseKeymap, apple: boolean) =>
    keydownHandler(Object.fromEntries(Object.entries(keymap).map(([key, command]) => [modOn(key, apple), command])));
const BASE_KEYS = { apple: baseKeysOf(macBaseKeymap, true), other: baseKeysOf(pcBaseKeymap, false) };

/**
 * Enter, Backspace, Delete and select-all, which ProseMirror leaves to its base keymap: without them it prevents
 * Enter and a Backspace at a block start, and the browser's own select-all stops at a node view's chrome.
 */
const baseKeysPlugin = () =>
    new Plugin({
        key: new PluginKey(BASE_KEYS_PLUGIN.id),
        props: {
            handleKeyDown: (view, event) => {
                const owner = view.dom.ownerDocument.defaultView;
                if (owner !== null && isApple(owner.navigator)) {
                    return BASE_KEYS.apple(view, event);
                }
                return BASE_KEYS.other(view, event);
            },
        },
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
