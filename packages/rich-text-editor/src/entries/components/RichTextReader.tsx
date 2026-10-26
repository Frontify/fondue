/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { ReaderWith, type RichTextReaderProps } from '#/reader/ReaderWith/ReaderWith';

import { READER_OVERRIDES } from '../shippedReaders';

/** Renders a document as semantic HTML with no engine, hook, context or DOM access, on the server or in the browser. */
export const RichTextReader = (props: RichTextReaderProps): ReactElement =>
    ReaderWith({ ...props, overrides: READER_OVERRIDES });
RichTextReader.displayName = 'RichTextReader';
