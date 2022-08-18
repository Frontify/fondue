/* (c) Copyright Frontify Ltd., all rights reserved. */

import { CSSProperties, ReactElement } from 'react';
import { ListStyles } from './TextStyleDropdown/DropdownTrigger';
import { EditorActions } from './utils/actions';
import { TextStyles } from './utils/textStyles';

export type DesignTokens = Partial<Record<TextStyles, CSSProperties>>;

export type ToolbarCustomProps = {
    editorId?: string;
    actions?: EditorActions[][];
    editorWidth?: number;
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

export enum Position {
    FLOATING = 'floating',
    BOTTOM = 'bottom',
}
