/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ListToolbarButton, getPluginType } from '@udecode/plate';
import { IconListNumbers, IconSize } from '@foundation/Icon';
import { ButtonProps } from '../../types';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';

export const OrderedListButton = ({ editor, id }: ButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconListNumbers size={IconSize.Size24} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
