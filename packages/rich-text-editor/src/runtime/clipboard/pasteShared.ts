/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Fragment, type Node, type Schema, Slice } from 'prosemirror-model';
import { type EditorState, Selection, type Transaction } from 'prosemirror-state';
import { type Transform } from 'prosemirror-transform';

import { checkHref, type ContentModel, type HrefPolicy, type ResourceLimits, isRecord } from '#/model';
import { ISLAND_BLOCK, ISLAND_INLINE, ISLAND_MARK } from '#/model/internal';
import { withNodeIds } from '#/runtime/definition';
import { type PastePolicy, withoutRefused } from '#/runtime/import/policy';

import { SLICE_TYPE } from './slice';

/** What a paste or a drop from outside hands the pipeline after the clipboard read. */
export type Payload = {
    text: string;
    html: string;
    slice: string;
};

/** The three flavors of a clipboard or drag transfer. */
export const payloadOf = (data: DataTransfer): Payload => ({
    text: data.getData('text/plain'),
    html: data.getData('text/html'),
    slice: data.getData(SLICE_TYPE),
});

/** What the pipeline reads of the session. */
export type PasteSettings = {
    model: ContentModel;
    limits: ResourceLimits;
    /** Which features' content may be pasted. */
    policy: PastePolicy;
    /** The destination's slice context. */
    context: string;
    /** Shift was held. */
    plain: boolean;
    /** The policy's creatable heading levels, which pasted HTML headings move to. */
    headingLevels: readonly number[];
    /** The view's window, whose `DOMParser` makes the inert document of pasted HTML. */
    window: Window;
    /** The Inline profile's field, which keeps one paragraph. */
    singleLine: boolean;
};

/** A change that follows the paste as its own undo step: a Markdown conversion or a caret link. */
export type FollowUp = (state: EditorState) => Transaction | null;

/** What a paste did beyond its own insert: a follow-up step, and what the author is told was dropped or removed. */
export type Pasted = {
    followUp?: FollowUp;
    /** Media that a slice from another context dropped. */
    droppedMedia: number;
    /** Pasted formatting the model does not keep, such as colours without `literalColors`, was removed. */
    removedFormatting?: boolean;
};

/** Inserts `slice` between `from` and `to` as ProseMirror's paste does, and returns where it landed. */
export const insertSlice = (transaction: Transform, from: number, to: number, slice: Slice) => {
    const start = transaction.steps.length;
    const { firstChild } = slice.content;
    if (slice.openStart === 0 && slice.openEnd === 0 && slice.content.childCount === 1 && firstChild !== null) {
        transaction.replaceRangeWith(from, to, firstChild);
    } else {
        transaction.replaceRange(from, to, slice);
    }

    const mapping = transaction.mapping.slice(start);

    return { from: mapping.map(from, -1), to: mapping.map(to, 1) };
};

/** `slice` without the content the paste policy refuses and with every `nodeId` cleared, ready to insert. */
export const prepareSlice = (slice: Slice, schema: Schema, model: ContentModel, policy: PastePolicy): Slice => {
    const kept = withoutRefused(slice, schema, model, policy);

    return new Slice(withoutIds(kept.content), kept.openStart, kept.openEnd);
};

/** Inserts `slice` with `insertSlice` and puts the selection after it. */
export const insertAndSelect = (transaction: Transaction, from: number, to: number, slice: Slice) => {
    const steps = transaction.steps.length;
    const range = insertSlice(transaction, from, to, slice);
    if (transaction.steps.length > steps) {
        transaction.setSelection(Selection.near(transaction.doc.resolve(range.to), -1));
    }

    return range;
};

/** The content with every `nodeId` cleared: the runtime gives each pasted node a new one, and copied HTML holds none. */
export const withoutIds = (fragment: Fragment): Fragment => withNodeIds(fragment, () => null);

/** The `nodeId`s and resource references inside the island originals of `fragment`, which a paste cannot renew. */
const islandIdentities = (fragment: Fragment) => {
    const ids: string[] = [];
    let references = false;
    const read = (value: unknown) => {
        if (Array.isArray(value)) {
            for (const item of value) {
                read(item);
            }

            return;
        }

        if (!isRecord(value)) {
            return;
        }

        if (isRecord(value.attrs)) {
            if (typeof value.attrs.nodeId === 'string') {
                ids.push(value.attrs.nodeId);
            }

            references ||= Object.hasOwn(value.attrs, 'resourceId') || Object.hasOwn(value.attrs, 'assetId');
        }

        read(value.content);
        read(value.marks);
    };

    fragment.descendants((node) => {
        if (node.type.name === ISLAND_BLOCK || node.type.name === ISLAND_INLINE) {
            read(node.attrs.original);
        }

        for (const mark of node.marks) {
            if (mark.type.name === ISLAND_MARK) {
                read(mark.attrs.original);
            }
        }
    });

    return { ids, references };
};

/** Whether an island of `slice` holds a `nodeId` the paste would repeat, or a reference from another context, so the island cannot stay. */
export const islandsCannotStay = (slice: Slice, doc: Node, foreign: boolean) => {
    const { ids, references } = islandIdentities(slice.content);
    if (references && foreign) {
        return true;
    }

    const taken = new Set(islandIdentities(doc.content).ids);
    doc.descendants((node) => {
        if (typeof node.attrs.nodeId === 'string') {
            taken.add(node.attrs.nodeId);
        }
    });

    return ids.some((id, index) => taken.has(id) || ids.indexOf(id) !== index);
};

const ABSOLUTE_URL = /^[a-z][\d+.a-z-]*:\S+$/i;

/** The URL that `text` is, when it is one absolute URL that passes `checkHref`. */
export const hrefOf = (text: string, policy: HrefPolicy | undefined): string | undefined => {
    const trimmed = text.trim();
    if (!ABSOLUTE_URL.test(trimmed)) {
        return undefined;
    }

    const checked = checkHref(trimmed, policy);
    if (!checked.ok) {
        return undefined;
    }

    return checked.href;
};
