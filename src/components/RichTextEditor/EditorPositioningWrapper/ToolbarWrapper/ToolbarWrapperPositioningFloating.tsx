/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useState } from 'react';
import { BalloonToolbar } from '@udecode/plate';
import { calculateToolbarWidth } from '@components/RichTextEditor/utils/toolbarCalc';
import { OFFSET_IN_PX } from '@components/RichTextEditor/utils';
import { ToolbarWrapperProps } from './types';

export const ToolbarWrapperPositioningFloating = ({
    children,
    editorWidth,
    toolbarButtonGroups = [],
}: ToolbarWrapperProps) => {
    const [width, setWidth] = useState<number | null>(null);

    useEffect(() => {
        const toolbarWidthSum = calculateToolbarWidth(toolbarButtonGroups);
        if (toolbarWidthSum > 0) {
            setWidth(toolbarWidthSum + toolbarButtonGroups.length + OFFSET_IN_PX);
        }
    }, [editorWidth, toolbarButtonGroups]);

    return (
        <BalloonToolbar
            popperOptions={{
                modifiers: [
                    { name: 'offset', options: { offset: [0, 2] } },
                    { name: 'flip', options: { fallbackPlacements: ['bottom', 'top'] } },
                    {
                        name: 'hideUntilComputed',
                        enabled: true,
                        phase: 'beforeMain',
                        fn: ({ state }) => {
                            state.styles.popper = {
                                ...state.styles.popper,
                                visibility: 'hidden',
                                width: `${width}px`,
                            };
                        },
                    },
                    {
                        name: 'showWhenComputed',
                        enabled: true,
                        phase: 'beforeWrite',
                        fn: ({ state }) => {
                            if (width) {
                                state.styles.popper.visibility = 'visible';
                            }
                        },
                        requires: ['hideUntilComputed'],
                    },
                ],
            }}
            styles={{ root: { border: 'none', background: '#ffffff' } }}
        >
            <div
                data-test-id="toolbar-floating"
                className="tw-rounded tw-min-h-12 tw-border tw-border-line tw-shadow-lg tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap"
            >
                {children}
            </div>
        </BalloonToolbar>
    );
};
