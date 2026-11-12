/* (c) Copyright Frontify Ltd., all rights reserved. */

// The plugin list flattened into one engine-agnostic lookup. With the content
// registry, the only place that reads `RtePlugin` and `RteContent`: the editor
// shell, engine and renderer read the registry, so each declaration is
// gathered, ordered and checked once.

import { type ReactNode } from 'react';

import { EDITOR_SHORTCUTS, type EditorControlApi, type RteMarkState, type RteSelectionSnapshot } from './commands';
import { buildContentRegistry, type ContentRegistry, register } from './contentRegistry';
import { parseHotkey } from './hotkeys';
import { readTagRule } from './parseReader';
import {
    type BlockDefinition,
    type HotkeyHandler,
    type MarkParseRule,
    onlyTypeOf,
    type PasteHandler,
    type PasteTransform,
    type PasteTransformContext,
    type RteBlockCommand,
    type RteCommandTarget,
    type RteContent,
    type RteDelimiterRule,
    type RteEditView,
    type RteIcon,
    type RteInputRule,
    type RtePlugin,
    type RteToolbarEntry,
    type RteToolbarGroup,
    type SelectedNode,
    type ToolbarItemProps,
} from './plugin';
import { PARAGRAPH } from './vocabulary';

/** The entries of one toolbar group, in mount order; `id` is undefined for the entries of plugins with no group. */
export type ToolbarEntryGroup = {
    id: string | undefined;
    entries: readonly ToolbarEntry[];
};

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
    /** A block holding nothing, for example a column break. */
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
    /** The plugin's `toolbarGroup`; none puts it after every group. */
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

/**
 * Who binds a shortcut: the editor itself, or one plugin
 */
export type RteShortcutOwner = { kind: 'editor' } | { kind: 'plugin'; pluginId: string };

/**
 * A key the editor or a plugin binds, as the keyboard reference lists it
 */
export type RteShortcut = {
    owner: RteShortcutOwner;
    /**
     * In `Mod-b` style
     */
    key: string;
    label: string;
};

export type PluginRegistry = ContentRegistry & {
    /**
     * Node type → the editor's view of it, from the plugins' `edit`.
     */
    edits: Map<string, RteEditView>;
    /** Plugin ids in mount order: the editor's identity — a new set builds a new editor. */
    ids: readonly string[];
    /** Ids declared by more than one plugin, which the editor warns about. */
    duplicateIds: readonly string[];
    /**
     * Key → its handlers, owners of the key first, then the rest, each in mount order; they run until one handles it
     */
    hotkeys: Map<string, readonly HotkeyHandler[]>;
    /**
     * Every key bound, labelled: the editor's own first, then each plugin's `hotkeys` and the toolbar `shortcut`s that bind a key too, plugin by plugin in declaration order.
     */
    shortcuts: readonly RteShortcut[];
    /**
     * Every typing rule, ordered for matching: mark rules first, longest
     * delimiter first — or (for example) `**bold**` would be read as an italic `*` wrapping
     * `*bold*` — then the rest as declared.
     */
    inputRules: readonly RteInputRule[];
    /** Every plugin's `onPaste`, in mount order; they run until one handles the paste. */
    pasteHandlers: readonly PasteHandler[];
    /** Every plugin's `pasteTransforms`, in mount order, each shared one once. */
    pasteTransforms: readonly PasteTransform[];
    /** The toolbar's controls, in mount order. */
    toolbarItems: readonly ToolbarEntry[];
    /** Every block command the plugins offer, in mount order. */
    commands: readonly RteBlockCommand[];
    /**
     * Every plugin's `description`, in mount order
     */
    descriptions: readonly string[];
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

/** A block's own attributes: everything but its type and children. */
const attributesOf = (block: Record<string, unknown>): Record<string, unknown> =>
    Object.fromEntries(Object.entries(block).filter(([name]) => name !== 'type' && name !== 'children'));

/**
 * The entry's type at the selection: a mark as its whole run, edges included;
 * the innermost block of that type around the selection. Null when the
 * selection is not in one, and always for an inline, which it only sits beside.
 */
export const selectedNodeOf = (
    own: OwnType,
    api: EditorControlApi,
    selection: RteSelectionSnapshot,
): SelectedNode | null => {
    switch (own.kind) {
        case 'mark': {
            const run = api.marks.getRun(own.type);
            if (run === null) {
                return null;
            }
            return { type: own.type, value: run.value, text: run.text };
        }
        // The selection sits beside an inline, never in one.
        case 'inline':
        case 'none':
            return null;
        case 'list':
        case 'container':
        case 'textBlock':
        case 'voidBlock': {
            // Innermost first, so a list nested in a list finds the inner one.
            const block = selection.blocks.find((candidate) => candidate.type === own.type);
            if (block === undefined) {
                return null;
            }
            return { type: own.type, value: attributesOf(block), text: selection.text };
        }
    }
};

type SelectionBlock = RteSelectionSnapshot['blocks'][number];

/** Whether the block is the one the command names: its type, and every attribute the command lists. */
const isCommandTarget = (target: RteCommandTarget, block: SelectionBlock): boolean => {
    if (target.type !== block.type) {
        return false;
    }
    return Object.entries(target.attributes ?? {}).every(([name, value]) => block[name] === value);
};

/** Whether the type holds other blocks (`content: { blocks }`), as a list item does. */
const holdsBlocks = (type: string, registry: ContentRegistry): boolean => {
    const content = registry.blocks.get(type)?.content;
    return typeof content === 'object' && 'blocks' in content;
};

/**
 * The command whose `active` block the selection is in, if any. Blocks are
 * read innermost first, so a block inside an item of another block names the
 * inner one. A text block that is the content of a block holding blocks (for
 * example, a list item) is skipped, so the container's command names the selection; any
 * other text block names it itself.
 */
export const activeCommand = (
    commands: readonly RteBlockCommand[],
    selection: RteSelectionSnapshot,
    registry: ContentRegistry,
): RteBlockCommand | undefined => {
    const { blocks } = selection;
    for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];
        const outer = blocks[index + 1];
        if (block === undefined) {
            continue;
        }
        if (block.type === PARAGRAPH && outer !== undefined && holdsBlocks(outer.type, registry)) {
            continue;
        }
        const command = commands.find(
            (candidate) => candidate.active !== undefined && isCommandTarget(candidate.active, block),
        );
        if (command !== undefined) {
            return command;
        }
    }
    return undefined;
};

