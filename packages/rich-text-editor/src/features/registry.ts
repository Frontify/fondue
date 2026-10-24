/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DefinitionError, type Feature } from '#/model';

// Typed here because vite/client would change the type of migrate.ts's own glob call.
type ViteImportMeta = ImportMeta & {
    readonly glob: (pattern: string, options: { readonly eager: true }) => Record<string, Record<string, unknown>>;
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
    emoji: { owner: OWNER, dependencies: { 'emojibase-data': 'MIT' } },
    'marks.bold': NO_DEPENDENCIES,
    'marks.italic': NO_DEPENDENCIES,
    'marks.language': NO_DEPENDENCIES,
    'marks.underline': NO_DEPENDENCIES,
    'marks.strike': NO_DEPENDENCIES,
    'marks.code': NO_DEPENDENCIES,
    'marks.subscript': NO_DEPENDENCIES,
    'marks.superscript': NO_DEPENDENCIES,
    'marks.font-color': NO_DEPENDENCIES,
    links: NO_DEPENDENCIES,
    'blocks.heading': NO_DEPENDENCIES,
    'blocks.quote': NO_DEPENDENCIES,
    'blocks.code': { owner: OWNER, dependencies: { lowlight: 'MIT' } },
    'blocks.align': NO_DEPENDENCIES,
    'format.clear': NO_DEPENDENCIES,
    'blocks.rule': NO_DEPENDENCIES,
    'layout.columns': NO_DEPENDENCIES,
    'lists.item': NO_DEPENDENCIES,
    'lists.bullet': NO_DEPENDENCIES,
    'lists.ordered': NO_DEPENDENCIES,
    'lists.task': NO_DEPENDENCIES,
    'styles.brand': NO_DEPENDENCIES,
    'input-rules': NO_DEPENDENCIES,
    mentions: NO_DEPENDENCIES,
    'nav.outline': NO_DEPENDENCIES,
    'a11y.content-checks': NO_DEPENDENCIES,
    'media.image': NO_DEPENDENCIES,
    'media.upload': NO_DEPENDENCIES,
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
