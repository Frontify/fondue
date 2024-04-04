/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { type Button, type Buttons, type ToolbarButtons } from '../../Plugins/types';
import { type Position } from '../EditorPositioningWrapper';

import type * as ToolbarPrimitive from '@radix-ui/react-toolbar';

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

export type ToolbarButtonProps = Omit<ToolbarPrimitive.ToolbarToggleItemProps, 'asChild' | 'value'> & {
    pressed?: boolean;
    isDropdown?: boolean;
};
