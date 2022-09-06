/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import { IconSize, IconTextFormatBold } from '@foundation/Icon';
import { IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { ButtonProps } from '../types';

export const BoldButton = ({ editor, key }: ButtonProps) => (
    <MarkToolbarButton
        type={getPluginType(editor, key)}
        icon={<IconStylingWrapper icon={<IconTextFormatBold size={IconSize.Size24} />} />}
        classNames={buttonClassNames}
        styles={buttonStyles}
    />
);
