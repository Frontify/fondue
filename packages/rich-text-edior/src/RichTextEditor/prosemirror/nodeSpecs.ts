/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkSpec as PmMarkSpec, type NodeSpec as PmNodeSpec } from 'prosemirror-model';

import { type BlockAttributeSpec, type BlockSpec, type InlineSpec, type MarkSpec } from '../types';

import { pmAttrs, pmInjectedAttrs, pmParseDom } from './attributes';
import { CONTENT_SLOT, injectedDeclarations, probeCachedBy, withRootStyle } from './render';

/**
 * One declared block, inline or mark → the engine's spec for it.
 */

/**
 * What the engine allows inside a block: text, or the block types a container
 * declared. The first `contains` entry ends up first in the expression, which
 * is what makes it the type a newly created container is filled with.
 */
const pmContent = (spec: BlockSpec, known: Set<string>): string | undefined => {
    if (spec.isVoid) {
        return undefined;
    }
    if (spec.content !== 'blocks') {
        return 'inline*';
    }
    // A container may name block types from plugins that are not mounted — a
    // list item nesting a check list. Those simply drop out of the grammar.
    const contains = (spec.contains ?? []).filter((type) => known.has(type));
    if (contains.length === 0) {
        throw new Error(
            `Block "${spec.type}" declares content: 'blocks' but none of its \`contains\` types are registered.`,
        );
    }
    return contains.length === 1 ? `${contains[0]}+` : `(${contains.join(' | ')})+`;
};

export const blockNodeSpec = (
    spec: BlockSpec,
    {
        injected,
        isListItem,
        known,
    }: { injected: readonly BlockAttributeSpec[]; isListItem: boolean; known: Set<string> },
): PmNodeSpec => {
    const isVoid = spec.isVoid ?? false;
    const carriesInjected = !isVoid && spec.content !== 'blocks';
    const injectedHere = carriesInjected ? injected : [];
    const ownAttrNames = Object.keys(spec.attributes ?? {});
    const probe = probeCachedBy((attrs) =>
        spec.render({ node: { type: spec.type, ...attrs }, children: CONTENT_SLOT }),
    );

    return {
        content: pmContent(spec, known),
        atom: isVoid,
        // Paragraph is the neutral block, everything else means something —
        // "this text is a caption", "this text is quoted". Saying so is what
        // makes pasted content keep the block it was copied out of instead of
        // dissolving into whatever block it lands in: the engine treats the
        // sides of such a block as a boundary editing does not cross. Lists are
        // left out, the way the engine's own list schema leaves them out; there
        // the boundary that matters belongs to the item, not to the list.
        ...(isVoid || spec.isList === true ? {} : { defining: true }),
        // A list item is only ever reached through its list, so it deliberately
        // stays out of the `block` group the document accepts at top level.
        ...(isListItem ? {} : { group: 'block' }),
        attrs: { ...pmAttrs(spec.attributes), ...pmInjectedAttrs(injectedHere) },
        parseDOM: pmParseDom(spec.attributes ?? {}, spec.parseRules ?? [], injectedHere),
        toDOM: (node) => {
            // The render function only knows the attributes it declared; the
            // injected ones become CSS on the element it produced.
            const { element } = probe(Object.fromEntries(ownAttrNames.map((name) => [name, node.attrs[name]])));
            return withRootStyle(element, injectedDeclarations(node.attrs, injectedHere));
        },
    };
};

export const inlineNodeSpec = (spec: InlineSpec): PmNodeSpec => {
    const probe = probeCachedBy((attrs) => spec.render({ node: { type: spec.type, ...attrs } }));

    return {
        group: 'inline',
        inline: true,
        atom: true,
        attrs: pmAttrs(spec.attributes),
        parseDOM: pmParseDom(spec.attributes ?? {}, spec.parseRules ?? []),
        toDOM: (node) => probe(node.attrs).element,
    };
};

export const markNodeSpec = (spec: MarkSpec): PmMarkSpec => {
    const attrs = pmAttrs(spec.attributes);
    const probe = probeCachedBy((value) => spec.render({ children: CONTENT_SLOT, value }));
    // The element the mark renders (probed with default values) is always
    // recognized when parsing; parseRules add more.
    const defaults = Object.fromEntries(Object.entries(attrs).map(([name, attr]) => [name, attr.default]));

    return {
        attrs,
        // Value-carrying marks (links) should not extend when typing at their edge.
        inclusive: Object.keys(attrs).length === 0,
        parseDOM: pmParseDom(spec.attributes ?? {}, [{ tag: probe(defaults).tag }, ...(spec.parseRules ?? [])]),
        toDOM: (mark) => probe(mark.attrs).element,
    };
};
