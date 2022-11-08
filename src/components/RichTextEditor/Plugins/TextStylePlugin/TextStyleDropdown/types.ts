/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { PlateEditor } from '@udecode/plate';
import { TextStyles } from '../TextStyles';

export type TextStyleDropdownProps = {
    editorId?: string;
};

export type DropdownTriggerProps = {
    editor: PlateEditor;
    open: boolean;
    onClick: () => void;
};

export type DropdownItemProps = {
    editor: PlateEditor;
    type: TextStyles;
    children: ReactNode;
};
