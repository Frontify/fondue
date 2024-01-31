/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import PatternSound from '@foundation/Pattern/PatternSound';
import PatternImagery from '@foundation/Pattern/PatternImagery';
import PatternTypography from '@foundation/Pattern/PatternTypography';
import PatternDigitalAssets from '@foundation/Pattern/PatternDigitalAssets';

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
