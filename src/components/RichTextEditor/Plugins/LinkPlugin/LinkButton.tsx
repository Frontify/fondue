/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconLink16 } from '@foundation/Icon/Generated';
import { LinkToolbarButton, isRangeInSameBlock, useEventPlateId, usePlateEditorState } from '@udecode/plate';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../helper';
import { PluginButtonProps } from '../types';

export const LinkButton = ({ id, editorId }: PluginButtonProps) => {
    const editor = usePlateEditorState(useEventPlateId(editorId));
    const isEnabled = !!isRangeInSameBlock(editor, {
        at: editor.selection,
    });
    const buttonClassNames = getButtonClassNames(isEnabled);

    return (
        <ButtonWrapper id={id}>
            <LinkToolbarButton
                tooltip={getTooltip(
                    isEnabled
                        ? `Link\n${getHotkeyByPlatform('Ctrl+K')}`
                        : 'Links can only be set for a single text block.',
                )}
                icon={<IconStylingWrapper icon={<IconLink16 />} />}
                classNames={buttonClassNames}
                styles={buttonStyles}
                actionHandler="onMouseDown"
            />
        </ButtonWrapper>
    );
};
