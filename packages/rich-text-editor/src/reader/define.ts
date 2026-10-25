/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type ReactNode } from 'react';

import { DefinitionError, type Feature, type FeatureDeclaration, type JsonObject } from '#/model';
import { type ReaderContext, pointer, attachedTo, attachToFeature, featureInternals } from '#/model/internal';

export { type ReaderContext };

/** What a reader override renders with: the node or mark's own attributes and rendered children, and the reader's context. */
export interface ReaderNodeProps {
    readonly attrs: JsonObject;
    /** The node's or mark's content, already rendered. */
    readonly children?: ReactNode;
    readonly context: ReaderContext;
}
/** Reader overrides by the name of a node or mark the feature declares, each a function component, not a `memo` or `forwardRef` object. */
export type ReaderRenderers = Readonly<Record<string, ComponentType<ReaderNodeProps>>>;

/** The overrides attached to a compiled feature's declaration, which the reader reads from a compiled model. */
export const declaredOverrides = (declaration: FeatureDeclaration): ReaderRenderers | undefined =>
    attachedTo(declaration, 'reader') as ReaderRenderers | undefined;

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
    return attachToFeature(feature, 'reader', renderers);
};
