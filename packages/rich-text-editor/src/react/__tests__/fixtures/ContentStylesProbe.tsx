/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    blocksRecord,
    storedBulletList,
    storedCodeBlock,
    storedHeading,
    storedOrderedList,
    paragraph,
    PROFILE_MODELS,
    storedQuote,
    text,
} from '#/react/examples/records';
import { RichTextEditor } from '#/react/RichTextEditor/RichTextEditor';

const document = blocksRecord(
    PROFILE_MODELS.document,
    'content-styles',
    storedHeading('heading-1', 1, 'One'),
    storedHeading('heading-2', 2, 'Two'),
    storedHeading('heading-3', 3, 'Three'),
    paragraph(text('A paragraph')),
    storedQuote(text('A quote')),
    storedCodeBlock('const gap = 1;'),
    storedBulletList([text('Bullet')]),
    storedOrderedList([text('Ordered')]),
);

/** The Document profile's editor over one of each styled block, named Notes. */
export const ContentStylesProbe = () => (
    <RichTextEditor aria-label="Notes" profile="document" defaultValue={document} />
);
