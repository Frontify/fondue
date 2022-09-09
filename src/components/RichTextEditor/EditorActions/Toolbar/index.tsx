/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactNode } from 'react';
import { useRichTextEditorContext } from '../../context/RichTextEditorContext';

type ToolbarProps = { children?: ReactNode };

export const Toolbar = ({ children }: ToolbarProps) => {
    const { PositioningWrapper } = useRichTextEditorContext();

    return (
        <PositioningWrapper.ToolbarWrapper>
            <div className="tw-divide-x tw-divide-line tw-flex tw-w-full tw-flex-wrap">{children}</div>
        </PositioningWrapper.ToolbarWrapper>
    );
};
