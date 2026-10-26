/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

import { type EditorPort } from '#/runtime/port';

/** The session of the editor around a hook once it is ready. */
export const SessionContext = createContext<EditorPort | undefined>(undefined);
SessionContext.displayName = 'RichTextEditorSessionContext';
