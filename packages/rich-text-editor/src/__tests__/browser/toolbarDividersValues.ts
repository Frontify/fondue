/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocument } from '../../index';

/** The accessible name of the button the extra group draws. */
export const PANEL_LABEL = 'Panel';

/** The accessible name of the button the blank control draws when it draws. */
export const BLANK_LABEL = 'Blank';

/** Where the blank control sits: among the toolbar's groups, or inside a group with controls that draw. */
export type BlankAt = 'first' | 'middle' | 'last' | 'beside';

/** A paragraph and nothing else. */
export const PARAGRAPH_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: 'Before' }] }],
};
