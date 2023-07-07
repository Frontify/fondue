/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { BalloonToolbar, flip, shift } from '@udecode/plate';
import { OFFSET_IN_PX, calculateToolbarWidth } from '@components/RichTextEditor/utils';
import { ToolbarWrapperProps } from './types';

export const ToolbarWrapperPositioningFloating = ({
    children,
    editorWidth,
    toolbarButtonGroups = [],
    toolbarWidth,
}: ToolbarWrapperProps) => {
    const [width, setWidth] = useState<number | undefined>();

    useEffect(() => {
        if (toolbarWidth) {
            setWidth(toolbarWidth);
        } else {
            const toolbarWidthSum = calculateToolbarWidth(toolbarButtonGroups);
            if (toolbarWidthSum > 0) {
                setWidth(toolbarWidthSum + toolbarButtonGroups.length + OFFSET_IN_PX);
            }
        }
    }, [editorWidth, toolbarWidth, toolbarButtonGroups]);

    return (
        <BalloonToolbar
            floatingOptions={{
                middleware: [flip(), shift()],
            }}
            styles={{ root: { border: 'none', background: '#ffffff', width } }}
        >
            <div
                data-selector="toolbar-floating"
                data-test-id="toolbar-floating"
                className="tw-rounded tw-min-h-12 tw-border tw-border-line tw-shadow-lg tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap"
            >
                {children}
            </div>
        </BalloonToolbar>
    );
};
