/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ListToolbarButton, getPluginType } from '@udecode/plate';
import { IconListBullet16 } from '@foundation/Icon/Generated';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../../helper';
import { PluginButtonProps } from '../../types';
import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';

export const UnorderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton
            tooltip={getTooltip('Bullet list')}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconListBullet16 />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
