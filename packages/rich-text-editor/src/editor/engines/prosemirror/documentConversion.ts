/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    Fragment,
    type Mark as PmMark,
    type Node as PmNode,
    type NodeType as PmNodeType,
    type Schema,
} from 'prosemirror-model';

import {
    DOCUMENT_VERSION,
    type RteBlockNode,
    type RteDocumentOf,
    type RteInlineNode,
    type StoredMarkValue,
    unknownBlockType,
    unknownInlineType,
    unknownMarkType,
} from '#/core';

/**
 * The document boundary: RTE format <-> engine format. The only place either
 * shape is read structurally. Inbound runs when a new `value` arrives, outbound
 * on every keystroke that changes the document (see `dispatchTransaction` in
 * editing.ts).
 */

/**
 * Marks and inline elements keep their whole value in ONE engine attribute, so
 * the engine needs to know nothing about its shape; this boundary flattens it
 * onto the document node. Every other file reads the value through this name.
 */
export const VALUE_ATTR = 'value';

// --- Reading engine nodes: shared by both directions and the control API ---

/** ProseMirror nodes are not iterable — children have to be indexed. */
export const mapChildren = <TResult>(node: PmNode, map: (child: PmNode) => TResult): TResult[] => {
    const results: TResult[] = [];
    for (let index = 0; index < node.childCount; index++) {
        results.push(map(node.child(index)));
    }
    return results;
};

/** Attributes with a value; unset ones are absent from the document, not null. */
const definedAttrs = (attrs: Record<string, unknown>): Record<string, unknown> =>
    Object.fromEntries(Object.entries(attrs).filter(([, value]) => value !== null && value !== undefined));

/** A mark's value as the document and the control API see it: the one engine attribute it lives in. */
export const markValueOf = (mark: PmMark): Record<string, unknown> =>
    (mark.attrs[VALUE_ATTR] as Record<string, unknown> | null) ?? {};

/**
 * The reverse, for a mark or an inline element: engine attributes for a value.
 * An empty or absent value leaves the attribute to its default — `{}` for a
 * mark, a draft (`null`) for an inline that has editing UI to complete it.
 */
export const valueAttrsFor = (value: Record<string, unknown> | undefined): Record<string, unknown> => ({
    [VALUE_ATTR]: value !== undefined && Object.keys(value).length > 0 ? value : undefined,
});

/** Type and attributes only — what the toolbar needs, without dragging the subtree along. */
export const shallowBlock = (node: PmNode): { type: string; [attribute: string]: unknown } => ({
    ...definedAttrs(node.attrs),
    type: node.type.name,
});

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

// --- RTE format -> engine ---

/**
 * A document whose blocks are all known but do not fit together — a list
 * holding a paragraph where its items belong. Thrown rather than repaired, for
 * the same reason an unknown type is: the next `onChange` would otherwise write
 * back a different document than the host handed over.
 */
const invalidDocument = (nodeType: PmNodeType, content: readonly PmNode[]): Error =>
    new Error(
        `Invalid document: a "${nodeType.name}" cannot hold ${
            content.length === 0 ? 'nothing' : content.map((node) => `"${node.type.name}"`).join(', ')
        }.`,
    );

/**
 * `create`, refusing content the type does not allow there. Content that is
 * merely missing (no blocks at all, a list without items) is filled in with
 * empty blocks, as an empty document is.
 */
const createFilled = (nodeType: PmNodeType, attrs: Record<string, unknown> | null, content: PmNode[]): PmNode => {
    const node = nodeType.createAndFill(attrs, content);
    if (node === null) {
        throw invalidDocument(nodeType, content);
    }
    return node;
};

