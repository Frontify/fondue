/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

import { type EditorHosts } from '../plugin';

export const EditorHostsContext = createContext<EditorHosts | null>(null);
EditorHostsContext.displayName = 'RichTextEditorHostsContext';
