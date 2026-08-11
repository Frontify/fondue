/* (c) Copyright Frontify Ltd., all rights reserved. */

import { setBlockType as pmSetBlockType } from 'prosemirror-commands';
import { type EditorView } from 'prosemirror-view';

import { type EditorControlApi } from '#/domain';

import { type SchemaBundle } from '../schema';

/**
 * The block half of the control API: block types and the attributes on them.
 * Which block the selection is in is not here — plugins read that off the
 * selection snapshot and compare it themselves.
 */
export const createBlockApi = (view: EditorView, bundle: SchemaBundle): EditorControlApi['blocks'] => {
    const { schema, blockAttributes } = bundle;

    /** Every text block the selection touches, with the given attributes applied. */
    const applyToTextBlocks = (attrs: Record<string, unknown>): void => {
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
    };

    return {
        setType(type, attrs) {
            const nodeType = schema.nodes[type];
            if (nodeType) {
                pmSetBlockType(nodeType, attrs ?? {})(view.state, view.dispatch);
                view.focus();
            }
        },
        updateAttributes: applyToTextBlocks,
        resetAttributes() {
            applyToTextBlocks(
                Object.fromEntries(blockAttributes.map((attribute) => [attribute.name, attribute.default ?? null])),
            );
        },
    };
};
