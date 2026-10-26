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
export type FeatureInternals = {
    declaration: FeatureDeclaration;
    options: unknown;
};

/** A feature as built at run time, before its phantom type brand. */
type FeatureValue = Pick<Feature, 'id' | 'version'> & { readonly [FEATURE]?: FeatureInternals };

export const createFeature = (declaration: FeatureDeclaration, options: unknown): Feature => {
    const internals: FeatureInternals = { declaration, options: snapshot(options) };
    const value: FeatureValue = Object.freeze({
        id: declaration.id,
        version: declaration.version,
        [FEATURE]: internals,
    });

    // The brand has no run-time value, so TypeScript cannot see the frozen value as a `Feature`.
    return value as Feature;
};

/** The declaration behind a feature, or `undefined` for a value that no factory built. */
export const featureInternals = (feature: Feature): FeatureInternals | undefined => (feature as FeatureValue)[FEATURE];

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
    D extends { options: infer O } ? OptionsOf<O> : object,
    object,
    NodesOfDeclaration<D>,
    MarksOfDeclaration<D>,
    D extends { id: infer I extends string } ? I : string
>;

/** Returns the feature's factory; hosts call it, with typed and serializable options or none. */
export const defineFeature = <const D extends FeatureDeclaration>(declaration: D): FactoryOf<D> => {
    // Migration steps, codec overrides, function parse rules and content rules hold functions, which a JSON snapshot
    // would reject, so they are copied apart.
    const { migrations, codecs, parseRules, contentRules, ...data }: FeatureDeclaration = declaration;
    let copy: FeatureDeclaration;
    if (migrations === undefined && codecs === undefined && parseRules === undefined && contentRules === undefined) {
        copy = snapshot(declaration);
    } else {
        const parts: { -readonly [K in keyof FeatureDeclaration]: FeatureDeclaration[K] } = { ...snapshot(data) };
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

        copy = Object.freeze(parts);
    }

    const factory = (options?: object) => createFeature(copy, options);

    return factory as FactoryOf<D>;
};
