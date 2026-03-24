/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

export type ListBulletContextValue =
    | { type: 'ul'; character: string; color: string; size: string }
    | { type: 'ol'; counterType: string; color: string };

export const ListBulletContext = createContext<ListBulletContextValue | null>(null);
ListBulletContext.displayName = 'ListBulletContext';
