/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconSize, IconTextBrackets } from '@foundation/Icon';
import { MarkToolbarButton, getPluginType } from '@udecode/plate';
import React from 'react';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../helper';
import { PluginButtonProps } from '../types';

export const CodeButton = ({ editor, id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <MarkToolbarButton
            tooltip={getTooltip('Code')}
            type={getPluginType(editor, id)}
            icon={<IconStylingWrapper icon={<IconTextBrackets size={IconSize.Size16} />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
