/* (c) Copyright Frontify Ltd., all rights reserved. */

import { resetFormatting } from '@components/RichTextEditor/utils/resetFormatting';
import {
    ToolbarButton,
    ToolbarButtonProps,
    useEventPlateId,
    usePlateEditorState,
    withPlateProvider,
} from '@udecode/plate';
import React from 'react';

export const ResetFormattingToolbarButton = withPlateProvider(({ id, ...props }: ToolbarButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(id));

    return (
        <ToolbarButton
            onMouseDown={() => {
                resetFormatting(editor);
            }}
            {...props}
        />
    );
});
