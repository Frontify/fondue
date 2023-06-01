/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { PlateRenderElementProps } from '@udecode/plate';

export const DEFAULT_TEXT_STYLE_VALUE = 'Mixed';

export type TextStyleRenderElementProps = {
    styles: CSSProperties;
} & PlateRenderElementProps;

export enum TextStyles {
    heading1 = 'heading1',
    heading2 = 'heading2',
    heading3 = 'heading3',
    heading4 = 'heading4',
    custom1 = 'custom1',
    custom2 = 'custom2',
    custom3 = 'custom3',
    quote = 'quote',
    imageCaption = 'imageCaption',
    imageTitle = 'imageTitle',
    p = 'p',
}
