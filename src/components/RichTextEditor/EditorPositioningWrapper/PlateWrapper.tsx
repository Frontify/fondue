/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { forwardRef } from 'react';
import { Position, WrapperProps } from './types';
import { EditorPositioningWrapper } from '.';
import { useRichTextEditorContext } from '../context/RichTextEditorContext';
import { merge } from '@utilities/merge';

export const PlateWrapper = forwardRef<HTMLDivElement, WrapperProps>(({ children }, ref) => {
    const { position, border, readonly } = useRichTextEditorContext();

    const toolbarPositioningClasses = EditorPositioningWrapper[position].PlateWrapperClassNames;
    const showBorder = border || position !== Position.FLOATING;
    const borderClasses = showBorder && 'tw-border tw-border-line tw-rounded';

    return (
        <div
            data-test-id="rich-text-editor"
            className={merge([
                toolbarPositioningClasses,
                showBorder && borderClasses,
                showBorder && !readonly && 'hover:tw-border-line-xx-strong tw-transition',
            ])}
            ref={ref}
        >
            {children}
        </div>
    );
});
PlateWrapper.displayName = 'PlateWrapper';
