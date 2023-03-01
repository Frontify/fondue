/* (c) Copyright Frontify Ltd., all rights reserved. */

import { getTooltip } from '@components/RichTextEditor/helpers/getTooltip';
import { IconTextAlignmentCentre16 } from '@foundation/Icon/Generated';
import { AlignToolbarButton } from '@udecode/plate';
import React from 'react';
import { ButtonWrapper, IconStylingWrapper, buttonClassNames, buttonStyles } from '../../helper';
import { PluginButtonProps } from '../../types';

export const AlignCenterButton = ({ id }: PluginButtonProps) => (
    <ButtonWrapper id={id}>
        <AlignToolbarButton
            tooltip={getTooltip('Align center')}
            value="center"
            icon={<IconStylingWrapper icon={<IconTextAlignmentCentre16 />} />}
            classNames={buttonClassNames}
            styles={buttonStyles}
            actionHandler="onMouseDown"
        />
    </ButtonWrapper>
);
