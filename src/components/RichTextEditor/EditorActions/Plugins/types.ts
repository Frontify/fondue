/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor } from '@udecode/plate';
import { ReactElement, ReactNode } from 'react';
import { UnknownObject } from '../types';
import type { Plugin } from './Plugin';

export type ButtonGroupProps = {
    index: number;
    children?: ReactNode;
};

export type PluginButtonProps = {
    id: string;
    editor: PlateEditor<UnknownObject>;
    key?: string;
};
export type PluginButton = ({ editor, id }: PluginButtonProps) => ReactElement;
export type Button = {
    id: string;
    button: PluginButton;
};
export type Buttons = Button[][];

export type Plugins = (Plugin[] | Plugin)[];

export type IconStylingWrapperProps = {
    icon: ReactElement;
};
