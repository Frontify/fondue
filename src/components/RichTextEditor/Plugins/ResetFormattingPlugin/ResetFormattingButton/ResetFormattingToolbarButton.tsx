/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
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
            tooltip={getTooltip('Clear formatting')}
            onMouseDown={() => {
                resetFormatting(editor);
            }}
            {...props}
        />
    );
});
