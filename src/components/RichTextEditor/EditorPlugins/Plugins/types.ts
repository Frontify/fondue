/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement, ReactNode } from 'react';
import { PlateEditor, PlatePlugin, PlatePluginComponent } from '@udecode/plate';
import { UnknownObject } from '../types';

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

export type ButtonProps = {
    id: string;
    editor: PlateEditor<UnknownObject>;
    key?: string;
};

export type ButtonGroupProps = {
    index: number;
    children?: ReactNode;
};
