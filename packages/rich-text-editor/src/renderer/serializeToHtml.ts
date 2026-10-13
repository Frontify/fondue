/* (c) Copyright Frontify Ltd., all rights reserved. */

import { buildPluginRegistry, type RteBlockNode, type RteDocumentOf, type RtePlugin } from '#/core';

import { documentTree } from './documentTree';
import { toHtmlString } from './toHtmlString';

export type SerializeToHtmlOptions = {
    /**
     * The plugins whose markup to draw with — the same list the editor is given.
     * They are what define the markup, so a document drawn without the feature
     * that wrote part of it has nothing to draw and throws rather than quietly
     * losing it.
     */
    plugins: readonly RtePlugin[];
};

/**
 * The document as HTML: each node's `toHtml`, the same markup copying out of
 * the editor produces — never a `render.component`, so what is exported pastes
 * back as what it was. No toolbar, no placeholder, no React.
 *
 * The classes the plugins put on their markup ARE in the output, so a page
 * showing it wants this package's stylesheet
 * (`@frontify/fondue-rich-text-editor/styles`). An email client has no
 * stylesheet, so whatever builds the email has to inline the styles it needs.
 */
export const serializeToHtml = <TBlock extends RteBlockNode>(
    doc: RteDocumentOf<TBlock>,
    options: SerializeToHtmlOptions,
): string => toHtmlString(documentTree(doc, buildPluginRegistry(options.plugins), { useComponents: false }));
