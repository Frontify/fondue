/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type NodeType } from 'prosemirror-model';
import { type EditorState, NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';

import { type ContentNodeJSON, type JsonObject } from '#/model';
import { type TreeNode, encodeTree } from '#/model/internal';

import { EDITS, placeBlock, placesBlock } from '../capabilities';
import { positionOf } from '../transform/positions';
import { type CaptureTargetOptions } from '../types';

import { checkedAttrs } from './checked';
import {
    type DocumentApi,
    type EditorRange,
    type InsertPlace,
    type WriteOutcome,
    type WriteTarget,
} from './documentApi';
import { type ApiSource, rangeOf, sharedEdits } from './shared';
import { firstWrite, writesOf } from './writes';

const NO_OPTIONS: CaptureTargetOptions = {
    purpose: 'format',
    onIntersectingEdit: 'map',
};

type Writes = ReturnType<typeof writesOf>;

/** The document and the write helpers a content member uses. */
type ContentContext = {
    source: ApiSource;
    writes: Writes;
};

const insertInline = (
    source: ApiSource,
    writes: Writes,
    state: EditorState,
    type: NodeType,
    node: string,
    attrs?: JsonObject,
): WriteOutcome => {
    const checked = checkedAttrs(source.model, [node], attrs ?? {}, source.limits.maxAttributeLength, true);
    const { $from } = state.selection;
    if (checked === undefined) {
        return { status: 'rejected', code: 'invalid' };
    }

    if (!$from.parent.canReplaceWith($from.index(), $from.index(), type)) {
        return { status: 'rejected', code: 'not-applicable' };
    }

    const inline = type.create(checked);
    // A node whose `marks` declaration is empty, such as a mention, takes no mark from the text around it.
    const transaction = state.tr.replaceSelectionWith(inline, type.spec.marks !== '').scrollIntoView();

    return writes.commit(state, transaction, firstWrite(transaction), Fragment.from(inline));
};

const insertNode = (
    context: ContentContext,
    node: string,
    attrs?: JsonObject,
    options?: { place?: InsertPlace; content?: readonly ContentNodeJSON[] },
): WriteOutcome => {
    const { source, writes } = context;
    const type = source.schema.nodes[node];
    const topLevel = options?.place === 'after-top-level-block';
    if (type === undefined || (!type.isBlock && (topLevel || options?.content !== undefined))) {
        return { status: 'rejected', code: 'invalid' };
    }

    const state = source.state();
    if (!type.isBlock) {
        return insertInline(source, writes, state, type, node, attrs);
    }

    const content = options?.content;
    const block = writes.blockOf(type, attrs ?? {}, content);
    if (typeof block === 'string') {
        return writes.rejectedWrite(block);
    }

    const transaction = placeBlock(state, block, topLevel);
    if (transaction === undefined) {
        return { status: 'rejected', code: 'not-applicable' };
    }

    return writes.commit(state, transaction, firstWrite(transaction), Fragment.from(block));
};

const insertAllowed = (source: ApiSource, node: string, options?: { place?: InsertPlace }) => {
    const type = source.schema.nodes[node];
    if (type === undefined) {
        return false;
    }

    const state = source.state();
    const topLevel = options?.place === 'after-top-level-block';
    if (type.isBlock) {
        return placesBlock(state, type, topLevel);
    }

    const { $from } = state.selection;

    return !topLevel && $from.parent.canReplaceWith($from.index(), $from.index(), type);
};

const readContent = (context: ContentContext, range: WriteTarget) => {
    const { source, writes } = context;
    const span = writes.spanOf(range, false);
    if (span === undefined) {
        return undefined;
    }

    const nodes = source.state().doc.slice(span.from, span.to).content.toJSON() as TreeNode[] | null;
    const encoded = encodeTree({ type: 'doc', content: nodes ?? [] }, source.model).document.content.content;

    return encoded ?? [];
};

const selectTarget = (
    source: ApiSource,
    target: EditorRange | { nodeId: string; at?: 'start' | 'node' },
    options?: { scroll?: boolean },
) => {
    const state = source.state();
    const { doc } = state;
    let transaction: Transaction | undefined;
    if ('nodeId' in target) {
        const pos = positionOf(doc, target.nodeId);
        if (pos === undefined || doc.nodeAt(pos) === null) {
            return false;
        }

        if (target.at === 'node') {
            transaction = state.tr.setSelection(NodeSelection.create(doc, pos));
        } else {
            transaction = state.tr.setSelection(TextSelection.near(doc.resolve(pos + 1)));
        }
    } else {
        const range = source.resolve(target);
        if (range === undefined) {
            return false;
        }

        transaction = state.tr.setSelection(TextSelection.between(doc.resolve(range.from), doc.resolve(range.to)));
    }

    return source.select(transaction, options?.scroll === true);
};

/** The members of the document API that read, write and select ranges, and insert nodes. */
export const contentApi = (
    source: ApiSource,
): Pick<DocumentApi, 'selectedText' | 'selectedRange' | 'insert' | 'content' | 'select' | 'targets'> => {
    const writes = writesOf(source);
    const context: ContentContext = { source, writes };
    const { edit, capability } = sharedEdits(source);

    return {
        selectedText: () => {
            const { selection, doc } = source.state();
            if (selection.empty || !selection.$from.sameParent(selection.$to)) {
                return '';
            }

            return doc.textBetween(selection.from, selection.to);
        },
        selectedRange: () => {
            const { selection, doc } = source.state();

            return rangeOf(doc, selection.from, selection.to);
        },
        insert: {
            node: (node, attrs, options) => insertNode(context, node, attrs, options),
            allowed: (node, options) => insertAllowed(source, node, options),
            text: (text) => edit(capability(EDITS.insertText, {}), { text }),
        },
        content: {
            read: (range) => readContent(context, range),
            replace: (range, nodes) => writes.write(writes.spanOf(range, false), nodes),
            delete: (range) => writes.write(writes.spanOf(range, false), []),
            insert: (at, nodes) => writes.write(writes.spanOf(at, true), nodes),
        },
        select: (target, options) => selectTarget(source, target, options),
        targets: {
            capture: (range, options) => source.capture(range, options ?? NO_OPTIONS),
            release: (target) => source.release(target),
        },
    };
};
