/* (c) Copyright Frontify Ltd., all rights reserved. */

// The plugin list flattened into one engine-agnostic lookup. The only place that
// reads `RtePlugin` and `RteContent`: the editor shell, engine and renderer read
// the registry, so each declaration is gathered, ordered and checked once.

import { type ReactNode } from 'react';

import { type EditorControlApi, type RteMarkState, type RteSelectionSnapshot } from './commands';
import { OWN_MARGINS_ATTRIBUTE } from './documentContract';
import { type HtmlSpec, type StyleMap, withRootStyle } from './htmlSpec';
import {
    type BlockAttributeDefinition,
    type BlockDefinition,
    type BlockLook,
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
    type RteToolbarGroup,
    type ToolbarItemProps,
    typesOf,
} from './plugin';
import { PARAGRAPH, paragraphBlock } from './vocabulary';

/**
 * What a toolbar entry acts on: the type it toggles, by what that type is.
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
    id: string;
    /**
     * React key of the control: the id, made unique when plugins share one, and by position for a later entry
     */
    key: string;
    own: OwnType;
    /** Where the floating bar puts it: the plugin's choice, else by what it owns. */
    floating: 'inline' | 'hidden';
    /** The plugin's `toolbarGroup`; none puts it in the last group. */
    group: RteToolbarGroup | undefined;
    label: string;
    shortcut?: string;
} & (
    | {
          control: 'button';
          icon: RteIcon;
          /**
           * Whether the button shows a pressed state: a void block or an inline is inserted, not switched on and off
           */
          pressable: boolean;
      }
    | {
          /**
           * Custom UI in place of the button.
           */
          control: 'custom';
          render: (props: ToolbarItemProps) => ReactNode;
          icon?: RteIcon;
      }
);

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
    /**
     * Node type → the editor's view of it, from the plugins' `edit`.
     */
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
    /**
     * The inline style of each class the content writes, for HTML exported with `styling: 'inline'`
     */
    contentStyles: Readonly<Record<string, StyleMap>>;
};

/** A mark sits in the floating bar; a block is reached through its commands instead. */
const defaultFloatingPlacement = (own: OwnType): ToolbarEntry['floating'] =>
    own.kind === 'mark' ? 'inline' : 'hidden';

/**
 * A block type, by what its content holds: nothing, text, items or other blocks.
 */
const ownBlockTypeOf = (block: BlockDefinition, type: string): OwnType => {
    if (block.content === undefined) {
        return { kind: 'voidBlock', type };
    }
    if (block.content === 'text') {
        return { kind: 'textBlock', type };
    }
    if ('items' in block.content) {
        return { kind: 'list', type };
    }
    return { kind: 'container', type };
};

// `Object.hasOwn` needs an ES2022 lib, which this package does not target.
const hasOwnKey = (record: object, key: string): boolean => Object.prototype.hasOwnProperty.call(record, key);

/**
 * A type of the content, by what it is: looked up in marks, then blocks, then inlines.
 */
export const ownTypeOf = (content: RteContent | undefined, type: string | undefined): OwnType => {
    if (type === undefined) {
        return { kind: 'none' };
    }
    const { marks = {}, blocks = {}, inlines = {} } = content ?? {};
    // Own keys only: `toggles: 'constructor'` must not find Object.prototype.
    if (hasOwnKey(marks, type)) {
        return { kind: 'mark', type };
    }
    const block = blocks[type];
    if (hasOwnKey(blocks, type) && block !== undefined) {
        return ownBlockTypeOf(block, type);
    }
    if (hasOwnKey(inlines, type)) {
        return { kind: 'inline', type };
    }
    return { kind: 'none' };
};

/**
 * What a toolbar entry is drawn as for its kind. A button is `pressable` when
 * it shows a pressed state: a void block or an inline is inserted, not switched on and off.
 */
export type OwnControl = { kind: 'button'; pressable: boolean } | { kind: 'none' };

/**
 * The control an entry without its own `render` gets for its kind: a button
 * toggling a mark, list, text block, void block or inline; nothing for the rest.
 */
export const controlOf = (own: OwnType): OwnControl => {
    switch (own.kind) {
        case 'mark':
        case 'list':
        case 'textBlock':
            return { kind: 'button', pressable: true };
        case 'voidBlock':
        case 'inline':
            return { kind: 'button', pressable: false };
        case 'container':
        case 'none':
            return { kind: 'none' };
    }
};

