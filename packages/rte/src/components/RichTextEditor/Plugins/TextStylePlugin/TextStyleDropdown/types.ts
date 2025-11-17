/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor } from '@udecode/plate-core';
import { type ReactNode } from 'react';

import { type Plugin } from '../../Plugin';
import { type PluginButtonProps } from '../../types';

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
