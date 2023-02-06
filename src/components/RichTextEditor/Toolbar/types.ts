/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Position } from '../EditorPositioningWrapper';
import { Button, Buttons, ToolbarButtons } from '../Plugins/types';

export type ToolbarButtonsPosition = Record<Position, Buttons>;

export type ToolbarProps = {
    toolbarButtons: ToolbarButtons;
    editorId: string;
};

export type ButtonGroupWidths = { group: Button[]; buttonGroupWidth: number; index: number }[];
export type ButtonGroupsPerRow = ButtonGroupWidths[];
