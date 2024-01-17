/* (c) Copyright Frontify Ltd., all rights reserved. */

// import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
// import { IconTextAlignmentCentre16 } from '@foundation/Icon/Generated';
// import { AlignToolbarButton, someNode, useEventPlateId, useEditorState } from '@udecode/plate';
// import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../../helper';
// import { PluginButtonProps } from '../../types';

// export const AlignCenterButton = ({ id, editorId }: PluginButtonProps) => {
//     const editor = useEditorState(useEventPlateId(editorId));
//     const isActive = !!editor?.selection && someNode(editor, { match: (node) => node.align === 'center' });

//     return (
//         <ButtonWrapper id={id}>
//             <AlignToolbarButton
//                 active={isActive}
//                 tooltip={getTooltip('Align center')}
//                 value="center"
//                 icon={<IconStylingWrapper icon={<IconTextAlignmentCentre16 />} />}
//                 classNames={getButtonClassNames()}
//                 styles={buttonStyles}
//                 actionHandler="onMouseDown"
//             />
//         </ButtonWrapper>
//     );
// };

import { IconTextAlignmentCentre16 } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';

export const AlignCenterButton = ({ id }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <IconStylingWrapper icon={<IconTextAlignmentCentre16 />} />
        </ButtonWrapper>
    );
};
