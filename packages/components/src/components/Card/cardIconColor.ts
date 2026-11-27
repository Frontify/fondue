/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties } from 'react';

export const getCardIconColorStyle = (customColor?: CSSProperties['color']): CSSProperties | undefined =>
    customColor ? ({ '--card-icon-color': customColor } as CSSProperties) : undefined;
