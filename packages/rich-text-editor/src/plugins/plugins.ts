/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
import { DefinitionError } from '#/model';

type PluginFactory = () => RichTextPlugin;

// The package declares no Vite client types, which would clash with the cast in `model/migrate`.
type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true }) => Record<string, Record<string, PluginFactory>>;
};

// Each feature folder's index exports exactly one plugin factory.
const modules = (import.meta as ViteImportMeta).glob('./*/index.ts', { eager: true });

const registry: Readonly<Record<string, PluginFactory>> = Object.fromEntries(
    Object.values(modules).flatMap((module) =>
        Object.values(module).map((factory) => [factory().id, factory] as const),
    ),
);

/** Every shipped plugin ID, in feature folder order. */
export const pluginIds: readonly string[] = Object.keys(registry);

/**
 * Resolves shipped plugin IDs from remote configuration, with their default options;
 * throws `DefinitionError` `definition.unknown-feature` with the ID in `details`.
 */
export const pluginsById = (ids: readonly string[]): readonly RichTextPlugin[] => {
    if (!Array.isArray(ids)) {
        throw new DefinitionError('definition.unknown-feature', { path: '' });
    }

    return ids.map((id: unknown, index) => {
        const factory = typeof id === 'string' && Object.hasOwn(registry, id) ? registry[id] : undefined;
        if (factory === undefined) {
            throw new DefinitionError('definition.unknown-feature', { id: typeof id === 'string' ? id : null, index });
        }

        return factory();
    });
};
