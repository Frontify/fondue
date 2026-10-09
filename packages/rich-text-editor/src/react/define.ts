/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compileDefinition, type CompiledDefinition } from '#/definition';
import { type ContentModel, defaultLimits, DefinitionError, type ResourceLimits } from '#/model';
import { findUnsafeJson } from '#/model/values';
import { CAPABILITIES } from '#/runtime/capabilities';
import { type AuthoringPolicy, type FeaturePolicy, type HeadingLevel } from '#/runtime/types';

import {
    type CommandsOfModel,
    type CompiledEditorDefinition,
    type EditorDefinitionOptions,
    type ReactPresentation,
} from './types';

const ENGINE = Symbol('engine');
const EVERYTHING: FeaturePolicy = { create: true, edit: true, remove: true, paste: true };
const HEADING_LEVELS: readonly HeadingLevel[] = [1, 2, 3, 4, 5, 6];

/** The engine a definition compiled once, which every editor mounted with it shares (SPEC-rich-text/AC-029). */
export const engineOf = (definition: CompiledEditorDefinition<object>): CompiledDefinition =>
    (definition as unknown as { readonly [ENGINE]: CompiledDefinition })[ENGINE];

/** Every installed feature fully allowed, with the policy's own values over it. */
const authoringOf = (model: ContentModel, policy: Partial<AuthoringPolicy> | undefined): AuthoringPolicy => {
    const features: Record<string, FeaturePolicy> = {};
    for (const { id } of model.capabilities) {
        features[id] = EVERYTHING;
    }
    if (policy === undefined) {
        return { features, creatableHeadingLevels: HEADING_LEVELS, enterBehavior: 'paragraph' };
    }
    for (const [id, feature] of Object.entries(policy.features ?? {})) {
        features[id] = feature;
    }
    return {
        features,
        creatableHeadingLevels: policy.creatableHeadingLevels ?? HEADING_LEVELS,
        enterBehavior: policy.enterBehavior ?? 'paragraph',
    };
};

/** The defaults with `limitOverrides`, then each of `limits` that is stricter. */
const limitsOf = (limits: Partial<ResourceLimits> = {}, overrides: Partial<ResourceLimits> = {}): ResourceLimits => {
    const result: Record<string, number> = { ...defaultLimits };
    for (const [name, value] of Object.entries(overrides)) {
        result[name] = value;
    }
    for (const [name, value] of Object.entries(limits)) {
        const current = result[name];
        if (current !== undefined && value < current) {
            result[name] = value;
        }
    }
    return result as unknown as ResourceLimits;
};

/**
 * Compiles an editor definition once: the model's engine, the authoring policy and the limits. A host renders
 * every editor of this definition with it, and remote policy values are checked like a manifest's (SPEC-rich-text/AC-030).
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
    const definition = {
        id,
        model: model.ref,
        capabilities: model.capabilities,
        authoring: authoringOf(model, policy),
        limits: limitsOf(options.limits, options.limitOverrides),
        [ENGINE]: compileDefinition(model, CAPABILITIES),
    };
    return Object.freeze(definition) as unknown as CompiledEditorDefinition<CommandsOfModel<Model>>;
};

/** A presentation with no toolbar, styles or colour tokens, and the values given. */
export const defineReactPresentation = (input: Partial<ReactPresentation>): ReactPresentation => ({
    styles: [],
    colorTokens: [],
    toolbar: [],
    sliceContext: null,
    ...input,
});
