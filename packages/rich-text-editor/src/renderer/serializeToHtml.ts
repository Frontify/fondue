/* (c) Copyright Frontify Ltd., all rights reserved. */

import { buildPluginRegistry, type RteBlockNode, type RteDocumentOf, type RtePlugin } from '#/core';

import { documentRootSpec, documentTree } from './documentTree';
import { toHtmlString } from './toHtmlString';

export type SerializeToHtmlOptions = {
    /**
     * The plugins whose markup to draw with — the editor's list. A node whose
     * plugin is missing is skipped (a block keeps its content), with a warning
     * in development. The package root defaults it to `defaultPlugins`.
     */
    plugins?: readonly RtePlugin[];
    /**
     * Wrap the document in the element `RichTextRenderer` draws, whose class
     * sets how it reads and carries plugins' content-wide styling (columns).
     * Turn off to get the blocks alone.
     *
     * @default true
     */
    wrap?: boolean;
};

/**
 * The document as HTML: each node's `toHtml`, the same markup copying out of
 * the editor produces — never a `render.component`, so it pastes back as it was.
 *
 * Plugin classes are in the output, so a page showing it wants the package
 * stylesheet (`@frontify/fondue-rich-text-editor/styles`); an email must inline
 * the styles it needs.
 */
export const serializeToHtml = <TBlock extends RteBlockNode>(
    doc: RteDocumentOf<TBlock>,
    { plugins = [], wrap = true }: SerializeToHtmlOptions = {},
): string => {
    const registry = buildPluginRegistry(plugins);
    const blocks = documentTree(doc, registry, { useComponents: false });
    return toHtmlString(wrap ? [{ kind: 'html', spec: documentRootSpec(registry), content: blocks }] : blocks);
};
