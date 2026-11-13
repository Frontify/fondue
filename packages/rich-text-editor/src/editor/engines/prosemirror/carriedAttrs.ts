/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Attrs, type Node as PmNode, type NodeType as PmNodeType } from 'prosemirror-model';

import { type PluginRegistry } from '#/core';

import { EXTRA_ATTR } from './documentConversion';

/**
 * Attributes for a block turned into another type: the ones every text block
 * carries (alignment) stay as they were, under the new type's own. Per block,
 * as the engine's `setBlockType` takes them, since blocks differ.
 */
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

/**
 * A text block's attributes with the ones every text block carries taken from
 * `source`, or null when the block has them already.
 */
export const withCarriedAttrs = (registry: PluginRegistry, block: PmNode, source: PmNode): Attrs | null => {
    const attrs = { ...block.attrs, ...keepCarriedAttrs(registry, block.type, undefined)(source) };
    if (block.hasMarkup(block.type, attrs, block.marks)) {
        return null;
    }
    return attrs;
};
