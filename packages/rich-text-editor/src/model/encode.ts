/* (c) Copyright Frontify Ltd., all rights reserved. */

import { attributesOf } from './compile';
import { isIsland, ISLAND_MARK, type TreeMark, type TreeNode, type Vocabulary, vocabularyOf } from './content';
import { type CapabilityRef, type ContentModel, type JsonValue } from './declarations';
import { type ContentNodeJSON, type RichTextDocument } from './format';
import { canonicalJson } from './hash';
import { isRecord } from './values';

type Writable = Record<string, unknown>;

interface Encoding {
    readonly vocabulary: Vocabulary;
    /** Feature IDs whose nodes, marks or non-default attributes the content outside islands uses. */
    readonly used: Set<string>;
    /** Whether any island or unknown attribute survives. */
    foreign: boolean;
    /** The longest text node after joining. */
    longestText: number;
}

/** Declared attributes in declared order, with `unknownAttributes` written back in place under their own names. */
const writeAttrs = (attrs: Readonly<Record<string, unknown>>, declared: readonly string[]) => {
    const written: Writable = {};
    for (const name of declared) {
        written[name] = attrs[name];
    }
    const unknown = attrs.unknownAttributes;
    if (isRecord(unknown)) {
        for (const [name, value] of Object.entries(unknown)) {
            written[name] = value;
        }
    }
    return Object.keys(written).length > 0 ? written : undefined;
};

/** A mark as the format stores it: an island mark's `original`, or its type with its written attributes. */
const writeMark = (vocabulary: Vocabulary, mark: TreeMark): unknown => {
    if (mark.type === ISLAND_MARK) {
        return mark.attrs.original;
    }
    const declaration = vocabulary.marks.get(mark.type);
    const attrs = writeAttrs(mark.attrs, Object.keys(declaration === undefined ? {} : declaration.declaration.attrs));
    return attrs === undefined ? { type: mark.type } : { type: mark.type, attrs };
};

/**
 * A node that is not an island as the format stores it, with the given `content` in place: type, text, attributes,
 * content and marks, in that order. The encoder and the runtime's byte count both write through it.
 */
export const writeNode = (
    vocabulary: Vocabulary,
    node: TreeNode,
    content: readonly unknown[] | undefined,
): Writable => {
    const declaration = vocabulary.nodes.get(node.type);
    const written: Writable = { type: node.type };
    if (node.text !== undefined) {
        written.text = node.text;
    }
    if (node.attrs !== undefined && declaration !== undefined) {
        const attrs = writeAttrs(node.attrs, Object.keys(attributesOf(declaration)));
        if (attrs !== undefined) {
            written.attrs = attrs;
        }
    }
    if (content !== undefined) {
        written.content = content;
    }
    if (node.marks !== undefined && node.marks.length > 0) {
        written.marks = node.marks.map((mark) => writeMark(vocabulary, mark));
    }
    return written;
};

/** Notes what a node or mark uses: its feature, and whether foreign content survives in an island or unknown attributes. */
const note = (
    encoding: Encoding,
    featureId: string | undefined,
    attrs: Readonly<Record<string, unknown>> | undefined,
) => {
    if (featureId !== undefined) {
        encoding.used.add(featureId);
    }
    if (attrs !== undefined && isRecord(attrs.unknownAttributes)) {
        encoding.foreign = true;
    }
};

const noteSharedAttributes = (encoding: Encoding, node: TreeNode) => {
    const declaration = encoding.vocabulary.nodes.get(node.type);
    for (const shared of declaration === undefined ? [] : declaration.shared) {
        const fallback = 'default' in shared.declaration.value ? shared.declaration.value.default : undefined;
        const value = node.attrs?.[shared.name];
        if (fallback === undefined || canonicalJson(value as JsonValue) !== canonicalJson(fallback)) {
            encoding.used.add(shared.featureId);
        }
    }
};

const encodeNode = (encoding: Encoding, node: TreeNode): unknown => {
    if (isIsland(node)) {
        encoding.foreign = true;
        return node.attrs?.original;
    }
    const declaration = encoding.vocabulary.nodes.get(node.type);
    if (declaration !== undefined) {
        note(encoding, declaration.featureId, node.attrs);
        noteSharedAttributes(encoding, node);
    }
    for (const mark of node.marks ?? []) {
        const markDeclaration = encoding.vocabulary.marks.get(mark.type);
        if (mark.type === ISLAND_MARK) {
            encoding.foreign = true;
        } else if (markDeclaration === undefined) {
            note(encoding, undefined, mark.attrs);
        } else {
            note(encoding, markDeclaration.featureId, mark.attrs);
        }
    }
    const content = joinText(encoding, node.content ?? []);
    if (content.length === 0) {
        return writeNode(encoding.vocabulary, node, undefined);
    }
    return writeNode(encoding.vocabulary, node, content);
};

type EncodedText = { readonly type: 'text'; readonly text: string; readonly marks?: unknown };

const marksKey = (text: EncodedText) => canonicalJson((text.marks ?? null) as JsonValue);

/** Encodes the children and joins adjacent text nodes of the tree with identical marks, as the engine does on load; an island is never joined. */
const joinText = (encoding: Encoding, children: readonly TreeNode[]): unknown[] => {
    const joined: unknown[] = [];
    let previous: EncodedText | undefined;
    for (const child of children) {
        const encoded = encodeNode(encoding, child);
        const text = child.type === 'text' ? (encoded as EncodedText) : undefined;
        if (text !== undefined && previous !== undefined && marksKey(text) === marksKey(previous)) {
            previous = { ...previous, text: previous.text + text.text };
            joined[joined.length - 1] = previous;
        } else {
            previous = text;
            joined.push(encoded);
        }
        if (previous !== undefined) {
            encoding.longestText = Math.max(encoding.longestText, previous.text.length);
        }
    }
    return joined;
};

/**
 * `requiredCapabilities`: `core` and each capability the content uses, sorted by ID, at the installed
 * version. While islands or unknown attributes survive, every stored capability stays too, at the higher of its
 * stored and installed version, since their content cannot be attributed to one capability.
 */
const capabilitiesOf = (
    model: ContentModel,
    encoding: Encoding,
    stored: readonly CapabilityRef[],
): readonly CapabilityRef[] => {
    const versions = new Map<string, number>();
    for (const { id, version } of model.capabilities) {
        if (id === 'core' || encoding.used.has(id)) {
            versions.set(id, version);
        }
    }
    const installed = new Map(model.capabilities.map(({ id, version }) => [id, version]));
    for (const { id, version } of encoding.foreign ? stored : []) {
        versions.set(id, Math.max(version, installed.get(id) ?? version));
    }
    return [...versions.keys()].sort().map((id) => ({ id, version: versions.get(id) ?? 0 }));
};

/** Encodes an island tree as a stored document in canonical form, with the installed model's reference. */
export const encodeTree = (
    tree: TreeNode,
    model: ContentModel,
    stored: readonly CapabilityRef[] = [],
): { readonly document: RichTextDocument; readonly longestText: number } => {
    const encoding: Encoding = { vocabulary: vocabularyOf(model), used: new Set(), foreign: false, longestText: 0 };
    const content = encodeNode(encoding, tree) as ContentNodeJSON;
    const document: RichTextDocument = {
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: { id: model.ref.id, version: model.ref.version },
        requiredCapabilities: capabilitiesOf(model, encoding, stored),
        content,
    };
    return { document, longestText: encoding.longestText };
};
