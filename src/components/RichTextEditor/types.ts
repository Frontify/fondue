/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { EditorActions } from './utils/actions';
import { TextStyleType } from './utils/getTextStyles';

export type ToolbarCustomProps = {
    editorId?: string;
    textStyles?: TextStyleType[];
    actions?: EditorActions[][];
};

export type IconStylingWrapperProps = {
    icon: ReactElement;
};

export type ButtonGroupProps = {
    index: number;
    editorId?: string;
    actions: EditorActions[];
    textStyles?: TextStyleType[];
    onClose: () => void;
    onLoaded: (index: number, width?: number) => void;
    setShowToolbar?: (isFlyoutOpen: boolean) => void;
};

export type ButtonGroupWidths = { actions: EditorActions[]; buttonGroupWidth: number; index: number }[];
