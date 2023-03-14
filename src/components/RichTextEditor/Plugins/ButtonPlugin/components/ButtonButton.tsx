/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { getPluginType } from '@udecode/plate';
import { IconButton16 } from '@foundation/Icon/Generated';
import { PluginButtonProps } from '../../types';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { ButtonToolbarButton } from './ButtonToolbarButton';
import { ELEMENT_BUTTON } from '../createButtonPlugin';

export const ButtonButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <ButtonToolbarButton
            type={getPluginType(editor, ELEMENT_BUTTON)}
            icon={<IconStylingWrapper icon={<IconButton16 />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
        />
    </ButtonWrapper>
);
