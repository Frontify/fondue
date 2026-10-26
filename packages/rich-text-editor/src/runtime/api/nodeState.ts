/* (c) Copyright Frontify Ltd., all rights reserved. */

import { compiledModel } from '#/model/internal';

import { EDITS } from '../capabilities';
import { type DocumentApi } from '../documentApi';
import { canRedo, canUndo } from '../history';
import { nodeStateOf, withNodeState } from '../nodeState';

import { type ApiSource, sharedEdits } from './shared';

/** The members of the document API about the session and node state: document, policy, commands, history, node state. */
export const nodeStateApi = (
    source: ApiSource,
): Pick<DocumentApi, 'document' | 'policy' | 'editable' | 'optionsOf' | 'commands' | 'history' | 'nodeState'> => {
    const { edit, capability } = sharedEdits(source);

    return {
        document: () => source.document(source.state()),
        policy: () => source.policy(),
        editable: () => source.editable(),
        optionsOf: (featureId) => compiledModel(source.model).features.find(({ id }) => id === featureId)?.options,
        commands: {
            execute: (id, payload, options) => source.execute(id, payload, options),
            query: (id, payload, options) => source.query(id, payload, options),
        },
        history: {
            undo: () => edit(capability(EDITS.history, { action: 'undo' })),
            redo: () => edit(capability(EDITS.history, { action: 'redo' })),
            canUndo: () => canUndo(source.state()),
            canRedo: () => canRedo(source.state()),
        },
        nodeState: {
            get: (nodeId, key) => nodeStateOf(source.state(), nodeId, key),
            set: (nodeId, key, value) => {
                source.edit({
                    run: (state, dispatch) => {
                        dispatch?.(withNodeState(state.tr, [{ nodeId, key, value }]));

                        return true;
                    },
                    active: () => false,
                });
            },
        },
    };
};
