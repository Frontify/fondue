/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DefinitionError, type Feature } from '#/model';

// Typed here because vite/client would change the type of migrate.ts's own glob call.
type ViteImportMeta = ImportMeta & {
    glob: (pattern: string, options: { eager: true }) => Record<string, Record<string, unknown>>;
};

const modules = (import.meta as ViteImportMeta).glob('./*/feature.ts', { eager: true });

// A feature module exports its factory next to types only, so the one exported function is the factory.
const factoryOf = (path: string, exports: Record<string, unknown>): (() => Feature) => {
    const factories = Object.values(exports).filter((value): value is () => Feature => typeof value === 'function');
    const factory = factories.length === 1 ? factories.at(0) : undefined;
    if (factory === undefined) {
        throw new Error(`${path} must export exactly one feature factory`);
    }

    return factory;
};

/** Every shipped feature factory by feature ID, found in the `feature.ts` of each feature folder. */
export const registry: Readonly<Record<string, () => Feature>> = Object.fromEntries(
    Object.entries(modules).map(([path, exports]) => {
        const factory = factoryOf(path, exports);

        return [factory().id, factory];
    }),
);

/**
 * Resolves shipped feature IDs from remote configuration, with their default options;
 * throws `DefinitionError` `definition.unknown-feature` with the ID in `details`.
 */
export const featuresById = (ids: readonly string[]): readonly Feature[] => {
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
