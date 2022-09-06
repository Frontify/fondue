/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactElement } from 'react';
import { PlateEditor, PlatePlugin, PlatePluginComponent } from '@udecode/plate';
import { UnknownObject } from '../types';

export interface Plugin {
    id: string;
    element: PlatePluginComponent<any>;
    plugins: () => PlatePlugin<UnknownObject, any>[];
}

export type Plugins = (Plugin[] | Plugin)[];

export type IconStylingWrapperProps = {
    icon: ReactElement;
};

export type ButtonProps = {
    key: string;
    editor: PlateEditor<UnknownObject>;
};
