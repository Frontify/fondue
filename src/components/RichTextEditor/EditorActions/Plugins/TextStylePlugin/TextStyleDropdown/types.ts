/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { PlateEditor } from '@udecode/plate';
import { TextStyle } from '../TextStyles';

export type TextStyleDropdownProps = {
    editorId?: string;
};

export type DropdownTriggerProps = {
    editor: PlateEditor;
    open: boolean;
};

export type DropdownItemProps = {
    editor: PlateEditor;
    type: TextStyle;
    children: ReactNode;
};
