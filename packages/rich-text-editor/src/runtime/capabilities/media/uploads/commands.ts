/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Node, Slice } from 'prosemirror-model';
import { Selection, type Transaction } from 'prosemirror-state';

import { COMMAND_META, type EngineCommand } from '#/definition';
import { type JsonObject } from '#/model';

import { placeBlock } from '../..';
import { positionOf } from '../../../positions';
import { INSERT_IMAGE, type PickedAsset, REPLACE_IMAGE } from '../media';
import { SLOT_START_META, type SlotStart } from '../uploadSlots';

import { FILL_META } from './constants';
import { type Checked } from './types';

/** The node that has `nodeId` in `doc`, or `null` when none does. */
export const nodeIn = (doc: Node, nodeId: string): Node | null => {
    const pos = positionOf(doc, nodeId);
    return pos === undefined ? null : doc.nodeAt(pos);
};

/** The `asset_image` attributes that every slot's start sets. */
export const slotAttrs = ({ name, width, height }: Checked) => ({ assetId: null, labelSnapshot: name, width, height });

/** The step that inserts `nodes` as new slots: at the selection as `image.insert` does, or over a pasted range. */
export const insertion = (
    nodes: readonly Node[],
    origin: 'command' | 'paste' | 'drop',
    start: SlotStart,
): EngineCommand => ({
    run: (state, dispatch) => {
        const { figure } = state.schema.nodes;
        if (figure === undefined) {
            return false;
        }
        let tr: Transaction | undefined;
        if (origin === 'command') {
            tr = placeBlock(state, Fragment.from(nodes));
        } else {
            const { from, to } = state.selection;
            tr = state.tr.replaceRange(from, to, new Slice(Fragment.from(nodes), 0, 0));
            const end = tr.mapping.map(to, 1);
            tr.setSelection(Selection.near(tr.doc.resolve(Math.min(end, tr.doc.content.size)), -1));
            tr.setMeta('uiEvent', origin).scrollIntoView();
        }
        if (tr === undefined) {
            return false;
        }
        if (origin === 'command') {
            tr.setMeta(COMMAND_META, INSERT_IMAGE);
        }
        dispatch?.(tr.setMeta(SLOT_START_META, start));
        return true;
    },
    active: () => false,
});

/** The step that starts a replacement: the file's label and size on the image `nodeId`, which keeps the rest. */
export const replacement = (nodeId: string, checked: Checked, previous: JsonObject): EngineCommand => ({
    run: (state, dispatch) => {
        const pos = positionOf(state.doc, nodeId);
        if (pos === undefined) {
            return false;
        }
        const node = state.doc.nodeAt(pos);
        if (node?.type.name !== 'asset_image') {
            return false;
        }
        const tr = state.tr;
        for (const [name, attribute] of Object.entries(slotAttrs(checked))) {
            tr.setNodeAttribute(pos, name, attribute);
        }
        // The completion sets `mediaType` with no undo step, so this step keeps the value an undo restores.
        tr.setNodeAttribute(pos, 'mediaType', node.attrs.mediaType);
        const start: SlotStart = { kind: 'replace', nodeId, previous };
        dispatch?.(tr.setMeta(COMMAND_META, REPLACE_IMAGE).setMeta(SLOT_START_META, start));
        return true;
    },
    active: () => false,
});

/** The step that sets the completed `asset` on the slot, unless the slot left the document or another start filled it. */
export const completion = (nodeId: string, asset: PickedAsset): EngineCommand => ({
    run: (state, dispatch) => {
        const pos = positionOf(state.doc, nodeId);
        const node = pos === undefined ? null : state.doc.nodeAt(pos);
        if (pos === undefined || node === null || node.attrs.assetId !== null) {
            return false;
        }
        const tr = state.tr.setMeta(FILL_META, true);
        for (const [name, attribute] of Object.entries(asset)) {
            tr.setNodeAttribute(pos, name, attribute);
        }
        dispatch?.(tr);
        return true;
    },
    active: () => false,
});
