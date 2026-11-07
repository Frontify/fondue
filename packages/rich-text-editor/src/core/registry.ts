/* (c) Copyright Frontify Ltd., all rights reserved. */

// The plugin list flattened into one engine-agnostic lookup. The only place that
// reads `RtePlugin` and `RteContent`: the editor shell, engine and renderer read
// the registry, so each declaration is gathered, ordered and checked once.

import { createElement, type ReactNode } from 'react';

import { type EditorControlApi, type RteSelectionSnapshot } from './commands';
import { type HtmlSpec, type StyleMap, withRootStyle } from './htmlSpec';
import {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type HotkeyHandler,
    type InlineDefinition,
    type MarkDefinition,
    onlyTypeOf,
    type PasteHandler,
    type RteBlockCommand,
    type RteContent,
    type RteDelimiterRule,
    type RteEditView,
    type RteIcon,
    type RteInputRule,
    type RtePlugin,
    type RteToolbarEntry,
    type ToolbarItemProps,
    typesOf,
} from './plugin';
import { PARAGRAPH, paragraphBlock } from './vocabulary';

/** What a toolbar entry acts on: the type it toggles, by what that type is. */
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

/** One of a plugin's toolbar controls, with the type it acts on already resolved. */
export type ToolbarEntry = {
    /** The plugin's id. */
    id: string;
    /** The control's React key: the id, made unique when two plugins share one, and by position for a plugin's later entries. */
    key: string;
    own: OwnType;
    /** Where the floating bar puts it: the entry's choice, else by what it owns. */
    floating: 'inline' | 'hidden';
    label: string;
    icon?: RteIcon;
    shortcut?: string;
    /** Custom UI in place of the button. */
    render?: (props: ToolbarItemProps) => ReactNode;
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
    /** Node type → the editor's view of it, from the plugins' `edit`. */
    edits: Map<string, RteEditView>;
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

/** A type of the content, by what it is: looked up in marks, then blocks, then inlines. */
export const ownTypeOf = (content: RteContent | undefined, type: string | undefined): OwnType => {
    if (type === undefined) {
        return { kind: 'none' };
    }
    if (content?.marks?.[type] !== undefined) {
        return { kind: 'mark', type };
    }
    const block = content?.blocks?.[type];
    if (block !== undefined) {
        if (block.content === undefined) {
            return { kind: 'voidBlock', type };
        }
        if (block.content === 'text') {
            return { kind: 'textBlock', type };
        }
        return 'items' in block.content ? { kind: 'list', type } : { kind: 'container', type };
    }
    if (content?.inlines?.[type] !== undefined) {
        return { kind: 'inline', type };
    }
    return { kind: 'none' };
};

/**
 * What a toolbar entry's toggle does for its kind: toggle the mark, wrap or
 * unwrap the list, switch a text block to the type or back to a paragraph,
 * insert the void block or the inline. Nothing for the rest.
 */
export const toggleOwn = (
    own: OwnType,
    api: EditorControlApi,
    selection: RteSelectionSnapshot,
    value?: Record<string, unknown>,
): void => {
    switch (own.kind) {
        case 'mark':
            return api.marks.toggle(own.type, value);
        case 'list':
            return api.lists.toggle(own.type);
        case 'textBlock': {
            const isActive = selection.blocks.some((block) => block.type === own.type);
            return api.blocks.setType(isActive ? PARAGRAPH : own.type, value);
        }
        case 'voidBlock':
        case 'inline':
            return api.insert(own.type, value);
        // A block holding other blocks is not something a selection turns
        // into, so there is nothing to toggle.
        case 'container':
        case 'none':
            return;
    }
};

const isPlugin = (entry: RtePlugin | RteContent): entry is RtePlugin => 'id' in entry && typeof entry.id === 'string';

/** Names a bare content in errors: the first type it declares. */
const firstTypeOf = (content: RteContent): string => typesOf(content)[0] ?? 'content';

const capitalised = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

const labelOf = (plugin: RtePlugin, entry: RteToolbarEntry, type: string | undefined): string => {
    if (entry.label !== undefined) {
        return entry.label;
    }
    if (type === undefined) {
        return plugin.id;
    }
    return capitalised(type);
};

/**
 * Adds a plugin's declared types to `target`. Two plugins declaring the same
 * type is an error (one would silently replace the other); the same definition
 * object registered twice is fine: two list plugins share their item that way.
 */
const register = <TDefinition>(
    kind: 'block type' | 'mark type' | 'inline type' | 'block attribute' | 'edit view',
    target: Map<string, TDefinition>,
    owners: Map<string, string>,
    owner: string,
    declared: Record<string, TDefinition> | undefined,
): void => {
    for (const [type, definition] of Object.entries(declared ?? {})) {
        const existing = target.get(type);
        if (existing !== undefined && existing !== definition) {
            const first = owners.get(type);
            throw new Error(
                first === undefined
                    ? `Duplicate ${kind} "${type}": built into the editor and declared by plugin "${owner}".`
                    : `Duplicate ${kind} "${type}": declared by plugin "${first}" and plugin "${owner}".`,
            );
        }
        target.set(type, definition);
        if (!owners.has(type)) {
            owners.set(type, owner);
        }
    }
};

/** What an entry without its own `render` is drawn as: a button toggling one of these. */
const BUTTON_KINDS: ReadonlySet<OwnType['kind']> = new Set(['mark', 'list', 'textBlock', 'voidBlock', 'inline']);

const NOTHING_TO_TOGGLE = 'nothing to toggle: name a mark, list, text block, void block or inline with `toggles`.';

const toolbarEntryOf = (plugin: RtePlugin, entry: RteToolbarEntry, key: string): ToolbarEntry => {
    const type = entry.toggles ?? onlyTypeOf(plugin.content);
    const own = ownTypeOf(plugin.content, type);
    if (entry.toggles !== undefined && own.kind === 'none') {
        throw new Error(`Plugin "${plugin.id}" toggles "${entry.toggles}", which its content does not declare.`);
    }
    if (entry.render === undefined && entry.icon === undefined) {
        throw new Error(`Plugin "${plugin.id}" has a toolbar entry with no \`render\` and no \`icon\`.`);
    }
    if (entry.render === undefined && !BUTTON_KINDS.has(own.kind)) {
        throw new Error(`Plugin "${plugin.id}" has a toolbar entry with ${NOTHING_TO_TOGGLE}`);
    }
    return {
        id: plugin.id,
        key,
        own,
        floating: entry.floating ?? defaultFloatingPlacement(own),
        label: labelOf(plugin, entry, type),
        icon: entry.icon,
        shortcut: entry.shortcut,
        render: entry.render,
    };
};

/** The `/` menu (and Turn into) entry a toolbar entry's `menu` asks for. */
const menuCommandOf = (
    plugin: RtePlugin,
    entry: ToolbarEntry,
    keywords: readonly string[] | undefined,
): RteBlockCommand => {
    const { own } = entry;
    const command = {
        label: entry.label,
        icon: entry.icon === undefined ? undefined : createElement(entry.icon, { size: 16 }),
        keywords,
    };
    switch (own.kind) {
        case 'textBlock':
            return {
                ...command,
                id: own.type,
                group: 'turnInto',
                isActive: (selection) => selection.block?.type === own.type,
                run: (api) => api.blocks.setType(own.type),
            };
        case 'list':
            return {
                ...command,
                id: own.type,
                group: 'turnInto',
                isActive: (selection) => selection.blocks.some((block) => block.type === own.type),
                run: (api) => api.lists.toggle(own.type),
            };
        case 'voidBlock':
        case 'inline':
            return { ...command, id: own.type, group: 'insert', run: (api) => api.insert(own.type) };
        default:
            throw new Error(
                `Plugin "${plugin.id}" offers a \`menu\` for something that is no text block, list, void block or inline.`,
            );
    }
};

/** A delimiter rule is a mark rule on the plugin's only mark. */
const inputRuleOf = (plugin: RtePlugin, rule: RteInputRule | RteDelimiterRule): RteInputRule => {
    if ('kind' in rule) {
        return rule;
    }
    const marks = Object.keys(plugin.content?.marks ?? {});
    const key = marks[0];
    if (marks.length !== 1 || key === undefined) {
        throw new Error(`Plugin "${plugin.id}" has a delimiter rule, which needs exactly one mark to wrap text in.`);
    }
    return { kind: 'mark', key, delimiter: rule.delimiter };
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

/** What `buildPluginRegistry` fills while it walks the entries. */
type Draft = {
    blocks: Map<string, BlockDefinition>;
    inlines: Map<string, InlineDefinition>;
    marks: Map<string, MarkDefinition>;
    blockAttributes: Map<string, BlockAttributeDefinition>;
    itemTypeByList: Map<string, string>;
    edits: Map<string, RteEditView>;
    hotkeys: Map<string, HotkeyHandler[]>;
    inputRules: RteInputRule[];
    pasteHandlers: PasteHandler[];
    toolbarItems: ToolbarEntry[];
    commands: RteBlockCommand[];
    commandOwners: Map<string, string>;
    contentClassNames: string[];
    contentProperties: Record<string, string>;
    /** How often each id has come up so far, for unique toolbar keys. */
    seenIds: Map<string, number>;
    duplicateIds: Set<string>;
    blockOwners: Map<string, string>;
    inlineOwners: Map<string, string>;
    markOwners: Map<string, string>;
    attributeOwners: Map<string, string>;
    editOwners: Map<string, string>;
};

const addHotkey = (draft: Draft, keys: string, handler: HotkeyHandler): void => {
    draft.hotkeys.set(keys, [...(draft.hotkeys.get(keys) ?? []), handler]);
};

const addCommand = (draft: Draft, owner: string, command: RteBlockCommand): void => {
    const first = draft.commandOwners.get(command.id);
    if (first !== undefined) {
        throw new Error(`Duplicate command id "${command.id}": declared by plugin "${first}" and plugin "${owner}".`);
    }
    draft.commandOwners.set(command.id, owner);
    draft.commands.push(command);
};

/** The hotkey a toolbar entry's `shortcut` binds, unless the plugin binds that key itself. */
const addShortcut = (draft: Draft, plugin: RtePlugin, entry: RteToolbarEntry, item: ToolbarEntry): void => {
    const { shortcut } = entry;
    if (shortcut === undefined || shortcut in (plugin.hotkeys ?? {})) {
        return;
    }
    if (!BUTTON_KINDS.has(item.own.kind)) {
        throw new Error(`Plugin "${plugin.id}" names shortcut "${shortcut}" with ${NOTHING_TO_TOGGLE}`);
    }
    addHotkey(draft, shortcut, (api) => toggleOwn(item.own, api, api.selection.get()));
};

const addToolbarEntries = (draft: Draft, plugin: RtePlugin, pluginKey: string): void => {
    for (const [index, entry] of (plugin.toolbar ?? []).entries()) {
        let key = pluginKey;
        if (index > 0) {
            key = `${pluginKey}/${index}`;
        }
        const item = toolbarEntryOf(plugin, entry, key);
        draft.toolbarItems.push(item);
        addShortcut(draft, plugin, entry, item);
        if (entry.menu !== undefined) {
            addCommand(draft, plugin.id, menuCommandOf(plugin, item, entry.menu.keywords));
        }
    }
};

const addEditViews = (draft: Draft, plugin: RtePlugin): void => {
    for (const type of Object.keys(plugin.edit ?? {})) {
        if (ownTypeOf(plugin.content, type).kind === 'none') {
            throw new Error(
                `Plugin "${plugin.id}" has an edit view for "${type}", which its content does not declare.`,
            );
        }
    }
    register('edit view', draft.edits, draft.editOwners, plugin.id, plugin.edit);
};

/** What a plugin adds beyond its content: hotkeys, toolbar, input rules, paste, commands, edit views. */
const addEditing = (draft: Draft, plugin: RtePlugin): void => {
    const occurrence = draft.seenIds.get(plugin.id) ?? 0;
    if (occurrence > 0) {
        draft.duplicateIds.add(plugin.id);
    }
    draft.seenIds.set(plugin.id, occurrence + 1);
    for (const [keys, handler] of Object.entries(plugin.hotkeys ?? {})) {
        addHotkey(draft, keys, handler);
    }
    // A shared id is a mistake the editor warns about; the toolbar still keys each control apart.
    let pluginKey = plugin.id;
    if (occurrence > 0) {
        pluginKey = `${plugin.id}#${occurrence}`;
    }
    addToolbarEntries(draft, plugin, pluginKey);
    draft.inputRules.push(...(plugin.inputRules ?? []).map((rule) => inputRuleOf(plugin, rule)));
    if (plugin.onPaste) {
        draft.pasteHandlers.push(plugin.onPaste);
    }
    for (const command of plugin.commands ?? []) {
        addCommand(draft, plugin.id, command);
    }
    addEditViews(draft, plugin);
};

const addItemTypes = (draft: Draft, blocks: RteContent['blocks']): void => {
    for (const [type, definition] of Object.entries(blocks ?? {})) {
        if (typeof definition.content === 'object' && 'items' in definition.content) {
            draft.itemTypeByList.set(type, definition.content.items);
        }
    }
};

/** What a content declares: styling hooks, block, inline and mark types, block attributes. */
const addContent = (draft: Draft, content: RteContent | undefined, owner: string): void => {
    if (content?.contentClassName) {
        draft.contentClassNames.push(content.contentClassName);
    }
    Object.assign(draft.contentProperties, content?.contentProperties);

    register('block type', draft.blocks, draft.blockOwners, owner, content?.blocks);
    register('inline type', draft.inlines, draft.inlineOwners, owner, content?.inlines);
    register('mark type', draft.marks, draft.markOwners, owner, content?.marks);
    register('block attribute', draft.blockAttributes, draft.attributeOwners, owner, content?.blockAttributes);
    addItemTypes(draft, content?.blocks);
};

export const buildPluginRegistry = (entries: readonly (RtePlugin | RteContent)[]): PluginRegistry => {
    const draft: Draft = {
        blocks: new Map<string, BlockDefinition>([[PARAGRAPH, paragraphBlock]]),
        inlines: new Map(),
        marks: new Map(),
        blockAttributes: new Map(),
        itemTypeByList: new Map(),
        edits: new Map(),
        hotkeys: new Map(),
        inputRules: [],
        pasteHandlers: [],
        toolbarItems: [],
        commands: [],
        commandOwners: new Map(),
        contentClassNames: [],
        contentProperties: {},
        seenIds: new Map(),
        duplicateIds: new Set(),
        blockOwners: new Map(),
        inlineOwners: new Map(),
        markOwners: new Map(),
        attributeOwners: new Map(),
        editOwners: new Map(),
    };

    for (const entry of entries) {
        if (isPlugin(entry)) {
            addEditing(draft, entry);
            addContent(draft, entry.content, entry.id);
        } else {
            addContent(draft, entry, firstTypeOf(entry));
        }
    }

    return {
        blocks: draft.blocks,
        inlines: draft.inlines,
        marks: byNesting(draft.marks),
        blockAttributes: draft.blockAttributes,
        itemTypeByList: draft.itemTypeByList,
        edits: draft.edits,
        ids: entries.filter(isPlugin).map((plugin) => plugin.id),
        duplicateIds: [...draft.duplicateIds],
        hotkeys: draft.hotkeys,
        inputRules: forMatching(draft.inputRules),
        pasteHandlers: draft.pasteHandlers,
        toolbarItems: draft.toolbarItems,
        commands: draft.commands,
        contentClassNames: draft.contentClassNames,
        contentProperties: draft.contentProperties,
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
