/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type AttributeDefinition,
    type BlockDefinition,
    type InlineDefinition,
    type MarkDefinition,
    type ParseRule,
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
    const marks = new Map<string, MarkDefinition>();
    const attributes: AttributeDefinition[] = [];
    const itemTypeByList = new Map<string, string>();

    for (const plugin of plugins) {
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

    return { blocks, inlines, marks, attributes, itemTypeByList };
};

/**
 * Parse rules for a declaration: the `toDom` tag is always recognized, then any
 * extra `parseRules` the plugin named. A qualified selector outranks a bare tag
 * so `ul[data-check-list]` wins over `ul`.
 */
export const parseRulesFor = (toDomTag: string, extra: readonly ParseRule[] = []): readonly ParseRule[] => {
    const seen = new Set<string>();
    const rules: ParseRule[] = [];
    for (const rule of [{ tag: toDomTag }, ...extra]) {
        if (seen.has(rule.tag)) {
            continue;
        }
        seen.add(rule.tag);
        rules.push(rule);
    }
    return rules;
};
