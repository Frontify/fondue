/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode } from 'react';
import { PlateEditor, PlatePlugin, PlatePluginComponent } from '@udecode/plate';

export type Unknown = unknown;
export type ObjectType<T extends Unknown> = Record<string, T>;
export type UnknownObject = ObjectType<unknown>;

export interface MarkupElement {
    id: string;
    elementTag: PlatePluginComponent<any>;
}

export interface Plugin {
    id: string;
    element: PlatePluginComponent<any> | null;
    button: ({ editor, id }: ButtonProps) => JSX.Element;
    plugins: () => PlatePlugin<UnknownObject, any>[];
}

export type Plugins = (Plugin[] | Plugin)[];

export type IconStylingWrapperProps = {
    icon: ReactElement;
};

export type Button = ({ editor, id }: ButtonProps) => JSX.Element;

export type ButtonProps = {
    id: string;
    editor: PlateEditor<UnknownObject>;
    key?: string;
};

export type ButtonGroupProps = {
    index: number;
    children?: ReactNode;
};
