/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment } from 'prosemirror-model';
import { NodeSelection, TextSelection, type Transaction } from 'prosemirror-state';

import { type TreeNode, encodeTree } from '#/model/internal';

import { EDITS, placeBlock, placesBlock } from '../capabilities';
import { positionOf } from '../transform/positions';
import { type CaptureTargetOptions } from '../types';

import { checkedAttrs } from './checked';
import { type DocumentApi } from './documentApi';
import { type ApiSource, rangeOf, sharedEdits } from './shared';
import { firstWrite, writesOf } from './writes';

const NO_OPTIONS: CaptureTargetOptions = {
    purpose: 'format',
    onIntersectingEdit: 'map',
};

/** The members of the document API that read, write and select ranges, and insert nodes. */
export const contentApi = (
    source: ApiSource,
): Pick<DocumentApi, 'selectedText' | 'selectedRange' | 'insert' | 'content' | 'select' | 'targets'> => {
    const { schema, model, limits } = source;
    const { maxAttributeLength } = limits;
    const { edit, capability } = sharedEdits(source);
    const { rejectedWrite, spanOf, commit, write, blockOf } = writesOf(source);

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
            node: (node, attrs, options) => {
                const type = schema.nodes[node];
                const topLevel = options?.place === 'after-top-level-block';
                if (type === undefined || (!type.isBlock && (topLevel || options?.content !== undefined))) {
                    return { status: 'rejected', code: 'invalid' };
                }

                const state = source.state();
                if (!type.isBlock) {
                    const checked = checkedAttrs(model, [node], attrs ?? {}, maxAttributeLength, true);
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

                    return commit(state, transaction, firstWrite(transaction), Fragment.from(inline));
                }

                const content = options?.content;
                const block = blockOf(type, attrs ?? {}, content);
                if (typeof block === 'string') {
                    return rejectedWrite(block);
                }

                const transaction = placeBlock(state, block, topLevel);
                if (transaction === undefined) {
                    return { status: 'rejected', code: 'not-applicable' };
                }

                return commit(state, transaction, firstWrite(transaction), Fragment.from(block));
            },
            allowed: (node, options) => {
                const type = schema.nodes[node];
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
            },
            text: (text) => edit(capability(EDITS.insertText, {}), { text }),
        },
        content: {
            read: (range) => {
                const span = spanOf(range, false);
                if (span === undefined) {
                    return undefined;
                }

                const nodes = source.state().doc.slice(span.from, span.to).content.toJSON() as TreeNode[] | null;
                const encoded = encodeTree({ type: 'doc', content: nodes ?? [] }, model).document.content.content;

                return encoded ?? [];
            },
            replace: (range, nodes) => write(spanOf(range, false), nodes),
            delete: (range) => write(spanOf(range, false), []),
            insert: (at, nodes) => write(spanOf(at, true), nodes),
        },
        select: (target, options) => {
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

                transaction = state.tr.setSelection(
                    TextSelection.between(doc.resolve(range.from), doc.resolve(range.to)),
                );
            }

            return source.select(transaction, options?.scroll === true);
        },
        targets: {
            capture: (range, options) => source.capture(range, options ?? NO_OPTIONS),
            release: (target) => source.release(target),
        },
    };
};
