/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type AttributeDefinition,
    type BlockDefinition,
    type InlineDefinition,
    type MarkDefinition,
    type RtePlugin,
} from './plugin';
import { paragraphBlock } from './vocabulary';

/**
 * Flattened plugin declarations, still engine-agnostic. The renderer, the
 * editor schema builder and NodeViews all read from this — nothing here knows
 * ProseMirror.
 */

export type PluginRegistry = {
    /** Every block type, the paragraph baseline first. */
    blocks: Map<string, BlockDefinition>;
    inlines: Map<string, InlineDefinition>;
    /**
     * Every mark, in NESTING order: outermost first. Lower `nesting` wraps
     * higher; ties keep the order their plugins were passed in. The engine's
     * schema and the renderer both read this order, so they nest alike.
     */
    marks: Map<string, MarkDefinition>;
    attributes: readonly AttributeDefinition[];
    /** List type → its item type, inferred from `children: { items }`. */
    itemTypeByList: Map<string, string>;
};

const unknownTypeMessage = (kind: string, type: string): string =>
    `Unknown ${kind} type "${type}". Did you forget to pass the plugin that defines it in \`plugins\`?`;

export const unknownBlockType = (type: string): Error => new Error(unknownTypeMessage('block', type));
export const unknownInlineType = (type: string): Error => new Error(unknownTypeMessage('inline', type));
export const unknownMarkType = (type: string): Error => new Error(unknownTypeMessage('mark', type));

/** A stable sort, so ties stay in mount order. */
const byNesting = (marks: Map<string, MarkDefinition>): Map<string, MarkDefinition> =>
    new Map([...marks].sort(([, left], [, right]) => (left.nesting ?? 0) - (right.nesting ?? 0)));

export const buildPluginRegistry = (plugins: readonly RtePlugin[]): PluginRegistry => {
    const blocks = new Map<string, BlockDefinition>([[paragraphBlock.type, paragraphBlock]]);
    const inlines = new Map<string, InlineDefinition>();
    const marks = new Map<string, MarkDefinition>();
    const attributes: AttributeDefinition[] = [];
    const itemTypeByList = new Map<string, string>();

    for (const plugin of plugins) {
        for (const [type, definition] of Object.entries(plugin.inlines ?? {})) {
            inlines.set(type, definition);
        }
        for (const [type, definition] of Object.entries(plugin.marks ?? {})) {
            marks.set(type, definition);
        }
        for (const entry of plugin.schema ?? []) {
            switch (entry.kind) {
                case 'block':
                    blocks.set(entry.type, entry);
                    if (entry.children && typeof entry.children === 'object' && 'items' in entry.children) {
                        itemTypeByList.set(entry.type, entry.children.items);
                    }
                    break;
                case 'attribute':
                    attributes.push(entry);
                    break;
            }
        }
    }

    return { blocks, inlines, marks: byNesting(marks), attributes, itemTypeByList };
};
