/* (c) Copyright Frontify Ltd., all rights reserved. */

import { merge } from '@utilities/merge';
import React, { ReactElement } from 'react';
import { AssetInputProps, AssetInputSize } from '..';

export const SpinningCircle = ({ size }: Pick<AssetInputProps, 'size'>): ReactElement => (
    <svg
        className={merge(['tw-animate-spin', size === AssetInputSize.Large ? 'tw-w-16 tw-h-16' : 'tw-w-5 tw-h-5'])}
        width="100%"
        height="100%"
        viewBox="0 0 44 44"
        data-test-id="spinning-circle"
    >
        <path fill="none" stroke="#f1f3f9" strokeWidth="2" d="M2,22 a20,20 0 0,1 20,-20" />
        <path fill="none" stroke="#7159d7" strokeWidth="2" d="M2,22 a20,20 0 1,0 20,-20" />
    </svg>
);
SpinningCircle.displayName = 'FondueSpinningCircle';
