/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode } from 'react';
import { PlateEditor } from '@udecode/plate';
import type { Plugin } from './Plugin';

export type ButtonGroupProps = {
    index: number;
    children?: ReactNode;
};

export type PluginButtonProps = {
    id: string;
    editor: PlateEditor;
    editorId: string;
};
export type PluginButton = ({ editor, editorId, id }: PluginButtonProps) => ReactElement;
export type Button = {
    id: string;
    button: PluginButton;
};
export type Buttons = Button[][];

export type Plugins = (Plugin[] | Plugin)[];

export type IconStylingWrapperProps = {
    icon: ReactElement;
};

export type InlineData = () => ReactElement;
