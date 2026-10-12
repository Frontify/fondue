/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type CapabilityName,
    type CommandDefinition,
    type DecorationSource,
    type FeatureDeclaration,
    type InputRule,
    type JsonObject,
    type JsonValue,
    type PayloadDeclaration,
    type PayloadOf,
    type SuggestionSource,
} from './declarations';
import { DefinitionError } from './errors';

/** Every `CapabilityName` the package accepts. */
export const CAPABILITY_NAMES: readonly string[] = (
    'toggleMark setMark removeMark setBlock wrapIn lift toggleList indentItem outdentItem toggleTask insertNode ' +
    'insertText block setAttributes indentLines table openControl upload reapplyMark history pastePlainText embed ' +
    'stepAttribute firstOf'
).split(' ');

/** Plugin phases in run order. */
export const PLUGIN_PHASES = [
    'guard',
    'suggestions',
    'history',
    'structure-keys',
    'general-keys',
    'input-rules',
    'structure',
    'base-keys',
    'late',
] as const;
export type PluginPhase = (typeof PLUGIN_PHASES)[number];

/** A plugin a capability contributes: data, with its fixed phase and its `before` and `after` constraints. */
export interface PluginDescriptor {
    readonly id: string;
    readonly phase: PluginPhase;
    readonly before?: readonly string[];
    readonly after?: readonly string[];
}

/** The undo history, whose phase puts Backspace right after an input rule before the list keys. */
export const HISTORY_PLUGIN: PluginDescriptor = { id: 'history', phase: 'history' };
/** Enter in the empty last paragraph of a container leaves it. */
export const CONTAINER_KEYS_PLUGIN: PluginDescriptor = { id: 'container-keys', phase: 'structure-keys' };
/** Enter and Backspace in a list or task item, before the container keys. */
export const LIST_KEYS_PLUGIN: PluginDescriptor = {
    id: 'list-keys',
    phase: 'structure-keys',
    before: [CONTAINER_KEYS_PLUGIN.id],
};
/** Mod-Enter and ArrowDown in a code block, before the list keys. */
export const CODE_KEYS_PLUGIN: PluginDescriptor = {
    id: 'code-keys',
    phase: 'structure-keys',
    before: [LIST_KEYS_PLUGIN.id],
};
/** ProseMirror's base keymap: Enter, Backspace, Delete and select-all. */
export const BASE_KEYS_PLUGIN: PluginDescriptor = { id: 'base-keys', phase: 'base-keys' };
/** The package's own paste, drop, copy, cut and dragstart handlers. */
export const CLIPBOARD_PLUGIN: PluginDescriptor = { id: 'clipboard', phase: 'guard' };
/** The drop cursor of `prosemirror-dropcursor`. */
export const DROP_CURSOR_PLUGIN: PluginDescriptor = { id: 'drop-cursor', phase: 'structure' };
/** The last mark a `setMark` command set in the session, which `reapplyMark` sets again. */
export const LAST_MARK_PLUGIN: PluginDescriptor = { id: 'last-mark', phase: 'late' };
/** The gap cursor of `prosemirror-gapcursor`, whose arrow keys run before every base key. */
export const GAP_CURSOR_PLUGIN: PluginDescriptor = { id: 'gap-cursor', phase: 'structure' };
/** One plugin key, one instance: a plugin several capabilities contribute sits at its first contributor's position. */
export const CAPABILITY_PLUGINS: Readonly<Partial<Record<CapabilityName, readonly PluginDescriptor[]>>> = {
    history: [HISTORY_PLUGIN],
    // `core` always declares `text.insert`, so its capability carries the base keys, paste, copy and drop into every model.
    insertText: [BASE_KEYS_PLUGIN, CLIPBOARD_PLUGIN, DROP_CURSOR_PLUGIN, GAP_CURSOR_PLUGIN],
    wrapIn: [CONTAINER_KEYS_PLUGIN],
    // Every list feature indents its items, so this capability carries the list keys into each model with lists.
    indentItem: [LIST_KEYS_PLUGIN],
    // A code block's indent and outdent, so the code keys ride with either command.
    indentLines: [CODE_KEYS_PLUGIN],
    reapplyMark: [LAST_MARK_PLUGIN],
};
/** The decoration sources a feature may name. `find-matches` and `content-issues` have no plugin yet. */
export const DECORATION_SOURCES: readonly DecorationSource[] = ['code-syntax', 'find-matches', 'content-issues'];
/** Highlighting of code blocks, drawn as decorations. */
export const CODE_SYNTAX_PLUGIN: PluginDescriptor = { id: 'code-syntax', phase: 'late' };
/** The plugins each decoration source contributes. A source with none is still a valid name. */
export const DECORATION_PLUGINS: Readonly<Partial<Record<DecorationSource, readonly PluginDescriptor[]>>> = {
    'code-syntax': [CODE_SYNTAX_PLUGIN],
};
/** The suggestion sources a feature may name. */
export const SUGGESTION_SOURCES: readonly SuggestionSource[] = ['references', 'emoji'];
/** A payload of the kind each source's items carry, which a suggestion's command must accept. */
export const SUGGESTION_PAYLOADS: Readonly<Record<SuggestionSource, JsonObject>> = {
    references: { resourceType: 'user', resourceId: 'user-1', labelSnapshot: 'Ada' },
    emoji: { text: '\u{1F600}' },
};
/** The open suggestion list: its query, its keys and the replacement of the trigger and query by the chosen item. */
export const SUGGESTIONS_PLUGIN: PluginDescriptor = { id: 'suggestions', phase: 'suggestions' };
/** The package's input rule engine, one plugin for every feature's rules. */
export const INPUT_RULES_PLUGIN: PluginDescriptor = { id: 'input-rules', phase: 'input-rules' };
/** The normalizer that gives nodes a missing or repeated `nodeId` a new one. */
export const NODE_IDS_PLUGIN: PluginDescriptor = { id: 'node-ids', phase: 'structure' };
/** Whether a node's attributes, declared or as the engine schema holds them, include an occurrence `nodeId`. */
export const hasNodeId = (attrs: object): boolean => Object.hasOwn(attrs, 'nodeId');
/** Whether a feature declares a node that carries a `nodeId`, so it contributes the `node-ids` normalizer. */
export const declaresNodeIds = (declaration: FeatureDeclaration): boolean =>
    Object.values(declaration.nodes ?? {}).some(({ attrs }) => hasNodeId(attrs));
