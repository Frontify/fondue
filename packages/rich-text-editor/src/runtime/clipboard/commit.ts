/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PluginKey, type Transaction } from 'prosemirror-state';
import { type EditorView } from 'prosemirror-view';

import { exceededStructure } from '#/clipboard/import/limits';

import { type Pasted } from './paste';
import { announce, type Connected, reject } from './session';

export const clipboardKey = new PluginKey('rte.clipboard');

/** Dispatches a paste or drop, or reports why it was refused with the document and selection unchanged. */
export const commit = (
    view: EditorView,
    connected: Connected,
    tr: Transaction,
    pasted: Pasted | undefined,
    event: 'paste' | 'drop',
) => {
    if (pasted === undefined) {
        return;
    }
    const { runtime } = connected;
    // Set before the limit check, whose prepared batch the dispatch installs.
    tr.setMeta('uiEvent', event);
    if (pasted.followUp !== undefined) {
        tr.setMeta(clipboardKey, pasted.followUp);
    }
    let exceeded: string | undefined = runtime.exceededLimit(tr, pasted.followUp !== undefined);
    // A follow-up past a limit leaves the paste as it is.
    if (exceeded !== undefined && pasted.followUp !== undefined) {
        tr.setMeta(clipboardKey, undefined);
        exceeded = runtime.exceededLimit(tr);
    }
    if (exceeded === undefined) {
        exceeded = exceededStructure(tr.doc, runtime.limits);
    }
    if (exceeded !== undefined) {
        reject(connected, exceeded);
        return;
    }
    const before = view.state.doc;
    view.dispatch(tr);
    if (tr.docChanged && view.state.doc === before) {
        reject(connected, 'not-allowed');
        return;
    }
    if (pasted.droppedMedia > 0) {
        announce(connected.session, 'RichTextEditor_pasteMediaDropped', { count: pasted.droppedMedia });
    }
    if (pasted.removedFormatting === true) {
        announce(connected.session, 'RichTextEditor_pasteFormattingRemoved');
    }
};
