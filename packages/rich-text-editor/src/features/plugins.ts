/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RichTextPlugin } from '#/bridge/definePlugin';
import { DefinitionError } from '#/model';

type Unit = () => RichTextPlugin;

// The package declares no Vite client types, which would clash with the cast in `model/migrate`.
type ViteImportMeta = ImportMeta & {
    readonly glob: (pattern: string, options: { readonly eager: true }) => Record<string, Record<string, Unit>>;
};

// Each feature folder's index exports exactly one unit factory.
const modules = (import.meta as ViteImportMeta).glob('./*/index.ts', { eager: true });

const registry: Readonly<Record<string, Unit>> = Object.fromEntries(
    Object.values(modules).flatMap((module) => Object.values(module).map((unit) => [unit().id, unit] as const)),
);

/** Every shipped unit ID, in feature folder order. */
export const pluginIds: readonly string[] = Object.keys(registry);

/**
 * Resolves shipped unit IDs from remote configuration, with their default options;
 * throws `DefinitionError` `definition.unknown-feature` with the ID in `details`.
 */
export const pluginsById = (ids: readonly string[]): readonly RichTextPlugin[] => {
    if (!Array.isArray(ids)) {
        throw new DefinitionError('definition.unknown-feature', { path: '' });
    }
    return ids.map((id: unknown, index) => {
        const unit = typeof id === 'string' && Object.hasOwn(registry, id) ? registry[id] : undefined;
        if (unit === undefined) {
            throw new DefinitionError('definition.unknown-feature', { id: typeof id === 'string' ? id : null, index });
        }
        return unit();
    });
};
