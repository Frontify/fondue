/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type HtmlSpec, type StyleMap, withRootStyle } from './htmlSpec';
import {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type InlineDefinition,
    type MarkDefinition,
    type RtePlugin,
} from './plugin';
import { PARAGRAPH, paragraphBlock } from './vocabulary';

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
    /** Attributes every text block carries (alignment), by name. */
    blockAttributes: Map<string, BlockAttributeDefinition>;
    /** List type → its item type, inferred from `content: { items }`. */
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
    const blocks = new Map<string, BlockDefinition>([[PARAGRAPH, paragraphBlock]]);
    const inlines = new Map<string, InlineDefinition>();
    const marks = new Map<string, MarkDefinition>();
    const blockAttributes = new Map<string, BlockAttributeDefinition>();
    const itemTypeByList = new Map<string, string>();

    for (const plugin of plugins) {
        for (const [type, definition] of Object.entries(plugin.blocks ?? {})) {
            blocks.set(type, definition);
            if (typeof definition.content === 'object' && 'items' in definition.content) {
                itemTypeByList.set(type, definition.content.items);
            }
        }
        for (const [type, definition] of Object.entries(plugin.inlines ?? {})) {
            inlines.set(type, definition);
        }
        for (const [type, definition] of Object.entries(plugin.marks ?? {})) {
            marks.set(type, definition);
        }
        for (const [name, definition] of Object.entries(plugin.blockAttributes ?? {})) {
            blockAttributes.set(name, definition);
        }
    }

    return { blocks, inlines, marks: byNesting(marks), blockAttributes, itemTypeByList };
};

/**
 * A block's value as its `toHtml` and components receive it: the attributes it
 * declared in `defaults`, read off wherever they are stored (the document node,
 * the engine's node), the defaults filling the gaps.
 */
export const blockValueOf = (definition: BlockDefinition, stored: Record<string, unknown>): Record<string, unknown> => {
    const defaults = definition.defaults ?? {};
    return Object.fromEntries(Object.entries(defaults).map(([name, fallback]) => [name, stored[name] ?? fallback]));
};

/** The CSS the attributes every text block carries put on this one, by their values on it. */
export const blockAttributeStyle = (registry: PluginRegistry, stored: Record<string, unknown>): StyleMap => {
    const style: StyleMap = {};
    for (const [name, attribute] of registry.blockAttributes) {
        const value = stored[name];
        if (typeof value === 'string' && value !== '') {
            Object.assign(style, attribute.style(value));
        }
    }
    return style;
};

/**
 * A block's markup with what every text block carries applied to its outermost
 * element. One helper for the editor, the readonly view and export, so the
 * three can't place alignment differently.
 */
export const blockHtml = (
    registry: PluginRegistry,
    definition: BlockDefinition,
    stored: Record<string, unknown>,
): HtmlSpec => {
    const spec = definition.toHtml(blockValueOf(definition, stored));
    return definition.content === 'text' ? withRootStyle(spec, blockAttributeStyle(registry, stored)) : spec;
};
