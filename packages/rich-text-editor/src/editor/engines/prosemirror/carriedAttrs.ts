/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Attrs, type Node as PmNode, type NodeType as PmNodeType } from 'prosemirror-model';

import { type PluginRegistry } from '#/core';

import { EXTRA_ATTR } from './documentConversion';

/** Attributes for a block turned into `nodeType`: its carried ones (alignment) under `attributes`. */
export const keepCarriedAttrs =
    (
        { blockAttributes }: PluginRegistry,
        nodeType: PmNodeType,
        attributes: Record<string, unknown> | undefined,
    ): ((node: PmNode) => Record<string, unknown>) =>
    (node) => ({
        ...Object.fromEntries(
            // The extras ride along: they are the block's stored keys no plugin declares.
            [...blockAttributes.keys(), EXTRA_ATTR]
                .filter((name) => name in node.attrs && name in (nodeType.spec.attrs ?? {}))
                .map((name) => [name, node.attrs[name]]),
        ),
        ...attributes,
    });

/** `block`'s attributes with the carried ones taken from `source`, or null when it has them already. */
export const withCarriedAttrs = (registry: PluginRegistry, block: PmNode, source: PmNode): Attrs | null => {
    const attrs = { ...block.attrs, ...keepCarriedAttrs(registry, block.type, undefined)(source) };
    if (block.hasMarkup(block.type, attrs, block.marks)) {
        return null;
    }
    return attrs;
};
