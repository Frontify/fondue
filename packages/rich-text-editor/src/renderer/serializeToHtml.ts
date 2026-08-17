/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createElement, Fragment } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { buildPluginRegistry, type RteBlockNode, type RteDocumentOf, type RtePlugin } from '#/core';

import { renderDocument } from './renderDocument';

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
 * The document as HTML: content, and nothing that only meant something while it
 * could be edited — no toolbar, no placeholder.
 *
 * The classes the plugins put on what they render ARE in the output, so a page
 * showing it wants this package's stylesheet
 * (`@frontify/fondue-rich-text-editor/styles`). An email client has no
 * stylesheet, so whatever builds the email has to inline the styles it needs.
 */
export const serializeToHtml = <TBlock extends RteBlockNode>(
    doc: RteDocumentOf<TBlock>,
    options: SerializeToHtmlOptions,
): string =>
    renderToStaticMarkup(createElement(Fragment, null, renderDocument(doc, buildPluginRegistry(options.plugins))));
