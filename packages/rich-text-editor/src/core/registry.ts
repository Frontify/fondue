/* (c) Copyright Frontify Ltd., all rights reserved. */

// The plugin list flattened into one engine-agnostic lookup. The only place that
// reads `RtePlugin`: the editor shell, engine and renderer read the registry, so
// each declaration is gathered, ordered and checked once.

import { type ReactNode } from 'react';

import { type HtmlSpec, type StyleMap, withRootStyle } from './htmlSpec';
import {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type HotkeyHandler,
    type InlineDefinition,
    type MarkDefinition,
    type PasteHandler,
    type RteBlockCommand,
    type RteInputRule,
    type RtePlugin,
    type ToolbarItemProps,
} from './plugin';
import { PARAGRAPH, paragraphBlock } from './vocabulary';

/**
 * What a plugin's toolbar item acts on: the first mark it declares, else the
 * first block (by what that block holds), else the first inline, else nothing.
 */
export type OwnType =
    | { kind: 'mark'; type: string }
    /** A block holding items: `content: { items }`. */
    | { kind: 'list'; type: string }
    /** A block holding other blocks, `content: { blocks }` — a list item. */
    | { kind: 'container'; type: string }
    | { kind: 'textBlock'; type: string }
    /** A block holding nothing — a column break. */
    | { kind: 'voidBlock'; type: string }
    | { kind: 'inline'; type: string }
    | { kind: 'none' };

/** One plugin's toolbar control, with the type it acts on already resolved. */
export type ToolbarEntry = {
    /** The plugin's id. */
    id: string;
    /** The control's React key: the id, made unique when two plugins share one. */
    key: string;
    render: (props: ToolbarItemProps) => ReactNode;
    own: OwnType;
    /** Where the floating bar puts it: the plugin's choice, else by what it owns. */
    floating: 'inline' | 'hidden';
};

export type PluginRegistry = {
    /** Every block type, the paragraph baseline first. */
    blocks: Map<string, BlockDefinition>;
    inlines: Map<string, InlineDefinition>;
    /**
     * Every mark, outermost first (lower `nesting` wraps higher, ties keep
     * plugin order). Engine and renderer both read this order, so they nest alike.
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
    /** Every plugin's `onPaste`, in mount order; they run until one handles the paste. */
    pasteHandlers: readonly PasteHandler[];
    /** The toolbar's controls, in mount order. */
    toolbarItems: readonly ToolbarEntry[];
    /** Every block command the plugins offer, in mount order. */
    commands: readonly RteBlockCommand[];
    /** Classes for the element holding the content (the column layout). */
    contentClassNames: readonly string[];
    /** Custom properties set alongside them, later plugins winning. */
    contentProperties: Readonly<Record<string, string>>;
};

/** A mark sits in the floating bar; a block is reached through its commands instead. */
const defaultFloatingPlacement = (own: OwnType): ToolbarEntry['floating'] =>
    own.kind === 'mark' ? 'inline' : 'hidden';

export const ownTypeOf = (plugin: RtePlugin): OwnType => {
    const mark = Object.keys(plugin.marks ?? {})[0];
    if (mark !== undefined) {
        return { kind: 'mark', type: mark };
    }
    const [type, block] = Object.entries(plugin.blocks ?? {})[0] ?? [];
    if (type !== undefined && block !== undefined) {
        if (block.content === undefined) {
            return { kind: 'voidBlock', type };
        }
        if (block.content === 'text') {
            return { kind: 'textBlock', type };
        }
        return 'items' in block.content ? { kind: 'list', type } : { kind: 'container', type };
    }
    const inline = Object.keys(plugin.inlines ?? {})[0];
    return inline === undefined ? { kind: 'none' } : { kind: 'inline', type: inline };
};

/**
 * Adds a plugin's declared types to `target`. Two plugins declaring the same
 * type is an error (one would silently replace the other); the same definition
 * object registered twice is fine — two list plugins share their item that way.
 */
