/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocument } from '../../index';

/** The accessible name of the button the extra group draws. */
export const PANEL_LABEL = 'Panel';

/** A paragraph and nothing else, where no control of the table draws. */
export const TEXT_ONLY_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [{ type: 'paragraph', children: [{ text: 'Before' }] }],
};
