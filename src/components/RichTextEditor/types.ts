/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { ButtonStyles, TextStyles } from './Plugins/TextStylePlugin/TextStyles';

export type DesignTokens = Partial<Record<TextStyles, CSSProperties>> &
    Partial<Record<ButtonStyles, CSSProperties & { hover?: CSSProperties }>>;

export enum PaddingSizes {
    None = 'tw-p-0',
    Small = 'tw-p-2',
    Medium = 'tw-p-4',
    Large = 'tw-p-6',
    XLarge = 'tw-p-8',
}
