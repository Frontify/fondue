/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import { IconSize, IconTextFormatItalic } from '@foundation/Icon';
import { IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { ButtonProps } from '../types';

export const ItalicButton = ({ editor, id }: ButtonProps) => (
    <MarkToolbarButton
        key={id}
        type={getPluginType(editor, id)}
        icon={<IconStylingWrapper icon={<IconTextFormatItalic size={IconSize.Size24} />} />}
        classNames={buttonClassNames}
        styles={buttonStyles}
    />
);
