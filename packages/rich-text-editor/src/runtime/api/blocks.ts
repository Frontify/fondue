/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { clearBlocks, EDITS } from '../capabilities';
import { type AncestorValue, type BlockValue, type DocumentApi, type SelectionValue } from '../documentApi';
import { inCodeTextblock, nearest as nearestNode } from '../positions';
import { summarize } from '../runtime';

import { type ApiSource, idOf, rangeOf, sharedEdits, valuesOf } from './shared';

/** The block members of the document API: blocks, node attributes, and the selection's surrounding blocks. */
export const blocksApi = (source: ApiSource): Pick<DocumentApi, 'selection' | 'blocks' | 'attributes' | 'nearest'> => {
    const { schema } = source;
    const { edit, capability, editWith } = sharedEdits(source);
    const blocksOf = (doc: Node, node: string): BlockValue[] => {
        const found: BlockValue[] = [];
        doc.descendants((child, pos) => {
            if (child.type.name !== node) {
                return true;
            }
            const nodeId = typeof child.attrs.nodeId === 'string' ? child.attrs.nodeId : null;
            found.push({
                nodeId,
                attrs: valuesOf(child.attrs),
                text: child.textContent,
                range: rangeOf(doc, pos, pos + child.nodeSize),
            });
            return true;
        });
        return found;
    };
    const selectionOf = (state: EditorState): SelectionValue => {
        const { selection } = state;
        const { $from, $to } = selection;
        const ancestors: AncestorValue[] = [];
        for (let depth = 1; depth <= $from.depth; depth += 1) {
            const node = $from.node(depth);
            ancestors.push({
                type: node.type.name,
                attrs: valuesOf(node.attrs),
                nodeId: idOf(node),
                index: $from.index(depth - 1),
                childCount: node.childCount,
                last: $from.index(depth - 1) === $from.node(depth - 1).childCount - 1,
                empty: node.content.size === 0,
            });
        }
        const before = $from.nodeBefore;
        let nodeBefore: SelectionValue['nodeBefore'] = null;
        if (before !== null) {
            nodeBefore = {
                type: before.type.name,
                attrs: valuesOf(before.attrs),
                nodeId: idOf(before),
            };
        }
        return {
            ...summarize(selection),
            ancestors,
            atStart: $from.parent.isTextblock && $from.parentOffset === 0,
            atEnd: $to.parent.isTextblock && $to.parentOffset === $to.parent.content.size,
            nodeBefore,
            verbatim: inCodeTextblock($from),
        };
    };
    return {
        selection: () => selectionOf(source.state()),
        blocks: {
            active: (node, attrs) => {
                const type = schema.nodes[node];
                if (type === undefined) {
                    return false;
                }
                if (!type.isTextblock) {
                    return capability(EDITS.wrapIn, { node }).active(source.state(), attrs);
                }
                return capability(EDITS.setBlock, { node }).active(source.state(), attrs);
            },
            list: (node) => blocksOf(source.state().doc, node),
            set: (node, attrs, options) =>
                schema.nodes[node] !== undefined &&
                editWith(EDITS.setBlock, { node, toggle: options?.toggle === true }, [node], attrs, true),
            wrap: (node, attrs) =>
                schema.nodes[node] !== undefined && editWith(EDITS.wrapIn, { node }, [node], attrs, true),
            move: (direction) => {
                let action = 'move-down';
                if (direction === 'up') {
                    action = 'move-up';
                }
                return edit(capability(EDITS.block, { action }));
            },
            indentLines: (direction) => edit(capability(EDITS.indentLines, { direction })),
            lift: (node) => {
                if (schema.nodes[node] === undefined) {
                    return false;
                }
                const wrap = capability(EDITS.wrapIn, { node });
                return wrap.active(source.state()) !== false && edit(wrap);
            },
            clear: (attributes) => {
                if (attributes.includes('nodeId')) {
                    return false;
                }
                return edit(clearBlocks(attributes));
            },
        },
        attributes: {
            set: (nodes, attrs, options) => {
                const node = typeof nodes === 'string' ? nodes : [...nodes];
                let types = typeof nodes === 'string' ? [nodes] : [...nodes];
                if (nodes === 'textblocks') {
                    types = Object.values(schema.nodes)
                        .filter((type) => type.isTextblock)
                        .map(({ name }) => name);
                }
                const nodeId = options?.nodeId === undefined ? {} : { nodeId: options.nodeId };
                const args = { node, toggle: options?.toggle === true };
                return editWith(EDITS.setAttributes, args, types, attrs, false, nodeId);
            },
            active: (nodes, attrs, options) => {
                let node: string | string[] = nodes as string;
                if (typeof nodes !== 'string') {
                    node = [...nodes];
                }
                const payload: Record<string, unknown> = { ...attrs };
                if (options?.nodeId !== undefined) {
                    payload.nodeId = options.nodeId;
                }
                return capability(EDITS.setAttributes, { node }).active(source.state(), payload);
            },
        },
        nearest: (node, within) => {
            const type = schema.nodes[node];
            const state = source.state();
            const found = type === undefined ? undefined : nearestNode(state, type, within);
            if (found === undefined) {
                return undefined;
            }
            const { nodeId } = found.node.attrs;
            return {
                nodeId: typeof nodeId === 'string' ? nodeId : null,
                attrs: valuesOf(found.node.attrs),
                range: rangeOf(state.doc, found.pos, found.pos + found.node.nodeSize),
            };
        },
    };
};
