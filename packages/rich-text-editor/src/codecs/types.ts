/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type DecodeResult,
    type Diagnostic,
    type ListLevels,
    type ResourceLimits,
    type RichTextDocument,
    type RichTextLocale,
} from '#/model';
import { type ResolveAssetUrl } from '#/model/declarations';

export interface CodecLoss {
    readonly featureId: string;
    readonly count: number;
}
export interface HtmlOptions {
    /** Localized output text; default `enUS`. */
    readonly locale?: RichTextLocale;
    readonly resolveAssetUrl?: ResolveAssetUrl;
    /** The presentation's `contentClassName`, written on the root beside `fondue-rte-content`, as the reader writes it. */
    readonly contentClassName?: string;
    /** The presentation's `listLevels`, which writes each list's marker inline as the reader does. */
    readonly listLevels?: ListLevels;
    /** Column count `toHTML` writes on the content root, with the narrowest column width. Default 1, which writes none. */
    readonly columns?: number;
    /** Column gap `toHTML` writes on the content root. Default `normal`. */
    readonly columnGap?: string;
}
/** One dialect: CommonMark 0.31.2 with GFM tables, strikethrough, task list items and autolinks. */
export interface MarkdownOptions {
    /** Localized output text; default `enUS`. */
    readonly locale?: RichTextLocale;
    readonly resolveAssetUrl?: ResolveAssetUrl;
}
/**
 * Each codec first runs `decodeDocument(document, model, options)`. `diagnostics` holds the decode
 * diagnostics, which carry the diagnostic that made each island, with the path of the failing value, then the codec's own. A `blocked`
 * decode gives empty output with those diagnostics; no codec throws on input.
 */
export interface RichTextCodecs {
    toHTML(
        document: RichTextDocument,
        options?: HtmlOptions,
    ): { readonly html: string; readonly diagnostics: readonly Diagnostic[] };
    toPlainText(document: RichTextDocument): {
        readonly text: string;
        readonly losses: readonly CodecLoss[];
        readonly diagnostics: readonly Diagnostic[];
    };
    toMarkdown(
        document: RichTextDocument,
        options?: MarkdownOptions,
    ): {
        readonly markdown: string;
        readonly losses: readonly CodecLoss[];
        readonly diagnostics: readonly Diagnostic[];
    };
    fromMarkdown(markdown: string): DecodeResult;
}
export interface CodecsOptions {
    /** The limits the writing definition used, when a host loosened them through `limitOverrides`. Omitted means the default limits. */
    readonly limits?: Partial<ResourceLimits>;
    /** Creates the `nodeId`s `fromMarkdown` adds; `crypto.randomUUID` when omitted. */
    readonly generateId?: () => string;
}
