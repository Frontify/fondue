/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement, cloneElement } from 'react';

import { PatternDesign, PatternScale, type PatternScaleOrigin, PatternTheme } from '@foundation/Pattern';
import { patternDesigns } from '@foundation/Pattern/PatternDesigns';
import { patternScales } from '@foundation/Pattern/PatternScale';
import { patternThemes } from '@foundation/Pattern/PatternTheme';
import { merge } from '@utilities/merge';

/**
 * @deprecated Please use a custom component instead.
 */
export type FrontifyPatternProps = {
    pattern: PatternDesign;
    scale?: PatternScale;
    scaleOrigin?: PatternScaleOrigin;
    foregroundColor?: PatternTheme;
    'data-test-id'?: string;
};

/**
 * @deprecated Please use a custom component instead.
 */
export const FrontifyPattern = ({
    pattern = PatternDesign.DigitalAssets,
    scale = PatternScale.SM,
    scaleOrigin = ['top', 'left'],
    foregroundColor = PatternTheme.Black,
    'data-test-id': dataTestId = 'frontify-pattern',
}: FrontifyPatternProps): ReactElement => {
    return (
        <div
            data-test-id={dataTestId}
            className={merge(['tw-w-[260px]', patternThemes[foregroundColor]])}
            style={{ transformOrigin: `${scaleOrigin.join(' ')}`, transform: `scale(${patternScales[scale]})` }}
        >
            {cloneElement(patternDesigns[pattern])}
        </div>
    );
};
FrontifyPattern.displayName = 'FondueFrontifyPattern';
