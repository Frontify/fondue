/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteDocument } from '../../index';

// Shared by the fixture and the tests. Apart from the fixture component, because a component
// test cannot import plain values from the file holding the components it mounts.

/** The text of the one paragraph, stored with the logical end alignment. */
export const END_TEXT = 'end';

/** How wide each editor is, so the aligned text sits far from the opposite edge. */
export const EDITOR_WIDTH = '400px';

export const END_ALIGNED_DOCUMENT: RteDocument = {
    version: 1,
    blocks: [{ type: 'paragraph', align: 'end', children: [{ text: END_TEXT }] }],
};
