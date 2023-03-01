/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getHotkeyByPlatform } from '@components/RichTextEditor/helpers/getHotkeyByPlatform';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconLink16 } from '@foundation/Icon/Generated';
import { LinkToolbarButton } from '@udecode/plate';
import React from 'react';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { PluginButtonProps } from '../types';

export const LinkButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <LinkToolbarButton
            tooltip={getTooltip(`Link\n${getHotkeyByPlatform('Ctrl+K')}`)}
            icon={<IconStylingWrapper icon={<IconLink16 />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