const markActiveOf = (mark: RteMarkState | undefined): ToolbarItemProps['isActive'] => {
    if (mark === undefined) {
        return false;
    }
    switch (mark.coverage) {
        case 'all':
            return true;
        case 'some':
            return 'mixed';
    }
};

/**
 * Whether the selection already carries the type: the mark, or a block of it
 * around the selection. `'mixed'` for a mark only part of a range carries.
 * Never for an inline, which the selection only sits beside.
 */
export const isOwnActive = (own: OwnType, selection: RteSelectionSnapshot): ToolbarItemProps['isActive'] => {
    switch (own.kind) {
        case 'mark':
            return markActiveOf(selection.marks[own.type]);
        case 'list':
        case 'container':
        case 'textBlock':
        case 'voidBlock':
            return selection.blocks.some((block) => block.type === own.type);
        case 'inline':
        case 'none':
            return false;
    }
};

type ToggleOwnParams = {
    own: OwnType;
    api: EditorControlApi;
    selection: RteSelectionSnapshot;
    value?: Record<string, unknown>;
};

/**
 * What a toolbar entry's toggle does for its kind: toggle the mark, wrap or
 * unwrap the list, switch a text block to the type or back to a paragraph,
 * insert the void block or the inline. Nothing for the rest.
 */
