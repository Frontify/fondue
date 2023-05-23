/* (c) Copyright Frontify Ltd., all rights reserved. */

import { IconButton16 } from '@foundation/Icon/Generated';
import { getPluginType } from '@udecode/plate';
import React from 'react';
import { ButtonWrapper, IconStylingWrapper, buttonStyles } from '../../helper';
import { PluginButtonProps } from '../../types';
import { ELEMENT_BUTTON } from '../createButtonPlugin';
import { ButtonToolbarButton } from './ButtonToolbarButton';

export const ButtonButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ButtonToolbarButton
            type={getPluginType(editor, ELEMENT_BUTTON)}
            icon={<IconStylingWrapper icon={<IconButton16 />} />}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
