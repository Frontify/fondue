/* (c) Copyright Frontify Ltd., all rights reserved. */

import { serializeToHtml as draw } from './adapters/prosemirror/serializeToHtml';
import { createReactRenderProbe, pageDocument } from './adapters/reactProbe/renderProbe';
import { type RteBlockNode, type RteDocumentOf, type RtePlugin } from './domain';

/**
 * Turning a stored document into HTML, wired up: the engine that draws it and
 * the probe that turns a feature's React into markup are chosen here, exactly as
 * `ui/hooks/useEditorHandle.ts` chooses them for a mounted editor. Both go
 * through the same drawing, so a document exported here and the same document on
 * screen are the same markup.
 *
 * It sits beside `index.ts` rather than in a layer for the reason `documentFormat.ts`
 * does: choosing implementations is the composition root's job.
 */

export type SerializeToHtmlOptions = {
    /**
     * The plugins whose markup to draw with — the same list the editor is given.
     * They are what define the markup, so a document drawn without the feature
     * that wrote part of it has nothing to draw and throws rather than quietly
     * losing it.
     */
    plugins: RtePlugin[];
    /**
     * Where the markup is built. Defaults to the page's document, so a browser
     * needs nothing; a server has no page and passes one in — from `happy-dom`
     * or `jsdom`:
     *
     * ```ts
     * const { window } = new Window();
     * serializeToHtml(doc, { plugins: defaultPlugins, document: window.document });
     * ```
     */
    document?: Document;
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
): string => {
    const document = options.document ?? pageDocument();
    return draw(doc, { plugins: options.plugins, probe: createReactRenderProbe(document), document });
};