const inlinesToEngine = (children: RteInlineNode[], schema: Schema): PmNode[] => {
    const nodes: PmNode[] = [];
    for (const child of children) {
        // Text nodes carry `text`, inline elements `type`; reading one discriminates the union.
        if (child.text !== undefined) {
            if (child.text === '') {
                continue;
            }
            const { text, type: _type, ...markValues } = child;
            // `false` and `null` say the mark is off, as absent does.
            const marks = Object.entries(markValues)
                .filter(([, value]) => value !== undefined && value !== null && value !== false)
                .map(([key, value]) => {
                    // Thrown rather than dropped, or the next `onChange` would lose it.
                    const markType = schema.marks[key];
                    if (!markType) {
                        throw unknownMarkType(key);
                    }
                    // `true` when it carries nothing, else its value (see `StoredMarkValue`).
                    const stored = value as StoredMarkValue;
                    return markType.create(valueAttrsFor(stored === true ? undefined : stored));
                });
            nodes.push(schema.text(text, marks));
            continue;
        }
        const { type, text: _text, ...value } = child;
        const nodeType = schema.nodes[type];
        if (!nodeType) {
            throw unknownInlineType(type);
        }
        nodes.push(nodeType.create(valueAttrsFor(value)));
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
    // A block this editor handed out: reuse the node it came from (see `engineNodeOf`).
    const known = engineNodeOf.get(block);
    if (known !== undefined && known.type.schema === schema) {
        return known;
    }
    const nodeType = schema.nodes[block.type];
    if (!nodeType) {
        throw unknownBlockType(block.type);
    }
    const attrs = declaredAttrs(block as Record<string, unknown>, nodeType.spec.attrs);
    return createFilled(nodeType, attrs, block.children ? childrenToEngine(nodeType, block.children, schema) : []);
};

export const toEngineDocument = (doc: RteDocumentOf, schema: Schema): PmNode => {
    const docType = schema.nodes.doc;
    if (!docType) {
        throw new Error('Schema is missing the "doc" node type.');
    }
    return createFilled(
        docType,
        null,
        doc.blocks.map((block) => blockToEngine(block, schema)),
    );
};

// --- Engine -> RTE format ---
//
// Runs on every keystroke over an unbounded document. Engine nodes are
// immutable and an edit rebuilds only the path it touched, so conversions are
// remembered per node and the walk costs what changed, not the document size.
//
// Consequences: documents handed to `onChange` SHARE their unchanged parts (a
// host memoizing on a block holds still while another is edited), so what comes
// out must not be mutated.

/** Keyed on the engine node, so entries go away exactly when it does. */
const convertedInlines = new WeakMap<PmNode, RteInlineNode>();
const convertedBlocks = new WeakMap<PmNode, RteBlockNode>();
/**
 * The way back: which engine node a block handed out came from. A host that
 * echoes a document as a new object, its unchanged blocks shared, then costs
 * what changed rather than the whole document on the way in.
 */
const engineNodeOf = new WeakMap<RteBlockNode, PmNode>();

/** An inline still being made: not part of the document yet. */
const isDraft = (node: PmNode): boolean => node.isInline && !node.isText && node.attrs[VALUE_ATTR] === null;

/** The engine document as the host's copy of it reads: drafts left out. Unchanged when there are none. */
export const withoutDrafts = (node: PmNode): PmNode => {
    if (node.isLeaf) {
        return node;
    }
    let changed = false;
    const children = mapChildren(node, (child) => {
        const kept = isDraft(child) ? null : withoutDrafts(child);
        changed ||= kept !== child;
        return kept;
    }).filter((child) => child !== null);
    // `Fragment.from` joins the text a draft separated, as reading the host's copy back in does.
    return changed ? node.copy(Fragment.from(children)) : node;
};

const inlineFromEngine = (child: PmNode): RteInlineNode | null => {
    if (isDraft(child)) {
        return null;
    }
    const remembered = convertedInlines.get(child);
    if (remembered !== undefined) {
        return remembered;
    }

    let converted: RteInlineNode;
    if (child.isText) {
        const text: Record<string, unknown> = { text: child.text ?? '' };
        for (const mark of child.marks) {
            // A mark that carries nothing is stored as `true` — see `StoredMarkValue`.
            const value = markValueOf(mark);
            text[mark.type.name] = Object.keys(value).length > 0 ? value : true;
        }
        converted = text as RteInlineNode;
    } else {
        converted = { type: child.type.name, ...(child.attrs[VALUE_ATTR] as Record<string, unknown>) };
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
        block.children = mapChildren(node, inlineFromEngine).filter((child) => child !== null);
    } else if (!node.isAtom) {
        block.children = mapChildren(node, blockFromEngine);
    }

    const converted = block as unknown as RteBlockNode;
    convertedBlocks.set(node, converted);
    engineNodeOf.set(converted, node);
    return converted;
};

/**
 * The document itself is built fresh every time, unlike the blocks in it: a new
 * object is what tells a host its `value` changed.
 */
export const toRteDocument = (doc: PmNode): RteDocumentOf => ({
    version: DOCUMENT_VERSION,
    blocks: mapChildren(doc, blockFromEngine),
});
