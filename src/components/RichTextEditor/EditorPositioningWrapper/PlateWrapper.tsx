/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import { WrapperProps } from './types';
import { EditorPositioningWrapper } from '.';
import { useRichTextEditorContext } from '../context/RichTextEditorContext';

export const PlateWrapper = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => {
    const { position, style } = useRichTextEditorContext();

    const classNames = EditorPositioningWrapper[position].PlateWrapperClassNames;

    return (
        <div data-test-id="rich-text-editor" className={classNames} style={style} ref={ref}>
            {children}
        </div>
    );
});
PlateWrapper.displayName = 'PlateWrapper';