/** Each feature's own key bindings; features that bind one key run in plugin order. */
export const keymapPlugin = (featureId: string): PluginDescriptor => ({
    id: `keymap:${featureId}`,
    phase: 'general-keys',
});

const command = <P>(
    capability: CapabilityName,
    args: Readonly<Record<string, JsonValue | undefined>>,
    payload?: PayloadDeclaration,
) => {
    const data: Record<string, JsonValue> = {};
    for (const [name, value] of Object.entries(args)) {
        if (value !== undefined) {
            data[name] = value;
        }
    }
    const definition = payload === undefined ? { capability, args: data } : { capability, args: data, payload };
    return definition as unknown as CommandDefinition<P>;
};

/** Turns the selected textblocks into `node`; with `toggle`, back into paragraphs when they already are. */
export const setBlock = <const P extends PayloadDeclaration | undefined = undefined>(
    node: string,
    options?: { readonly attrs?: JsonObject; readonly toggle?: boolean; readonly payload?: P },
): CommandDefinition<PayloadOf<P>> =>
    command(
        'setBlock',
        { node, attrs: options?.attrs, toggle: options?.toggle },
        options === undefined ? undefined : options.payload,
    );

/**
 * Inserts `node` at the selection, or adds or removes it as an optional child; with `newlineInCode`, a code block
 * gets a newline in its place, as a hard break does. A block replaces the empty textblock that holds a caret, goes
 * before a textblock with the caret at its start, and otherwise after the block that holds the selection end, or
 * always after the top-level block with `place: 'after-top-level-block'`; a block that ends up last gets an empty
 * paragraph after it. With `limit: 'columns'`, it applies only while the document holds fewer of `node` than the
 * presentation's columns minus one.
 */
export const insertNode = <const P extends PayloadDeclaration | undefined = undefined>(
    node: string,
    options?: {
        readonly attrs?: JsonObject;
        readonly child?: 'add' | 'remove' | 'toggle';
        readonly newlineInCode?: boolean;
        readonly place?: 'after-top-level-block';
        readonly limit?: 'columns';
        readonly payload?: P;
    },
): CommandDefinition<PayloadOf<P>> =>
    command(
        'insertNode',
        {
            node,
            attrs: options?.attrs,
            child: options?.child,
            newlineInCode: options?.newlineInCode,
            place: options?.place,
            limit: options?.limit,
        },
        options === undefined ? undefined : options.payload,
    );

export const history = (action: 'undo' | 'redo'): CommandDefinition => command('history', { action });

/** Replaces the selection with the payload's `text`. */
export const insertText = (): CommandDefinition<{ readonly text: string }> =>
    command('insertText', {}, { fields: { text: { type: 'string' } } });

/**
 * Toggles `mark` with `attrs` on the selection, or in the stored marks at a caret; adding it removes the `removes`
 * mark from the range when the model installs that one, as subscript and superscript do to each other.
 */
export const toggleMark = (mark: string, attrs?: JsonObject, removes?: string): CommandDefinition =>
    command('toggleMark', { mark, attrs, removes });

