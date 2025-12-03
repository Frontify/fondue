/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconEraser } from '@frontify/fondue-icons';
import { useEditorState, useEventPlateId } from '@udecode/plate-core';

import { IconStylingWrapper } from '@components/RichTextEditor/Plugins/helper';
import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import { type ToolbarButtonProps } from '@components/RichTextEditor/components/Toolbar/types';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { resetFormatting } from '@components/RichTextEditor/utils/resetFormatting';

export const ResetFormattingToolbarButton = ({ id, ...props }: ToolbarButtonProps) => {
    const editor = useEditorState(useEventPlateId(id));

    return (
        <ToolbarButton
            tooltip={getTooltip('Clear formatting')}
            onPointerDown={(event) => {
                event.preventDefault();
                resetFormatting(editor);
            }}
            {...props}
        >
            <IconStylingWrapper icon={<IconEraser size={16} />} />
        </ToolbarButton>
    );
};
