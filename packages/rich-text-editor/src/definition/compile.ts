/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ContentModel } from '#/model';
import { orderPlugins, compiledModel } from '#/model/internal';

import { countAppends } from './appends';
import { compileCommands, extensionKeymap } from './commands';
import { collectContributions, keyHandlersOf, withInputRules } from './contributions';
import { compileInputRules } from './input-rules';
import { NORMALIZERS } from './normalizers';
import { keyPlugin, normalizerPlugin, originOf } from './plugin-builders';
import { buildSchema } from './schema';
import { type CompiledDefinition, type EngineImplementations, type EngineExtension } from './types';

/**
 * Turns a content model into the engine's schema and plugins, with the commands, keymap and input rules of its
 * editor parts' `extensions`. A keymap plugin runs its feature's bindings; every other plugin holds only its key
 * until `implementations` build it.
 */
export const compileDefinition = (
    model: ContentModel,
    implementations: EngineImplementations = {},
    extensions: readonly EngineExtension[] = [],
): CompiledDefinition => {
    const compiled = compiledModel(model);
    const schema = buildSchema(model);
    const { commands, lookup } = compileCommands(extensions, schema);
    const features = withInputRules(compiled.features, extensions, schema, commands);
    const keymap = extensionKeymap(extensions, commands);
    const keyHandlers = keyHandlersOf(extensions, schema, lookup);
    const { contributions, suggestions } = collectContributions(
        compiled.plugins,
        extensions,
        schema,
        commands,
        keyHandlers,
    );
    const plugins = extensions.length === 0 ? compiled.plugins : orderPlugins(contributions);
    const inputRules = compileInputRules(features, schema, (id) => commands.get(id));
    const decorations = extensions.flatMap((extension) => extension.decorations);
    const pluginOf = (id: string) => {
        const built = implementations.plugins?.[id];
        if (built !== undefined) {
            return built({ inputRules, suggestions, decorations });
        }
        const normalizer = NORMALIZERS[id];
        if (normalizer !== undefined) {
            return normalizerPlugin(normalizer);
        }
        return keyPlugin(id, keymap, keyHandlers, commands, implementations);
    };
    // Every plugin's appended transactions count against the append limit.
    const built = plugins.map(({ id }) => countAppends(pluginOf(id), originOf(features, id)));
    return { model, schema, plugins: built, commands, keymap };
};
