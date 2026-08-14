/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node as PmNode, type NodeType as PmNodeType, type Schema } from 'prosemirror-model';

import { type RteBlockNode, type RteDocumentOf, type RteInlineNode, type StoredMarkValue } from '#/domain';

/**
 * The document boundary: RTE format ↔ engine format. The only place either shape
 * is read structurally — everything else works on one side or the other.
 *
 * Both directions run while the editor is live: inbound when a new `value` prop
 * arrives, outbound on every keystroke that changes the document (see
 * `dispatchTransaction` in editor.ts).
 */

// ---------------------------------------------------------------------------
// Reading engine nodes — shared by both directions, and by the control API
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// RTE format → engine
// ---------------------------------------------------------------------------

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
const childrenToEngine = (nodeType: PmNodeType, children: RteInlineNode[] | RteBlockNode[], schema: Schema): PmNode[] =>
    nodeType.isTextblock
        ? inlinesToEngine(children as RteInlineNode[], schema)
        : (children as RteBlockNode[]).map((child) => blockToEngine(child, schema));

const blockToEngine = (block: RteBlockNode, schema: Schema): PmNode => {
    const nodeType = schema.nodes[block.type];
    if (!nodeType) {
        throw new Error(`Unknown block type "${block.type}". Did you forget to register a plugin?`);
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

// ---------------------------------------------------------------------------
// Engine → RTE format
// ---------------------------------------------------------------------------

const inlineFromEngine = (child: PmNode): RteInlineNode => {
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

const blockFromEngine = (node: PmNode): RteBlockNode => {
    const block: Record<string, unknown> = { type: node.type.name, ...definedAttrs(node.attrs) };
    if (node.isTextblock) {
        block.children = mapChildren(node, inlineFromEngine);
    } else if (!node.isAtom) {
        block.children = mapChildren(node, blockFromEngine);
    }
    return block as unknown as RteBlockNode;
};

export const toRteDocument = (doc: PmNode): RteDocumentOf => ({
    version: 1,
    blocks: mapChildren(doc, blockFromEngine),
});
