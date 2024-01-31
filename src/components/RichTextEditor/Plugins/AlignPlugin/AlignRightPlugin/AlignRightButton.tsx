/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconTextAlignmentRight16 } from '@foundation/Icon/Generated';
import { AlignToolbarButton, someNode, useEventPlateId, usePlateEditorState } from '@udecode/plate';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../../helper';
import { PluginButtonProps } from '../../types';

export const AlignRightButton = ({ id, editorId }: PluginButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(editorId));
    const isActive = !!editor?.selection && someNode(editor, { match: (node) => node.align === 'right' });

    return (
        <ButtonWrapper id={id}>
            <AlignToolbarButton
                active={isActive}
                tooltip={getTooltip('Align right')}
                value="right"
                icon={<IconStylingWrapper icon={<IconTextAlignmentRight16 />} />}
                classNames={getButtonClassNames()}
                styles={buttonStyles}
                actionHandler="onMouseDown"
            />
        </ButtonWrapper>
    );
};
