/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonObject } from './declarations';

export type DefinitionErrorCode =
    | 'definition.duplicate-id'
    | 'definition.missing-dependency'
    | 'definition.dependency-cycle'
    | 'definition.version-mismatch'
    | 'definition.unsatisfied-order'
    | 'definition.invalid-option'
    | 'definition.orphan-behavior'
    | 'definition.missing-schema'
    | 'definition.missing-reader'
    | 'definition.missing-codec'
    | 'definition.unknown-policy-feature'
    | 'definition.unknown-feature'
    | 'definition.invalid-manifest'
    | 'definition.unsafe-url-binding'
    | 'definition.invalid-declaration';

/** Thrown by compilation, `featureFromManifest`, `featuresById` and `defineReaderFeature`. */
export class DefinitionError extends Error {
    readonly code: DefinitionErrorCode;
    /** For example the two feature IDs, the dependency path, the cycle or the option path. */
    readonly details: JsonObject;

    constructor(code: DefinitionErrorCode, details: JsonObject) {
        super(`${code} ${JSON.stringify(details)}`);
        this.name = 'DefinitionError';
        this.code = code;
        this.details = details;
    }
}

/** A JSON Pointer from path segments (RFC 6901). */
export const pointer = (...segments: readonly (string | number)[]): string =>
    segments.map((segment) => `/${String(segment).replaceAll('~', '~0').replaceAll('/', '~1')}`).join('');
