/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconStylingWrapper } from '@components/RichTextEditor/Plugins/helper';
import { IconEraser16 } from '@foundation/Icon';

// import { ToolbarButton, ToolbarButtonProps, useEventPlateId, useEditorState, withPlateProvider } from '@udecode/plate';

export const ResetFormattingToolbarButton = ({ id, ...props }: any) => {
    return <IconStylingWrapper icon={<IconEraser16 />} />;
};
