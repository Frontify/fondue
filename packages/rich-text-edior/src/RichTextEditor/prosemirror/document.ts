/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode, type NodeType as PmNodeType, type Schema } from 'prosemirror-model';

import { type RteBlockNode, type RteDocumentOf, type RteInlineNode } from '../types';

/**
 * The document boundary: RTE format ↔ engine format. The only place either
 * shape is read structurally — everything else works on one side or the other.
 */

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

// ---------------------------------------------------------------------------
// RTE format → engine
// ---------------------------------------------------------------------------

const inlinesToPm = (children: RteInlineNode[], schema: Schema): PmNode[] => {
    const nodes: PmNode[] = [];
    for (const child of children) {
        // Text nodes carry `text`, inline elements carry `type`. Both shapes
        // are open, so the check has to be on the value, not on the key.
        if (typeof child.text === 'string') {
            if (child.text === '') {
                continue;
            }
            const marks = Object.entries(schema.marks)
                .filter(([key]) => Boolean(child[key]))
                .map(([key, markType]) => {
                    const value = child[key];
                    return markType.create(typeof value === 'object' && value !== null ? value : undefined);
                });
            nodes.push(schema.text(child.text, marks));
            continue;
        }
        const type = String(child.type);
        const nodeType = schema.nodes[type];
        if (!nodeType) {
            throw new Error(`Unknown inline type "${type}". Did you forget to register a plugin?`);
        }
        nodes.push(nodeType.create(declaredAttrs(child, nodeType.spec.attrs)));
    }
    return nodes;
};

/**
 * A block's children are inlines or blocks depending on what the block type
 * declared — the schema decides, so the document format needs no marker.
 */
const childrenToPm = (nodeType: PmNodeType, children: RteInlineNode[] | RteBlockNode[], schema: Schema): PmNode[] =>
    nodeType.isTextblock
        ? inlinesToPm(children as RteInlineNode[], schema)
        : (children as RteBlockNode[]).map((child) => blockToPm(child, schema));

const blockToPm = (block: RteBlockNode, schema: Schema): PmNode => {
    const nodeType = schema.nodes[block.type];
    if (!nodeType) {
        throw new Error(`Unknown block type "${block.type}". Did you forget to register a plugin?`);
    }
    const attrs = declaredAttrs(block as Record<string, unknown>, nodeType.spec.attrs);
    return nodeType.create(attrs, block.children ? childrenToPm(nodeType, block.children, schema) : []);
};

export const documentToPm = (doc: RteDocumentOf, schema: Schema): PmNode => {
    const docType = schema.nodes.doc;
    if (!docType) {
        throw new Error('Schema is missing the "doc" node type.');
    }
    return docType.create(
        null,
        doc.blocks.map((block) => blockToPm(block, schema)),
    );
};

// ---------------------------------------------------------------------------
// Engine → RTE format
// ---------------------------------------------------------------------------

const inlineFromPm = (child: PmNode): RteInlineNode => {
    if (!child.isText) {
        return { type: child.type.name, ...definedAttrs(child.attrs) };
    }
    const text: Record<string, unknown> = { text: child.text ?? '' };
    for (const mark of child.marks) {
        const carriesValue = Object.keys(mark.type.spec.attrs ?? {}).length > 0;
        text[mark.type.name] = carriesValue ? definedAttrs(mark.attrs) : true;
    }
    return text as RteInlineNode;
};

const blockFromPm = (node: PmNode): RteBlockNode => {
    const block: Record<string, unknown> = { type: node.type.name, ...definedAttrs(node.attrs) };
    if (node.isTextblock) {
        block.children = mapChildren(node, inlineFromPm);
    } else if (!node.isAtom) {
        block.children = mapChildren(node, blockFromPm);
    }
    return block as unknown as RteBlockNode;
};

export const pmToDocument = (doc: PmNode): RteDocumentOf => ({
    version: 1,
    blocks: mapChildren(doc, blockFromPm),
});

/** Type and attributes only — what the toolbar needs, without dragging the subtree along. */
export const shallowBlockFromPm = (node: PmNode): RteBlockNode =>
    ({ type: node.type.name, ...definedAttrs(node.attrs) }) as unknown as RteBlockNode;
