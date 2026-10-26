/* (c) Copyright Frontify Ltd., all rights reserved. */

import {
    blocksRecord,
    bulletList,
    codeBlock,
    heading,
    orderedList,
    paragraph,
    PROFILE_MODELS,
    quote,
    text,
} from '#/react/examples/records';
import { RichTextEditor } from '#/react/RichTextEditor/RichTextEditor';

const document = blocksRecord(
    PROFILE_MODELS.document,
    'content-styles',
    heading('heading-1', 1, 'One'),
    heading('heading-2', 2, 'Two'),
    heading('heading-3', 3, 'Three'),
    paragraph(text('A paragraph')),
    quote(text('A quote')),
    codeBlock('const gap = 1;'),
    bulletList([text('Bullet')]),
    orderedList([text('Ordered')]),
);

/** The Document profile's editor over one of each styled block, named Notes. */
export const ContentStylesProbe = () => (
    <RichTextEditor aria-label="Notes" profile="document" defaultValue={document} />
);
