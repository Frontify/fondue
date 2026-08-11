/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi } from '../../types';
import { type SchemaBundle } from '../schema';

import { createBlockApi } from './blocks';
import { createListApi } from './lists';
import { createMarkApi } from './marks';
import { createSelectionApi } from './selection';

/**
 * The EditorControlApi, assembled from one part per thing it acts on. Every part
 * is a plain object of methods closing over the live view, so a plugin always
 * reads and writes the current state.
 *
 * The four members that stay flat are the ones acting on the editor as a whole
 * rather than on one kind of thing in it, so there is no part for them to belong
 * to — and each is one call.
 */
export const createApi = (view: EditorView, bundle: SchemaBundle): EditorControlApi => ({
    selection: createSelectionApi(view),
    marks: createMarkApi(view, bundle.schema),
    blocks: createBlockApi(view, bundle.schema),
    lists: createListApi(view, bundle),

    insert(type, attrs) {
        const nodeType = bundle.schema.nodes[type];
        if (nodeType) {
            view.dispatch(view.state.tr.replaceSelectionWith(nodeType.create(attrs)));
            view.focus();
        }
    },
    insertText(text) {
        view.dispatch(view.state.tr.insertText(text));
        view.focus();
    },
    focus() {
        view.focus();
    },
    blur() {
        view.dom.blur();
    },
});
