/* (c) Copyright Frontify Ltd., all rights reserved. */

import { enUS } from '#/locales/en-US';
import { type ReferenceResolution, type RichTextLocale } from '#/model';
import { codecContext } from '#/model/output';

import { type ReaderContext } from './define';

const UNKNOWN: ReferenceResolution = { status: 'unknown' };

export interface ReaderResolvers {
    readonly resolveAssetUrl?: ReaderContext['resolveAssetUrl'];
    readonly resolveReference?: ReaderContext['resolveReference'];
}

/** The codec context plus `resolveReference`. A resolver that throws gives `null` or `unknown` for that call only. */
export const readerContext = (locale: RichTextLocale, resolvers: ReaderResolvers): ReaderContext => {
    const { resolveAssetUrl, resolveReference } = resolvers;
    return {
        ...codecContext(locale, enUS, resolveAssetUrl),
        resolveReference: (resourceType, resourceId) => {
            if (resolveReference === undefined) {
                return UNKNOWN;
            }
            try {
                return resolveReference(resourceType, resourceId);
            } catch {
                return UNKNOWN;
            }
        },
    };
};
