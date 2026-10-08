/* (c) Copyright Frontify Ltd., all rights reserved. */

import { enUS } from '#/locales/en-US';
import { checkHref, type CodecContext, type RichTextLocale, type TranslationStrings } from '#/model';

const english: TranslationStrings = enUS.translationStrings;

type ResolveAssetUrl = NonNullable<CodecContext['resolveAssetUrl']>;

/** `${var}` interpolation over the locale's strings, falling back to `enUS`, then to the key. */
const translator =
    (locale: RichTextLocale): CodecContext['t'] =>
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

/** The context a codec override reads; a resolver that throws gives `null` for that call only. */
export const codecContext = (locale: RichTextLocale = enUS, resolveAssetUrl?: ResolveAssetUrl): CodecContext => {
    const base = { checkHref: (input: string) => checkHref(input), locale, t: translator(locale) };
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
