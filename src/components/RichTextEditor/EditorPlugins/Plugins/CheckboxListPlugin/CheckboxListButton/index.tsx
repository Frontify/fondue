/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { getPluginType } from '@udecode/plate';
import { IconListCheck, IconSize } from '@foundation/Icon';
import { CheckboxListToolbarButton } from './CheckboxListToolbarButton';
import { IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { ButtonProps } from '../../types';

export const CheckboxListButton = ({ editor, id }: ButtonProps) => (
    <CheckboxListToolbarButton
        type={getPluginType(editor, id)}
        icon={<IconStylingWrapper icon={<IconListCheck size={IconSize.Size24} />} />}
        classNames={buttonClassNames}
        styles={buttonStyles}
    />
);
