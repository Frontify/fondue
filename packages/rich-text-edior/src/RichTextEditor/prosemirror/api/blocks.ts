/* (c) Copyright Frontify Ltd., all rights reserved. */

import { setBlockType as pmSetBlockType } from 'prosemirror-commands';
import { type Schema } from 'prosemirror-model';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi } from '#/domain';

/**
 * The block half of the control API: block types and the attributes on them.
 * Which block the selection is in is not here — plugins read that off the
 * selection snapshot and compare it themselves.
 */
export const createBlockApi = (view: EditorView, schema: Schema): EditorControlApi['blocks'] => ({
    setType(type, attrs) {
        const nodeType = schema.nodes[type];
        if (nodeType) {
            pmSetBlockType(nodeType, attrs ?? {})(view.state, view.dispatch);
            view.focus();
        }
    },
    updateAttributes(attrs) {
        const { from, to } = view.state.selection;
        const transaction = view.state.tr;
        view.state.doc.nodesBetween(from, to, (node, pos) => {
            if (node.isTextblock) {
                // Attributes a node type never declared are ignored by the
                // engine, so this is safe across mixed selections.
                transaction.setNodeMarkup(pos, undefined, { ...node.attrs, ...attrs });
            }
        });
        if (transaction.docChanged) {
            view.dispatch(transaction);
        }
        view.focus();
    },
});
