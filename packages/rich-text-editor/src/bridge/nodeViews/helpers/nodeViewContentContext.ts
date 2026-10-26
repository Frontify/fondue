/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

/** Where the editable content of the node view whose chrome renders goes, which the portal host provides. */
export const NodeViewContentContext = createContext<((element: HTMLElement | null) => void) | null>(null);
NodeViewContentContext.displayName = 'RichTextNodeViewContentContext';
