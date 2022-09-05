/* (c) Copyright Frontify Ltd., all rights reserved. */

import { PlatePlugin, PlatePluginComponent } from '@udecode/plate';

export type Unknown = unknown;
export type ObjectType<T extends Unknown> = Record<string, T>;
export type UnknownObject = ObjectType<unknown>;

export interface Plugin {
    id: string;
    element: PlatePluginComponent<any>;
    plugins: () => PlatePlugin<UnknownObject, any>[];
}

export type Plugins = (Plugin[] | Plugin)[];
