/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocument } from '../../index';

/** What Tailwind's preflight sets for Firefox's focus ring, in a host stylesheet that loads after the editor's. */
export const HOST_FOCUS_RING_CSS = ':-moz-focusring { outline: auto; }';

export const CONTENT_TEXT = 'Some text';

export const CONTENT_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: CONTENT_TEXT }] }],
};
