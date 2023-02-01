/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode } from 'react';
import { AnyObject, PlateEditor, PlatePlugin, Unknown } from '@udecode/plate';
import type { Plugin } from './Plugin';
import { Position } from '../EditorPositioningWrapper';

export type ObjectType<T extends Unknown> = Record<string, T>;

export type ButtonGroupWrapperProps = {
    index: number;
    children?: ReactNode;
};

export type PluginButtonProps = {
    id: string;
    editor: PlateEditor;
    editorId: string;
};
export type PluginButton = ({ editor, editorId, id }: PluginButtonProps) => ReactElement;
export type PluginButtonType = {
    id: string;
    button: PluginButton;
};
export type PluginButtonsType = PluginButtonType[][];

export type Plugins = (Plugin[] | Plugin)[];
export type { Plugin } from './Plugin';

export type IconStylingWrapperProps = {
    icon: ReactElement;
};

export type InlineData = () => ReactElement;

export type PluginComposerProps = {
    noToolbar?: boolean;
};

export type PlatePluginList = Map<string, PlatePlugin<AnyObject>[]>;

export interface ToolbarButtons {
    createGroupOfButtons: (plugins: Plugin[]) => void;
    at(position: Position): PluginButtonsType;
}
