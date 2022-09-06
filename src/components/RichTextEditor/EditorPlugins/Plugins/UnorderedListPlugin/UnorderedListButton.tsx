/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ListToolbarButton, getPluginType } from '@udecode/plate';
import { IconListBullet, IconSize } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { ButtonProps } from '../types';

export const UnorderedListButton = ({ editor, id }: ButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconListBullet size={IconSize.Size24} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
