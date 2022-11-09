/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { PlateEditor } from '@udecode/plate';
import { SelectableTextStyles, TextStyles } from '../TextStyles';
import { PluginButtonProps } from '../../types';

export type TextStyleDropdownProps = {
    editorId?: string;
    textStyles?: SelectableTextStyles[];
};

export type DropdownTriggerProps = {
    editor: PlateEditor;
    open: boolean;
};

export type DropdownItemProps = {
    editor: PlateEditor;
    type: TextStyles;
    children: ReactNode;
};

export type TextStyleButtonProps = PluginButtonProps & {
    textStyles?: SelectableTextStyles[];
};
