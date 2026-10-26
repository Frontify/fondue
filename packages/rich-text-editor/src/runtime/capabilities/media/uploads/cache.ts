/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type PickedAsset } from '../media';

/** How many completed references one session keeps, which the `src/testing` probe lowers. */
export const uploadLimits = { cacheEntries: 10_000 };

/** A completed upload, by its operation ID: the slot it filled and the asset it set. */
export type CompletedUpload = {
    readonly nodeId: string;
    readonly asset: PickedAsset;
};

/** The completed-reference cache of one session, keyed by operation ID; it never evicts an entry. */
export class UploadCache {
    readonly #entries = new Map<string, CompletedUpload & { readonly release: () => void }>();

    get size(): number {
        return this.#entries.size;
    }

    read(operationId: string): CompletedUpload | undefined {
        return this.#entries.get(operationId);
    }

    write(operationId: string, entry: CompletedUpload & { readonly release: () => void }): void {
        this.#entries.set(operationId, entry);
    }

    /** Calls `releaseUnused` for each entry whose asset `kept` does not hold, then empties the cache. */
    empty(kept: ReadonlySet<string>): void {
        for (const entry of this.#entries.values()) {
            if (!kept.has(entry.asset.assetId)) {
                entry.release();
            }
        }

        this.#entries.clear();
    }
}

/** The cache of every live session, which the `src/testing` probe reads. */
export const liveUploadCaches = new Set<UploadCache>();
