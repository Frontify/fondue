/* (c) Copyright Frontify Ltd., all rights reserved. */

// import { AlignToolbarButton, someNode, useEventPlateId, useEditorState } from '@udecode/plate';
// import { IconTextAlignmentJustify16 } from '@foundation/Icon/Generated';
// import { PluginButtonProps } from '../../types';
// import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../../helper';
// import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

// export const AlignJustifyButton = ({ id, editorId }: PluginButtonProps) => {
//     const editor = useEditorState(useEventPlateId(editorId));
//     const isActive = !!editor?.selection && someNode(editor, { match: (node) => node.align === 'justify' });
//     return (
//         <ButtonWrapper id={id}>
//             <AlignToolbarButton
//                 active={isActive}
//                 tooltip={getTooltip('Justify')}
//                 value="justify"
//                 icon={<IconStylingWrapper icon={<IconTextAlignmentJustify16 />} />}
//                 classNames={getButtonClassNames()}
//                 styles={buttonStyles}
//                 actionHandler="onMouseDown"
//             />
//         </ButtonWrapper>
//     );
// };

import { IconTextAlignmentJustify16 } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper } from '../../helper';
import { PluginButtonProps } from '../../types';

export const AlignJustifyButton = ({ id }: PluginButtonProps) => {
    return (
        <ButtonWrapper id={id}>
            <IconStylingWrapper icon={<IconTextAlignmentJustify16 />} />
        </ButtonWrapper>
    );
};
