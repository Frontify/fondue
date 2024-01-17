/* (c) Copyright Frontify Ltd., all rights reserved. */

// import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
// import { IconTextAlignmentRight16 } from '@foundation/Icon/Generated';
// import { AlignToolbarButton, someNode, useEventPlateId, useEditorState } from '@udecode/plate';
// import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../../helper';
// import { PluginButtonProps } from '../../types';

// export const AlignRightButton = ({ id, editorId }: PluginButtonProps) => {
//     const editor = useEditorState(useEventPlateId(editorId));
//     const isActive = !!editor?.selection && someNode(editor, { match: (node) => node.align === 'right' });

//     return (
//         <ButtonWrapper id={id}>
//             <AlignToolbarButton
//                 active={isActive}
//                 tooltip={getTooltip('Align right')}
//                 value="right"
//                 icon={<IconStylingWrapper icon={<IconTextAlignmentRight16 />} />}
//                 classNames={getButtonClassNames()}
//                 styles={buttonStyles}
//                 actionHandler="onMouseDown"
//             />
//         </ButtonWrapper>
//     );
// };

import { IconTextAlignmentRight16 } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';

export const AlignRightButton = ({ id }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <IconStylingWrapper icon={<IconTextAlignmentRight16 />} />
        </ButtonWrapper>
    );
};
