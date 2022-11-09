/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode } from 'react';
import { PlateEditor } from '@udecode/plate';
import type { Plugin } from './Plugin';
import { OptionalTextStyles } from './TextStylePlugin/TextStyles';

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
    selectableStyles?: OptionalTextStyles[];
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
