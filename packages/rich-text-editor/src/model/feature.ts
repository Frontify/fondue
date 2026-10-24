/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type Feature,
    type FeatureDeclaration,
    type FeatureFactory,
    type MarksOfDeclaration,
    type NodesOfDeclaration,
    type OptionsOf,
} from './declarations';
import { snapshot } from './values';

const FEATURE = Symbol('feature');

/** What compilation reads from a feature; options are checked against their declarations then. */
export interface FeatureInternals {
    readonly declaration: FeatureDeclaration;
    readonly options: unknown;
}

export const createFeature = (declaration: FeatureDeclaration, options: unknown): Feature => {
    const internals: FeatureInternals = { declaration, options: snapshot(options) };
    return Object.freeze({
        id: declaration.id,
        version: declaration.version,
        [FEATURE]: internals,
    }) as unknown as Feature;
};

/** The declaration behind a feature, or `undefined` for a value that no factory built. */
export const featureInternals = (feature: Feature): FeatureInternals | undefined =>
    (feature as unknown as { readonly [FEATURE]?: FeatureInternals })[FEATURE];

// Code a UI layer attaches by kind, such as reader overrides and node views, which one feature may carry together.
// An own enumerable symbol property of the declaration, so a spread copy keeps the attachments.
const ATTACHED = Symbol('attached');

/** What was attached under `kind` to a compiled feature's declaration. */
export const attachedTo = (declaration: FeatureDeclaration, kind: string): unknown =>
    attachmentsOf(declaration)?.[kind];

const attachmentsOf = (declaration: FeatureDeclaration): Readonly<Record<string, unknown>> | undefined =>
    (declaration as FeatureDeclaration & { readonly [ATTACHED]?: Readonly<Record<string, unknown>> })[ATTACHED];

/** A copy of `feature` with `value` attached under `kind`, keeping what was attached under other kinds. */
export const attachToFeature = <F extends Feature>(feature: F, kind: string, value: unknown): F => {
    const internals = featureInternals(feature);
    if (internals === undefined) {
        return feature;
    }
    // A fresh declaration copy keys the attachments to this feature, not to every model built from its factory.
    const declaration = Object.freeze({
        ...internals.declaration,
        [ATTACHED]: Object.freeze({ ...attachmentsOf(internals.declaration), [kind]: value }),
    });
    return createFeature(declaration, internals.options) as F;
};

type FactoryOf<D> = FeatureFactory<
    D extends { readonly options: infer O } ? OptionsOf<O> : object,
    object,
    NodesOfDeclaration<D>,
    MarksOfDeclaration<D>,
    D extends { readonly id: infer I extends string } ? I : string
>;

/** Returns the feature's factory; hosts call it, with typed and serializable options or none. */
export const defineFeature = <const D extends FeatureDeclaration>(declaration: D): FactoryOf<D> => {
    // Migration steps, codec overrides, function parse rules and content rules hold functions, which a JSON snapshot
    // would reject, so they are copied apart.
    const { migrations, codecs, parseRules, contentRules, ...data } = declaration;
    let copy: FeatureDeclaration;
    if (migrations === undefined && codecs === undefined && parseRules === undefined && contentRules === undefined) {
        copy = snapshot(declaration);
    } else {
        const parts: Record<string, unknown> = { ...snapshot(data) };
        if (migrations !== undefined) {
            parts.migrations = Object.freeze(migrations.map((step) => ({ ...step })));
        }
        if (codecs !== undefined) {
            parts.codecs = codecs;
        }
        if (contentRules !== undefined) {
            parts.contentRules = contentRules;
        }
        if (parseRules !== undefined) {
            parts.parseRules = Object.freeze(parseRules.map((rule) => Object.freeze({ ...rule })));
        }
        copy = Object.freeze(parts) as unknown as FeatureDeclaration;
    }
    const factory = (options?: object) => createFeature(copy, options);
    return factory as unknown as FactoryOf<D>;
};
