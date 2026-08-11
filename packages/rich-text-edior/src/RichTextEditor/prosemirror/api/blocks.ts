/* (c) Copyright Frontify Ltd., all rights reserved. */

import { setBlockType as pmSetBlockType } from 'prosemirror-commands';
import { type Schema } from 'prosemirror-model';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi } from '../../types';
import { shallowBlockFromPm } from '../document';

/** The block half of the control API: block types and the attributes on them. */
export type BlockApi = Pick<
    EditorControlApi,
    'setBlockType' | 'isBlockActive' | 'updateBlockAttributes' | 'getCurrentBlock'
>;

export const createBlockApi = (view: EditorView, schema: Schema): BlockApi => ({
    setBlockType(type, attrs) {
        const nodeType = schema.nodes[type];
        if (nodeType) {
            pmSetBlockType(nodeType, attrs ?? {})(view.state, view.dispatch);
            view.focus();
        }
    },
    isBlockActive(type, attrs) {
        const { $from } = view.state.selection;
        for (let depth = $from.depth; depth >= 0; depth--) {
            const node = $from.node(depth);
            if (node.type.name === type) {
                return !attrs || Object.entries(attrs).every(([name, value]) => node.attrs[name] === value);
            }
        }
        return false;
    },
    updateBlockAttributes(attrs) {
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
    getCurrentBlock() {
        const { $from } = view.state.selection;
        for (let depth = $from.depth; depth >= 0; depth--) {
            const node = $from.node(depth);
            if (node.type.spec.group === 'block') {
                return shallowBlockFromPm(node);
            }
        }
        // A selected void block (image): the selection sits at doc level.
        const after = $from.nodeAfter;
        return after && after.type.spec.group === 'block' ? shallowBlockFromPm(after) : null;
    },
});
