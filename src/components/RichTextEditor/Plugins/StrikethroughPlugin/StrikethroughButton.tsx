/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import { IconSize, IconTextFormatStrikethrough } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { PluginButtonProps } from '../types';

export const StrikethroughButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconTextFormatStrikethrough size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
