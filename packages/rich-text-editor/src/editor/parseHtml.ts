/* (c) Copyright Frontify Ltd., all rights reserved. */

import { buildPluginRegistry, type RteContent, type RteDocumentOf, type RtePlugin } from '#/core';
import { parseHtmlDocument } from '#/editor/engines/prosemirror';

export type ParseHtmlOptions = {
    /**
     * The plugins, or only their content, whose parse rules read the HTML. What none of them reads stays as its text.
     */
    plugins: readonly (RtePlugin | RteContent)[];
    /**
     * Where the HTML's elements are built. Without a browser, pass one from a DOM library (happy-dom, linkedom, …).
     * @default globalThis.document
     */
    document?: Document;
};

const NO_DOCUMENT = 'parseHtml needs a `document` option where there is no browser, for example one from happy-dom.';

const pageDocument = (): Document => {
    if (globalThis.document === undefined) {
        throw new TypeError(NO_DOCUMENT);
    }
    return globalThis.document;
};

/** HTML as a document, read by the rules the editor reads a paste with. */
export const parseHtml = (html: string, { plugins, document }: ParseHtmlOptions): RteDocumentOf => {
    const registry = buildPluginRegistry(plugins);
    return parseHtmlDocument({ html, registry, document: document ?? pageDocument() });
};
