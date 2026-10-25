/* (c) Copyright Frontify Ltd., all rights reserved. */

import { EDITS } from '../capabilities';
import { type DocumentApi } from '../documentApi';
import { enterItem, listAround, outdentAtStart } from '../lists';

import { type ApiSource, sharedEdits } from './shared';

/** The list members of the document API. */
export const listsApi = (source: ApiSource): Pick<DocumentApi, 'lists'> => {
    const { schema } = source;
    const { edit, capability, editWith } = sharedEdits(source);
    return {
        lists: {
            active: (list) => listAround(source.state().selection.$from)?.list.type.name === list,
            toggle: (list, item, attrs) =>
                schema.nodes[list] !== undefined &&
                schema.nodes[item] !== undefined &&
                editWith(EDITS.toggleList, { list, item }, [list, item], attrs, false),
            indent: (item) => schema.nodes[item] !== undefined && edit(capability(EDITS.indentItem, { item })),
            outdent: (item, options) => {
                const type = schema.nodes[item];
                if (type === undefined) {
                    return false;
                }
                if (options?.atStart === true && !outdentAtStart(type, source.state())) {
                    return false;
                }
                return edit(capability(EDITS.outdentItem, { item }));
            },
            split: (item) => {
                const type = schema.nodes[item];
                if (type === undefined) {
                    return false;
                }
                const enter = enterItem(type);
                return edit({
                    run: (state, dispatch) => enter(state, dispatch),
                    active: () => false,
                });
            },
        },
    };
};
