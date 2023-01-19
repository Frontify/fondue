/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import { WrapperProps } from './types';
import { useRichTextEditorContext } from '../context/RichTextEditorContext';

export const PlateWrapper = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => {
    const { wrapperClassNames, style } = useRichTextEditorContext();

    return (
        <div data-test-id="rich-text-editor" className={wrapperClassNames} style={style} ref={ref}>
            {children}
        </div>
    );
});
PlateWrapper.displayName = 'PlateWrapper';
