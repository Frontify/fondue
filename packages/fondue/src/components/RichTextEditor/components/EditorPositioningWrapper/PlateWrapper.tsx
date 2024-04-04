/* (c) Copyright Frontify Ltd., all rights reserved. */

import { forwardRef } from 'react';

import { useRichTextEditorContext } from '../../context/RichTextEditorContext';

import { type WrapperProps } from './types';

export const PlateWrapper = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => {
    const { wrapperClassNames, editorId } = useRichTextEditorContext();

    return (
        <div data-editor-id={editorId} data-test-id="rich-text-editor" className={wrapperClassNames} ref={ref}>
            {children}
        </div>
    );
});
PlateWrapper.displayName = 'PlateWrapper';
