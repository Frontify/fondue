/* (c) Copyright Frontify Ltd., all rights reserved. */

import { enUS } from '#/locales/en-US';
import { checkHref, type ReferenceResolution, type RichTextLocale, type TranslationStrings } from '#/model';

import { type ReaderContext } from './define';

const english: TranslationStrings = enUS.translationStrings;
const UNKNOWN: ReferenceResolution = { status: 'unknown' };

export type Translate = ReaderContext['t'];

/** `${var}` interpolation over the locale's strings, falling back to `enUS`, then to the key. */
export const translator =
    (locale: RichTextLocale): Translate =>
    (key, vars) => {
        let template = locale.translationStrings[key];
        if (template === undefined) {
            template = english[key];
        }
        if (template === undefined) {
            template = key;
        }
        if (vars === undefined) {
            return template;
        }
        return template.replaceAll(/\$\{(\w+)\}/g, (match, name: string) => {
            if (Object.hasOwn(vars, name)) {
                return String(vars[name]);
            }
            return match;
        });
    };

export interface ReaderResolvers {
    readonly resolveAssetUrl?: ReaderContext['resolveAssetUrl'];
    readonly resolveReference?: ReaderContext['resolveReference'];
}

/** The context a reader override reads. A resolver that throws gives `null` or `unknown` for that call only (SPEC-rich-text-output/AC-007). */
export const readerContext = (locale: RichTextLocale, resolvers: ReaderResolvers): ReaderContext => {
    const { resolveAssetUrl, resolveReference } = resolvers;
    const base = {
        checkHref: (input: string) => checkHref(input),
        locale,
        t: translator(locale),
        resolveReference: (resourceType: string, resourceId: string): ReferenceResolution => {
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
    if (resolveAssetUrl === undefined) {
        return base;
    }
    return {
        ...base,
        resolveAssetUrl: (assetId, options) => {
            try {
                return resolveAssetUrl(assetId, options);
            } catch {
                return null;
            }
        },
    };
};
