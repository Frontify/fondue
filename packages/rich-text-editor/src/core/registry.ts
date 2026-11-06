/* (c) Copyright Frontify Ltd., all rights reserved. */

// The plugin list flattened into one engine-agnostic lookup. The only place that
// reads `RtePlugin` and `RteContent`: the editor shell, engine and renderer read
// the registry, so each declaration is gathered, ordered and checked once.

import { type ComponentType, createElement } from 'react';

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
    type RteEditView,
    type RteIcon,
    type RteInputRule,
    type RtePlugin,
    type RteToolbarEntry,
    type ToolbarItemProps,
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
    render?: ComponentType<ToolbarItemProps>;
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
const firstTypeOf = (content: RteContent): string =>
    Object.keys({ ...content.marks, ...content.blocks, ...content.inlines })[0] ?? 'content';

const capitalised = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

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
const BUTTON_KINDS: readonly OwnType['kind'][] = ['mark', 'list', 'textBlock', 'voidBlock', 'inline'];

const toolbarEntryOf = (plugin: RtePlugin, entry: RteToolbarEntry, key: string): ToolbarEntry => {
    const type = entry.toggles ?? onlyTypeOf(plugin.content);
    const own = ownTypeOf(plugin.content, type);
    if (entry.toggles !== undefined && own.kind === 'none') {
        throw new Error(`Plugin "${plugin.id}" toggles "${entry.toggles}", which its content does not declare.`);
    }
    if (entry.render === undefined && (entry.icon === undefined || !BUTTON_KINDS.includes(own.kind))) {
        throw new Error(
            `Plugin "${plugin.id}" has a toolbar entry with no \`render\`: it needs an \`icon\` and a mark, list, text block, void block or inline to toggle.`,
        );
    }
    let label = entry.label;
    if (label === undefined) {
        label = type === undefined ? plugin.id : capitalised(type);
    }
    return {
        id: plugin.id,
        key,
        own,
        floating: entry.floating ?? defaultFloatingPlacement(own),
        label,
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
const inputRuleOf = (plugin: RtePlugin, rule: NonNullable<RtePlugin['inputRules']>[number]): RteInputRule => {
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

export const buildPluginRegistry = (entries: readonly (RtePlugin | RteContent)[]): PluginRegistry => {
    const blocks = new Map<string, BlockDefinition>([[PARAGRAPH, paragraphBlock]]);
    const inlines = new Map<string, InlineDefinition>();
    const marks = new Map<string, MarkDefinition>();
    const blockAttributes = new Map<string, BlockAttributeDefinition>();
    const itemTypeByList = new Map<string, string>();
    const edits = new Map<string, RteEditView>();
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
    const editOwners = new Map<string, string>();

    const addHotkey = (keys: string, handler: HotkeyHandler): void => {
        hotkeys.set(keys, [...(hotkeys.get(keys) ?? []), handler]);
    };

    const addCommand = (owner: string, command: RteBlockCommand): void => {
        const first = commandOwners.get(command.id);
        if (first !== undefined) {
            throw new Error(
                `Duplicate command id "${command.id}": declared by plugin "${first}" and plugin "${owner}".`,
            );
        }
        commandOwners.set(command.id, owner);
        commands.push(command);
    };

    for (const entry of entries) {
        const content = isPlugin(entry) ? entry.content : entry;
        const owner = isPlugin(entry) ? entry.id : firstTypeOf(entry);

        if (isPlugin(entry)) {
            const occurrence = seenIds.get(entry.id) ?? 0;
            if (occurrence > 0) {
                duplicateIds.add(entry.id);
            }
            seenIds.set(entry.id, occurrence + 1);
            for (const [keys, handler] of Object.entries(entry.hotkeys ?? {})) {
                addHotkey(keys, handler);
            }
            // A shared id is a mistake the editor warns about; the toolbar still keys each control apart.
            const pluginKey = occurrence === 0 ? entry.id : `${entry.id}#${occurrence}`;
            for (const [index, toolbarEntry] of (entry.toolbar ?? []).entries()) {
                const item = toolbarEntryOf(entry, toolbarEntry, index === 0 ? pluginKey : `${pluginKey}/${index}`);
                toolbarItems.push(item);
                if (toolbarEntry.shortcut !== undefined && !(toolbarEntry.shortcut in (entry.hotkeys ?? {}))) {
                    if (!BUTTON_KINDS.includes(item.own.kind)) {
                        throw new Error(
                            `Plugin "${entry.id}" names shortcut "${toolbarEntry.shortcut}" with nothing to toggle.`,
                        );
                    }
                    addHotkey(toolbarEntry.shortcut, (api) => toggleOwn(item.own, api, api.selection.get()));
                }
                if (toolbarEntry.menu !== undefined) {
                    addCommand(entry.id, menuCommandOf(entry, item, toolbarEntry.menu.keywords));
                }
            }
            inputRules.push(...(entry.inputRules ?? []).map((rule) => inputRuleOf(entry, rule)));
            if (entry.onPaste) {
                pasteHandlers.push(entry.onPaste);
            }
            for (const command of entry.commands ?? []) {
                addCommand(entry.id, command);
            }
            for (const type of Object.keys(entry.edit ?? {})) {
                if (ownTypeOf(content, type).kind === 'none') {
                    throw new Error(
                        `Plugin "${entry.id}" has an edit view for "${type}", which its content does not declare.`,
                    );
                }
            }
            register('edit view', edits, editOwners, entry.id, entry.edit);
        }
        if (content?.contentClassName) {
            contentClassNames.push(content.contentClassName);
        }
        Object.assign(contentProperties, content?.contentProperties);

        register('block type', blocks, blockOwners, owner, content?.blocks);
        register('inline type', inlines, inlineOwners, owner, content?.inlines);
        register('mark type', marks, markOwners, owner, content?.marks);
        register('block attribute', blockAttributes, attributeOwners, owner, content?.blockAttributes);
        for (const [type, definition] of Object.entries(content?.blocks ?? {})) {
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
        edits,
        ids: entries.filter(isPlugin).map((plugin) => plugin.id),
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
