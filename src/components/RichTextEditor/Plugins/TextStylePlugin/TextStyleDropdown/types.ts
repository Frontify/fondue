/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { PlateEditor } from '@udecode/plate';
import { PluginButtonProps } from '../../types';
import { Plugin } from '../../Plugin';

export type TextStyleDropdownProps = {
    editorId?: string;
    textStyles?: Plugin[];
};

export type DropdownTriggerProps = {
    label: string;
    open: boolean;
    onClick: () => void;
};

export type DropdownItemProps = {
    editor: PlateEditor;
    type: Plugin;
    children: ReactNode;
};

export type TextStyleButtonProps = PluginButtonProps & {
    textStyles?: Plugin[];
};
