/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type RteBlock, type RteDocumentWith } from '../../index';

// Shared by the fixture and the tests. Apart from the fixture component, because a component
// test cannot import plain values from the file holding the components it mounts.

/** The margin the frame's look hands to the document, above and below. */
export const FRAME_MARGIN = '40px';

/** A block that holds paragraphs and hands the document its own margins. */
type FrameBlock = {
    type: 'frame';
    children: RteBlock[];
};

const paragraph = (text: string): RteBlock => ({ type: 'paragraph', children: [{ text }] });

type UnlistedTagBlock = {
    type: 'section';
    children: [{ text: string }];
};

export const FRAME_DOCUMENT: RteDocumentWith<{ block: FrameBlock | UnlistedTagBlock }> = {
    version: 1,
    blocks: [
        paragraph('Before'),
        { type: 'frame', children: [paragraph('First inside'), paragraph('Last inside')] },
        { type: 'section', children: [{ text: 'Section' }] },
        paragraph('After'),
    ],
};
