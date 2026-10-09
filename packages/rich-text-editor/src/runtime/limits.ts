/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Mark, type Node } from 'prosemirror-model';

import { type CapabilityRef, type ContentModel, type JsonValue, type ResourceLimits } from '#/model';
import { attributesOf } from '#/model/compile';
import { ISLAND_BLOCK, ISLAND_INLINE, ISLAND_MARK, vocabularyOf } from '#/model/content';
import { isRecord } from '#/model/values';

interface Size {
    readonly bytes: number;
    readonly nodes: number;
}

const encoder = new TextEncoder();
const utf8Bytes = (json: string) => encoder.encode(json).byteLength;

/** Declared attributes in declared order, then `unknownAttributes` under their own names, as the encoder writes them. */
const writtenAttrs = (attrs: Readonly<Record<string, unknown>>, declared: readonly string[]) => {
    const written: Record<string, unknown> = {};
    for (const name of declared) {
        written[name] = attrs[name];
    }
    if (isRecord(attrs.unknownAttributes)) {
        for (const [name, value] of Object.entries(attrs.unknownAttributes)) {
            written[name] = value;
        }
    }
    if (Object.keys(written).length === 0) {
        return undefined;
    }
    return written;
};

/** The nodes of a stored node, which an island keeps as it was. */
const storedNodes = (value: unknown): number => {
    if (!isRecord(value) || !Array.isArray(value.content)) {
        return 1;
    }
    return value.content.reduce((total: number, child: unknown) => total + storedNodes(child), 1);
};

/**
 * The `maxDocumentBytes` and `maxDocumentNodes` checks of a commit (SPEC-rich-text-runtime/AC-004): the UTF-8 size
 * of the JSON the encoder writes, cached per immutable node, so a commit measures only the nodes along its changed
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

    const markJson = (mark: Mark): unknown => {
        if (mark.type.name === ISLAND_MARK) {
            return mark.attrs.original;
        }
        const declaration = vocabulary.marks.get(mark.type.name);
        let declared: string[] = [];
        if (declaration !== undefined) {
            declared = Object.keys(declaration.declaration.attrs);
        }
        const attrs = writtenAttrs(mark.attrs, declared);
        if (attrs === undefined) {
            return { type: mark.type.name };
        }
        return { type: mark.type.name, attrs };
    };

    const measure = (node: Node): Size => {
        const name = node.type.name;
        if (name === ISLAND_BLOCK || name === ISLAND_INLINE) {
            const original = node.attrs.original as JsonValue;
            return { bytes: utf8Bytes(JSON.stringify(original)), nodes: storedNodes(original) };
        }
        const shell: Record<string, unknown> = { type: name };
        if (node.isText) {
            shell.text = node.text;
        }
        const declaration = vocabulary.nodes.get(name);
        if (declaration !== undefined && Object.keys(node.attrs).length > 0) {
            const attrs = writtenAttrs(node.attrs, Object.keys(attributesOf(declaration)));
            if (attrs !== undefined) {
                shell.attrs = attrs;
            }
        }
        if (node.childCount > 0) {
            shell.content = [];
        }
        if (node.marks.length > 0) {
            shell.marks = node.marks.map(markJson);
        }
        // The children go between the brackets of the empty `content` array, one comma apart.
        let bytes = utf8Bytes(JSON.stringify(shell)) + Math.max(0, node.childCount - 1);
        let nodes = 1;
        for (const child of node.children) {
            const size = sizeOf(child);
            bytes += size.bytes;
            nodes += size.nodes;
        }
        return { bytes, nodes };
    };

    const sizeOf = (node: Node): Size => {
        let size = cache.get(node);
        if (size === undefined) {
            size = measure(node);
            cache.set(node, size);
        }
        return size;
    };

    /** Whether the document has more nodes or bytes than the limits allow. */
    return (doc: Node, limits: ResourceLimits): boolean => {
        const size = sizeOf(doc);
        return size.nodes > limits.maxDocumentNodes || envelopeBytes + size.bytes > limits.maxDocumentBytes;
    };
};
