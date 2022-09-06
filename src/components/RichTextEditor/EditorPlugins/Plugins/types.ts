/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { PlateEditor, PlatePlugin, PlatePluginComponent } from '@udecode/plate';
import { UnknownObject } from '../types';

export interface Plugin {
    id: string;
    element: PlatePluginComponent<any>;
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
};

export type ButtonGroupProps = {
    index: number;
    children?: JSX.Element;
};
