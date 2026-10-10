/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Fragment, type Node, type NodeType, type Schema, Slice } from 'prosemirror-model';

import { type ContentModel } from '#/model';
import { compiledModel } from '#/model/compile';

/** What the paste filter reads of an `AuthoringPolicy`: whether each feature's content may be pasted. */
export type PastePolicy = Readonly<Record<string, { readonly paste: boolean }>>;

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

/** The text a mention keeps where it cannot stay: its label (SPEC-rich-text-clipboard/AC-022). */
export const labelText = (schema: Schema, node: Node): Node[] => {
    const label: unknown = node.attrs.labelSnapshot;
    if (typeof label !== 'string' || label === '') {
        return [];
    }
    return [schema.text(label, node.marks)];
};

/** The node and mark names of the features whose policy sets `paste: false`. */
export const refusedNames = (model: ContentModel, policy: PastePolicy) => {
    const { nodes, marks } = compiledModel(model);
    const refused = ({ featureId }: { readonly featureId: string }) => policy[featureId]?.paste === false;
    // Paragraphs and text hold what the refused content keeps.
    const kept = (name: string) => name !== 'paragraph' && name !== 'text';
    return {
        nodes: new Set(nodes.filter((node) => refused(node) && kept(node.name)).map(({ name }) => name)),
        marks: new Set(marks.filter(refused).map(({ name }) => name)),
    };
};

/** `slice` without the content of features with `paste: false`, keeping its text (SPEC-rich-text-runtime/AC-010, SPEC-rich-text-clipboard/AC-019). */
export const withoutRefused = (slice: Slice, schema: Schema, model: ContentModel, policy: PastePolicy): Slice => {
    const { nodes: refusedNodes, marks: refusedMarks } = refusedNames(model, policy);
    if (refusedNodes.size === 0 && refusedMarks.size === 0) {
        return slice;
    }
    const paragraph = schema.nodes.paragraph as NodeType;
    const keep = (fragment: Fragment): Node[] => fragment.content.flatMap((node) => filter(node));
    const filter = (node: Node): Node[] => {
        const kept = node.marks.filter((mark) => !refusedMarks.has(mark.type.name));
        if (node.isText) {
            return [node.mark(kept)];
        }
        if (!refusedNodes.has(node.type.name)) {
            return [node.type.create(node.attrs, keep(node.content), kept)];
        }
        if (node.isTextblock) {
            return [paragraph.create(null, keep(node.content))];
        }
        if (node.isLeaf) {
            return labelText(schema, node);
        }
        // A block child fits where its refused container stood; any other child is unwrapped in turn.
        return keep(node.content).flatMap((child) => {
            if (child.type.isInGroup('block')) {
                return [child];
            }
            return keep(child.content);
        });
    };
    return resliced(slice, Fragment.from(keep(slice.content)));
};
