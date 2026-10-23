/* (c) Copyright Frontify Ltd., all rights reserved. */

/* oxlint-disable typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access -- the app's packages and shared document exist only in its scratch install */

import '@frontify/rich-text-editor/styles';
import { RichTextEditor } from '@frontify/rich-text-editor';
import { commentModel } from '@frontify/rich-text-editor/features';
import { RichTextReader } from '@frontify/rich-text-editor/reader';
import { createRoot, hydrateRoot } from 'react-dom/client';

import { defaultValue, storedDocument } from './document.js';

hydrateRoot(document.getElementById('reader'), <RichTextReader document={storedDocument} model={commentModel} />);
createRoot(document.getElementById('editor')).render(
    <RichTextEditor profile="comment" aria-label="Comment" defaultValue={defaultValue} />,
);

/* oxlint-enable typescript/no-unsafe-assignment, typescript/no-unsafe-call, typescript/no-unsafe-member-access */
