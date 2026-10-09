/* (c) Copyright Frontify Ltd., all rights reserved. */

import { keydownHandler } from 'prosemirror-keymap';
import { type Schema } from 'prosemirror-model';
import { type Command, type EditorState, Plugin, PluginKey } from 'prosemirror-state';

import { type CapabilityName, type ContentModel, type JsonObject } from '#/model';
import { compiledModel, type KeymapEntry } from '#/model/compile';

import { buildSchema } from './schema';

/** The transaction meta that names the command a transaction runs, so the runtime reports it. */
export const COMMAND_META = 'rte.command';

/** A command as the engine runs it, and whether its target is active, partly active or not. */
export interface EngineCommand {
    readonly run: Command;
    readonly active: (state: EditorState) => boolean | 'mixed';
}
/** Builds the engine command of one capability from a command's data arguments. */
export type CapabilityImplementation = (args: JsonObject, schema: Schema) => EngineCommand;
export type CapabilityImplementations = Readonly<Partial<Record<CapabilityName, CapabilityImplementation>>>;

export interface CompiledDefinition {
    readonly model: ContentModel;
    readonly schema: Schema;
    /** Key bindings in plugin order; features that bind one key run in that order. */
    readonly keymap: readonly KeymapEntry[];
    /** One instance per plugin ID, in plugin order. */
    readonly plugins: readonly Plugin[];
    /** Every command whose capability is implemented, by command ID. */
    readonly commands: ReadonlyMap<string, EngineCommand>;
}

const withCommandId = (id: string, { run, active }: EngineCommand): EngineCommand => ({
    run: (state, dispatch, view) => {
        if (dispatch === undefined) {
            return run(state, undefined, view);
        }
        return run(state, (transaction) => dispatch(transaction.setMeta(COMMAND_META, id)), view);
    },
    active,
});

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
            commands.set(id, withCommandId(id, implementation(definition.args, schema)));
        }
    }
    const pluginOf = (id: string) => {
        const bindings: Record<string, Command> = {};
        for (const entry of keymap) {
            const command = commands.get(entry.command);
            if (entry.plugin === id && command !== undefined) {
                bindings[entry.key] = command.run;
            }
        }
        if (Object.keys(bindings).length === 0) {
            return new Plugin({ key: new PluginKey(id) });
        }
        return new Plugin({ key: new PluginKey(id), props: { handleKeyDown: keydownHandler(bindings) } });
    };
    return { model, schema, keymap, plugins: plugins.map(({ id }) => pluginOf(id)), commands };
};
