/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import { IconRocket16 } from '@foundation/Icon/Generated';
import { ButtonWrapper, IconStylingWrapper, buttonStyles, getButtonClassNames } from '../helper';
import { PluginButtonProps } from '../types';

export const AiCopywriterButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            key={id}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconRocket16 />} />}
            classNames={getButtonClassNames()}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
