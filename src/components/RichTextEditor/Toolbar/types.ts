/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Position } from '../EditorPositioningWrapper';
import { PluginButtonType, PluginButtonsType, ToolbarButtons } from '../Plugins/types';

export type ToolbarButtonsPosition = Record<Position, PluginButtonsType>;

export type ToolbarProps = {
    toolbarButtons: ToolbarButtons;
    editorId: string;
};

export type ButtonGroupWidths = { group: PluginButtonType[]; buttonGroupWidth: number; index: number }[];
export type ButtonGroupsPerRow = ButtonGroupWidths[];
