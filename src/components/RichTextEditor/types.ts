/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { TNode } from '@udecode/plate';
import { ButtonStyles, TextStyles } from './Plugins/TextStylePlugin/TextStyles';

export const enum DesignTokenNames {
    HEADING1 = 'heading1',
    HEADING2 = 'heading2',
    HEADING3 = 'heading3',
    HEADING4 = 'heading4',
    CUSTOM1 = 'custom1',
    CUSTOM2 = 'custom2',
    CUSTOM3 = 'custom3',
    QUOTE = 'quote',
    LINK = 'link',
    PARAGRAPH = 'p',
    IMAGE_CAPTION = 'imageCaption',
    IMAGE_TITLE = 'imageTitle',
}

export const TextStylesToDesignTokenMap = {
    [TextStyles.ELEMENT_HEADING1]: DesignTokenNames.HEADING1,
    [TextStyles.ELEMENT_HEADING2]: DesignTokenNames.HEADING2,
    [TextStyles.ELEMENT_HEADING3]: DesignTokenNames.HEADING3,
    [TextStyles.ELEMENT_HEADING4]: DesignTokenNames.HEADING3,
    [TextStyles.ELEMENT_CUSTOM1]: DesignTokenNames.CUSTOM1,
    [TextStyles.ELEMENT_CUSTOM2]: DesignTokenNames.CUSTOM2,
    [TextStyles.ELEMENT_CUSTOM3]: DesignTokenNames.CUSTOM3,
    [TextStyles.ELEMENT_QUOTE]: DesignTokenNames.QUOTE,
    [TextStyles.ELEMENT_LINK]: DesignTokenNames.LINK,
    [TextStyles.ELEMENT_PARAGRAPH]: DesignTokenNames.PARAGRAPH,
    [TextStyles.ELEMENT_IMAGE_CAPTION]: DesignTokenNames.IMAGE_CAPTION,
    [TextStyles.ELEMENT_IMAGE_TITLE]: DesignTokenNames.IMAGE_TITLE,
};

export type DesignTokens = Partial<Record<DesignTokenNames, CSSProperties>> &
    Partial<Record<ButtonStyles, CSSProperties & { hover?: CSSProperties }>>;

export enum PaddingSizes {
    None = 'tw-p-0',
    Small = 'tw-p-2',
    Medium = 'tw-p-4',
    Large = 'tw-p-6',
    XLarge = 'tw-p-8',
}

export type TreeOfNodes = TNode[];
