/* (c) Copyright Frontify Ltd., all rights reserved. */

import { partCommandApiOf } from '#/bridge/pluginApi/liveApi';
import { type EditorPart } from '#/bridge/pluginApi/plugin';
import { type CommandRef, type ContentModel } from '#/model';
import { pluginCommand } from '#/runtime/api/editorApi';
import { type EngineCommand, type EngineExtension } from '#/runtime/definition';

import { fixtureEditorsOf } from './editors';

/**
 * What the fixture features' editor parts, and `parts`, add to the engine without the shipped parts, whose styles a
 * worker cannot load and whose keys a model of fixture features would not hold.
 */
export const fixtureExtensionsOf = (
    model: ContentModel,
    parts: readonly EditorPart[] = fixtureEditorsOf(model),
): readonly EngineExtension[] =>
    parts.map((plugin) => ({
        featureId: plugin.feature,
        keys: Object.fromEntries(
            Object.entries(plugin.keys ?? {}).filter(
                (entry): entry is [string, CommandRef] => typeof entry[1] !== 'function',
            ),
        ),
        inputRules: plugin.inputRules ?? [],
        decorations: [],
        suggestions: [],
        commands: (schema, lookup) => {
            const commands: Record<string, EngineCommand> = {};
            for (const [id, spec] of Object.entries(plugin.commands ?? {})) {
                commands[id] = pluginCommand(spec, model, schema, lookup, partCommandApiOf(plugin));
            }

            return commands;
        },
    }));