/** Wraps the selected blocks in `node`, or lifts them out when they are already inside one. */
export const wrapIn = (node: string): CommandDefinition => command('wrapIn', { node });

/** Moves the block at the selection up or down among its siblings, as one undo step. */
export const block = (action: 'move-up' | 'move-down'): CommandDefinition => command('block', { action });

/**
 * A code feature's rule that replaces the text before the caret matching `match`, which ends where the typed text
 * ends, with `replace`, where `$1` and `$<name>` insert its groups as `String.prototype.replace` does.
 */
export const textRule = (rule: {
    readonly id: string;
    readonly match: RegExp;
    readonly replace: string;
}): InputRule => ({ id: rule.id, kind: 'text-rule', match: rule.match, replace: rule.replace });

/**
 * A code feature's rule that runs `command` when the text from the block start to the caret matches `match`, with the
 * payload its named groups fill, converted by the command's payload declaration, then removes that text.
 */
export const blockRule = (rule: {
    readonly id: string;
    readonly match: RegExp;
    readonly command: string;
}): InputRule => ({ id: rule.id, kind: 'block-rule', match: rule.match, command: rule.command });

/**
 * Wraps the selected blocks in `list` with `item`s, turns the list at the selection's depth into `list`, or turns its
 * selected items into paragraphs when it already is one.
 */
export const toggleList = <const P extends PayloadDeclaration | undefined = undefined>(
    list: string,
    item: string,
    payload?: P,
): CommandDefinition<PayloadOf<P>> => command('toggleList', { list, item }, payload);

/** Nests the selected `item`s under their previous sibling, keeping their children. */
export const indentItem = (item: string): CommandDefinition => command('indentItem', { item });

/** Moves the selected `item`s one level out, or out of the list as paragraphs at the top level. */
export const outdentItem = (item: string): CommandDefinition => command('outdentItem', { item });

/** Indents or outdents, by two spaces, the lines the selection touches in one code block. */
export const indentLines = (direction: 'indent' | 'outdent'): CommandDefinition =>
    command('indentLines', { direction });

/** Flips `checked` on the `item` at the selection by running `setChecked`, which takes `{ nodeId, checked }`. */
export const toggleTask = (item: string, setChecked: string): CommandDefinition =>
    command('toggleTask', { item, setChecked });

/**
 * Sets the payload's fields as attributes of the node that its `nodeId` names, else of every selected textblock of a
 * listed type, else of the nearest node of a listed type around the selection. With `toggle`, removes the values when
 * every target already has them.
 */
export const setAttributes = <const P extends PayloadDeclaration>(
    node: string | readonly string[],
    payload: P,
    options?: { readonly toggle?: boolean },
): CommandDefinition<PayloadOf<P>> => {
    let nodes: string | string[] = node as string;
    if (Array.isArray(node)) {
        nodes = [...(node as readonly string[])];
    }
    return command('setAttributes', { node: nodes, toggle: options?.toggle }, payload);
};

/** Package-built controls a command opens; `text-style` is the toolbar picker a presentation names. */
export type ControlId =
    | 'text-style'
    | 'link'
    | 'color-menu'
    | 'language'
    | 'mention-search'
    | 'emoji'
    | 'find'
    | 'outline'
    | 'checks'
    | 'numbering'
    | 'image-alt'
    | 'media-picker'
    | 'embed'
    | 'embed-edit';

/** Opens a package-built control, such as the numbering dialog of `list.ordered.start.edit` or the emoji picker. */
export const openControl = <const P extends PayloadDeclaration | undefined = undefined>(
    control: ControlId,
    payload?: P,
): CommandDefinition<PayloadOf<P>> => command('openControl', { control }, payload);

/**
 * Sets `mark` with the payload's fields as its attributes on the selection, or in the stored marks at a caret; a null
 * payload removes it. With `extendToMarkRange`, a caret inside the mark acts on the whole mark range.
 */
export const setMark = <const P extends PayloadDeclaration>(
    mark: string,
    payload: P,
    options?: { readonly extendToMarkRange?: boolean },
): CommandDefinition<PayloadOf<P>> =>
    command('setMark', { mark, extendToMarkRange: options?.extendToMarkRange }, payload);

/**
 * Removes the listed marks that the model installs from the selection, or from the stored marks at a caret, as one
 * undo step; like `removes` of `toggleMark`, a mark the model does not install is skipped.
 */
export const removeMark = (
    marks: string | readonly string[],
    options?: { readonly extendToMarkRange?: boolean },
): CommandDefinition => {
    let names: string[] = [marks as string];
    if (Array.isArray(marks)) {
        names = [...(marks as readonly string[])];
    }
    return command('removeMark', { installed: names, extendToMarkRange: options?.extendToMarkRange });
};

