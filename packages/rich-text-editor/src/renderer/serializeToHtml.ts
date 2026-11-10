/* (c) Copyright Frontify Ltd., all rights reserved. */

import { buildPluginRegistry, type RteBlockNode, type RteContent, type RteDocumentOf, type RtePlugin } from '#/core';

import { DOCUMENT_STYLE, documentRootSpec, documentTree } from './documentTree';
import { inlineLooks } from './inlineLooks';
import { toHtmlString } from './toHtmlString';

/**
 * How exported HTML carries the looks of its elements: `'classes'` leaves them to the package
 * stylesheet, `'inline'` writes them into each element's `style`.
 */
export type HtmlStyling = 'classes' | 'inline';

export type SerializeToHtmlOptions = {
    /**
     * The plugins, or only their content, whose markup to draw with. A node whose
     * plugin is missing is skipped (a block keeps its content), with a warning in development.
     * @default defaultContent
     */
    plugins?: readonly (RtePlugin | RteContent)[];
    /**
     * Wrap the document in the element `RichTextRenderer` draws, whose class
     * sets how it reads and carries plugins' content-wide styling (columns).
     * Turn off to get the blocks alone.
     *
     * @default true
     */
    wrap?: boolean;
    /**
     * `'inline'` writes the document's and each element's look (font, size, weight, leading,
     * tracking, case, margins, colour) into its `style`, so text reads right without the package
     * stylesheet, in an email for one. Layout still needs the stylesheet: a quote's bar, list
     * markers and indents, check boxes, columns.
     *
     * @default 'classes'
     */
    styling?: HtmlStyling;
};

/**
 * The document as HTML: each node's `toHtml`, the same markup copying out of
 * the editor produces — never a `render.component`, so it pastes back as it was.
 *
 * Plugin classes are in the output, so a page showing it wants the package
 * stylesheet (`@frontify/fondue-rich-text-editor/styles`). An email has none:
 * pass `styling: 'inline'` to write the looks into the elements' `style`.
 */
export const serializeToHtml = <TBlock extends RteBlockNode>(
    doc: RteDocumentOf<TBlock>,
    { plugins = [], wrap = true, styling = 'classes' }: SerializeToHtmlOptions = {},
): string => {
    const registry = buildPluginRegistry(plugins);
    let blocks = documentTree(doc, registry, { useComponents: false });
    let root = documentRootSpec(registry);
    switch (styling) {
        case 'classes':
            break;
        case 'inline':
            blocks = inlineLooks(blocks, registry.contentStyles);
            // The document's own look in place of the `--rte-*` properties, which no rule reads without the stylesheet.
            root = { ...root, attrs: { ...root.attrs, style: DOCUMENT_STYLE } };
            break;
    }
    if (!wrap) {
        return toHtmlString(blocks);
    }
    return toHtmlString([{ kind: 'html', spec: root, content: blocks }]);
};
