/* (c) Copyright Frontify Ltd., all rights reserved. */

import { ReactNode } from 'react';
import { AnyObject, PlatePlugin } from '@udecode/plate';

export type Unknown = unknown;
export type ObjectType<T extends Unknown> = Record<string, T>;

export type GeneratePluginsReturn = {
    create: () => PlatePlugin<AnyObject>[];
    toolbar: () => ReactNode;
    mentions: () => ReactNode;
};
