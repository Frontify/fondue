/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, ReactElement } from 'react';
import { ListStyles, TextStyles } from './EditorActions/Plugins/TextStylePlugin/TextStyleDropdown/types';
import { EditorActions } from './utils/actions';

export type DesignTokens = Partial<Record<TextStyles, CSSProperties>>;

export type ToolbarCustomProps = {
    actions: EditorActions[][];
    editorWidth?: number;
    editorId?: string;
};

export type IconStylingWrapperProps = {
    icon: ReactElement;
};

export type ButtonGroupProps = {
    index: number;
    editorId?: string;
    actions: EditorActions[];
};

export type ButtonGroupWidths = { actions: EditorActions[]; buttonGroupWidth: number; index: number }[];

export type AvailableTextStyles = ListStyles & TextStyles;

export enum PaddingSizes {
    None = 'tw-p-0',
    Small = 'tw-p-2',
    Medium = 'tw-p-4',
    Large = 'tw-p-6',
    XLarge = 'tw-p-8',
}
