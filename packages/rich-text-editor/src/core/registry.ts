/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type EditorControlApi } from './commands';
import { type HtmlSpec, type StyleMap, withRootStyle } from './htmlSpec';
import {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type InlineDefinition,
    type MarkDefinition,
    type RteInputRule,
    type RtePlugin,
    type ToolbarItemProps,
} from './plugin';
import { PARAGRAPH, paragraphBlock } from './vocabulary';

/**
 * Flattened plugin declarations, still engine-agnostic: the one place that
 * reads `RtePlugin`. The editor shell, the engine adapter and the renderer all
 * read the registry instead of the plugin list, so each declaration is
 * gathered, ordered and checked once — and the engine never sees a plugin.
 */

/** A plugin's handler for one key; `false` leaves the key to the next one. */
export type HotkeyHandler = (api: EditorControlApi) => boolean | void;

/**
 * What a plugin's toolbar item acts on: the first mark it declares, else the
 * first block (by what that block holds), else nothing.
 */
export type OwnType =
    | { kind: 'mark'; type: string }
    | { kind: 'list'; type: string }
    | { kind: 'textBlock'; type: string }
    | { kind: 'voidBlock'; type: string }
    | { kind: 'none' };

/** One plugin's toolbar control, with the type it acts on already resolved. */
export type ToolbarEntry = {
    /** The plugin's id — the control's key. */
    id: string;
    render: (props: ToolbarItemProps) => ReactNode;
    own: OwnType;
};

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
    /** Plugin ids in mount order: the editor's identity — a new set builds a new editor. */
    ids: readonly string[];
    /** Ids declared by more than one plugin, which the editor warns about. */
    duplicateIds: readonly string[];
    /** Key → its handlers, in mount order; they run until one handles it. */
    hotkeys: Map<string, readonly HotkeyHandler[]>;
    /**
     * Every typing rule, ordered for matching: mark rules first, longest
     * delimiter first — or `**bold**` would be read as an italic `*` wrapping
     * `*bold*` — then the rest as declared.
     */
    inputRules: readonly RteInputRule[];
    /** The toolbar's controls, in mount order. */
    toolbarItems: readonly ToolbarEntry[];
    /** Classes for the element holding the content (the column layout). */
    contentClassNames: readonly string[];
    /** Custom properties set alongside them, later plugins winning. */
    contentProperties: Readonly<Record<string, string>>;
};

const unknownTypeMessage = (kind: string, type: string): string =>
    `Unknown ${kind} type "${type}". Did you forget to pass the plugin that defines it in \`plugins\`?`;

export const unknownBlockType = (type: string): Error => new Error(unknownTypeMessage('block', type));
export const unknownInlineType = (type: string): Error => new Error(unknownTypeMessage('inline', type));
export const unknownMarkType = (type: string): Error => new Error(unknownTypeMessage('mark', type));

export const ownTypeOf = (plugin: RtePlugin): OwnType => {
    const mark = Object.keys(plugin.marks ?? {})[0];
    if (mark !== undefined) {
        return { kind: 'mark', type: mark };
    }
    const [type, block] = Object.entries(plugin.blocks ?? {})[0] ?? [];
    if (type === undefined || block === undefined) {
        return { kind: 'none' };
    }
    if (block.content === undefined) {
        return { kind: 'voidBlock', type };
    }
    if (block.content !== 'text' && 'items' in block.content) {
        return { kind: 'list', type };
    }
    return { kind: 'textBlock', type };
};

/** Mark rules first, longest delimiter first; everything else keeps its declared order. */
const forMatching = (rules: readonly RteInputRule[]): RteInputRule[] => [
    ...rules
        .filter((rule) => rule.kind === 'mark')
        .sort((left, right) => right.delimiter.length - left.delimiter.length),
    ...rules.filter((rule) => rule.kind !== 'mark'),
];

/** A stable sort, so ties stay in mount order. */
const byNesting = (marks: Map<string, MarkDefinition>): Map<string, MarkDefinition> =>
    new Map([...marks].sort(([, left], [, right]) => (left.nesting ?? 0) - (right.nesting ?? 0)));

export const buildPluginRegistry = (plugins: readonly RtePlugin[]): PluginRegistry => {
    const blocks = new Map<string, BlockDefinition>([[PARAGRAPH, paragraphBlock]]);
    const inlines = new Map<string, InlineDefinition>();
    const marks = new Map<string, MarkDefinition>();
    const blockAttributes = new Map<string, BlockAttributeDefinition>();
    const itemTypeByList = new Map<string, string>();
    const hotkeys = new Map<string, HotkeyHandler[]>();
    const inputRules: RteInputRule[] = [];
    const toolbarItems: ToolbarEntry[] = [];
    const contentClassNames: string[] = [];
    const contentProperties: Record<string, string> = {};
    const seenIds = new Set<string>();
    const duplicateIds = new Set<string>();

    for (const plugin of plugins) {
        if (seenIds.has(plugin.id)) {
            duplicateIds.add(plugin.id);
        }
        seenIds.add(plugin.id);
        for (const [keys, handler] of Object.entries(plugin.hotkeys ?? {})) {
            hotkeys.set(keys, [...(hotkeys.get(keys) ?? []), handler]);
        }
        inputRules.push(...(plugin.inputRules ?? []));
        if (plugin.toolbarItem) {
            toolbarItems.push({ id: plugin.id, render: plugin.toolbarItem, own: ownTypeOf(plugin) });
        }
        if (plugin.contentClassName) {
            contentClassNames.push(plugin.contentClassName);
        }
        Object.assign(contentProperties, plugin.contentProperties);

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

    return {
        blocks,
        inlines,
        marks: byNesting(marks),
        blockAttributes,
        itemTypeByList,
        ids: plugins.map((plugin) => plugin.id),
        duplicateIds: [...duplicateIds],
        hotkeys,
        inputRules: forMatching(inputRules),
        toolbarItems,
        contentClassNames,
        contentProperties,
    };
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
