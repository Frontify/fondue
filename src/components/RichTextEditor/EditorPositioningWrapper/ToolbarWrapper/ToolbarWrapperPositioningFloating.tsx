/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { useEffect, useRef, useState } from 'react';
import { BalloonToolbar, ReferenceType, autoUpdate, flip, shift } from '@udecode/plate';
import { OFFSET_IN_PX, calculateToolbarWidth } from '@components/RichTextEditor/utils';
import { ToolbarWrapperProps } from './types';

export const ToolbarWrapperPositioningFloating = ({
    children,
    editorWidth,
    toolbarButtonGroups = [],
    toolbarWidth,
}: ToolbarWrapperProps) => {
    const [width, setWidth] = useState<number | undefined>();
    const cleanupFunction = useRef<() => void | undefined>();

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

    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection();
            const rangeCount = selection?.rangeCount ?? 0;

            const selectionFrom = rangeCount > 0 && selection?.getRangeAt(0).startOffset;
            const selectionTo = rangeCount > 0 && selection?.getRangeAt(0).endOffset;
            const hasActiveSelection = !!selection && selectionFrom !== selectionTo && rangeCount > 0;

            if (!hasActiveSelection && cleanupFunction.current) {
                cleanupFunction.current();
            }
        };

        document.addEventListener('selectionchange', handleSelectionChange);
        return () => document.removeEventListener('selectionchange', handleSelectionChange);
    }, []);

    const autoUpdateWithCleanup = (reference: ReferenceType, floating: HTMLElement, update: () => void) => {
        cleanupFunction.current = autoUpdate(reference, floating, update);
    };

    return (
        <BalloonToolbar
            floatingOptions={{
                middleware: [flip(), shift()],
                whileElementsMounted: autoUpdateWithCleanup,
            }}
            styles={{ root: { border: 'none', background: '#ffffff', width, transitionDuration: '0s' } }}
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
