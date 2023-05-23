/* (c) Copyright Frontify Ltd., all rights reserved. */

import React, { ReactElement, cloneElement } from 'react';
import { merge } from '@utilities/merge';
import {
    PatternDesign,
    PatternScale,
    PatternScaleOrigin,
    PatternTheme,
    patternDesigns,
    patternScales,
    patternThemes,
} from '@foundation/Pattern';

export type FrontifyPatternProps = {
    pattern: PatternDesign;
    scale?: PatternScale;
    scaleOrigin?: PatternScaleOrigin;
    foregroundColor?: PatternTheme;
};

export const FrontifyPattern = ({
    pattern = PatternDesign.DigitalAssets,
    scale = PatternScale.SM,
    scaleOrigin = ['top', 'left'],
    foregroundColor = PatternTheme.Black,
}: FrontifyPatternProps): ReactElement => {
    return (
        <div
            data-test-id="frontify-pattern"
            className={merge(['tw-w-[260px]', patternThemes[foregroundColor]])}
            style={{ transformOrigin: `${scaleOrigin.join(' ')}`, transform: `scale(${patternScales[scale]})` }}
        >
            {cloneElement(patternDesigns[pattern])}
        </div>
    );
};
FrontifyPattern.displayName = 'FondueFrontifyPattern';
