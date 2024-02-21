/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { Position } from '../EditorPositioningWrapper';
import { Button, Buttons, ToolbarButtons } from '../Plugins/types';

export type ToolbarButtonsPosition = Record<Position, Buttons>;

export type ToolbarProps = {
    toolbarButtons: ToolbarButtons;
    editorId: string;
    toolbarWidth?: number;
};

export type ButtonGroupWidths = { group: Button[]; buttonGroupWidth: number; index: number }[];
export type ButtonGroupsPerRow = ButtonGroupWidths[];

export type ButtonGroupProps = {
    index: number;
    children?: ReactNode;
};