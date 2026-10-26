/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isIsland, ISLAND_INLINE, type TreeMark, type TreeNode } from './content';
import { type CodecContext, type JsonObject, type JsonValue } from './declarations';
import { pointer } from './errors';
import { canonicalJson } from './hash';
import { islandText, renderSpaces } from './htmlSpec';
import { type NodePlan } from './output';

export const VOID_TAGS = new Set('area base br col embed hr img input link meta source track wbr'.split(' '));
const ATTRIBUTE_NAME = /^[a-zA-Z][\w:.-]*$/;
const EVENT_HANDLER = /^on/i;

/** Whether an output writes an attribute: never a malformed name, nor one that would run as an event handler. */
export const writesAttribute = (name: string): boolean => ATTRIBUTE_NAME.test(name) && !EVENT_HANDLER.test(name);

/** The attributes a renderer may read: every declared one, and never `unknownAttributes`. */
export const attrsOf = (attrs: TreeNode['attrs']): JsonObject => {
    const known: Record<string, JsonValue> = {};
    for (const [name, value] of Object.entries(attrs ?? {})) {
        if (name !== 'unknownAttributes') {
            known[name] = value as JsonValue;
        }
    }

    return known;
};

/** The text of a node and its descendants, an island's included, for a fallback. */
export const textOf = (node: TreeNode): string => {
    if (isIsland(node)) {
        return islandText(node.attrs?.original);
    }

    let text = node.text ?? '';
    for (const child of node.content ?? []) {
        text += textOf(child);
    }

    return text;
};

/** What an HTML output carries through one document: the opaque islands met so far, and the spaces that end the text written last in this block. */
export type Spacing = {
    islands: number;
    /** So a run of spaces alternates across text nodes. */
    carried: number;
};

/** `text` with its spaces kept, continuing the run of spaces of the text before it. */
export const spaced = (state: Spacing, text: string): string => {
    const carried = state.carried;
    let trailing = 0;
    while (trailing < text.length && text[text.length - 1 - trailing] === ' ') {
        trailing += 1;
    }

    if (trailing === text.length) {
        state.carried = carried + trailing;
    } else {
        state.carried = trailing;
    }

    return renderSpaces(text, carried);
};

/** The label of an island fallback: the feature it names, else a generic one. */
export const islandLabel = ({ t }: CodecContext, feature: string | null): string => {
    if (feature === null) {
        return t('RichTextEditor_readerIslandGeneric');
    }

    return t('RichTextEditor_readerIslandFeature', { feature });
};

/** An opaque island's fallback: a `span` inside inline content, else a `div`, with its feature and its spaced text. */
export const islandFallback = (state: Spacing, node: TreeNode) => {
    state.islands += 1;
    const feature = node.attrs?.feature;
    let featureId: string | null = null;
    if (typeof feature === 'string') {
        featureId = feature;
    }

    const original = islandText(node.attrs?.original);
    if (node.type === ISLAND_INLINE) {
        // Inline island text sits in the same line, so it continues the run of spaces.
        return { tag: 'span', featureId, text: spaced(state, original) } as const;
    }

    state.carried = 0;

    return { tag: 'div', featureId, text: renderSpaces(original) } as const;
};

/** The fallback of a node whose override failed: its text in a `span` inside inline content, else a `div`. */
export const failedFallback = (state: Spacing, node: TreeNode, plan: NodePlan, before: number) => {
    let text = textOf(node);
    if (plan.inline) {
        // The children already moved the run, so it restarts from where this node began.
        state.carried = before;
        if (!plan.pre) {
            text = spaced(state, text);
        }

        return { tag: 'span', text } as const;
    }

    state.carried = 0;
    if (!plan.pre) {
        text = renderSpaces(text);
    }

    return { tag: 'div', text } as const;
};

export type Item = {
    node: TreeNode;
    path: string;
    /** The known marks in rank order, each with its index among the node's marks. */
    marks: readonly { mark: TreeMark; index: number }[];
};

const sameMark = (a: TreeMark, b: TreeMark) =>
    a.type === b.type && canonicalJson(attrsOf(a.attrs)) === canonicalJson(attrsOf(b.attrs));

/** The path of the mark at `index` on the first node of a run. */
export const markPath = (items: readonly Item[], index: number): string => {
    const first = items[0];
    if (first === undefined) {
        return '';
    }

    return `${first.path}${pointer('marks', index)}`;
};

/** The children of `node` with their paths and the marks `keep` takes, in rank order. */
export const itemsOf = (node: TreeNode, path: string, keep: (mark: TreeMark) => boolean): Item[] =>
    (node.content ?? []).map((child, index): Item => {
        const marks = (child.marks ?? []).flatMap((mark, markIndex) => {
            if (!keep(mark)) {
                return [];
            }

            return [{ mark, index: markIndex }];
        });

        return { node: child, path: `${path}${pointer('content', index)}`, marks };
    });

/** Splits children into runs that share a mark at `depth`, so a partly bold link stays one link. */
export const groupRun = <T>(
    items: readonly Item[],
    depth: number,
    node: (item: Item) => T,
    mark: (items: readonly Item[], entry: Item['marks'][number]) => T,
): T[] => {
    const out: T[] = [];
    let index = 0;
    while (index < items.length) {
        const item = items[index];
        if (item === undefined) {
            break;
        }

        const entry = item.marks[depth];
        if (entry === undefined) {
            out.push(node(item));
            index += 1;
            continue;
        }

        let end = index + 1;
        while (end < items.length) {
            const next = items[end]?.marks[depth];
            if (next === undefined || !sameMark(next.mark, entry.mark)) {
                break;
            }

            end += 1;
        }

        out.push(mark(items.slice(index, end), entry));
        index = end;
    }

    return out;
};
