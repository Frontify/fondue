/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ListToolbarButton, getPluginType } from '@udecode/plate';
import { IconListNumbers, IconSize } from '@foundation/Icon';
import { PluginButtonProps } from '../../types';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';

export const OrderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconListNumbers size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
