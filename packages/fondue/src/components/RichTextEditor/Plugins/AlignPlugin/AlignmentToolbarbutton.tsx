/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ToolbarButton } from '../../components/Toolbar/ToolbarButton';
import { useEditorSelector, useEditorState, useEventPlateId } from '@udecode/plate-core';
import { KEY_ALIGN, setAlign } from '@udecode/plate-alignment';
import { findNode } from '@udecode/slate';
import { isDefined } from '@udecode/utils';
import { ReactNode, forwardRef } from 'react';

export const AlignmentToolbarButton = forwardRef<
    HTMLButtonElement,
    {
        value: 'left' | 'right' | 'center' | 'justify';
        editorId: string;
        children: ReactNode;
        tooltip: ReactNode;
    }
>(({ value, editorId, ...rootProps }, ref) => {
    const editor = useEditorState(useEventPlateId(editorId));
    const currentAlignment = useEditorSelector((editor) => {
        const entry = findNode(editor, {
            match: (n) => isDefined(n[KEY_ALIGN]),
        });
        if (entry && entry.length > 0) {
            const nodeValue = entry[0][KEY_ALIGN] as string;
            if (nodeValue === 'right') {
                return 'right';
            }
            if (nodeValue === 'center') {
                return 'center';
            }
            if (nodeValue === 'justify') {
                return 'justify';
            }
        }

        return 'left';
    }, []);

    return (
        <ToolbarButton
            pressed={currentAlignment === value}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => setAlign(editor, { value })}
            ref={ref}
            {...rootProps}
        />
    );
});

AlignmentToolbarButton.displayName = 'AlignmentToolbarButton';
