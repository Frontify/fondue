/* (c) Copyright Frontify Ltd., all rights reserved. */

import { keydownHandler } from 'prosemirror-keymap';
import { type Schema } from 'prosemirror-model';
import { type Command, type EditorState, Plugin, PluginKey, type Transaction } from 'prosemirror-state';

import { type CapabilityName, type ContentModel, type JsonObject, type PayloadDeclaration } from '#/model';
import { CAPABILITY_PLUGINS, declaresNodeIds, INPUT_RULES_PLUGIN, NODE_IDS_PLUGIN } from '#/model/capabilities';
import { compiledModel } from '#/model/compile';

import { type CompiledInputRule, compileInputRules } from './input-rules';
import { NORMALIZE_META, NORMALIZERS } from './normalizers';
import { buildSchema } from './schema';

export { type CompiledInputRule, type LineStartRule, type MarkDelimiterRule } from './input-rules';
export { carriesNodeId } from './schema';
export { NORMALIZE_META, type Normalizer, NORMALIZERS } from './normalizers';

/** The transaction meta that names the command a transaction runs, so the runtime reports it. */
export const COMMAND_META = 'rte.command';
/** The transaction meta that names a change's origin where no UI event or command does. */
export const ORIGIN_META = 'rte.origin';
/** The transaction meta that carries a root batch's `AppendBatch`, which the wrapped `appendTransaction` counts in. */
export const APPEND_BATCH_META = 'rte.append-batch';

/**
 * A command as the engine runs it, with no view, so commands that call `view.endOfTextblock` take their state-only
 * path, and whether its target is active, partly active or not.
 */
export interface EngineCommand {
    readonly run: (state: EditorState, dispatch?: (transaction: Transaction) => void, payload?: unknown) => boolean;
    readonly active: (state: EditorState, payload?: unknown) => boolean | 'mixed';
    /** The command's payload declaration; none means it takes no payload. */
    readonly payload?: PayloadDeclaration;
}
/** Builds the engine command of one capability from a command's data arguments. */
export type CapabilityImplementation = (args: JsonObject, schema: Schema) => EngineCommand;
/** Builds a package plugin whose code lives in the runtime, such as the history or the input rule engine. */
export type PluginImplementation = (context: { readonly inputRules: readonly CompiledInputRule[] }) => Plugin;
export type CapabilityImplementations = Readonly<Partial<Record<CapabilityName, CapabilityImplementation>>> & {
    /** The package plugins the runtime builds, by plugin ID; any other plugin holds only its key until it is built. */
    readonly plugins?: Readonly<Record<string, PluginImplementation>>;
};

export interface CompiledDefinition {
    readonly model: ContentModel;
    readonly schema: Schema;
    /** One instance per plugin ID, in plugin order. */
    readonly plugins: readonly Plugin[];
    /** Every command whose capability is implemented, by command ID. */
    readonly commands: ReadonlyMap<string, EngineCommand>;
}

/** The feature and capability that contribute a plugin, which an append-limit diagnostic names. */
export interface PluginOrigin {
    readonly featureId: string;
    readonly capability: string;
}
/**
 * What `commit` puts on a root transaction: the append limit, the time appended transactions take, the id function
 * normalizers draw from, and the origin of each transaction appended so far.
 */
export interface AppendBatch {
    readonly limit: number;
    readonly now: () => number;
    readonly generateId: () => string;
    readonly chain: PluginOrigin[];
}
/** Thrown past the append limit, so `commit` tells it apart from a plugin error. */
export class AppendLimitError extends Error {
    constructor(readonly chain: readonly PluginOrigin[]) {
        super('A root batch appended more transactions than ResourceLimits.maxAppendedTransactions allows.');
        this.name = 'AppendLimitError';
    }
}

/** The root transaction that `transactions` belong to; ProseMirror marks each appended transaction with its root. */
const rootOf = (transactions: readonly Transaction[]): Transaction | undefined => {
    const root = transactions[0];
    const rootOfAppended: unknown = root?.getMeta('appendedTransaction');
    if (rootOfAppended !== undefined) {
        return rootOfAppended as Transaction;
    }
    return root;
};

/** The batch of the root that `transactions` belong to. */
const batchOf = (transactions: readonly Transaction[]): AppendBatch | undefined =>
    rootOf(transactions)?.getMeta(APPEND_BATCH_META) as AppendBatch | undefined;

/**
 * Wraps a plugin's `appendTransaction`, since `state.applyTransaction` loops with no cap: each appended transaction
 * is counted against its root batch's limit and takes its time from `Date.now`.
 */
