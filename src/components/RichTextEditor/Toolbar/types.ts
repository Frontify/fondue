/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Position } from '../EditorPositioningWrapper';
import { ButtonType, ButtonsType, ToolbarButtons } from '../Plugins/types';

export type ToolbarButtonsPosition = Record<Position, ButtonsType>;

export type ToolbarProps = {
    toolbarButtons: ToolbarButtons;
    editorId: string;
};

export type ButtonGroupWidths = { group: ButtonType[]; buttonGroupWidth: number; index: number }[];
export type ButtonGroupsPerRow = ButtonGroupWidths[];
