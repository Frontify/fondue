/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, PlatePluginComponent } from '@udecode/plate';
import { UnknownObject } from '../types';

export interface EditorPlugin {
    id: string;
    element: PlatePluginComponent<any>;
    plugins: () => PlatePlugin<UnknownObject, any>[];
}
