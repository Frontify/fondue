/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FeatureDeclaration, type InputRule } from '../vocabulary/declarations';
import { DefinitionError } from '../vocabulary/errors';

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

/** A plugin the engine installs: data, with its fixed phase and its `before` and `after` constraints. */
export type PluginDescriptor = {
    id: string;
    phase: PluginPhase;
    before?: readonly string[];
    after?: readonly string[];
};

/** The undo history, whose phase puts Backspace right after an input rule before the list keys. */
export const HISTORY_PLUGIN: PluginDescriptor = { id: 'history', phase: 'history' };
/** Enter in the empty last paragraph of a container leaves it. */
export const CONTAINER_KEYS_PLUGIN: PluginDescriptor = { id: 'container-keys', phase: 'structure-keys' };
/** ProseMirror's base keymap: Enter, Backspace, Delete and select-all. */
export const BASE_KEYS_PLUGIN: PluginDescriptor = { id: 'base-keys', phase: 'base-keys' };
/** The package's own paste, drop, copy, cut and dragstart handlers. */
export const CLIPBOARD_PLUGIN: PluginDescriptor = { id: 'clipboard', phase: 'guard' };
/** The drop cursor of `prosemirror-dropcursor`. */
export const DROP_CURSOR_PLUGIN: PluginDescriptor = { id: 'drop-cursor', phase: 'structure' };
/** The last mark of each type that a `setMark` command set in the session, which `reapplyMark` sets again. */
export const LAST_MARK_PLUGIN: PluginDescriptor = { id: 'last-mark', phase: 'late' };
/** The gap cursor of `prosemirror-gapcursor`, whose arrow keys run before every base key. */
export const GAP_CURSOR_PLUGIN: PluginDescriptor = { id: 'gap-cursor', phase: 'structure' };
/** The plugins no feature owns, which every model installs before any feature's. */
export const ENGINE_PLUGINS: readonly PluginDescriptor[] = [
    BASE_KEYS_PLUGIN,
    CLIPBOARD_PLUGIN,
    CONTAINER_KEYS_PLUGIN,
    DROP_CURSOR_PLUGIN,
    GAP_CURSOR_PLUGIN,
    HISTORY_PLUGIN,
    LAST_MARK_PLUGIN,
];
/** The decorations of the editor parts' block decoration sources, one plugin for every source. */
export const BLOCK_DECORATIONS_PLUGIN: PluginDescriptor = { id: 'block-decorations', phase: 'late' };
/** The feature that installs the content checks, whose options they read, such as `enclosingHeadingLevel`. */
export const CONTENT_CHECKS_FEATURE = 'a11y.content-checks';
/** The content check results and the issue decorations the issues panel shows. */
export const CONTENT_ISSUES_PLUGIN: PluginDescriptor = { id: 'content-issues', phase: 'late' };
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
/** Each editor part's key handlers, which run before every feature's key bindings, as structural keys do. */
export const keyHandlersPlugin = (featureId: string): PluginDescriptor => ({
    id: `key-handlers:${featureId}`,
    phase: 'structure-keys',
});

/**
 * A code feature's rule that replaces the text before the caret matching `match`, which ends where the typed text
 * ends, with `replace`, where `$1` and `$<name>` insert its groups as `String.prototype.replace` does.
 */
export const textRule = (rule: { id: string; match: RegExp; replace: string }): InputRule => ({
    id: rule.id,
    kind: 'text-rule',
    match: rule.match,
    replace: rule.replace,
});

/**
 * A code feature's rule that runs `command` when the text from the block start to the caret matches `match`, with the
 * payload its named groups fill, converted by the command's payload declaration, then removes that text.
 */
export const blockRule = (rule: { id: string; match: RegExp; command: string }): InputRule => ({
    id: rule.id,
    kind: 'block-rule',
    match: rule.match,
    command: rule.command,
});

/**
 * A code feature's rule that puts `mark` on the text before the caret matching `match`, without the whitespace that
 * ends it, with the attributes its named groups fill, converted by the mark's declarations; a `url` group passes
 * `checkHref` and the feature's `allowedSchemes` and `allowedHosts`. With `enter`, Enter also ends a match.
 */
export const markRule = (rule: {
    id: string;
    match: RegExp;
    mark: string;
    on?: readonly ('input' | 'enter')[];
}): InputRule => ({ id: rule.id, kind: 'mark-rule', match: rule.match, mark: rule.mark, on: rule.on ?? ['input'] });

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

export type PluginContribution = {
    featureId: string;
    plugin: PluginDescriptor;
};

/** Every plugin key a capability of the package contributes, whether or not a model uses that capability. */
const PACKAGE_PLUGIN_KEYS: ReadonlySet<string> = new Set([
    ...ENGINE_PLUGINS.map(({ id }) => id),
    CONTENT_ISSUES_PLUGIN.id,
    INPUT_RULES_PLUGIN.id,
    BLOCK_DECORATIONS_PLUGIN.id,
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
