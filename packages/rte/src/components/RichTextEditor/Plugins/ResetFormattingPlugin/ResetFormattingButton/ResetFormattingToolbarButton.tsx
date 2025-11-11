/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useEditorState, useEventPlateId } from '@udecode/plate-core';

import { IconStylingWrapper } from '@components/RichTextEditor/Plugins/helper';
import { ToolbarButton } from '@components/RichTextEditor/components/Toolbar/ToolbarButton';
import { type ToolbarButtonProps } from '@components/RichTextEditor/components/Toolbar/types';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { resetFormatting } from '@components/RichTextEditor/utils/resetFormatting';
import IconEraser16 from '@foundation/Icon/Generated/IconEraser16';

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
            <IconStylingWrapper icon={<IconEraser16 />} />
        </ToolbarButton>
    );
};
