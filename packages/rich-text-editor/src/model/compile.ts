/* (c) Copyright Frontify Ltd., all rights reserved. */

import { checkDependencies, checkMigrations, isVersion, readFeatures } from './compileChecks';
import {
    attachSharedAttributes,
    checkMembers,
    checkRootNode,
    collectMembers,
    compileParseRules,
    orderedPlugins,
} from './compilePhases';
import { type CompiledFeature, type CompiledMark, type CompiledModel } from './compileTypes';
import { type ContentModel, type ContentModelOptions, type Feature, type JsonObject } from './declarations';
import { DefinitionError, pointer } from './errors';
import { canonicalJson, sha256 } from './hash';
import { type HrefPolicy, hrefPolicyOf } from './href';
import { snapshot } from './values';

export { attributesOf, URL_ATTRIBUTES } from './compileChecks';
export {
    type CompiledFeature,
    type CompiledMark,
    type CompiledModel,
    type CompiledNode,
    type CompiledParseRule,
    type SharedAttribute,
} from './compileTypes';

const COMPILED = Symbol('compiled-model');

/** A model as built at run time, before its phantom type brand. */
type ModelValue = Pick<ContentModel, 'ref' | 'capabilities' | 'manifest' | 'fingerprint'> & {
    readonly [COMPILED]?: CompiledModel;
};

// Only `freezeModel` builds a model, and it always sets the symbol.
export const compiledModel = (model: ContentModel): CompiledModel =>
    (model as ContentModel & { readonly [COMPILED]: CompiledModel })[COMPILED];

/** The URL policy of the feature that declares `mark`, from its `allowedSchemes` and `allowedHosts` options. */
export const markHrefPolicy = (model: ContentModel, mark: string): HrefPolicy | undefined => {
    const { marks, features } = compiledModel(model);
    const owner = marks.find(({ name }) => name === mark)?.featureId;
    const feature = features.find(({ id }) => id === owner);

    return feature === undefined ? undefined : hrefPolicyOf(feature.options);
};

/** The compiled model, frozen with its fingerprint over the manifest. */
const freezeModel = <const Features extends readonly Feature[]>(
    list: readonly CompiledFeature[],
    compiled: CompiledModel,
    options: ContentModelOptions,
): ContentModel<Features> => {
    const manifest: JsonObject = snapshot({
        model: { id: options.id, version: options.version },
        features: list.map(({ id, version, options: values }) => ({ id, version, options: values })),
        nodes: compiled.nodes.map(({ name }) => name),
        marks: compiled.marks.map(({ name }) => name),
    });
    const model: ModelValue = {
        ref: { id: options.id, version: options.version },
        capabilities: list.map(({ id, version }) => ({ id, version })),
        manifest,
        fingerprint: sha256(canonicalJson(manifest)),
        [COMPILED]: compiled,
    };

    // The brand has no run-time value, so TypeScript cannot see the frozen value as a `ContentModel`.
    return Object.freeze(model) as ContentModel<Features>;
};

/**
 * Compiles a feature list once under a model ID and version. The same list always gives the same model,
 * manifest and fingerprint; every inconsistency throws `DefinitionError` before anything runs.
 */
export const compileContentModel = <const Features extends readonly Feature[]>(
    features: Features,
    options: ContentModelOptions,
): ContentModel<Features> => {
    if (!isVersion(options.version)) {
        throw new DefinitionError('definition.invalid-declaration', { path: pointer('version') });
    }

    const list = readFeatures(features);
    checkDependencies(list);
    checkMigrations(options.migrations, options.version);

    const { nodes, marks } = collectMembers(list);
    const textblocks = checkMembers(nodes, marks);
    attachSharedAttributes(list, nodes, textblocks);
    checkRootNode(nodes);
    const parseRules = compileParseRules(list, nodes, marks);
    const plugins = orderedPlugins(list);

    const rankOf = (mark: CompiledMark) => mark.declaration.rank ?? 0;
    const compiled: CompiledModel = {
        features: list,
        nodes: [...nodes.values()],
        marks: [...marks.values()].sort((a, b) => rankOf(a) - rankOf(b)),
        plugins,
        migrations: options.migrations ?? [],
        parseRules,
    };

    return freezeModel(list, compiled, options);
};
