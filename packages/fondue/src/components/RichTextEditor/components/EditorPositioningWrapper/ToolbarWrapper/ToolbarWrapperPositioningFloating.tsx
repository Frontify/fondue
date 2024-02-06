/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';
import { ReferenceType, autoUpdate, flip, shift } from '@udecode/plate';
import { ToolbarWrapperProps } from './types';
import { FloatingToolbar } from '@components/RichTextEditor/components/Toolbar/FloatingToolbar';

export const ToolbarWrapperPositioningFloating = ({ children }: ToolbarWrapperProps) => {
    const cleanupFunction = useRef<() => void | undefined>();

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
        <FloatingToolbar
            className="tw-rounded tw-whitespace-nowrap tw-border tw-border-line tw-shadow-lg tw-bg-base tw-divide-y tw-divide-line tw-flex tw-flex-wrap tw-z-50"
            state={{
                floatingOptions: {
                    middleware: [flip(), shift()],
                    whileElementsMounted: autoUpdateWithCleanup,
                },
            }}
        >
            <div data-selector="toolbar-floating" data-test-id="toolbar-floating">
                {children}
            </div>
        </FloatingToolbar>
    );
};
