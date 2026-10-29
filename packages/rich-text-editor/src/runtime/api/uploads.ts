/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type UploadPlace } from '../capabilities/media/uploads';
import { cancelSlot, slotUploadsOf } from '../capabilities/media/uploadSlots';
import { pluginError } from '../reporting/events';
import { positionOf } from '../transform/positions';

import { type DocumentApi, type UploadTarget } from './documentApi';
import { type ApiSource, sharedEdits } from './shared';

/** The upload members of the document API. */
export const uploadsApi = (source: ApiSource): Pick<DocumentApi, 'uploads'> => {
    const { edit } = sharedEdits(source);
    /** Where `at` puts uploads, or `undefined` for a range the source cannot map. */
    const placeOf = (at: UploadTarget): UploadPlace | undefined => {
        const range = source.resolve(at.range);
        if (range === undefined) {
            return undefined;
        }

        return { kind: 'insert', origin: at.origin, range };
    };

    return {
        uploads: {
            pick: (nodeId) => source.later(() => source.uploads()?.pick(nodeId)),
            begin: (files, at) => {
                const uploads = source.uploads();
                const place = placeOf(at);
                if (uploads === undefined || place === undefined || !uploads.available(place)) {
                    return false;
                }

                source.later(() => {
                    uploads.begin(files, place).catch((error: unknown) => {
                        source.report(pluginError(error, undefined));
                    });
                });

                return true;
            },
            cancel: (nodeId) =>
                edit({
                    run: (state, dispatch) => {
                        const cancel = cancelSlot(state, nodeId);
                        if (cancel === undefined) {
                            return false;
                        }

                        dispatch?.(cancel);

                        return true;
                    },
                    active: () => false,
                }),
            retry: (nodeId) => {
                const state = source.state();
                const pos = positionOf(state.doc, nodeId);
                if (pos === undefined) {
                    return false;
                }

                const node = state.doc.nodeAt(pos);
                if (node === null || node.attrs.assetId !== null || slotUploadsOf(state)?.retryable(nodeId) !== true) {
                    return false;
                }

                // A read-only session takes no upload's result, so a retry there would only fail.
                if (!source.editable()) {
                    return false;
                }

                source.later(() => source.uploads()?.retry(nodeId));

                return true;
            },
            status: (nodeId) => source.uploads()?.statusOf(nodeId),
        },
    };
};
