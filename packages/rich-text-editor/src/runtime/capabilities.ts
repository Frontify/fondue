/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark as toggleEngineMark } from 'prosemirror-commands';
import { type MarkType } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { type CapabilityImplementation, type CapabilityImplementations } from '#/definition';
import { isRecord } from '#/model/values';

/** Whether every selected text carries `type`, some of it, or none; at a caret, the marks the next typed text gets. */
const markState = (state: EditorState, type: MarkType): boolean | 'mixed' => {
    const { selection } = state;
    if (selection.empty) {
        let marks = state.storedMarks;
        if (marks === null) {
            marks = selection.$from.marks();
        }
        return type.isInSet(marks) !== undefined;
    }
    let texts = 0;
    let marked = 0;
    for (const { $from, $to } of selection.ranges) {
        state.doc.nodesBetween($from.pos, $to.pos, (node) => {
            if (node.isText) {
                texts += 1;
                if (type.isInSet(node.marks) !== undefined) {
                    marked += 1;
                }
            }
        });
    }
    if (marked === 0) {
        return false;
    }
    return marked === texts ? true : 'mixed';
};

const toggleMark: CapabilityImplementation = (args, schema) => {
    // Compilation checked that the model declares the mark.
    const type = schema.marks[args.mark as string] as MarkType;
    let attrs = null;
    if (isRecord(args.attrs)) {
        attrs = args.attrs;
    }
    // At a caret ProseMirror toggles the stored mark; it also tells whether the mark applies at the selection.
    const engineToggle = toggleEngineMark(type, attrs);
    return {
        run: (state, dispatch, view) => {
            if (state.selection.empty || !engineToggle(state)) {
                return engineToggle(state, dispatch, view);
            }
            if (dispatch === undefined) {
                return true;
            }
            // Adds or removes as `active` reports, over every selected character, edge whitespace included (SPEC-rich-text-editing/AC-007, AC-008).
            const add = markState(state, type) !== true;
            const transaction = state.tr;
            for (const { $from, $to } of state.selection.ranges) {
                if (add) {
                    transaction.addMark($from.pos, $to.pos, type.create(attrs));
                } else {
                    transaction.removeMark($from.pos, $to.pos, type);
                }
            }
            if (transaction.docChanged) {
                dispatch(transaction.scrollIntoView());
            }
            return true;
        },
        active: (state) => markState(state, type),
    };
};

/** The command capabilities the runtime implements so far, by capability name. */
export const CAPABILITIES: CapabilityImplementations = { toggleMark };
