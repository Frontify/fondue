/* (c) Copyright Frontify Ltd., all rights reserved. */

import { buildContentRegistry, type RteBlockNode, type RteContent, type RtePlugin } from '#/core';
import { type RteBlock, type RteDocument } from '#/documentFormat';
import { documentRootSpec, documentTree } from '#/renderer/documentTree';

import { toHtmlString } from './toHtmlString';

export type SerializeToHtmlOptions = {
    /**
     * The plugins, or only their content, whose markup to draw with. A node whose
     * plugin is missing is skipped (a block keeps its content), with a warning in development.
     */
    plugins: readonly (RtePlugin | RteContent)[];
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
 * The document as an HTML string: each node's `toHtml`, the same markup copying
 * out of the editor produces, never a `render.component`, so it pastes back as it
 * was. No React or browser needed. The host passes the plugins whose content the
 * document uses; `wrap: false` leaves out the root element.
 *
 * Plugin classes are in the output, so a page showing it wants the package
 * stylesheet (`@frontify/fondue-rich-text-editor/styles`); an email must inline
 * the styles it needs.
 *
 * @example
 * const html = serializeToHtml(
 *     { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'Hello', bold: true }] }] },
 *     { plugins: [boldContent], wrap: false },
 * );
 */
export const serializeToHtml = <TBlock extends RteBlockNode = RteBlock>(
    doc: RteDocument<TBlock>,
    { plugins, wrap = true }: SerializeToHtmlOptions,
): string => {
    const registry = buildContentRegistry(plugins);
    const blocks = documentTree(doc, registry, { useComponents: false });
    return toHtmlString(wrap ? [{ kind: 'html', spec: documentRootSpec(registry), content: blocks }] : blocks);
};
