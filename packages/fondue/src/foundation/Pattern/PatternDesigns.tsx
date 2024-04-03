/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactElement } from 'react';

import PatternDigitalAssets from '@foundation/Pattern/PatternDigitalAssets';
import PatternImagery from '@foundation/Pattern/PatternImagery';
import PatternSound from '@foundation/Pattern/PatternSound';
import PatternTypography from '@foundation/Pattern/PatternTypography';

export enum PatternDesign {
    DigitalAssets = 'DigitalAssets',
    Imagery = 'Imagery',
    Sound = 'Sound',
    Typography = 'Typography',
}

export const patternDesigns: Record<PatternDesign, ReactElement> = {
    [PatternDesign.DigitalAssets]: <PatternDigitalAssets />,
    [PatternDesign.Imagery]: <PatternImagery />,
    [PatternDesign.Sound]: <PatternSound />,
    [PatternDesign.Typography]: <PatternTypography />,
};
