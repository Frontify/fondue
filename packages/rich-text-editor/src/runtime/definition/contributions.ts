/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Schema } from 'prosemirror-model';

import { DefinitionError } from '#/model';
import {
    BLOCK_DECORATIONS_PLUGIN,
    INPUT_RULES_PLUGIN,
    keyHandlersPlugin,
    keymapPlugin,
    type PluginContribution,
    type PluginDescriptor,
    SUGGESTIONS_PLUGIN,
    type CompiledFeature,
    pointer,
} from '#/model/internal';

import { type CommandLookup, type EngineCommand, type EngineExtension, type EngineSuggestion } from './types';

// One or two characters that are neither letters, digits nor white space, so a trigger never fires inside a word.
const SUGGESTION_TRIGGER = /^[^\p{L}\p{N}\s]{1,2}$/u;

/** A key handler of an editor part, with the plugin that runs it. */
export type KeyHandlerEntry = {
    plugin: string;
    key: string;
    handler: EngineCommand;
};

/** A plugin's rules run as its feature's, under that feature's options and policy. */
export const withInputRules = (
    compiledFeatures: readonly CompiledFeature[],
    extensions: readonly EngineExtension[],
    schema: Schema,
    commands: ReadonlyMap<string, EngineCommand>,
) =>
    compiledFeatures.map((feature) => {
        const inputRules = extensions
            .filter(({ featureId }) => featureId === feature.id)
            .flatMap((extension) => extension.inputRules);
        for (const [index, rule] of inputRules.entries()) {
            if (
                (rule.kind === 'mark-delimiter' || rule.kind === 'mark-rule') &&
                schema.marks[rule.mark] === undefined
            ) {
                throw new DefinitionError('definition.orphan-behavior', {
                    feature: feature.id,
                    path: `${pointer('inputRules', index)}/mark`,
                });
            }

            if ((rule.kind === 'line-start' || rule.kind === 'block-rule') && !commands.has(rule.command)) {
                throw new DefinitionError('definition.orphan-behavior', {
                    feature: feature.id,
                    path: `${pointer('inputRules', index)}/command`,
                });
            }
        }

        return { ...feature, inputRules };
    });

/** The key handlers of `extensions`, each with the plugin that holds it. */
export const keyHandlersOf = (
    extensions: readonly EngineExtension[],
    schema: Schema,
    lookup: CommandLookup,
): KeyHandlerEntry[] =>
    extensions.flatMap(({ featureId, handlers }) =>
        Object.entries(handlers?.(schema, lookup) ?? {}).map(([key, handler]) => ({
            plugin: keyHandlersPlugin(featureId).id,
            key,
            handler,
        })),
    );

const checkDecoration = (
    featureId: string,
    source: EngineExtension['decorations'][number],
    index: number,
    schema: Schema,
) => {
    for (const node of source.nodes) {
        if (schema.nodes[node]?.isTextblock !== true) {
            throw new DefinitionError('definition.orphan-behavior', {
                feature: featureId,
                path: `${pointer('decorations', index)}/nodes`,
                reason: 'decoration sources cover textblocks',
            });
        }
    }
};

const checkSuggestion = (
    featureId: string,
    list: EngineExtension['suggestions'][number],
    index: number,
    commands: ReadonlyMap<string, EngineCommand>,
    suggestions: readonly EngineSuggestion[],
) => {
    const { trigger, command, rules: listRules } = list;
    const path = pointer('suggestions', index);
    if (!SUGGESTION_TRIGGER.test(trigger)) {
        throw new DefinitionError('definition.invalid-declaration', {
            feature: featureId,
            path: `${path}/trigger`,
        });
    }

    const { maxQuery, leadingLetters } = listRules;
    if (!Number.isInteger(maxQuery) || maxQuery < 1) {
        throw new DefinitionError('definition.invalid-declaration', {
            feature: featureId,
            path: `${path}/rules/maxQuery`,
        });
    }

    if (!Number.isInteger(leadingLetters) || leadingLetters < 0 || leadingLetters > maxQuery) {
        throw new DefinitionError('definition.invalid-declaration', {
            feature: featureId,
            path: `${path}/rules/leadingLetters`,
        });
    }

    if (!commands.has(command)) {
        throw new DefinitionError('definition.orphan-behavior', {
            feature: featureId,
            path: `${path}/command`,
        });
    }

    const first = suggestions.find((other) => other.trigger === trigger);
    if (first !== undefined) {
        throw new DefinitionError('definition.duplicate-id', {
            kind: 'suggestion',
            id: trigger,
            features: [first.featureId, featureId],
        });
    }
};

/** The plugins the editor parts add after the model's own, and the suggestion lists they declare, both checked. */
export const collectContributions = (
    modelPlugins: readonly PluginDescriptor[],
    extensions: readonly EngineExtension[],
    schema: Schema,
    commands: ReadonlyMap<string, EngineCommand>,
    keyHandlers: readonly KeyHandlerEntry[],
) => {
    const suggestions: EngineSuggestion[] = [];
    const contributions: PluginContribution[] = modelPlugins.map((plugin) => ({ featureId: '', plugin }));
    for (const { featureId, keys, inputRules: rules, decorations: sources, suggestions: lists } of extensions) {
        if (Object.keys(keys).length > 0) {
            contributions.push({ featureId, plugin: keymapPlugin(featureId) });
        }

        const handlersId = keyHandlersPlugin(featureId).id;
        if (keyHandlers.some(({ plugin }) => plugin === handlersId)) {
            contributions.push({ featureId, plugin: keyHandlersPlugin(featureId) });
        }

        if (rules.length > 0) {
            contributions.push({ featureId, plugin: INPUT_RULES_PLUGIN });
        }

        for (const [index, source] of sources.entries()) {
            checkDecoration(featureId, source, index, schema);
            contributions.push({ featureId, plugin: BLOCK_DECORATIONS_PLUGIN });
        }

        for (const [index, list] of lists.entries()) {
            checkSuggestion(featureId, list, index, commands, suggestions);
            suggestions.push({ ...list, featureId });
            contributions.push({ featureId, plugin: SUGGESTIONS_PLUGIN });
        }
    }

    return { contributions, suggestions };
};
