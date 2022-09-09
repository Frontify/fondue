/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { PlatePlugin } from '@udecode/plate';

export type Unknown = unknown;
export type ObjectType<T extends Unknown> = Record<string, T>;
export type UnknownObject = ObjectType<unknown>;

export type GeneratePluginsReturn = {
    create: () => PlatePlugin<UnknownObject, UnknownObject>[];
    toolbar: () => ReactNode;
};
