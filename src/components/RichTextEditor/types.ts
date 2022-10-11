/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties } from 'react';
import { TextStyles } from './Plugins/TextStylePlugin/TextStyles';

export type DesignTokens = Partial<Record<TextStyles, CSSProperties>>;

export enum PaddingSizes {
    None = 'tw-p-0',
    Small = 'tw-p-2',
    Medium = 'tw-p-4',
    Large = 'tw-p-6',
    XLarge = 'tw-p-8',
}
