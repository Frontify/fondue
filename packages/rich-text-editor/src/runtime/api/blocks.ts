/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';
import { type EditorState } from 'prosemirror-state';

import { type JsonObject } from '#/model';

import { clearBlocks, EDITS } from '../capabilities';
import { summarize } from '../runtime';
import { inCodeTextblock, nearest as nearestNode } from '../transform/positions';

import { type AncestorValue, type BlockValue, type DocumentApi, type SelectionValue } from './documentApi';
import { type ApiSource, idOf, rangeOf, sharedEdits, valuesOf } from './shared';

type Edits = ReturnType<typeof sharedEdits>;

/** The document and the edit helpers a block read uses. */
type BlockContext = {
    source: ApiSource;
    edits: Edits;
};

const blocksOf = (doc: Node, node: string): BlockValue[] => {
    const found: BlockValue[] = [];
    doc.descendants((child, pos) => {
        if (child.type.name !== node) {
            return true;
        }

        found.push({
            nodeId: idOf(child),
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

const activeBlock = (context: BlockContext, node: string, attrs?: JsonObject) => {
    const type = context.source.schema.nodes[node];
    if (type === undefined) {
        return false;
    }

    if (!type.isTextblock) {
        return context.edits.capability(EDITS.wrapIn, { node }).active(context.source.state(), attrs);
    }

    return context.edits.capability(EDITS.setBlock, { node }).active(context.source.state(), attrs);
};

const setBlockType = (context: BlockContext, node: string, attrs?: JsonObject, options?: { toggle?: boolean }) =>
    context.source.schema.nodes[node] !== undefined &&
    context.edits.editWith(EDITS.setBlock, { node, toggle: options?.toggle === true }, [node], attrs, true);

const wrapBlock = (context: BlockContext, node: string, attrs?: JsonObject) =>
    context.source.schema.nodes[node] !== undefined &&
    context.edits.editWith(EDITS.wrapIn, { node }, [node], attrs, true);

const moveBlock = (context: BlockContext, direction: 'up' | 'down') => {
    let action = 'move-down';
    if (direction === 'up') {
        action = 'move-up';
    }

    return context.edits.edit(context.edits.capability(EDITS.block, { action }));
};

const indentBlockLines = (context: BlockContext, direction: 'indent' | 'outdent') =>
    context.edits.edit(context.edits.capability(EDITS.indentLines, { direction }));

const liftBlock = (context: BlockContext, node: string) => {
    if (context.source.schema.nodes[node] === undefined) {
        return false;
    }

    const wrap = context.edits.capability(EDITS.wrapIn, { node });

    return wrap.active(context.source.state()) !== false && context.edits.edit(wrap);
};

const clearBlockAttributes = (context: BlockContext, attributes: readonly string[]) => {
    if (attributes.includes('nodeId')) {
        return false;
    }

    return context.edits.edit(clearBlocks(attributes));
};

const setNodeAttributes = (
    context: BlockContext,
    nodes: string | readonly string[],
    attrs: JsonObject,
    options?: { nodeId?: string; toggle?: boolean },
) => {
    const node = typeof nodes === 'string' ? nodes : [...nodes];
    let types: string[];
    if (nodes === 'textblocks') {
        types = [];
        for (const type of Object.values(context.source.schema.nodes)) {
            if (type.isTextblock) {
                types.push(type.name);
            }
        }
    } else if (typeof nodes === 'string') {
        types = [nodes];
    } else {
        types = [...nodes];
    }

    const nodeId = options?.nodeId === undefined ? {} : { nodeId: options.nodeId };
    const args = { node, toggle: options?.toggle === true };

    return context.edits.editWith(EDITS.setAttributes, args, types, attrs, false, nodeId);
};

const activeNodeAttributes = (
    context: BlockContext,
    nodes: string | readonly string[],
    attrs: JsonObject,
    options?: { nodeId?: string },
) => {
    const node = typeof nodes === 'string' ? nodes : [...nodes];

    const payload: Record<string, unknown> = { ...attrs };
    if (options?.nodeId !== undefined) {
        payload.nodeId = options.nodeId;
    }

    return context.edits.capability(EDITS.setAttributes, { node }).active(context.source.state(), payload);
};

const nearestBlock = (context: BlockContext, node: string, within?: string) => {
    const type = context.source.schema.nodes[node];
    if (type === undefined) {
        return undefined;
    }

    const state = context.source.state();
    const found = nearestNode(state, type, within);
    if (found === undefined) {
        return undefined;
    }

    return {
        nodeId: idOf(found.node),
        attrs: valuesOf(found.node.attrs),
        range: rangeOf(state.doc, found.pos, found.pos + found.node.nodeSize),
    };
};

/** The block members of the document API: blocks, node attributes, and the selection's surrounding blocks. */
export const blocksApi = (source: ApiSource): Pick<DocumentApi, 'selection' | 'blocks' | 'attributes' | 'nearest'> => {
    const context: BlockContext = { source, edits: sharedEdits(source) };

    return {
        selection: () => selectionOf(source.state()),
        blocks: {
            active: (node, attrs) => activeBlock(context, node, attrs),
            list: (node) => blocksOf(source.state().doc, node),
            set: (node, attrs, options) => setBlockType(context, node, attrs, options),
            wrap: (node, attrs) => wrapBlock(context, node, attrs),
            move: (direction) => moveBlock(context, direction),
            indentLines: (direction) => indentBlockLines(context, direction),
            lift: (node) => liftBlock(context, node),
            clear: (attributes) => clearBlockAttributes(context, attributes),
        },
        attributes: {
            set: (nodes, attrs, options) => setNodeAttributes(context, nodes, attrs, options),
            active: (nodes, attrs, options) => activeNodeAttributes(context, nodes, attrs, options),
        },
        nearest: (node, within) => nearestBlock(context, node, within),
    };
};
