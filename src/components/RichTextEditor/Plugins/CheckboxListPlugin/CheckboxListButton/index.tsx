/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { getPluginType } from '@udecode/plate';
import { IconListCheck16 } from '@foundation/Icon/Generated';
import { CheckboxListToolbarButton } from './CheckboxListToolbarButton';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../../helper';
import { PluginButtonProps } from '../../types';

export const CheckboxListButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <CheckboxListToolbarButton
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconListCheck16 />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
