/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Mark, type Node, type NodeType, type Schema, Slice } from 'prosemirror-model';

import { checkHref, type ContentModel, type HrefPolicy } from '#/model';
import { compiledModel, shownLabel } from '#/model/internal';

/** What the paste filter reads of an `AuthoringPolicy`: whether each feature's content may be pasted. */
export type PastePolicy = Readonly<Record<string, { paste: boolean }>>;

const edgeOf = (fragment: Fragment, side: 'start' | 'end') => {
    if (side === 'start') {
        return fragment.firstChild;
    }

    return fragment.lastChild;
};

/** How many nodes on one side of `fragment` can be open: the non-leaf nodes along its first or last children. */
export const openDepth = (fragment: Fragment, side: 'start' | 'end'): number => {
    let depth = 0;
    let node = edgeOf(fragment, side);
    while (node !== null && !node.isLeaf) {
        depth += 1;
        node = edgeOf(node.content, side);
    }

    return depth;
};

/** `content` as a slice that stays open no deeper than `slice` was, nor deeper than `content` allows. */
export const resliced = (slice: Slice, content: Fragment): Slice => {
    if (content.size === 0) {
        return Slice.empty;
    }

    const openStart = Math.min(slice.openStart, openDepth(content, 'start'));

    return new Slice(content, openStart, Math.min(slice.openEnd, openDepth(content, 'end')));
};

/** The text a mention keeps where it cannot stay: its label. */
export const labelText = (schema: Schema, node: Node): Node[] => {
    const stored: unknown = node.attrs.labelSnapshot;
    if (typeof stored !== 'string') {
        return [];
    }

    const label = shownLabel(stored);
    if (label === '') {
        return [];
    }

    return [schema.text(label, node.marks)];
};

/** The node and mark names of the features whose policy sets `paste: false`. */
export const refusedNames = (model: ContentModel, policy: PastePolicy) => {
    const { nodes, marks } = compiledModel(model);
    const refused = ({ featureId }: { featureId: string }) => policy[featureId]?.paste === false;
    // Paragraphs and text hold what the refused content keeps.
    const kept = (name: string) => name !== 'paragraph' && name !== 'text';

    return {
        nodes: new Set(nodes.filter((node) => refused(node) && kept(node.name)).map(({ name }) => name)),
        marks: new Set(marks.filter(refused).map(({ name }) => name)),
    };
};

/** `slice` without the content of features with `paste: false`, keeping its text. */
export const withoutRefused = (slice: Slice, schema: Schema, model: ContentModel, policy: PastePolicy): Slice => {
    const { nodes: refusedNodes, marks: refusedMarks } = refusedNames(model, policy);
    if (refusedNodes.size === 0 && refusedMarks.size === 0) {
        return slice;
    }

    const paragraph = schema.nodes.paragraph as NodeType;
    // A prefix match, as an open slice may start inside a node's content.
    const fits = (type: NodeType, content: Fragment) => type.contentMatch.matchFragment(content) !== null;
    // A block child fits where its refused container stood; any other child is unwrapped in turn.
    const unwrapped = (children: readonly Node[]): Node[] =>
        children.flatMap((child) => {
            if (child.type.isInGroup('block')) {
                return [child];
            }

            return keep(child.content);
        });
    const keep = (fragment: Fragment): Node[] => fragment.content.flatMap((node) => filter(node));
    const filter = (node: Node): Node[] => {
        const kept = node.marks.filter((mark) => !refusedMarks.has(mark.type.name));
        if (node.isText) {
            return [node.mark(kept)];
        }

        if (!refusedNodes.has(node.type.name)) {
            const content = keep(node.content);
            // A kept container whose refused children left it content its type forbids goes as a refused one does.
            if (fits(node.type, node.content) && !fits(node.type, Fragment.from(content))) {
                return unwrapped(content);
            }

            return [node.type.create(node.attrs, content, kept)];
        }

        if (node.isTextblock) {
            return [paragraph.create(null, keep(node.content))];
        }

        if (node.isLeaf) {
            return labelText(schema, node);
        }

        return unwrapped(keep(node.content));
    };

    return resliced(slice, Fragment.from(keep(slice.content)));
};

/**
 * `fragment` without the link marks whose `href` fails `policy`, keeping their text, so pasted content brings no link
 * the host's `allowedSchemes` and `allowedHosts` refuse; stored links never pass here.
 */
export const withinLinkPolicy = (fragment: Fragment, policy: HrefPolicy | undefined): Fragment => {
    if (policy === undefined) {
        return fragment;
    }

    const nodes: Node[] = [];
    for (const node of fragment.content) {
        const isAllowed = ({ type, attrs }: Mark) =>
            type.name !== 'link' || (typeof attrs.href === 'string' && checkHref(attrs.href, policy).ok);
        const marked = node.mark(node.marks.filter(isAllowed));
        if (marked.isText) {
            nodes.push(marked);
            continue;
        }

        nodes.push(marked.copy(withinLinkPolicy(node.content, policy)));
    }

    return Fragment.fromArray(nodes);
};
