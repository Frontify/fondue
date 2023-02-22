/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import { WrapperProps } from './types';
import { EditorPositioningWrapper } from '.';
import { useRichTextEditorContext } from '../context/RichTextEditorContext';

export const PlateWrapper = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => {
    const { position } = useRichTextEditorContext();

    const classNames = EditorPositioningWrapper[position].PlateWrapperClassNames;

    return (
        <div data-test-id="rich-text-editor" className={classNames} ref={ref}>
            {children}
        </div>
    );
});
PlateWrapper.displayName = 'PlateWrapper';
