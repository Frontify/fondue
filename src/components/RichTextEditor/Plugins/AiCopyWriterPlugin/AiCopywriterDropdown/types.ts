/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { PlateEditor } from '@udecode/plate';
import { AiCopywriter, PluginButtonProps } from '../../types';

export type AiCopywriterDropdownProps = {
    id: string;
    editor: PlateEditor;
    aiCopywriters?: AiCopywriter[];
    isLoading: boolean;
};

export type DropdownTriggerProps = {
    label: string;
    open: boolean;
    onClick: () => void;
};

export type DropdownItemProps = {
    editor: PlateEditor;
    children: ReactNode;
    onClick?: (editor: PlateEditor) => void;
};

export type AiCopywriterButtonProps = PluginButtonProps & {
    aiCopywriters?: AiCopywriter[];
    isLoading: boolean;
};
