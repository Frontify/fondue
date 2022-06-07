/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { ListStyles } from './TextStyleDropdown/DropdownTrigger';
import { EditorActions } from './utils/actions';
import { TextStyles } from './utils/getTextStyles';

export type TextStyleType = {
    type: TextStyles;
    className: string;
};

export type ToolbarCustomProps = {
    editorId?: string;
    textStyles?: TextStyleType[];
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
    textStyles?: TextStyleType[];
};

export type ButtonGroupWidths = { actions: EditorActions[]; buttonGroupWidth: number; index: number }[];

export type AvailableTextStyles = ListStyles & TextStyles;
