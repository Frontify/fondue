/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlateEditor, PlatePlugin, PlatePluginComponent } from '@udecode/plate';
import { ReactElement, ReactNode } from 'react';
import { UnknownObject } from '../types';

export type ButtonProps = {
    id: string;
    editor: PlateEditor<UnknownObject>;
    key?: string;
};

export type ButtonGroupProps = {
    index: number;
    children?: ReactNode;
};

export type Button = {
    id: string;
    button: ({ editor, id }: ButtonProps) => JSX.Element;
};
export type Buttons = Button[][];

export interface MarkupElement {
    id: string;
    elementTag: PlatePluginComponent<any>;
}

export interface Plugin {
    type: string;
    markupElement: MarkupElement;
    button: ({ editor, id }: ButtonProps) => JSX.Element;
    plugins: () => PlatePlugin<UnknownObject, any>[];
}
export type Plugins = (Plugin[] | Plugin)[];

export type IconStylingWrapperProps = {
    icon: ReactElement;
};