const NOTHING_TO_TOGGLE = 'nothing to toggle: name a mark, list, text block, void block or inline with `toggles`.';

/**
 * Throws unless the label is a non-empty string. A toolbar label is the control's only accessible name and a hotkey's names it in the keyboard reference, so an untyped caller cannot leave it out.
 */
const assertLabelled = (plugin: RtePlugin, label: unknown, subject: string): void => {
    if (typeof label !== 'string' || label === '') {
        throw new Error(`Plugin "${plugin.id}" has ${subject} with no \`label\`.`);
    }
};

const toolbarEntryOf = (plugin: RtePlugin, entry: RteToolbarEntry, key: string): ToolbarEntry => {
    const type = entry.toggles ?? onlyTypeOf(plugin.content);
    const own = ownTypeOf(plugin.content, type);
    if (entry.toggles !== undefined && own.kind === 'none') {
        throw new Error(`Plugin "${plugin.id}" toggles "${entry.toggles}", which its content does not declare.`);
    }
    assertLabelled(plugin, entry.label, 'a toolbar entry');
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
                active: { type: own.type },
                run: (api) => api.blocks.setType(own.type),
            };
        case 'list':
            return {
                ...command,
                id: own.type,
                group: 'turnInto',
                active: { type: own.type },
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

/** Built per call, so no module-level code keeps this file in a bundle that only renders. */
const editorShortcutRows = (): RteShortcut[] =>
    Object.values(EDITOR_SHORTCUTS).map(({ key, label }) => ({
        owner: { kind: 'editor' },
        key,
        label,
    }));

/** The first plugin to declare a toolbar group, and the order it gave it. */
type ToolbarGroupOwner = { pluginId: string; order: number };

/**
 * What `buildPluginRegistry` fills while it walks the plugins.
 */
type Draft = {
    edits: Map<string, RteEditView>;
    hotkeys: Map<string, HotkeyHandler[]>;
    shortcuts: RteShortcut[];
    /**
     * How many handlers at the front of each key's list belong to owners of that key
     */
    ownedHotkeyCounts: Map<string, number>;
    inputRules: RteInputRule[];
    pasteHandlers: PasteHandler[];
    pasteTransforms: Map<string, PasteTransform>;
    toolbarItems: ToolbarEntry[];
    toolbarGroupOwners: Map<string, ToolbarGroupOwner>;
    commands: RteBlockCommand[];
    commandOwners: Map<string, string>;
    descriptions: string[];
    /**
     * How often each id has come up so far, for unique toolbar keys
     */
    seenIds: Map<string, number>;
    duplicateIds: Set<string>;
    editOwners: Map<string, string>;
    pasteTransformOwners: Map<string, string>;
};

const addHotkey = (draft: Draft, keys: string, handler: HotkeyHandler): void => {
    draft.hotkeys.set(keys, [...(draft.hotkeys.get(keys) ?? []), handler]);
};

/**
 * Puts the owner's handler after the owners already mounted and before every other handler of the key.
 */
const addOwnedHotkey = (draft: Draft, keys: string, handler: HotkeyHandler): void => {
    const handlers = draft.hotkeys.get(keys) ?? [];
    const owned = draft.ownedHotkeyCounts.get(keys) ?? 0;
    draft.hotkeys.set(keys, [...handlers.slice(0, owned), handler, ...handlers.slice(owned)]);
    draft.ownedHotkeyCounts.set(keys, owned + 1);
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
    // Throws for a modifier the grammar does not know, before the editor mounts.
    parseHotkey(shortcut);
    addHotkey(draft, shortcut, (api) => toggleOwn({ own: item.own, api, selection: api.selection.get() }));
    draft.shortcuts.push({ owner: { kind: 'plugin', pluginId: plugin.id }, key: shortcut, label: item.label });
};

/**
 * Throws unless the plugin's toolbar group has an id and a finite order, and agrees on that order with every plugin that shares the id. The order is what the toolbar draws by, so one group with two orders has no right place.
 */
const assertToolbarGroup = (draft: Draft, plugin: RtePlugin): void => {
    const group = plugin.toolbarGroup;
    if (group === undefined) {
        return;
    }
    // Falsy covers an untyped declaration with no id, as well as an empty one.
    if (!group.id) {
        throw new TypeError(`Plugin "${plugin.id}" has a \`toolbarGroup\` with no \`id\`.`);
    }
    if (!Number.isFinite(group.order)) {
        throw new TypeError(
            `Plugin "${plugin.id}" has toolbar group "${group.id}" with an \`order\` that is not a finite number.`,
        );
    }
    const first = draft.toolbarGroupOwners.get(group.id);
    if (first === undefined) {
        draft.toolbarGroupOwners.set(group.id, { pluginId: plugin.id, order: group.order });
        return;
    }
    if (first.order !== group.order) {
        throw new Error(
            `Toolbar group "${group.id}" has order ${first.order} in plugin "${first.pluginId}" and order ${group.order} in plugin "${plugin.id}".`,
        );
    }
};

const addToolbarEntries = (draft: Draft, plugin: RtePlugin, pluginKey: string): void => {
    assertToolbarGroup(draft, plugin);
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
 * What a plugin adds beyond its content: hotkeys, toolbar, input rules, paste, commands, edit views, descriptions.
 */
const addEditing = (draft: Draft, plugin: RtePlugin): void => {
    const occurrence = draft.seenIds.get(plugin.id) ?? 0;
    if (occurrence > 0) {
        draft.duplicateIds.add(plugin.id);
    }
    draft.seenIds.set(plugin.id, occurrence + 1);
    const unbound = new Set(plugin.ownedHotkeys ?? []);
    for (const [keys, hotkey] of Object.entries(plugin.hotkeys ?? {})) {
        // Throws for a modifier the grammar does not know, before the editor mounts.
        parseHotkey(keys);
        assertLabelled(plugin, hotkey.label, `a hotkey "${keys}"`);
        if (unbound.delete(keys)) {
            addOwnedHotkey(draft, keys, hotkey.run);
        } else {
            addHotkey(draft, keys, hotkey.run);
        }
        draft.shortcuts.push({ owner: { kind: 'plugin', pluginId: plugin.id }, key: keys, label: hotkey.label });
    }
    const [unboundKeys] = unbound;
    if (unboundKeys !== undefined) {
        throw new Error(`Plugin "${plugin.id}" owns hotkey "${unboundKeys}", which its \`hotkeys\` does not bind.`);
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
    for (const transform of plugin.pasteTransforms ?? []) {
        register('paste transform', draft.pasteTransforms, draft.pasteTransformOwners, plugin.id, {
            [transform.id]: transform,
        });
    }
    for (const command of plugin.commands ?? []) {
        addCommand(draft, plugin.id, command);
    }
    addEditViews(draft, plugin);
    if (plugin.description !== undefined) {
        draft.descriptions.push(plugin.description);
    }
};

/**
 * The entries by toolbar group in drawing order: lowest `order` first, entries in the order given inside their group.
 * Groups with equal `order` keep the order their ids first appear in; entries of plugins with no group come last, together.
 */
export const toolbarGroupsOf = (entries: readonly ToolbarEntry[]): ToolbarEntryGroup[] => {
    const grouped = new Map<string, { order: number; entries: ToolbarEntry[] }>();
    const ungrouped: ToolbarEntry[] = [];
    for (const entry of entries) {
        const { group } = entry;
        if (group === undefined) {
            ungrouped.push(entry);
            continue;
        }
        const drawn = grouped.get(group.id);
        if (drawn === undefined) {
            grouped.set(group.id, { order: group.order, entries: [entry] });
        } else {
            drawn.entries.push(entry);
        }
    }
    // A stable sort: equal orders keep the order the ids were first seen in.
    const ordered = [...grouped.entries()].sort(([, a], [, b]) => a.order - b.order);
    const groups: ToolbarEntryGroup[] = ordered.map(([id, drawn]) => ({ id, entries: drawn.entries }));
    if (ungrouped.length > 0) {
        groups.push({ id: undefined, entries: ungrouped });
    }
    return groups;
};

/**
 * The content registry plus what the plugins add for editing.
 */
export const buildPluginRegistry = (entries: readonly (RtePlugin | RteContent)[]): PluginRegistry => {
    const content = buildContentRegistry(entries);
    const draft: Draft = {
        edits: new Map(),
        hotkeys: new Map(),
        shortcuts: editorShortcutRows(),
        ownedHotkeyCounts: new Map(),
        inputRules: [],
        pasteHandlers: [],
        pasteTransforms: new Map(),
        toolbarItems: [],
        toolbarGroupOwners: new Map(),
        commands: [],
        commandOwners: new Map(),
        descriptions: [],
        seenIds: new Map(),
        duplicateIds: new Set(),
        editOwners: new Map(),
        pasteTransformOwners: new Map(),
    };

    const ids: string[] = [];
    for (const entry of entries) {
        switch (entry.kind) {
            case 'content':
                break;
            case 'plugin':
                ids.push(entry.id);
                addEditing(draft, entry);
                break;
        }
    }

    return {
        ...content,
        edits: draft.edits,
        ids,
        duplicateIds: [...draft.duplicateIds],
        hotkeys: draft.hotkeys,
        shortcuts: draft.shortcuts,
        inputRules: forMatching(draft.inputRules),
        pasteHandlers: draft.pasteHandlers,
        pasteTransforms: [...draft.pasteTransforms.values()],
        toolbarItems: draft.toolbarItems,
        commands: draft.commands,
        descriptions: draft.descriptions,
    };
};

/**
 * Whether `rule` reads `element`: a tag rule whose selector matches it, and that skips it or finds a value on it.
 * Style and clear rules read no element of their own.
 */
const readsElement = (rule: MarkParseRule<unknown>, element: HTMLElement): boolean => {
    if (rule.tag === undefined || !element.matches(rule.tag)) {
        return false;
    }
    return readTagRule(rule, element).kind !== 'unread';
};

/**
 * The `isClaimed` a paste transform is handed: whether a mounted block, inline or mark reads an element by one of
 * its tag rules.
 */
export const isClaimedBy = (registry: ContentRegistry): PasteTransformContext['isClaimed'] => {
    const rules: MarkParseRule<unknown>[] = [];
    for (const node of [...registry.blocks.values(), ...registry.inlines.values(), ...registry.marks.values()]) {
        rules.push(...node.parse);
    }
    return (element) => rules.some((rule) => readsElement(rule, element));
};
