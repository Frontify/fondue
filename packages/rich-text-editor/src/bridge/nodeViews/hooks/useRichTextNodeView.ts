/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useContext } from 'react';

import { type ShippedCommands } from '#/runtime/types';

import { type NodeViewState } from '../../pluginApi/define';
import { useRenderMark } from '../../session/hooks/useRenderMark';
import { NodeViewStateContext } from '../helpers/nodeViewStateContext';

/**
 * The node of the chrome that calls it, with its node-ID actions.
 *
 * @throws Error when called outside node view chrome.
 */
export const useRichTextNodeView = <Commands extends object = ShippedCommands>(): NodeViewState<Commands> => {
    useRenderMark();
    const state = useContext(NodeViewStateContext);
    if (state === null) {
        throw new Error('useRichTextNodeView must be called inside node view chrome.');
    }

    return state as NodeViewState<Commands>;
};
