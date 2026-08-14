/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocumentOf, type RtePlugin } from '#/domain';
import { type RenderProbe } from '#/ports';

import { createDrawing } from './draw';
import { buildSchema } from './setup/schema';

/**
 * A document as HTML, for everywhere the editor is not: an email, a
 * server-rendered page, anything holding the document but running no React.
 *
 * It draws the document exactly as a mounted one is drawn — same schema, same
 * serializer, same `toDOM` — so an exported document and the one on screen are
 * the same markup rather than two renderings that ought to match.
 *
 * The probe and the document are taken rather than reached for, as everywhere
 * else in this folder: the engine does not choose how React becomes markup, and
 * on a server there is no page to borrow a document from.
 */

export type SerializeOptions = {
    /** The features whose markup to draw with — the same list an editor would be given. */
    plugins: RtePlugin[];
    probe: RenderProbe;
    /** Where the markup is built. */
    document: Document;
};

export const serializeToHtml = (doc: RteDocumentOf, { plugins, probe, document }: SerializeOptions): string => {
    const { schema } = buildSchema(plugins, probe);
    const host = document.createElement('div');
    createDrawing(schema, document)(host, doc);
    return host.innerHTML;
};
