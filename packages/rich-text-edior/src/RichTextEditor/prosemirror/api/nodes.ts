/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi } from '../../types';

/** Whole nodes: the one way both void blocks (images) and inline elements (mentions) get added. */
export type NodeApi = Pick<EditorControlApi, 'insert'>;

export const createNodeApi = (view: EditorView, schema: Schema): NodeApi => ({
    insert(type, attrs) {
        const nodeType = schema.nodes[type];
        if (nodeType) {
            view.dispatch(view.state.tr.replaceSelectionWith(nodeType.create(attrs)));
            view.focus();
        }
    },
});
