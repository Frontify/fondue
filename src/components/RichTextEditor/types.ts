/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { EditorActions } from './utils/actions';
import { TextStyleType } from './utils/getTextStyles';

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
    onLoaded: (index: number, width?: number) => void;
    onFlyoutToggle?: (isFlyoutOpen: boolean) => void;
};

export type ButtonGroupWidths = { actions: EditorActions[]; buttonGroupWidth: number; index: number }[];
