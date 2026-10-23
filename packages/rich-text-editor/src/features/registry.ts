/* (c) Copyright Frontify Ltd., all rights reserved. */

import { core } from '#/features/core/feature';
import { DefinitionError, type Feature } from '#/model';

/** Every shipped feature factory by feature ID. */
export const registry: Readonly<Record<string, () => Feature>> = {
    core,
};

export interface FeatureRecord {
    /** The team that reviews and maintains the feature. */
    readonly owner: string;
    /** Each package dependency the feature's files import, with its SPDX license. */
    readonly dependencies: Readonly<Record<string, string>>;
}

// The CODEOWNERS default owner, since no rule names this package.
const OWNER = '@Frontify/frontend-platform';
const NO_DEPENDENCIES: FeatureRecord = { owner: OWNER, dependencies: {} };

/** The owner and the dependency and license record of every shipped feature, by feature ID. */
export const featureRecords: Readonly<Record<string, FeatureRecord>> = {
    core: NO_DEPENDENCIES,
};

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