export const toggleOwn = ({ own, api, selection, value }: ToggleOwnParams): void => {
    switch (own.kind) {
        case 'mark':
            return api.marks.toggle(own.type, value);
        case 'list':
            return api.lists.toggle(own.type);
        case 'textBlock': {
            let type = own.type;
            if (isOwnActive(own, selection) === true) {
                type = PARAGRAPH;
            }
            return api.blocks.setType(type, value);
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

/**
 * Names a bare content in errors: the first type it declares.
 */
const firstTypeOf = (content: RteContent): string => typesOf(content)[0] ?? 'content';

/**
 * A plugin built by hand, not by `definePlugin`, can leave out its `id` or leave it empty.
 */
const assertHasId = (plugin: RtePlugin): void => {
    if (typeof plugin.id === 'string' && plugin.id !== '') {
        return;
    }
    const first = typesOf(plugin.content)[0] ?? 'no type declared';
    throw new Error(`Plugin has no id: ${first}`);
};

/**
 * Adds a plugin's declared types to `target`. Two plugins declaring the same
 * type is an error (one would silently replace the other); the same definition
 * object registered twice is fine — two list plugins share their item that way.
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
            let message: string;
            if (first === undefined) {
                message = `Duplicate ${kind} "${type}": built into the editor and declared by plugin "${owner}".`;
            } else {
                message = `Duplicate ${kind} "${type}": declared by plugin "${first}" and plugin "${owner}".`;
            }
            throw new Error(message);
        }
        target.set(type, definition);
        if (!owners.has(type)) {
            owners.set(type, owner);
        }
    }
};

const NOTHING_TO_TOGGLE = 'nothing to toggle: name a mark, list, text block, void block or inline with `toggles`.';

/**
 * Throws unless the entry has a label. The label is the control's only accessible name, so an untyped caller cannot leave it out.
 */
const assertLabelled = (plugin: RtePlugin, entry: RteToolbarEntry): void => {
    if (typeof entry.label !== 'string' || entry.label === '') {
        throw new Error(`Plugin "${plugin.id}" has a toolbar entry with no \`label\`.`);
    }
};

const toolbarEntryOf = (plugin: RtePlugin, entry: RteToolbarEntry, key: string): ToolbarEntry => {
    const type = entry.toggles ?? onlyTypeOf(plugin.content);
    const own = ownTypeOf(plugin.content, type);
    if (entry.toggles !== undefined && own.kind === 'none') {
        throw new Error(`Plugin "${plugin.id}" toggles "${entry.toggles}", which its content does not declare.`);
    }
    assertLabelled(plugin, entry);
    const shared = {
        id: plugin.id,
        key,
        own,
        floating: entry.floating ?? defaultFloatingPlacement(own),
        group: plugin.toolbarGroup,
        label: entry.label,
        shortcut: entry.shortcut,
    };
    if (entry.render !== undefined) {
        return { ...shared, control: 'custom', render: entry.render, icon: entry.icon };
    }
    if (entry.icon === undefined) {
        throw new Error(`Plugin "${plugin.id}" has a toolbar entry with no \`render\` and no \`icon\`.`);
    }
    const control = controlOf(own);
    if (control.kind === 'none') {
        throw new Error(`Plugin "${plugin.id}" has a toolbar entry with ${NOTHING_TO_TOGGLE}`);
    }
    return { ...shared, control: 'button', icon: entry.icon, pressable: control.pressable };
};

/**
 * The `/` menu (and Turn into) entry a toolbar entry's `menu` asks for.
 */
const menuCommandOf = (
    plugin: RtePlugin,
    entry: ToolbarEntry,
    keywords: readonly string[] | undefined,
): RteBlockCommand => {
    const { own } = entry;
    const command = { label: entry.label, icon: entry.icon, keywords };
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
        case 'mark':
        case 'container':
        case 'none':
            throw new Error(
                `Plugin "${plugin.id}" offers a \`menu\` for something that is no text block, list, void block or inline.`,
            );
    }
};

/**
 * A delimiter rule is a mark rule on the plugin's only mark.
 */
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

/**
 * What `buildPluginRegistry` fills while it walks the entries.
 */
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
    contentStyles: Record<string, StyleMap>;
    /** What plugins add to a block they do not define, by block type, and who set each field. */
    blockExtensions: Map<string, BlockExtensions>;
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

/**
 * The hotkey a toolbar entry's `shortcut` binds, unless the plugin binds that key itself.
 */
const addShortcut = (draft: Draft, plugin: RtePlugin, item: ToolbarEntry): void => {
    const { shortcut } = item;
    if (shortcut === undefined || hasOwnKey(plugin.hotkeys ?? {}, shortcut)) {
        return;
    }
    if (controlOf(item.own).kind === 'none') {
        throw new Error(`Plugin "${plugin.id}" names shortcut "${shortcut}" with ${NOTHING_TO_TOGGLE}`);
    }
    addHotkey(draft, shortcut, (api) => toggleOwn({ own: item.own, api, selection: api.selection.get() }));
};

const addToolbarEntries = (draft: Draft, plugin: RtePlugin, pluginKey: string): void => {
    for (const [index, entry] of (plugin.toolbar ?? []).entries()) {
        let key = pluginKey;
        if (index > 0) {
            key = `${pluginKey}/${index}`;
        }
        const item = toolbarEntryOf(plugin, entry, key);
        draft.toolbarItems.push(item);
        addShortcut(draft, plugin, item);
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

/**
 * What a plugin adds beyond its content: hotkeys, toolbar, input rules, paste, commands, edit views.
 */
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

/** A field of a block's look as a plugin set it, with who set it. */
type BlockExtension = { owner: string; value: NonNullable<BlockLook[keyof BlockLook]> };

/** Everything plugins set on one block they do not define; `owner` is the first to name it, for an unknown block. */
type BlockExtensions = { owner: string; fields: Map<keyof BlockLook, BlockExtension> };

const addBlockExtensions = (draft: Draft, extensions: Record<string, BlockLook>, owner: string): void => {
    for (const [type, look] of Object.entries(extensions)) {
        const extended = draft.blockExtensions.get(type) ?? {
            owner,
            fields: new Map<keyof BlockLook, BlockExtension>(),
        };
        const { fields } = extended;
        for (const [field, value] of Object.entries(look) as [keyof BlockLook, BlockExtension['value'] | undefined][]) {
            if (value === undefined) {
                continue;
            }
            const first = fields.get(field);
            // The same value twice is one fact, as the same block declared twice is: a content next to its plugin.
            if (first !== undefined && first.value !== value) {
                throw new Error(
                    `Duplicate ${field} for block "${type}": set by plugin "${first.owner}" and plugin "${owner}".`,
                );
            }
            fields.set(field, { owner, value });
        }
        draft.blockExtensions.set(type, extended);
    }
};

/** Replaces each extended block with a copy that carries the extension, so one definition says everything. */
const foldBlockExtensions = (draft: Draft): void => {
    for (const [type, { owner: extender, fields }] of draft.blockExtensions) {
        const definition = draft.blocks.get(type);
        if (definition === undefined) {
            throw new Error(`Unknown block type "${type}": plugin "${extender}" extends it, but no plugin defines it.`);
        }
        const folded: BlockDefinition = { ...definition };
        for (const [field, { owner, value }] of fields) {
            if (definition[field] !== undefined && definition[field] !== value) {
                const first = draft.blockOwners.get(type) ?? 'the editor';
                throw new Error(
                    `Duplicate ${field} for block "${type}": set by plugin "${first}" and plugin "${owner}".`,
                );
            }
            Object.assign(folded, { [field]: value });
        }
        draft.blocks.set(type, folded);
    }
};

/**
 * What a content declares: styling hooks, block, inline and mark types, block attributes.
 */
const addContent = (draft: Draft, content: RteContent | undefined, owner: string): void => {
    if (content?.contentClassName) {
        draft.contentClassNames.push(content.contentClassName);
    }
    Object.assign(draft.contentProperties, content?.contentProperties);
    Object.assign(draft.contentStyles, content?.contentStyles);
    addBlockExtensions(draft, content?.extendBlocks ?? {}, owner);

    register('block type', draft.blocks, draft.blockOwners, owner, content?.blocks);
    register('inline type', draft.inlines, draft.inlineOwners, owner, content?.inlines);
    register('mark type', draft.marks, draft.markOwners, owner, content?.marks);
    register('block attribute', draft.blockAttributes, draft.attributeOwners, owner, content?.blockAttributes);
    for (const [type, definition] of Object.entries(content?.blocks ?? {})) {
        if (typeof definition.content === 'object' && 'items' in definition.content) {
            draft.itemTypeByList.set(type, definition.content.items);
        }
    }
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
        contentStyles: {},
        blockExtensions: new Map(),
        seenIds: new Map(),
        duplicateIds: new Set(),
        blockOwners: new Map(),
        inlineOwners: new Map(),
        markOwners: new Map(),
        attributeOwners: new Map(),
        editOwners: new Map(),
    };

    const ids: string[] = [];
    for (const entry of entries) {
        switch (entry.kind) {
            case 'content':
                addContent(draft, entry, firstTypeOf(entry));
                break;
            case 'plugin':
                assertHasId(entry);
                ids.push(entry.id);
                addEditing(draft, entry);
                addContent(draft, entry.content, entry.id);
                break;
            // Only an untyped caller gets here: every typed entry is one of the two kinds above.
            default:
                throw new Error(
                    `Unknown entry kind ${JSON.stringify((entry as { kind?: unknown }).kind)}: build a plugin with \`definePlugin\` and a content with \`defineContent\`.`,
                );
        }
    }

    foldBlockExtensions(draft);

    return {
        blocks: draft.blocks,
        inlines: draft.inlines,
        marks: byNesting(draft.marks),
        blockAttributes: draft.blockAttributes,
        itemTypeByList: draft.itemTypeByList,
        edits: draft.edits,
        ids,
        duplicateIds: [...draft.duplicateIds],
        hotkeys: draft.hotkeys,
        inputRules: forMatching(draft.inputRules),
        pasteHandlers: draft.pasteHandlers,
        toolbarItems: draft.toolbarItems,
        commands: draft.commands,
        contentClassNames: draft.contentClassNames,
        contentProperties: draft.contentProperties,
        contentStyles: draft.contentStyles,
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
 * A block's markup with what every block carries applied to its outermost
 * element — alignment on a text block, its class, the margin marker on one that owns its
 * margins. Shared by editor, readonly view and export so they agree.
 */
export const blockHtml = (
    registry: PluginRegistry,
    definition: BlockDefinition,
    stored: Record<string, unknown>,
): HtmlSpec => {
    let spec = definition.toHtml(blockValueOf(definition, stored));
    if (definition.content === 'text') {
        spec = withRootStyle(spec, blockAttributeStyle(registry, stored));
    }
    if (definition.className !== undefined) {
        const classNames = [];
        if (spec.attrs?.class !== undefined) {
            classNames.push(spec.attrs.class);
        }
        classNames.push(definition.className);
        spec = { ...spec, attrs: { ...spec.attrs, class: classNames.join(' ') } };
    }
    if (definition.ownsMargins === true) {
        spec = { ...spec, attrs: { ...spec.attrs, [OWN_MARGINS_ATTRIBUTE]: '' } };
    }
    return spec;
};
