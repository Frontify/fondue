/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type AttributeDefinition,
    type BlockDefinition,
    type InlineDefinition,
    type InlineNodeDefinition,
    type MarkDefinition,
    type RtePlugin,
} from './plugin';

/**
 * Flattened plugin declarations, still engine-agnostic. The renderer, the
 * editor schema builder and NodeViews all read from this — nothing here knows
 * ProseMirror.
 */

export type PluginRegistry = {
    blocks: Map<string, BlockDefinition>;
    inlines: Map<string, InlineDefinition>;
    /** Inline nodes in the component-based shape (`RtePlugin.inlines`). */
    inlineNodes: Map<string, InlineNodeDefinition>;
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

export const buildPluginRegistry = (plugins: readonly RtePlugin[]): PluginRegistry => {
    const blocks = new Map<string, BlockDefinition>();
    const inlines = new Map<string, InlineDefinition>();
    const inlineNodes = new Map<string, InlineNodeDefinition>();
    const marks = new Map<string, MarkDefinition>();
    const attributes: AttributeDefinition[] = [];
    const itemTypeByList = new Map<string, string>();

    for (const plugin of plugins) {
        for (const [type, definition] of Object.entries(plugin.inlines ?? {})) {
            inlineNodes.set(type, definition);
        }
        // Component-based marks join the ordinary ones, so nesting order and
        // the renderer treat both alike; `valueMark` tells the engine apart.
        for (const [type, definition] of Object.entries(plugin.marks ?? {})) {
            marks.set(type, {
                kind: 'mark',
                type,
                nesting: definition.nesting,
                toDom: (attrs) => definition.toHtml(attrs.value as Record<string, unknown>),
                renderComponent: ({ children, value }) => definition.renderComponent({ children, value }),
                parseRules: [],
                valueMark: definition,
            });
        }
        for (const entry of plugin.schema ?? []) {
            switch (entry.kind) {
                case 'block':
                    blocks.set(entry.type, entry);
                    if (entry.children && typeof entry.children === 'object' && 'items' in entry.children) {
                        itemTypeByList.set(entry.type, entry.children.items);
                    }
                    break;
                case 'inline':
                    inlines.set(entry.type, entry);
                    break;
                case 'mark':
                    marks.set(entry.type, entry);
                    break;
                case 'attribute':
                    attributes.push(entry);
                    break;
            }
        }
    }

    return { blocks, inlines, inlineNodes, marks, attributes, itemTypeByList };
};
