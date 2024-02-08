/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEffect, useRef } from 'react';
import { ReferenceType, autoUpdate, flip, shift } from '@udecode/plate-floating';
import { ToolbarWrapperProps } from './types';
import { FloatingToolbar } from '@components/RichTextEditor/components/Toolbar/FloatingToolbar';

export const ToolbarWrapperPositioningFloating = ({ children }: ToolbarWrapperProps) => {
    const cleanupFunction = useRef<() => void | undefined>();

    useEffect(() => {
        const handleSelectionChange = () => {
            const selection = window.getSelection();
            const hasSelectionRange = (selection?.rangeCount ?? 0) > 0;

            const selectionFrom = hasSelectionRange ? selection?.getRangeAt(0).startOffset : undefined;
            const selectionTo = hasSelectionRange ? selection?.getRangeAt(0).endOffset : undefined;
            const hasActiveSelection = !!selection && selectionFrom !== selectionTo && hasSelectionRange;

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
            className="tw-rounded tw-whitespace-nowrap tw-border tw-border-line tw-shadow-lg tw-bg-base tw-flex tw-flex-wrap"
            state={{
                floatingOptions: {
                    middleware: [flip(), shift()],
                    whileElementsMounted: autoUpdateWithCleanup,
                },
            }}
        >
            <div
                className="tw-divide-y tw-divide-line"
                data-selector="toolbar-floating"
                data-test-id="toolbar-floating"
            >
                {children}
            </div>
        </FloatingToolbar>
    );
};
