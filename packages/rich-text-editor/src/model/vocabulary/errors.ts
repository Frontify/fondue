/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type JsonObject } from './declarations';

/** The codes of the errors thrown when a feature set or definition is invalid. */
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
    | 'definition.unsafe-url-binding'
    | 'definition.plugin-mismatch'
    | 'definition.missing-plugin'
    | 'definition.invalid-declaration';

/** Thrown by compilation, `featuresById`, `defineReaderFeature` and `definePlugin`. */
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
export const pointer = (...segments: readonly (string | number)[]): string => {
    let path = '';
    for (const segment of segments) {
        const text = String(segment);
        // Every node of a document gets a path, and an index or a plain name needs no escape.
        if (text.includes('~') || text.includes('/')) {
            path += `/${text.replaceAll('~', '~0').replaceAll('/', '~1')}`;
        } else {
            path += `/${text}`;
        }
    }

    return path;
};
