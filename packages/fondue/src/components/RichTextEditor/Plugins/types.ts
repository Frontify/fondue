/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PlateEditor, type PlatePlugin } from '@udecode/plate-core';
import { type ReactElement, type ReactNode } from 'react';

import { type Position } from '../components/EditorPositioningWrapper';

import { type Plugin } from './Plugin';

export type Unknown = unknown;
export type ObjectType<T extends Unknown> = Record<string, T>;

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
export type { Plugin } from './Plugin';

export type IconStylingWrapperProps = {
    icon: ReactElement;
};

export type InlineData = () => ReactElement;

export type PluginComposerProps = {
    noToolbar?: boolean;
};

export type PlatePluginList = Map<string, PlatePlugin<Record<string, any>>[]>;

export interface ToolbarButtons {
    createGroupOfButtons: (plugins: Plugin[]) => void;
    at(position: Position): Buttons;
}
