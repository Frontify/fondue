/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Node, type Schema, Slice } from 'prosemirror-model';

import {
    type CapabilityRef,
    type ContentModel,
    type ContentNodeJSON,
    type ModelRef,
    type ResourceLimits,
} from '#/model';
import {
    ISLAND_BLOCK,
    ISLAND_INLINE,
    ISLAND_MARK,
    type TreeNode,
    type Vocabulary,
    vocabularyOf,
} from '#/model/content';
import { decodeToTree } from '#/model/decode';
import { encodeTree, writeMark, writeNode } from '#/model/encode';
import { pointer } from '#/model/errors';
import { isRecord } from '#/model/values';

import { openDepth } from './import/policy';

/** The clipboard type of the internal slice (SPEC-rich-text-clipboard, Internal slice). */
export const SLICE_TYPE = 'application/x-frontify-rich-text+json';

export interface RichTextSlice {
    readonly format: 'frontify.rich-text-slice';
    readonly formatVersion: 1;
    readonly model: ModelRef;
    readonly requiredCapabilities: readonly CapabilityRef[];
    readonly context: string | null;
    readonly openStart: number;
    readonly openEnd: number;
    readonly content: readonly ContentNodeJSON[];
}

const isIsland = (type: unknown) => type === ISLAND_BLOCK || type === ISLAND_INLINE;

/** A node in canonical form, with each island kept as its island node or mark, which only a slice holds. */
const writeSliceNode = (vocabulary: Vocabulary, node: Node): unknown => {
    const type = node.type.name;
    if (isIsland(type)) {
        const { feature, original } = node.attrs as { readonly feature: unknown; readonly original: unknown };
        return { type, attrs: { feature, original } };
    }
    let content: unknown[] | undefined;
    if (node.childCount > 0) {
        content = node.children.map((child) => writeSliceNode(vocabulary, child));
    }
    const tree: { -readonly [K in keyof TreeNode]: TreeNode[K] } = { type, attrs: node.attrs };
    if (node.text !== undefined) {
        tree.text = node.text;
    }
    const written = writeNode(vocabulary, tree, content);
    if (node.marks.length > 0) {
        written.marks = node.marks.map(({ type: { name }, attrs }) => {
            if (name === ISLAND_MARK) {
                return { type: name, attrs: { original: attrs.original as unknown } };
            }
            return writeMark(vocabulary, { type: name, attrs });
        });
    }
    return written;
};

/** The internal slice of `slice`, cut from `doc` (SPEC-rich-text-clipboard, Internal slice). */
export const writeSlice = (model: ContentModel, doc: Node, slice: Slice, context: string): RichTextSlice => {
    const vocabulary = vocabularyOf(model);
    const tree: TreeNode = { type: 'doc', attrs: doc.attrs, content: slice.content.toJSON() as TreeNode[] };
    return {
        format: 'frontify.rich-text-slice',
        formatVersion: 1,
        model: { id: model.ref.id, version: model.ref.version },
        requiredCapabilities: encodeTree(tree, model).document.requiredCapabilities,
        context,
        openStart: slice.openStart,
        openEnd: slice.openEnd,
        content: slice.content.content.map((node) => writeSliceNode(vocabulary, node)) as ContentNodeJSON[],
    };
};

interface Islands {
    readonly paths: string[];
    malformed: boolean;
}

/** An island's `original`, which decode then counts at the island's position (SPEC-rich-text-format, Decode order step 1). */
const originalOf = (islands: Islands, island: Readonly<Record<string, unknown>>, path: string): unknown => {
    islands.paths.push(path);
    let original: unknown;
    if (isRecord(island.attrs)) {
        original = island.attrs.original;
    }
    // Stored JSON never holds an island type, so an original cannot be one (SPEC-rich-text-format, Vocabulary).
    if (!isRecord(original) || isIsland(original.type) || original.type === ISLAND_MARK) {
        islands.malformed = true;
        return undefined;
    }
    return original;
};

/** The slice content as stored JSON: each island node and mark replaced by its `original`, whose paths `islands` collects. */
const unwrapIslands = (islands: Islands, value: unknown, path: string): unknown => {
    if (!isRecord(value)) {
        return value;
    }
    if (isIsland(value.type)) {
        return originalOf(islands, value, path);
    }
    const node: Record<string, unknown> = { ...value };
    if (Array.isArray(value.content)) {
        node.content = value.content.map((child: unknown, index) =>
            unwrapIslands(islands, child, `${path}${pointer('content', index)}`),
        );
    }
    if (Array.isArray(value.marks)) {
        node.marks = value.marks.map((mark: unknown, index) => {
            if (isRecord(mark) && mark.type === ISLAND_MARK) {
                return originalOf(islands, mark, `${path}${pointer('marks', index)}`);
            }
            return mark;
        });
    }
    return node;
};

/** Whether the decoded tree holds an island node or mark at `path`, a pointer below the root at `/content`. */
const islandAt = (tree: TreeNode, path: string): boolean => {
    const segments = path.split('/').slice(2);
    let node: TreeNode | undefined = tree;
    for (let index = 0; index < segments.length && node !== undefined; index += 2) {
        const position = Number(segments[index + 1]);
        if (segments[index] === 'marks') {
            const marks = node.marks ?? [];
            return index + 2 === segments.length && marks[position]?.type === ISLAND_MARK;
        }
        const children: readonly TreeNode[] = node.content ?? [];
        node = children[position];
    }
    return node !== undefined && isIsland(node.type);
};

const isOpening = (value: unknown, content: Fragment, side: 'start' | 'end'): value is number =>
    Number.isInteger(value) && (value as number) >= 0 && (value as number) <= openDepth(content, side);

/** An internal slice that decodes with no new island or warning, else `undefined`, so the paste takes the next flavor (SPEC-rich-text-clipboard/AC-006, AC-007). */
export const readSlice = (
    payload: string,
    model: ContentModel,
    schema: Schema,
    limits: ResourceLimits,
): { readonly slice: Slice; readonly context: string | null } | undefined => {
    let value: unknown;
    try {
        value = JSON.parse(payload);
    } catch {
        return undefined;
    }
    if (!isRecord(value) || value.format !== 'frontify.rich-text-slice' || value.formatVersion !== 1) {
        return undefined;
    }
    const { context } = value;
    if (!Array.isArray(value.content) || (context !== null && typeof context !== 'string')) {
        return undefined;
    }
    const islands: Islands = { paths: [], malformed: false };
    const envelope = {
        format: 'frontify.rich-text',
        formatVersion: 1,
        model: value.model,
        requiredCapabilities: value.requiredCapabilities,
        content: unwrapIslands(islands, { type: 'doc', content: value.content }, '/content'),
    };
    if (islands.malformed) {
        return undefined;
    }
    const { result, tree } = decodeToTree(envelope, model, { limits });
    if (result.status !== 'editable' || tree === undefined) {
        return undefined;
    }
    // Each carried island must decode as the same island, so a forged wrapper cannot plant known content (AC-006).
    if (
        !islands.paths.every((path) => islandAt(tree, path)) ||
        !result.diagnostics.every(({ path }) => path !== undefined && islands.paths.includes(path))
    ) {
        return undefined;
    }
    const content = Fragment.fromJSON(schema, tree.content);
    if (!isOpening(value.openStart, content, 'start') || !isOpening(value.openEnd, content, 'end')) {
        return undefined;
    }
    return { slice: new Slice(content, value.openStart, value.openEnd), context };
};
