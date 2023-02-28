/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ListToolbarButton, getPluginType } from '@udecode/plate';
import { IconListBullet, IconSize } from '@foundation/Icon';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { PluginButtonProps } from '../../types';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

export const UnorderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton
            tooltip={getTooltip('Bullet list')}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconListBullet size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
