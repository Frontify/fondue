/* (c) Copyright Frontify Ltd., all rights reserved. */

import { setBlockType, toggleMark as toggleEngineMark } from 'prosemirror-commands';
import { type MarkType, type Node, type NodeType } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { type CapabilityImplementation, type CapabilityImplementations } from '#/definition';
import { isRecord } from '#/model/values';

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
            // Adds unless every selected text has the mark, edge whitespace included (SPEC-rich-text-editing/AC-007, AC-008).
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

/** The textblocks the selection touches. */
const selectedTextblocks = (state: EditorState): Node[] => {
    const blocks: Node[] = [];
    for (const { $from, $to } of state.selection.ranges) {
        state.doc.nodesBetween($from.pos, $to.pos, (node) => {
            if (node.isTextblock) {
                blocks.push(node);
            }
        });
    }
    return blocks;
};

const setBlock: CapabilityImplementation = (args, schema) => {
    // Compilation checked that the model declares the node.
    const type = schema.nodes[args.node as string] as NodeType;
    const paragraph = schema.nodes.paragraph as NodeType;
    let fixed: Readonly<Record<string, unknown>> = {};
    if (isRecord(args.attrs)) {
        fixed = args.attrs;
    }
    return {
        run: (state, dispatch, payload) => {
            // The payload's fields are attributes of the node, such as `level` for `heading.set`.
            const attrs: Record<string, unknown> = { ...fixed };
            if (isRecord(payload)) {
                for (const [name, value] of Object.entries(payload)) {
                    attrs[name] = value;
                }
            }
            const blocks = selectedTextblocks(state);
            const already = (block: Node) =>
                block.type === type && Object.entries(attrs).every(([name, value]) => block.attrs[name] === value);
            if (args.toggle === true && blocks.length > 0 && blocks.every(already)) {
                return setBlockType(paragraph)(state, dispatch);
            }
            return setBlockType(type, attrs)(state, dispatch);
        },
        active: (state) => {
            const blocks = selectedTextblocks(state);
            const matching = blocks.filter((block) => block.type === type).length;
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

/** The command capabilities the runtime implements so far, by capability name. */
export const CAPABILITIES: CapabilityImplementations = { insertText, setBlock, toggleMark };
