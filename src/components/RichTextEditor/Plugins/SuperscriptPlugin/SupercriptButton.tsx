/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { MARK_SUBSCRIPT, MarkToolbarButton, getPluginType } from '@udecode/plate';
import React from 'react';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../helper';
import { PluginButtonProps } from '../types';
import IconSuperscript16 from '@foundation/Icon/Generated/IconSuperscript16';
import { getHotkeyByPlatform } from '@components/RichTextEditor';

export const SuperscriptButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Superscript\n${getHotkeyByPlatform('Ctrl+,')}`)}
            type={getPluginType(editor, id)}
            clear={getPluginType(editor, MARK_SUBSCRIPT)}
            icon={<IconStylingWrapper icon={<IconSuperscript16 />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
