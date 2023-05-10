/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { TNode } from '@udecode/plate';
import { ButtonStyles } from './Plugins/TextStylePlugin/TextStyles';

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

export type DesignTokens = Partial<Record<DesignTokenNames, CSSProperties>> &
    Partial<Record<ButtonStyles, CSSProperties & { hover?: CSSProperties }>>;

export enum PaddingSizes {
    None = 'tw-p-0',
    Small = 'tw-p-2',
    Medium = 'tw-p-5',
    Large = 'tw-p-6',
    XLarge = 'tw-p-8',
}

export type TreeOfNodes = TNode[];
