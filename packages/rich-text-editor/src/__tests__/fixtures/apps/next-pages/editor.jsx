/* (c) Copyright Frontify Ltd., all rights reserved. */

/* oxlint-disable typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access -- the app's packages and shared document exist only in its scratch install */

import { RichTextEditor } from '@frontify/rich-text-editor';

import { defaultValue } from './document';

export default function Editor() {
    return <RichTextEditor profile="comment" aria-label="Comment" defaultValue={defaultValue} />;
}

/* oxlint-enable typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access */
