/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';

import { type CapabilityRef, type ContentModel, type JsonValue, type ResourceLimits } from '#/model';
import { ISLAND_BLOCK, ISLAND_INLINE, type TreeNode, vocabularyOf } from '#/model/content';
import { writeNode } from '#/model/encode';
import { isRecord } from '#/model/values';

interface Size {
    readonly bytes: number;
    readonly nodes: number;
    /** The longest text node, which the engine keeps joined as the encoder does; an island's text was checked at decode. */
    readonly longest: number;
}

const encoder = new TextEncoder();
const utf8Bytes = (json: string) => encoder.encode(json).byteLength;

/** The nodes of a stored node, which an island keeps as it was. */
const storedNodes = (value: unknown): number => {
    if (!isRecord(value) || !Array.isArray(value.content)) {
        return 1;
    }
    return value.content.reduce((total: number, child: unknown) => total + storedNodes(child), 1);
};

/**
 * The `maxDocumentBytes` and `maxDocumentNodes` checks of a commit (SPEC-rich-text-runtime/AC-004): the UTF-8 size
 * of the JSON the encoder writes, through its own `writeNode`, cached per immutable node, so a commit measures only the nodes along its changed
 * path, never through `Node.toJSON` or a whole-document serialization.
 */
export const createLimitCheck = (model: ContentModel, stored: readonly CapabilityRef[]) => {
    const vocabulary = vocabularyOf(model);
    const cache = new WeakMap<Node, Size>();
    const versions = new Map<string, number>();
    // An upper bound: the encoder lists only the capabilities the content uses.
    for (const { id, version } of [...stored, ...model.capabilities]) {
        versions.set(id, Math.max(version, versions.get(id) ?? version));
    }
    const requiredCapabilities = [...versions.keys()].sort().map((id) => ({ id, version: versions.get(id) }));
    const envelope = {
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: model.ref,
        requiredCapabilities,
        content: 0,
    };
    // The content placeholder `0` is one byte.
    const envelopeBytes = utf8Bytes(JSON.stringify(envelope)) - 1;

    const measure = (node: Node): Size => {
        const name = node.type.name;
        if (name === ISLAND_BLOCK || name === ISLAND_INLINE) {
            const original = node.attrs.original as JsonValue;
            return { bytes: utf8Bytes(JSON.stringify(original)), nodes: storedNodes(original), longest: 0 };
        }
        let content: unknown[] | undefined;
        if (node.childCount > 0) {
            content = [];
        }
        const tree: { -readonly [K in keyof TreeNode]: TreeNode[K] } = {
            type: name,
            attrs: node.attrs,
            marks: node.marks.map(({ type, attrs }) => ({ type: type.name, attrs })),
        };
        if (node.text !== undefined) {
            tree.text = node.text;
        }
        const shell = writeNode(vocabulary, tree, content);
        // The children go between the brackets of the empty `content` array, one comma apart.
        let bytes = utf8Bytes(JSON.stringify(shell)) + Math.max(0, node.childCount - 1);
        let nodes = 1;
        let longest = 0;
        if (node.isText) {
            longest = node.textContent.length;
        }
        for (const child of node.children) {
            const size = sizeOf(child);
            bytes += size.bytes;
            nodes += size.nodes;
            longest = Math.max(longest, size.longest);
        }
        return { bytes, nodes, longest };
    };

    const sizeOf = (node: Node): Size => {
        let size = cache.get(node);
        if (size === undefined) {
            size = measure(node);
            cache.set(node, size);
        }
        return size;
    };

    /** Whether the document has more nodes or bytes, or a longer text, than the limits allow. */
    return (doc: Node, limits: ResourceLimits): boolean => {
        const size = sizeOf(doc);
        return (
            size.nodes > limits.maxDocumentNodes ||
            envelopeBytes + size.bytes > limits.maxDocumentBytes ||
            size.longest > limits.maxTextLength
        );
    };
};
