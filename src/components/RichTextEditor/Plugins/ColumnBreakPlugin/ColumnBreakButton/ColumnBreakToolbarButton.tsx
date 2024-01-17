/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconStylingWrapper } from '@components/RichTextEditor/Plugins/helper';
import { IconTextColumnBreak16 } from '@foundation/Icon';

// import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
// import {
//     PlateEditor,
//     ToolbarButton,
//     ToolbarButtonProps,
//     someNode,
//     useEventPlateId,
//     useEditorState,
// } from '@udecode/plate';
// import { getButtonClassNames } from '../../helper';
// import { toggleColumnBreak } from '../onKeyDownColumnBreak';
// import { getColumnBreakCount } from '../utils/getColumnBreakCount';

export const ColumnBreakToolbarButton = ({ id, ...props }: any) => {
    return <IconStylingWrapper icon={<IconTextColumnBreak16 />} />;
};