/** Sets again the last of the listed marks that a `setMark` command set in this session, with its attributes. */
export const reapplyMark = (marks: readonly string[]): CommandDefinition =>
    command('reapplyMark', { installed: [...marks] });

/** The first cycle that `next` reaches from `starts`, as a path that ends where it starts. */
export const findCycle = (starts: readonly string[], next: (id: string) => readonly string[]): string[] | undefined => {
    const done = new Set<string>();
    const stack: string[] = [];
    const visit = (id: string): string[] | undefined => {
        const onStack = stack.indexOf(id);
        if (onStack >= 0) {
            return [...stack.slice(onStack), id];
        }
        if (done.has(id)) {
            return undefined;
        }
        stack.push(id);
        for (const target of next(id)) {
            const cycle = visit(target);
            if (cycle !== undefined) {
                return cycle;
            }
        }
        stack.pop();
        done.add(id);
        return undefined;
    };
    for (const start of starts) {
        const cycle = visit(start);
        if (cycle !== undefined) {
            return cycle;
        }
    }
    return undefined;
};

export interface PluginContribution {
    readonly featureId: string;
    readonly plugin: PluginDescriptor;
}

/** Every plugin key a capability of the package contributes, whether or not a model uses that capability. */
const PACKAGE_PLUGIN_KEYS: ReadonlySet<string> = new Set([
    ...Object.values(CAPABILITY_PLUGINS).flatMap((plugins) => (plugins ?? []).map(({ id }) => id)),
    ...Object.values(DECORATION_PLUGINS).flatMap((plugins) => (plugins ?? []).map(({ id }) => id)),
    INPUT_RULES_PLUGIN.id,
    NODE_IDS_PLUGIN.id,
    SUGGESTIONS_PLUGIN.id,
]);

const sameDescriptor = (a: PluginDescriptor, b: PluginDescriptor) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Orders contributed plugins by phase, then by `before` and `after`, then by contribution order, which follows
 * the host's feature list. A constraint on a known plugin that no contribution installs does not apply.
 */
export const orderPlugins = (
    contributions: readonly PluginContribution[],
    knownKeys: ReadonlySet<string> = PACKAGE_PLUGIN_KEYS,
): readonly PluginDescriptor[] => {
    const plugins = new Map<string, PluginContribution>();
    for (const contribution of contributions) {
        const first = plugins.get(contribution.plugin.id);
        if (first === undefined) {
            plugins.set(contribution.plugin.id, contribution);
        } else if (!sameDescriptor(first.plugin, contribution.plugin)) {
            const features = [first.featureId, contribution.featureId];
            throw new DefinitionError('definition.duplicate-id', {
                kind: 'plugin',
                id: contribution.plugin.id,
                features,
            });
        }
    }
    const descriptors = [...plugins.values()].map(({ plugin }) => plugin);
    const successors = new Map<string, string[]>(descriptors.map((plugin) => [plugin.id, []]));
    const phaseOf = (plugin: PluginDescriptor) => PLUGIN_PHASES.indexOf(plugin.phase);
    const constrain = (plugin: PluginDescriptor, target: string, before: boolean) => {
        const other = plugins.get(target);
        if (other === undefined && knownKeys.has(target)) {
            return;
        }
        const first = before ? plugin : other?.plugin;
        const second = before ? other?.plugin : plugin;
        if (other === undefined || first === undefined || second === undefined || phaseOf(first) > phaseOf(second)) {
            throw new DefinitionError('definition.unsatisfied-order', { plugin: plugin.id, target, before });
        }
        if (phaseOf(first) === phaseOf(second)) {
            successors.get(first.id)?.push(second.id);
        }
    };
    for (const plugin of descriptors) {
        for (const target of plugin.before ?? []) {
            constrain(plugin, target, true);
        }
        for (const target of plugin.after ?? []) {
            constrain(plugin, target, false);
        }
    }
    const cycle = findCycle(
        descriptors.map(({ id }) => id),
        (id) => successors.get(id) ?? [],
    );
    if (cycle !== undefined) {
        throw new DefinitionError('definition.dependency-cycle', { kind: 'plugin', path: cycle });
    }
    const ordered: PluginDescriptor[] = [];
    const placed = new Set<string>();
    const waiting = (plugin: PluginDescriptor) =>
        descriptors.some((other) => !placed.has(other.id) && (successors.get(other.id) ?? []).includes(plugin.id));
    for (const phase of PLUGIN_PHASES) {
        const pending = descriptors.filter((plugin) => plugin.phase === phase);
        while (pending.length > 0) {
            const index = pending.findIndex((plugin) => !waiting(plugin));
            const [next] = pending.splice(index, 1);
            if (next !== undefined) {
                ordered.push(next);
                placed.add(next.id);
            }
        }
    }
    return ordered;
};
