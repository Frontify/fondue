/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { getPluginType } from '@udecode/plate';
import { ButtonWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { PluginButtonProps } from '../../types';
import { EditLinkChooserButton } from '../helpers/ui/EditLinkChooserButton';

export const LinkButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <EditLinkChooserButton type={getPluginType(editor, id)} classNames={buttonClassNames} styles={buttonStyles} />
    </ButtonWrapper>
);
