/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { getPluginType } from '@udecode/plate';
import { IconListCheck, IconSize } from '@foundation/Icon';
import { CheckboxListToolbarButton } from './CheckboxListToolbarButton';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { PluginButtonProps } from '../../types';

export const CheckboxListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <CheckboxListToolbarButton
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconListCheck size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
