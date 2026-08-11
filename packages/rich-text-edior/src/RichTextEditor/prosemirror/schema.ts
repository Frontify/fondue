/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MarkSpec as PmMarkSpec, type NodeSpec as PmNodeSpec, Schema } from 'prosemirror-model';

import { type RtePlugin } from '../types';

import { pmInjectedAttrs, pmParseDom } from './attributes';
import { blockNodeSpec, inlineNodeSpec, markNodeSpec } from './nodeSpecs';
import { injectedDeclarations, withExtraStyle } from './render';

/**
 * The mounted plugin set → one engine schema.
 */

/**
 * The schema plus what the list commands need to know about it: which block is
 * a list, and which of its `contains` types is the item. Plugins declare it
 * with `isList`, so the API can stay free of item-type arguments.
 */
export type SchemaBundle = {
    schema: Schema;
    itemTypeByList: Map<string, string>;
};

/** Which block is a list, and what its item type is called. */
const collectLists = (blocks: readonly { type: string; isList?: boolean; contains?: readonly string[] }[]) => {
    const itemTypeByList = new Map<string, string>();
    for (const spec of blocks) {
        const item = spec.isList ? spec.contains?.[0] : undefined;
        if (item) {
            itemTypeByList.set(spec.type, item);
        }
    }
    return itemTypeByList;
};

export const buildSchema = (plugins: RtePlugin[]): SchemaBundle => {
    const blockSpecs = plugins.flatMap((plugin) => [...(plugin.schema?.blocks ?? [])]);
    const injected = plugins.flatMap((plugin) => [...(plugin.schema?.blockAttributes ?? [])]);

    const itemTypeByList = collectLists(blockSpecs);
    const itemTypes = new Set(itemTypeByList.values());
    const known = new Set(['paragraph', ...blockSpecs.map((spec) => spec.type)]);

    // Node insertion order matters: the first node matching the doc's
    // `block+` content is the default block type (empty documents, Enter-key
    // splits) — the paragraph baseline stays first.
    const nodes: Record<string, PmNodeSpec> = {
        doc: { content: 'block+' },
        paragraph: {
            content: 'inline*',
            group: 'block',
            attrs: pmInjectedAttrs(injected),
            parseDOM: pmParseDom({}, [{ tag: 'p' }], injected),
            toDOM: (node) => ['p', withExtraStyle({}, injectedDeclarations(node.attrs, injected)), 0],
        },
        text: { group: 'inline' },
    };

    for (const plugin of plugins) {
        for (const block of plugin.schema?.blocks ?? []) {
            nodes[block.type] = blockNodeSpec(block, { injected, isListItem: itemTypes.has(block.type), known });
        }
        for (const inline of plugin.schema?.inlines ?? []) {
            nodes[inline.type] = inlineNodeSpec(inline);
        }
    }

    // Marks nest in the order they are declared — the first wraps the rest —
    // so their order here is what a mark's `nesting` asks for, rather than the
    // order the editor happened to be given its plugins in.
    const markSpecs = plugins
        .flatMap((plugin) => [...(plugin.schema?.marks ?? [])])
        .map((mark, index) => ({ mark, index }))
        .sort((left, right) => (left.mark.nesting ?? 0) - (right.mark.nesting ?? 0) || left.index - right.index);

    const marks: Record<string, PmMarkSpec> = {};
    for (const { mark } of markSpecs) {
        marks[mark.key] = markNodeSpec(mark);
    }

    return { schema: new Schema({ nodes, marks }), itemTypeByList };
};
