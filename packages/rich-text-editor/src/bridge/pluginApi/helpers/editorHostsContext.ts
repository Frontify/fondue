/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

import { type EditorHosts } from '../plugin';

/** What the editor hosts for plugin UI, `null` outside an editor; `useEditorApi` reads it. */
export const EditorHostsContext = createContext<EditorHosts | null>(null);
EditorHostsContext.displayName = 'RichTextEditorHostsContext';
