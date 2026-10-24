/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import { ReaderWith, type RichTextReaderProps } from '#/reader/reader';

import { SHIPPED_OVERRIDES } from './shipped-readers';

export { defineReaderFeature, type ReaderContext, type ReaderNodeProps, type ReaderRenderers } from '#/reader/define';
export { type ReaderPresentation, type RichTextReaderProps } from '#/reader/reader';

/** Renders a document as semantic HTML with no engine, hook, context or DOM access, on the server or in the browser. */
export const RichTextReader = (props: RichTextReaderProps): ReactElement =>
    ReaderWith({ ...props, overrides: SHIPPED_OVERRIDES });
