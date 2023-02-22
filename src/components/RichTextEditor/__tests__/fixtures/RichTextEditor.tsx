/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { RichTextEditor } from '@components/RichTextEditor';
import { orderedListValue, unorderedListValue } from '@components/RichTextEditor/helpers/exampleValues';

export const insertTextAndOpenToolbar = () => cy.get('[contenteditable=true]').click().type('hello{selectall}');

export const RichTextEditorWithUnorderedListStyles = () => (
    <RichTextEditor value={JSON.stringify([unorderedListValue])} />
);

export const RichTextEditorWithOrderedListStyles = () => <RichTextEditor value={JSON.stringify([orderedListValue])} />;
