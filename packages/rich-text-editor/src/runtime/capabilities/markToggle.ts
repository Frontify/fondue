/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark as toggleEngineMark } from 'prosemirror-commands';
import { type MarkType } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { isRecord } from '#/model';

import { type CapabilityImplementation, REJECTED, tristate, typeIn } from './shared';

/** A selected part of one text node, and whether it carries the mark. */
export type TextRange = {
    from: number;
    to: number;
    marked: boolean;
};

/** The selected parts of text nodes whose parent allows `type`: a mark toggle acts on text only. */
export const markableText = (state: EditorState, type: MarkType): TextRange[] => {
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

/** Adds the mark to the selected text unless all of it has the mark, else removes it; at a caret, toggles the stored mark. */
export const toggleMark: CapabilityImplementation = (args, schema) => {
    const type = typeIn(schema.marks, args.mark);
    if (type === undefined) {
        return REJECTED;
    }

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
