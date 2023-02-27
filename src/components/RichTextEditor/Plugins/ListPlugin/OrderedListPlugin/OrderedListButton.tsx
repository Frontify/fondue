/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconListNumbers, IconSize } from '@foundation/Icon';
import { ListToolbarButton, getPluginType } from '@udecode/plate';
import React from 'react';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { PluginButtonProps } from '../../types';

export const OrderedListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ListToolbarButton
            tooltip={getTooltip('Ordered list')}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconListNumbers size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
