/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import { IconSize, IconTextBrackets } from '@foundation/Icon';
import { IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { ButtonProps } from '../types';

export const CodeButton = ({ editor, id }: ButtonProps) => (
    <MarkToolbarButton
        type={getPluginType(editor, id)}
        icon={<IconStylingWrapper icon={<IconTextBrackets size={IconSize.Size24} />} />}
        classNames={buttonClassNames}
        styles={buttonStyles}
    />
);
