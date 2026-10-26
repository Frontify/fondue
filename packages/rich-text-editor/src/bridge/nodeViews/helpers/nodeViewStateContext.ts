/* (c) Copyright Frontify Ltd., all rights reserved. */

import { createContext } from 'react';

import { type NodeViewState } from '../../pluginApi/define';

/** The state of the node view whose chrome renders, which the portal host provides. */
export const NodeViewStateContext = createContext<NodeViewState<object> | null>(null);
NodeViewStateContext.displayName = 'RichTextNodeViewContext';
