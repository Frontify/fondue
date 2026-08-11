/* (c) Copyright Frontify Ltd., all rights reserved. */

import { TextSelection } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi } from '../../types';

/** Plain text, the selection, and focus — the rest of the control API. */
export type TextApi = Pick<
    EditorControlApi,
    'insertText' | 'getSelectedText' | 'replaceSelectionWithText' | 'isSelectionCollapsed' | 'focus' | 'blur'
>;

export const createTextApi = (view: EditorView): TextApi => ({
    insertText(text) {
        view.dispatch(view.state.tr.insertText(text));
        view.focus();
    },
    getSelectedText() {
        const { from, to, empty } = view.state.selection;
        // Void nodes in between (a mention, a line break) contribute
        // nothing, so what comes back is what the user can actually read.
        return empty ? '' : view.state.doc.textBetween(from, to, ' ');
    },
    replaceSelectionWithText(text) {
        if (text === '') {
            return;
        }
        const { from, to } = view.state.selection;
        // Positions count text in the same units as a JS string, so the end
        // of the inserted run is simply `from` plus its length.
        const transaction = view.state.tr.insertText(text, from, to);
        transaction.setSelection(TextSelection.create(transaction.doc, from, from + text.length));
        view.dispatch(transaction);
        view.focus();
    },
    isSelectionCollapsed() {
        return view.state.selection.empty;
    },
    focus() {
        view.focus();
    },
    blur() {
        view.dom.blur();
    },
});