const register = <TDefinition>(
    kind: 'block type' | 'mark type' | 'inline type' | 'block attribute',
    target: Map<string, TDefinition>,
    owners: Map<string, string>,
    plugin: RtePlugin,
    declared: Record<string, TDefinition> | undefined,
): void => {
    for (const [type, definition] of Object.entries(declared ?? {})) {
        const existing = target.get(type);
        if (existing !== undefined && existing !== definition) {
            const first = owners.get(type);
            throw new Error(
                first === undefined
                    ? `Duplicate ${kind} "${type}": built into the editor and declared by plugin "${plugin.id}".`
                    : `Duplicate ${kind} "${type}": declared by plugin "${first}" and plugin "${plugin.id}".`,
            );
        }
        target.set(type, definition);
        if (!owners.has(type)) {
            owners.set(type, plugin.id);
        }
    }
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
    const pasteHandlers: PasteHandler[] = [];
    const toolbarItems: ToolbarEntry[] = [];
    const commands: RteBlockCommand[] = [];
    const commandOwners = new Map<string, string>();
    const contentClassNames: string[] = [];
    const contentProperties: Record<string, string> = {};
    /** How often each id has come up so far, for unique toolbar keys. */
    const seenIds = new Map<string, number>();
    const duplicateIds = new Set<string>();
    const blockOwners = new Map<string, string>();
    const inlineOwners = new Map<string, string>();
    const markOwners = new Map<string, string>();
    const attributeOwners = new Map<string, string>();

    for (const plugin of plugins) {
        const occurrence = seenIds.get(plugin.id) ?? 0;
        if (occurrence > 0) {
            duplicateIds.add(plugin.id);
        }
        seenIds.set(plugin.id, occurrence + 1);
        for (const [keys, handler] of Object.entries(plugin.hotkeys ?? {})) {
            hotkeys.set(keys, [...(hotkeys.get(keys) ?? []), handler]);
        }
        inputRules.push(...(plugin.inputRules ?? []));
        if (plugin.onPaste) {
            pasteHandlers.push(plugin.onPaste);
        }
        if (plugin.toolbarItem) {
            const own = ownTypeOf(plugin);
            toolbarItems.push({
                id: plugin.id,
                // A shared id is a mistake the editor warns about; the toolbar still keys each control apart.
                key: occurrence === 0 ? plugin.id : `${plugin.id}#${occurrence}`,
                render: plugin.toolbarItem,
                own,
                floating: plugin.floatingToolbar ?? defaultFloatingPlacement(own),
            });
        }
        for (const command of plugin.commands ?? []) {
            const first = commandOwners.get(command.id);
            if (first !== undefined) {
                throw new Error(
                    `Duplicate command id "${command.id}": declared by plugin "${first}" and plugin "${plugin.id}".`,
                );
            }
            commandOwners.set(command.id, plugin.id);
            commands.push(command);
        }
        if (plugin.contentClassName) {
            contentClassNames.push(plugin.contentClassName);
        }
        Object.assign(contentProperties, plugin.contentProperties);

        register('block type', blocks, blockOwners, plugin, plugin.blocks);
        register('inline type', inlines, inlineOwners, plugin, plugin.inlines);
        register('mark type', marks, markOwners, plugin, plugin.marks);
        register('block attribute', blockAttributes, attributeOwners, plugin, plugin.blockAttributes);
        for (const [type, definition] of Object.entries(plugin.blocks ?? {})) {
            if (typeof definition.content === 'object' && 'items' in definition.content) {
                itemTypeByList.set(type, definition.content.items);
            }
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
        pasteHandlers,
        toolbarItems,
        commands,
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
 * A block's markup with what every text block carries (alignment) applied to
 * its outermost element — shared by editor, readonly view and export so they agree.
 */
export const blockHtml = (
    registry: PluginRegistry,
    definition: BlockDefinition,
    stored: Record<string, unknown>,
): HtmlSpec => {
    const spec = definition.toHtml(blockValueOf(definition, stored));
    return definition.content === 'text' ? withRootStyle(spec, blockAttributeStyle(registry, stored)) : spec;
};
