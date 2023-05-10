/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { MARK_SUPERSCRIPT, MarkToolbarButton, getPluginType } from '@udecode/plate';
import React from 'react';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../helper';
import { PluginButtonProps } from '../types';
import IconSubscript16 from '@foundation/Icon/Generated/IconSubscript16';
import { getHotkeyByPlatform } from '@components/RichTextEditor';

export const SubscriptButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip(`Subscript\n${getHotkeyByPlatform('Ctrl+.')}`)}
            type={getPluginType(editor, id)}
            clear={getPluginType(editor, MARK_SUPERSCRIPT)}
            icon={<IconStylingWrapper icon={<IconSubscript16 />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
