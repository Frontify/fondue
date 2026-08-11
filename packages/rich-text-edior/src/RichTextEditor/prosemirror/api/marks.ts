/* (c) Copyright Frontify Ltd., all rights reserved. */

import { toggleMark as pmToggleMark } from 'prosemirror-commands';
import { type Schema } from 'prosemirror-model';
import { TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi } from '../../types';
import { definedAttrs } from '../document';
import { findMarkRange } from '../queries';

/** The mark half of the control API: toggling, reading values, and selecting runs. */
export type MarkApi = Pick<
    EditorControlApi,
    'toggleMark' | 'isMarkActive' | 'getMarkValue' | 'getMarkRun' | 'removeAllMarks' | 'selectMark'
>;

export const createMarkApi = (view: EditorView, schema: Schema): MarkApi => ({
    toggleMark(key, value) {
        const markType = schema.marks[key];
        if (markType) {
            pmToggleMark(markType, value)(view.state, view.dispatch);
            view.focus();
        }
    },
    isMarkActive(key) {
        const markType = schema.marks[key];
        if (!markType) {
            return false;
        }
        const { from, to, empty, $from } = view.state.selection;
        return empty
            ? Boolean(markType.isInSet(view.state.storedMarks ?? $from.marks()))
            : view.state.doc.rangeHasMark(from, to, markType);
    },
    getMarkValue(key) {
        const markType = schema.marks[key];
        if (!markType) {
            return null;
        }
        const { $from, from, to, empty } = view.state.selection;
        if (empty) {
            const mark = markType.isInSet(view.state.storedMarks ?? $from.marks());
            return mark ? definedAttrs(mark.attrs) : null;
        }
        let found: Record<string, unknown> | null = null;
        view.state.doc.nodesBetween(from, to, (node) => {
            if (found === null && node.isText) {
                const mark = markType.isInSet(node.marks);
                if (mark) {
                    found = definedAttrs(mark.attrs);
                }
            }
        });
        return found;
    },
    getMarkRun(key) {
        const markType = schema.marks[key];
        const range = markType ? findMarkRange(view.state, markType) : null;
        if (!markType || range === null) {
            return null;
        }
        // The run starts at a text node carrying the mark, so its attributes
        // are the run's — the whole point of a run being one stretch.
        const first = view.state.doc.resolve(range.from).nodeAfter;
        const mark = first ? markType.isInSet(first.marks) : null;
        return {
            value: mark ? definedAttrs(mark.attrs) : {},
            // Void nodes in between contribute nothing, so what comes back
            // is what the user can actually read — as with getSelectedText.
            text: view.state.doc.textBetween(range.from, range.to, ' '),
        };
    },
    removeAllMarks() {
        const { from, to, empty } = view.state.selection;
        const transaction = empty ? view.state.tr.setStoredMarks([]) : view.state.tr.removeMark(from, to, null);
        view.dispatch(transaction);
        view.focus();
    },
    selectMark(key) {
        const markType = schema.marks[key];
        if (!markType) {
            return false;
        }
        const { $from, empty } = view.state.selection;
        if (!empty) {
            return Boolean(markType.isInSet($from.marks()));
        }
        const range = findMarkRange(view.state, markType);
        if (range === null) {
            return false;
        }
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, range.from, range.to)));
        return true;
    },
});
