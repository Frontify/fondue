/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor } from '@udecode/plate';
import { Button, Buttons } from '../Plugins/types';

export type ToolbarProps = {
    buttons: Buttons;
    editor: PlateEditor;
    editorId: string;
    editorWidth?: number;
};

export type ButtonGroupWidths = { group: Button[]; buttonGroupWidth: number; index: number }[];
export type ButtonGroupsPerRow = ButtonGroupWidths[];
