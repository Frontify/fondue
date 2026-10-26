/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';

import { DefinitionError, type PayloadDeclaration, findInvalidPayload } from '#/model';
import { keymapPlugin, pointer } from '#/model/internal';

import { COMMAND_META, type CommandLookup, type EngineCommand, type EngineExtension, type KeymapEntry } from './types';

const withCommandId = (
    id: string,
    inner: EngineCommand,
    payload: PayloadDeclaration | undefined,
    featureId: string,
): EngineCommand => {
    const { run } = inner;
    const command: EngineCommand = {
        ...inner,
        featureId,
        run: (state, dispatch, given, context) => {
            if (dispatch === undefined) {
                return run(state, undefined, given, context);
            }

            return run(
                state,
                (transaction) => {
                    // A command that runs another command keeps the inner command's ID.
                    if (transaction.getMeta(COMMAND_META) === undefined) {
                        transaction.setMeta(COMMAND_META, id);
                    }

                    dispatch(transaction);
                },
                given,
                context,
            );
        },
    };
    if (payload === undefined) {
        return command;
    }

    return { ...command, payload };
};

/** The key bindings of `extensions`, each checked against the command it names. */
export const extensionKeymap = (
    extensions: readonly EngineExtension[],
    commands: ReadonlyMap<string, EngineCommand>,
): KeymapEntry[] =>
    extensions.flatMap(({ featureId, keys }) =>
        Object.entries(keys).map(([key, ref]) => {
            const target = typeof ref === 'string' ? { command: ref, payload: undefined } : ref;
            const command = commands.get(target.command);
            const path = pointer('keys', key);
            if (command === undefined) {
                throw new DefinitionError('definition.orphan-behavior', { feature: featureId, path });
            }

            const invalid = findInvalidPayload(command.payload, target.payload);
            if (invalid !== undefined) {
                let at = `${path}/payload${invalid}`;
                if (typeof ref === 'string') {
                    at = path;
                }

                throw new DefinitionError('definition.invalid-declaration', { feature: featureId, path: at });
            }

            return {
                plugin: keymapPlugin(featureId).id,
                key,
                command: target.command,
                payload: target.payload ?? null,
            };
        }),
    );

/** The commands of `extensions`, each run under its own ID, with no ID declared by two features. */
export const compileCommands = (
    extensions: readonly EngineExtension[],
    schema: Schema,
): { commands: Map<string, EngineCommand>; lookup: CommandLookup } => {
    const commands = new Map<string, EngineCommand>();
    const lookup: CommandLookup = (id) => commands.get(id);
    const owners = new Map<string, string>();
    for (const extension of extensions) {
        for (const [id, command] of Object.entries(extension.commands(schema, lookup))) {
            const first = owners.get(id);
            if (first !== undefined) {
                throw new DefinitionError('definition.duplicate-id', {
                    kind: 'command',
                    id,
                    features: [first, extension.featureId],
                });
            }

            owners.set(id, extension.featureId);
            commands.set(id, withCommandId(id, command, command.payload, extension.featureId));
        }
    }

    return { commands, lookup };
};
