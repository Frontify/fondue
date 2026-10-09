/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type ReactNode } from 'react';

import {
    type CodecContext,
    DefinitionError,
    type Feature,
    type FeatureDeclaration,
    type JsonObject,
    type ReferenceResolution,
} from '#/model';
import { pointer } from '#/model/errors';
import { createFeature, featureInternals } from '#/model/feature';

/** What a reader override reads: plain data and functions, never a React context (SPEC-rich-text-output/AC-049). */
export interface ReaderContext extends CodecContext {
    readonly resolveReference: (resourceType: string, resourceId: string) => ReferenceResolution;
}
export interface ReaderNodeProps {
    readonly attrs: JsonObject;
    readonly children?: ReactNode;
    readonly context: ReaderContext;
}
export type ReaderRenderers = Readonly<Record<string, ComponentType<ReaderNodeProps>>>;

const DECLARED = new WeakMap<FeatureDeclaration, ReaderRenderers>();

/** The overrides attached to a compiled feature's declaration, which the reader reads from a compiled model. */
export const declaredOverrides = (declaration: FeatureDeclaration): ReaderRenderers | undefined =>
    DECLARED.get(declaration);

/** Attaches reader overrides to a feature; each must name a node or mark the feature declares. */
export const defineReaderFeature = <F extends Feature>(feature: F, renderers: ReaderRenderers): F => {
    const internals = featureInternals(feature);
    const declared = new Map<string, string>();
    if (internals !== undefined) {
        const { nodes, marks } = internals.declaration;
        for (const [kind, members] of [
            ['nodes', nodes],
            ['marks', marks],
        ] as const) {
            for (const name of Object.keys(members ?? {})) {
                declared.set(name, pointer(kind, name));
            }
        }
    }
    for (const [name, renderer] of Object.entries(renderers)) {
        const path = declared.get(name);
        if (path === undefined) {
            throw new DefinitionError('definition.missing-reader', { feature: feature.id, name });
        }
        // The reader calls an override as a function to catch its throw, which a `memo` or `forwardRef` object cannot take.
        if (typeof renderer !== 'function') {
            throw new DefinitionError('definition.invalid-declaration', { feature: feature.id, path });
        }
    }
    if (internals === undefined) {
        return feature;
    }
    // A fresh declaration copy keys the overrides to this feature, not to every model built from its factory.
    const declaration = Object.freeze({ ...internals.declaration });
    DECLARED.set(declaration, renderers);
    return createFeature(declaration, internals.options, internals.manifest) as F;
};
