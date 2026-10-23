/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReferenceResolution } from './declarations';

/** A host's lookup of a mentioned resource's current label. */
export type ResolveReference = (resourceType: string, resourceId: string) => ReferenceResolution;

const UNKNOWN: ReferenceResolution = { status: 'unknown' };

/** `resolve`, or none, as a resolver that gives `unknown` where it has none or throws, for that call only. */
export const resolvingSafely =
    (resolve: ResolveReference | undefined): ResolveReference =>
    (resourceType, resourceId) => {
        if (resolve === undefined) {
            return UNKNOWN;
        }
        try {
            return resolve(resourceType, resourceId);
        } catch {
            return UNKNOWN;
        }
    };
