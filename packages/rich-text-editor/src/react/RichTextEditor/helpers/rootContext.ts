/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

import { type RootContextValue } from '../types';

export const RootContext = createContext<RootContextValue | null>(null);
RootContext.displayName = 'RichTextEditorRootContext';
