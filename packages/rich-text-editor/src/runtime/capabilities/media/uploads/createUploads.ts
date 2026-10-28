/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Node } from 'prosemirror-model';

import { type UploadStatus } from '../../../types';

import { liveUploadCaches, UploadCache } from './cache';
import { createGestures } from './gestures';
import { createSlotHistory } from './history';
import { isActive, isKept, isRetryable, type SlotState, statusOf } from './machine';
import { createTransport } from './transport';
import { type UploadHost } from './types';

/**
 * The uploads of one session. A chosen, pasted or dropped file is checked against `acceptTypes`, `maxAssetBytes` and
 * the pixel limits from its header, never decoded, and starts as a slot in the document; the service call runs
 * through the async coordinator, at most `maxConcurrentUploads` at once, and fills the slot with no undo step. An undo,
 * a deletion or a cancel of the slot aborts its call, which `releaseUnused` then cleans up once.
 */
export const createUploads = (host: UploadHost) => {
    const cache = new UploadCache();
    liveUploadCaches.add(cache);
    const transport = createTransport(host, cache);
    const { cells } = transport.link;
    const { admits, begin, retry } = createGestures(transport);
    const { committed, flush, reset } = createSlotHistory(transport);

    const dispose = (left: Node) => {
        reset(left);
        cells.clear();
        liveUploadCaches.delete(cache);
    };

    const flag = (pick: (slot: SlotState) => boolean) => (nodeId: string) => {
        const slot = cells.get(nodeId)?.slot;

        return slot !== undefined && pick(slot);
    };

    return {
        admits,
        begin,
        retry,
        statusOf: (nodeId: string): UploadStatus | undefined => {
            const slot = cells.get(nodeId)?.slot;
            if (slot === undefined) {
                return undefined;
            }

            return statusOf(slot);
        },
        active: flag(isActive),
        kept: flag(isKept),
        retryable: flag(isRetryable),
        committed,
        flush,
        reset,
        dispose,
        cache,
    };
};

/** The uploads of one session, as `createUploads` returns them. */
export type Uploads = ReturnType<typeof createUploads>;
