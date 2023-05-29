/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSPropertiesHover } from '@components/RichTextEditor/types';
import { Plugin, PluginProps } from '../Plugin';
import { ELEMENT_PARAGRAPH, PlateRenderElementProps } from '@udecode/plate';

export const DEFAULT_TEXT_STYLE_VALUE = 'Mixed';

export type TextStylePluginProps = PluginProps & {
    textStyles?: Plugin[];
};

export type TextStyleRenderElementProps = {
    styles: CSSPropertiesHover;
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
    p = ELEMENT_PARAGRAPH,
}
