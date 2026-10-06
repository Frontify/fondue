/* (c) Copyright Frontify Ltd., all rights reserved. */

import { core } from '#/features/core/feature';
import { DefinitionError, type Feature } from '#/model';

/** Every shipped feature factory by feature ID. */
export const registry: Readonly<Record<string, () => Feature>> = {
    core,
};

/**
 * Resolves shipped feature IDs from remote configuration, with their default options (SPEC-rich-text/AC-030);
 * throws `DefinitionError` `definition.unknown-feature` with the ID in `details` (SPEC-rich-text/AC-035).
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
