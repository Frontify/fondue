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
    return {
        // The stock defaults remove a partly present mark and leave edge whitespace unmarked (SPEC-rich-text-editing/AC-007).
        run: toggleEngineMark(type, attrs, { removeWhenPresent: false, includeWhitespace: true }),
        active: (state) => markState(state, type),
    };
};

/** The command capabilities the runtime implements so far, by capability name. */
export const CAPABILITIES: CapabilityImplementations = { toggleMark };
