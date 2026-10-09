/* (c) Copyright Frontify Ltd., all rights reserved. */

import { keydownHandler } from 'prosemirror-keymap';
import { type Schema } from 'prosemirror-model';
import { type Command, type EditorState, Plugin, PluginKey, type Transaction } from 'prosemirror-state';

import { type CapabilityName, type ContentModel, type JsonObject, type PayloadDeclaration } from '#/model';
import { compiledModel } from '#/model/compile';

import { buildSchema } from './schema';

/** The transaction meta that names the command a transaction runs, so the runtime reports it. */
export const COMMAND_META = 'rte.command';
/** The transaction meta that carries a root batch's `AppendBatch`, which the wrapped `appendTransaction` counts in. */
export const APPEND_BATCH_META = 'rte.append-batch';

/**
 * A command as the engine runs it, with no view, so commands that call `view.endOfTextblock` take their state-only
 * path (SPEC-rich-text-runtime/AC-036), and whether its target is active, partly active or not.
 */
export interface EngineCommand {
    readonly run: (state: EditorState, dispatch?: (transaction: Transaction) => void, payload?: unknown) => boolean;
    readonly active: (state: EditorState, payload?: unknown) => boolean | 'mixed';
    /** The command's payload declaration; none means it takes no payload (SPEC-rich-text/AC-054). */
    readonly payload?: PayloadDeclaration;
}
/** Builds the engine command of one capability from a command's data arguments. */
export type CapabilityImplementation = (args: JsonObject, schema: Schema) => EngineCommand;
export type CapabilityImplementations = Readonly<Partial<Record<CapabilityName, CapabilityImplementation>>>;

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
/** What `commit` puts on a root transaction: the limit, the clock, and the origin of each transaction appended so far. */
export interface AppendBatch {
    readonly limit: number;
    readonly now: () => number;
    readonly chain: PluginOrigin[];
}
/** Thrown past the append limit, so `commit` tells it apart from a plugin error (SPEC-rich-text-runtime/AC-012). */
export class AppendLimitError extends Error {
    constructor(readonly chain: readonly PluginOrigin[]) {
        super('A root batch appended more transactions than ResourceLimits.maxAppendedTransactions allows.');
        this.name = 'AppendLimitError';
    }
}

/**
 * Wraps a plugin's `appendTransaction`, since `state.applyTransaction` loops with no cap: each appended transaction
 * is counted against its root batch's limit and takes its time from the environment clock (SPEC-rich-text-runtime/AC-012).
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
            // ProseMirror marks each appended transaction with its root; a root carries no such meta.
            let root = transactions[0];
            const rootOfAppended: unknown = root?.getMeta('appendedTransaction');
            if (rootOfAppended !== undefined) {
                root = rootOfAppended as Transaction;
            }
            const batch = root?.getMeta(APPEND_BATCH_META) as AppendBatch | undefined;
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
    const { keymap, plugins, commands: declared } = compiledModel(model);
    const schema = buildSchema(model);
    const commands = new Map<string, EngineCommand>();
    for (const { id, definition } of declared) {
        const implementation = capabilities[definition.capability];
        if (implementation !== undefined) {
            commands.set(id, withCommandId(id, implementation(definition.args, schema), definition.payload));
        }
    }
    const pluginOf = (id: string) => {
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
    return { model, schema, plugins: plugins.map(({ id }) => pluginOf(id)), commands };
};
