/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type ColorToken,
    type DecodeResult,
    type Diagnostic,
    type ListLevels,
    type PresentationStyle,
    type ReferenceResolution,
    type ResourceLimits,
    type RichTextDocument,
    type RichTextLocale,
} from '#/model';
import { type ResolveAssetUrl } from '#/model/internal';

/** How many nodes or marks of one feature a codec had to drop or flatten when writing a format. */
export interface CodecLoss {
    readonly featureId: string;
    readonly count: number;
}
/** What the HTML writer needs to write a document: the styles, colour tokens and resolvers of the presentation. */
export interface HtmlOptions {
    /** The presentation's `styles`; each used recipe is written inline, beside its class. */
    readonly inlineStyles?: readonly PresentationStyle[];
    /** The presentation's `colorTokens`; a token colour is written inline from it. */
    readonly colorTokens?: readonly ColorToken[];
    /** Localized output text; default `enUS`. */
    readonly locale?: RichTextLocale;
    readonly resolveAssetUrl?: ResolveAssetUrl;
    /** Mention labels as the reader shows them: the current label, or the stored one with the unavailable note. */
    readonly resolveReference?: (resourceType: string, resourceId: string) => ReferenceResolution;
    /** The presentation's `contentClassName`, written on the root beside `fondue-rte-content`, as the reader writes it. */
    readonly contentClassName?: string;
    /** The presentation's `listLevels`, which writes each list's marker inline as the reader does. */
    readonly listLevels?: ListLevels;
    /** Column count `toHTML` writes on the content root, with the narrowest column width. Default 1, which writes none. */
    readonly columns?: number;
    /** Column gap `toHTML` writes on the content root. Default `normal`. */
    readonly columnGap?: string;
}
/** Options for `toMarkdown`, which writes CommonMark 0.31.2 with GFM tables, strikethrough, task list items and autolinks. */
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
    ): {
        readonly html: string;
        /** Generated recipe stylesheet, including `hover`. Empty when no recipes are passed. */
        readonly css: string;
        readonly diagnostics: readonly Diagnostic[];
        /** True exactly when the decode status was `blocked`; the output is then empty. */
        readonly blocked: boolean;
    };
    toPlainText(document: RichTextDocument): {
        readonly text: string;
        readonly losses: readonly CodecLoss[];
        readonly diagnostics: readonly Diagnostic[];
        /** True exactly when the decode status was `blocked`; the output is then empty. */
        readonly blocked: boolean;
    };
    toMarkdown(
        document: RichTextDocument,
        options?: MarkdownOptions,
    ): {
        readonly markdown: string;
        readonly losses: readonly CodecLoss[];
        readonly diagnostics: readonly Diagnostic[];
        /** True exactly when the decode status was `blocked`; the output is then empty. */
        readonly blocked: boolean;
    };
    fromMarkdown(markdown: string): DecodeResult;
}
/** Options for the codecs a definition builds: limits and the id source used when reading Markdown. */
export interface CodecsOptions {
    /** The limits the writing definition used, when a host loosened them through `limitOverrides`. Omitted means the default limits. */
    readonly limits?: Partial<ResourceLimits>;
    /** Creates the `nodeId`s `fromMarkdown` adds; `crypto.randomUUID` when omitted. */
    readonly generateId?: () => string;
}
