/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type CapabilityName,
    type CommandDefinition,
    type FeatureDeclaration,
    type InputRule,
    type JsonObject,
    type JsonValue,
    type PayloadDeclaration,
    type PayloadOf,
} from './declarations';
import { DefinitionError } from './errors';

/** Every `CapabilityName` of the Capability catalogue. */
export const CAPABILITY_NAMES: readonly string[] = (
    'toggleMark setMark removeMark setBlock wrapIn lift toggleList indentItem outdentItem toggleTask insertNode ' +
    'insertText block setAttributes indentLines table openControl upload reapplyMark history pastePlainText embed ' +
    'stepAttribute firstOf'
).split(' ');

/** Plugin phases in run order (SPEC-rich-text/AC-026). */
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
/** Enter in the empty last paragraph of a container leaves it (SPEC-rich-text-editing, Key precedence row 8). */
export const CONTAINER_KEYS_PLUGIN: PluginDescriptor = { id: 'container-keys', phase: 'structure-keys' };
/** ProseMirror's base keymap: Enter, Backspace, Delete and select-all (SPEC-rich-text-editing, Key precedence row 10). */
export const BASE_KEYS_PLUGIN: PluginDescriptor = { id: 'base-keys', phase: 'base-keys' };
/** One plugin key, one instance: a plugin several capabilities contribute sits at its first contributor's position. */
export const CAPABILITY_PLUGINS: Readonly<Partial<Record<CapabilityName, readonly PluginDescriptor[]>>> = {
    history: [HISTORY_PLUGIN],
    insertText: [BASE_KEYS_PLUGIN],
    wrapIn: [CONTAINER_KEYS_PLUGIN],
};
/** The package's input rule engine, one plugin for every feature's rules (SPEC-rich-text-editing, Input rules). */
export const INPUT_RULES_PLUGIN: PluginDescriptor = { id: 'input-rules', phase: 'input-rules' };
/** The normalizer that gives nodes a missing or repeated `nodeId` a new one (SPEC-rich-text-runtime/AC-092). */
export const NODE_IDS_PLUGIN: PluginDescriptor = { id: 'node-ids', phase: 'structure' };
/** Whether a node's attributes, declared or as the engine schema holds them, include an occurrence `nodeId`. */
export const hasNodeId = (attrs: object): boolean => Object.hasOwn(attrs, 'nodeId');
/** Whether a feature declares a node that carries a `nodeId`, so it contributes the `node-ids` normalizer. */
export const declaresNodeIds = (declaration: FeatureDeclaration): boolean =>
    Object.values(declaration.nodes ?? {}).some(({ attrs }) => hasNodeId(attrs));
/** Each feature's own key bindings; features that bind one key run in plugin order (SPEC-rich-text/AC-060). */
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

/** Inserts `node` at the selection, or adds or removes it as an optional child. */
export const insertNode = <const P extends PayloadDeclaration | undefined = undefined>(
    node: string,
    options?: { readonly attrs?: JsonObject; readonly child?: 'add' | 'remove' | 'toggle'; readonly payload?: P },
): CommandDefinition<PayloadOf<P>> =>
    command(
        'insertNode',
        { node, attrs: options?.attrs, child: options?.child },
        options === undefined ? undefined : options.payload,
    );

export const history = (action: 'undo' | 'redo'): CommandDefinition => command('history', { action });

/** Replaces the selection with the payload's `text`. */
export const insertText = (): CommandDefinition<{ readonly text: string }> =>
    command('insertText', {}, { fields: { text: { type: 'string' } } });

/** Toggles `mark` with `attrs` on the selection, or in the stored marks at a caret. */
export const toggleMark = (mark: string, attrs?: JsonObject): CommandDefinition =>
    command('toggleMark', { mark, attrs });

/** Wraps the selected blocks in `node`; with `toggle`, lifts them out when they are already inside one. */
export const wrapIn = (node: string, options?: { readonly toggle?: boolean }): CommandDefinition =>
    command('wrapIn', { node, toggle: options?.toggle });

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
    INPUT_RULES_PLUGIN.id,
    NODE_IDS_PLUGIN.id,
]);

const sameDescriptor = (a: PluginDescriptor, b: PluginDescriptor) => JSON.stringify(a) === JSON.stringify(b);

/**
 * Orders contributed plugins by phase, then by `before` and `after`, then by contribution order, which follows
 * the host's feature list (DR-054). A constraint on a known plugin that no contribution installs does not apply.
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
