/* (c) Copyright Frontify Ltd., all rights reserved. */

import { DOMSerializer, type Node as PmNode, type Schema } from 'prosemirror-model';

import { type RteDocumentOf } from '#/domain';

import { toEngineDocument } from './live/documentConversion';

/**
 * A document turned into markup, which is the one thing the engine does that
 * does not need an editor. Two callers want it and must not answer it
 * differently: `mount.ts`, drawing what a reader sees before the editing half
 * arrives, and `serializeToHtml.ts`, handing the same document to an email or a
 * page that has no React in it.
 *
 * It is the serializer the editable view itself uses, on the same `toDOM`, so
 * all three agree by construction rather than by being checked against each
 * other.
 */

/**
 * Elements that cannot hold anything, so an empty one is not an empty block.
 * Everything else the serializer leaves empty is a text block with nothing in it.
 */
const VOID_TAG = new Set([
    'AREA',
    'BASE',
    'BR',
    'COL',
    'EMBED',
    'HR',
    'IMG',
    'INPUT',
    'LINK',
    'META',
    'SOURCE',
    'TRACK',
    'WBR',
]);

/**
 * The one thing the editable element gets from the view rather than from the
 * serializer: an empty text block is held open with a `<br>`. Without it such a
 * block has no height — the swap into the editor would move the page, and a
 * blank line in an exported document would not be there at all.
 */
const holdEmptyBlocksOpen = (host: Element, document: Document): void => {
    for (const element of host.querySelectorAll('*')) {
        if (element.childNodes.length === 0 && !VOID_TAG.has(element.tagName)) {
            element.append(document.createElement('br'));
        }
    }
};

/**
 * Draws into an element, replacing whatever was there, and hands back the
 * engine's form of the document — which is what the caller needs to ask
 * anything about it, such as whether it is empty.
 *
 * The serializer is built once per schema rather than per drawing: it is derived
 * entirely from the schema, and a mounted editor redraws on every document the
 * host sets.
 */
export const createDrawing = (schema: Schema, document: Document): ((host: Element, doc: RteDocumentOf) => PmNode) => {
    const serializer = DOMSerializer.fromSchema(schema);

    return (host, doc) => {
        const node = toEngineDocument(doc, schema);
        host.replaceChildren(serializer.serializeFragment(node.content, { document }));
        holdEmptyBlocksOpen(host, document);
        return node;
    };
};
