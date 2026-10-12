/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type ReactNode } from 'react';

import {
    DefinitionError,
    type Feature,
    type HrefResult,
    type JsonObject,
    type ReferenceResolution,
    type RichTextLocale,
    type TranslationStrings,
} from '#/model';
import { featureInternals } from '#/model/feature';

/** What a reader override reads: plain data and functions, never a React context. */
export interface ReaderContext {
    readonly resolveAssetUrl?: (assetId: string, options: { readonly width?: number }) => string | null;
    readonly checkHref: (input: string) => HrefResult;
    readonly locale: RichTextLocale;
    readonly t: (key: keyof TranslationStrings, vars?: Readonly<Record<string, string | number>>) => string;
    readonly resolveReference: (resourceType: string, resourceId: string) => ReferenceResolution;
}
export interface ReaderNodeProps {
    readonly attrs: JsonObject;
    readonly children?: ReactNode;
    readonly context: ReaderContext;
}
export type ReaderRenderers = Readonly<Record<string, ComponentType<ReaderNodeProps>>>;

const READER = Symbol('reader-overrides');

/** The reader overrides `defineReaderFeature` attached to a feature, keyed by node or mark name. */
export const readerOverrides = (feature: Feature): ReaderRenderers | undefined =>
    (feature as unknown as { readonly [READER]?: ReaderRenderers })[READER];

/** Attaches reader overrides to a feature; each must name a node or mark the feature declares. */
export const defineReaderFeature = <F extends Feature>(feature: F, renderers: ReaderRenderers): F => {
    const internals = featureInternals(feature);
    const declared = new Set<string>();
    if (internals !== undefined) {
        for (const members of [internals.declaration.nodes, internals.declaration.marks]) {
            for (const name of Object.keys(members ?? {})) {
                declared.add(name);
            }
        }
    }
    for (const name of Object.keys(renderers)) {
        if (!declared.has(name)) {
            throw new DefinitionError('definition.missing-reader', { feature: feature.id, name });
        }
    }
    return Object.freeze({ ...feature, [READER]: renderers }) as F;
};
