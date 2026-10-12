/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compileDefinition, type CompiledDefinition } from '#/definition';
import { type ContentModel, DefinitionError, type ResourceLimits } from '#/model';
import { limitsOf } from '#/model/decode';
import { findUnsafeJson } from '#/model/values';
import { CAPABILITIES } from '#/runtime/capabilities';
import { type AuthoringPolicy, type FeaturePolicy, type HeadingLevel } from '#/runtime/types';

import {
    type CommandsOfModel,
    type CompiledEditorDefinition,
    type EditorDefinitionOptions,
    type ReactPresentation,
} from './types';

// Kept off the definition, so no engine value is reachable from what a host holds.
const engines = new WeakMap<object, CompiledDefinition>();
const EVERYTHING: FeaturePolicy = { create: true, edit: true, remove: true, paste: true };
const HEADING_LEVELS: readonly HeadingLevel[] = [1, 2, 3, 4, 5, 6];

/** The engine a definition compiled once, which every editor mounted with it shares. */
export const engineOf = (definition: CompiledEditorDefinition<object>): CompiledDefinition => {
    const engine = engines.get(definition);
    if (engine === undefined) {
        throw new Error('RichTextEditor takes only a definition that defineEditor made.');
    }
    return engine;
};

/** Every installed feature fully allowed, with the policy's own values over it; a policy for an uninstalled feature throws. */
const authoringOf = (model: ContentModel, policy: Partial<AuthoringPolicy> = {}): AuthoringPolicy => {
    const features: Record<string, FeaturePolicy> = {};
    for (const { id } of model.capabilities) {
        features[id] = EVERYTHING;
    }
    for (const [id, feature] of Object.entries(policy.features ?? {})) {
        if (!Object.hasOwn(features, id)) {
            throw new DefinitionError('definition.unknown-policy-feature', { feature: id });
        }
        features[id] = feature;
    }
    return {
        features,
        creatableHeadingLevels: policy.creatableHeadingLevels ?? HEADING_LEVELS,
        enterBehavior: policy.enterBehavior ?? 'paragraph',
    };
};

/** The defaults with `limitOverrides`, then each of `limits` that is stricter; invalid values are ignored. */
const limitsWithin = (limits: Partial<ResourceLimits> | undefined, overrides: Partial<ResourceLimits> | undefined) => {
    const loosened = limitsOf(overrides);
    const values: Readonly<Record<string, number>> = { ...loosened };
    const result: Record<string, number> = { ...limitsOf(limits, loosened) };
    for (const [name, value] of Object.entries(values)) {
        result[name] = Math.min(value, result[name] ?? value);
    }
    return result as unknown as ResourceLimits;
};

/**
 * Compiles an editor definition once: the model's engine, the authoring policy and the limits. A host renders
 * every editor of this definition with it, and remote policy values are checked like a manifest's.
 */
export const defineEditor = <Model extends ContentModel>(
    options: EditorDefinitionOptions<Model>,
): CompiledEditorDefinition<CommandsOfModel<Model>> => {
    const { id, model, policy } = options;
    if (policy !== undefined) {
        const unsafe = findUnsafeJson(policy, '/policy');
        if (unsafe !== undefined) {
            throw new DefinitionError('definition.invalid-manifest', { path: unsafe });
        }
    }
    const definition = Object.freeze({
        id,
        model: model.ref,
        capabilities: model.capabilities,
        authoring: authoringOf(model, policy),
        limits: limitsWithin(options.limits, options.limitOverrides),
    });
    engines.set(definition, compileDefinition(model, CAPABILITIES));
    return definition as unknown as CompiledEditorDefinition<CommandsOfModel<Model>>;
};

/** A presentation with no toolbar, styles or colour tokens, and the values given. */
export const defineReactPresentation = (input: Partial<ReactPresentation>): ReactPresentation => ({
    styles: [],
    colorTokens: [],
    toolbar: [],
    sliceContext: null,
    ...input,
});
