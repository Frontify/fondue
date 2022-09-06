/* (c) Copyright Frontify Ltd., all rights reserved. */

import React from 'react';
import { ButtonProps } from '../../types';
import { AlignCenterButton } from './AlignCenterButton';
import { AlignJustifyButton } from './AlignJustifyButton';
import { AlignLeftButton } from './AlignLeftButton';
import { AlignRightButton } from './AlignRightButton';

export const AlignButtons = ({ id }: ButtonProps) => (
    <>
        <AlignLeftButton id={id} />
        <AlignCenterButton id={id} />
        <AlignRightButton id={id} />
        <AlignJustifyButton id={id} />
    </>
);