export const countAppends = (plugin: Plugin, origin: PluginOrigin): Plugin => {
    const append = plugin.spec.appendTransaction;
    if (append === undefined) {
        return plugin;
    }
    const counted: Plugin = new Plugin({
        ...plugin.spec,
        appendTransaction: (transactions, oldState, newState) => {
            const appended = append.call(counted, transactions, oldState, newState);
            const batch = batchOf(transactions);
            if (appended === null || appended === undefined || batch === undefined) {
                return appended;
            }
            batch.chain.push(origin);
            if (batch.chain.length > batch.limit) {
                throw new AppendLimitError(batch.chain);
            }
            return appended.setTime(batch.now());
        },
    });
    return counted;
};

const withCommandId = (id: string, { run, active }: EngineCommand, payload: PayloadDeclaration | undefined) => {
    const command: EngineCommand = {
        run: (state, dispatch, given) => {
            if (dispatch === undefined) {
                return run(state, undefined, given);
            }
            return run(state, (transaction) => dispatch(transaction.setMeta(COMMAND_META, id)), given);
        },
        active,
    };
    if (payload === undefined) {
        return command;
    }
    return { ...command, payload };
};

/**
 * Turns a content model into the engine's schema, keymap and plugins, and the commands of the implemented
 * `capabilities`. A keymap plugin runs its feature's bindings; every other plugin holds only its key until its
 * capability is implemented.
 */
export const compileDefinition = (
    model: ContentModel,
    capabilities: CapabilityImplementations = {},
): CompiledDefinition => {
    const { features, keymap, plugins, commands: declared } = compiledModel(model);
    const schema = buildSchema(model);
    const commands = new Map<string, EngineCommand>();
    for (const { id, definition } of declared) {
        const implementation = capabilities[definition.capability];
        if (implementation !== undefined) {
            commands.set(id, withCommandId(id, implementation(definition.args, schema), definition.payload));
        }
    }
    /** The first feature that contributes a plugin, with its capability, or the plugin ID for the package's keymaps and input rules. */
    const originOf = (id: string): PluginOrigin => {
        const command = declared.find(({ definition }) =>
            (CAPABILITY_PLUGINS[definition.capability] ?? []).some((plugin) => plugin.id === id),
        );
        if (command !== undefined) {
            return { featureId: command.featureId, capability: command.definition.capability };
        }
        const contributor = features.find(
            (feature) =>
                id === `keymap:${feature.id}` ||
                (id === INPUT_RULES_PLUGIN.id && (feature.declaration.inputRules ?? []).length > 0) ||
                (id === NODE_IDS_PLUGIN.id && declaresNodeIds(feature.declaration)),
        );
        if (contributor === undefined) {
            return { featureId: id, capability: id };
        }
        return { featureId: contributor.id, capability: id };
    };
    const inputRules = compileInputRules(features, schema, (id) => commands.get(id)?.run);
    const pluginOf = (id: string) => {
        const built = capabilities.plugins?.[id];
        if (built !== undefined) {
            return built({ inputRules });
        }
        const normalizer = NORMALIZERS[id];
        if (normalizer !== undefined) {
            return new Plugin({
                key: normalizer.key,
                state: normalizer.field,
                appendTransaction: (transactions, _old, state) => {
                    const batch = batchOf(transactions);
                    const timing: unknown = rootOf(transactions)?.getMeta(NORMALIZE_META);
                    // Outside a commit no id function is on the batch, and a composition batch is repaired once input settles.
                    if (batch === undefined || timing === 'later') {
                        return null;
                    }
                    // A batch that kept the document has nothing to repair, unless it settles a composition.
                    if (timing !== 'now' && !transactions.some(({ docChanged }) => docChanged)) {
                        return null;
                    }
                    const repair = normalizer.normalize(state, batch.generateId);
                    if (repair === null) {
                        return null;
                    }
                    return repair.setMeta(ORIGIN_META, 'normalization');
                },
            });
        }
        const bindings: Record<string, Command> = {};
        for (const entry of keymap) {
            const command = commands.get(entry.command);
            if (entry.plugin === id && command !== undefined) {
                bindings[entry.key] = (state, dispatch) => command.run(state, dispatch, entry.payload);
            }
        }
        if (Object.keys(bindings).length === 0) {
            return new Plugin({ key: new PluginKey(id) });
        }
        return new Plugin({ key: new PluginKey(id), props: { handleKeyDown: keydownHandler(bindings) } });
    };
    // Every plugin's appended transactions count against the append limit.
    return { model, schema, plugins: plugins.map(({ id }) => countAppends(pluginOf(id), originOf(id))), commands };
};
