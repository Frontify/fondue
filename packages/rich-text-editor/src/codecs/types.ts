/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    type DecodeResult,
    type Diagnostic,
    type IdSource,
    type ResourceLimits,
    type RichTextDocument,
    type RichTextLocale,
} from '#/model';
import { type ResolveAssetUrl } from '#/model/declarations';

export interface CodecLoss {
    readonly featureId: string;
    readonly count: number;
}
/** One dialect: CommonMark 0.31.2 with GFM tables, strikethrough, task list items and autolinks. */
export interface MarkdownOptions {
    /** Localized output text; default `enUS`. */
    readonly locale?: RichTextLocale;
    readonly resolveAssetUrl?: ResolveAssetUrl;
}
export interface HtmlOptions extends MarkdownOptions {
    /** The presentation's `contentClassName`, which the root carries beside `fondue-rte-content`, as in the reader. */
    readonly contentClassName?: string;
}
/**
 * Each codec first runs `decodeDocument(document, model, options)`. `diagnostics` holds the decode
 * diagnostics, which carry the diagnostic that made each island, with the path of the failing value (DR-041), then the codec's own. A `blocked`
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
    /** The limits the writing definition used, when a host loosened them through `limitOverrides`; default the Limits table. */
    readonly limits?: Partial<ResourceLimits>;
    /** For the `nodeId`s `fromMarkdown` creates; the package default when omitted. */
    readonly ids?: IdSource;
}
