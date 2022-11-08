/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Button, Buttons } from '../Plugins/types';

export type ToolbarProps = {
    buttons: Buttons;
    editorId: string;
};

export type ButtonGroupWidths = { group: Button[]; buttonGroupWidth: number; index: number }[];
export type ButtonGroupsPerRow = ButtonGroupWidths[];
