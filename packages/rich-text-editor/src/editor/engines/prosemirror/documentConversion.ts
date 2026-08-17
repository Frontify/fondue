/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode, type NodeType as PmNodeType, type Schema } from 'prosemirror-model';

import {
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    type StoredMarkValue,
    unknownBlockType,
    unknownInlineType,
} from '#/core';

/**
 * The document boundary: RTE format ↔ engine format. The only place either
 * shape is read structurally — everything else works on one side or the other.
 *
 * Both directions run while the editor is live: inbound when a new `value` prop
 * arrives, outbound on every keystroke that changes the document (see
 * `dispatchTransaction` in editor.ts).
 */

// Reading engine nodes — shared by both directions, and by the control API

/** ProseMirror nodes are not iterable — children have to be indexed. */
export const mapChildren = <TResult>(node: PmNode, map: (child: PmNode) => TResult): TResult[] => {
    const results: TResult[] = [];
    for (let index = 0; index < node.childCount; index++) {
        results.push(map(node.child(index)));
    }
    return results;
};

/** Attributes with a value; unset ones are absent from the document, not null. */
export const definedAttrs = (attrs: Record<string, unknown>): Record<string, unknown> =>
    Object.fromEntries(Object.entries(attrs).filter(([, value]) => value !== null && value !== undefined));

/** Type and attributes only — what the toolbar needs, without dragging the subtree along. */
export const shallowBlock = (node: PmNode): RteBlockNode =>
    ({ type: node.type.name, ...definedAttrs(node.attrs) }) as unknown as RteBlockNode;

/** The attributes a node type declared, picked off a document node (they live flat on it). */
const declaredAttrs = (
    node: Record<string, unknown>,
    declared: Record<string, unknown> = {},
): Record<string, unknown> =>
    Object.fromEntries(
        Object.keys(declared)
            .filter((name) => node[name] !== undefined)
            .map((name) => [name, node[name]]),
    );

// RTE format → engine

const inlinesToEngine = (children: RteInlineNode[], schema: Schema): PmNode[] => {
    const nodes: PmNode[] = [];
    for (const child of children) {
        // Text nodes carry `text`, inline elements carry `type`, and each says
        // the other is absent — so reading one discriminates the union.
        if (child.text !== undefined) {
            if (child.text === '') {
                continue;
            }
            const marks = Object.entries(schema.marks)
                .filter(([key]) => child[key] !== undefined)
                .map(([key, markType]) => {
                    // A mark is stored as `true` when it carries nothing and as
                    // its attributes when it does — see `StoredMarkValue`.
                    const value = child[key] as StoredMarkValue;
                    return markType.create(value === true ? undefined : value);
                });
            nodes.push(schema.text(child.text, marks));
            continue;
        }
        const { type } = child;
        const nodeType = schema.nodes[type];
        if (!nodeType) {
            throw unknownInlineType(type);
        }
        nodes.push(nodeType.create(declaredAttrs(child, nodeType.spec.attrs)));
    }
    return nodes;
};

/**
 * A block's children are inlines or blocks depending on what the block type
 * declared — the schema decides, so the document format needs no marker.
 */
const childrenToEngine = (nodeType: PmNodeType, children: RteInlineNode[] | RteBlockNode[], schema: Schema): PmNode[] =>
    nodeType.isTextblock
        ? inlinesToEngine(children as RteInlineNode[], schema)
        : (children as RteBlockNode[]).map((child) => blockToEngine(child, schema));

const blockToEngine = (block: RteBlockNode, schema: Schema): PmNode => {
    const nodeType = schema.nodes[block.type];
    if (!nodeType) {
        throw unknownBlockType(block.type);
    }
    const attrs = declaredAttrs(block as Record<string, unknown>, nodeType.spec.attrs);
    return nodeType.create(attrs, block.children ? childrenToEngine(nodeType, block.children, schema) : []);
};

export const toEngineDocument = (doc: RteDocumentOf, schema: Schema): PmNode => {
    const docType = schema.nodes.doc;
    if (!docType) {
        throw new Error('Schema is missing the "doc" node type.');
    }
    return docType.create(
        null,
        doc.blocks.map((block) => blockToEngine(block, schema)),
    );
};

// Engine → RTE format
//
// This direction runs on every keystroke, over a document with no bound on its
// size. What makes that affordable: the engine's nodes are immutable, and an
// edit rebuilds only the nodes on the path it touched. So conversions
// remembered against the node they came from happen once per node that ever
// existed, and the walk below costs what changed rather than what the document
// holds.
//
// Two consequences at the boundary:
//
// - The documents handed to `onChange` SHARE their unchanged parts, so a host
//   memoizing on a block holds still while another block is edited.
// - What comes out must therefore not be mutated.

/** Keyed on the engine node, so entries go away exactly when it does. */
const convertedInlines = new WeakMap<PmNode, RteInlineNode>();
const convertedBlocks = new WeakMap<PmNode, RteBlockNode>();

const inlineFromEngine = (child: PmNode): RteInlineNode => {
    const remembered = convertedInlines.get(child);
    if (remembered !== undefined) {
        return remembered;
    }

    let converted: RteInlineNode;
    if (child.isText) {
        const text: Record<string, unknown> = { text: child.text ?? '' };
        for (const mark of child.marks) {
            const carriesValue = Object.keys(mark.type.spec.attrs ?? {}).length > 0;
            text[mark.type.name] = carriesValue ? definedAttrs(mark.attrs) : true;
        }
        converted = text as RteInlineNode;
    } else {
        converted = { type: child.type.name, ...definedAttrs(child.attrs) };
    }

    convertedInlines.set(child, converted);
    return converted;
};

const blockFromEngine = (node: PmNode): RteBlockNode => {
    const remembered = convertedBlocks.get(node);
    if (remembered !== undefined) {
        return remembered;
    }

    const block: Record<string, unknown> = { type: node.type.name, ...definedAttrs(node.attrs) };
    if (node.isTextblock) {
        block.children = mapChildren(node, inlineFromEngine);
    } else if (!node.isAtom) {
        block.children = mapChildren(node, blockFromEngine);
    }

    const converted = block as unknown as RteBlockNode;
    convertedBlocks.set(node, converted);
    return converted;
};

/**
 * The document itself is built fresh every time, unlike the blocks in it: a new
 * object is what tells a host its `value` changed.
 */
export const toRteDocument = (doc: PmNode): RteDocumentOf => ({
    version: 1,
    blocks: mapChildren(doc, blockFromEngine),
});
