/* (c) Copyright Frontify Ltd., all rights reserved. */

import { enUS } from '#/locales/en-US';
import { type RichTextLocale } from '#/model';
import { codecContext, resolvingSafely } from '#/model/internal';

import { type ReaderContext } from './define';

export type ReaderResolvers = {
    resolveAssetUrl?: ReaderContext['resolveAssetUrl'];
    resolveReference?: ReaderContext['resolveReference'];
};

/** The codec context plus `resolveReference`. A resolver that throws gives `null` or `unknown` for that call only. */
export const readerContext = (locale: RichTextLocale, resolvers: ReaderResolvers): ReaderContext => {
    const { resolveAssetUrl, resolveReference } = resolvers;

    return { ...codecContext(locale, enUS, resolveAssetUrl), resolveReference: resolvingSafely(resolveReference) };
};
