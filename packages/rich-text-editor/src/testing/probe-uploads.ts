/* (c) Copyright Frontify Ltd., all rights reserved. */

import { liveUploadCaches, uploadLimits } from '#/runtime/capabilities/media/uploads';

/** The completed-upload cache of every live session, and a way to lower the 10,000 entries it holds before refusing. */
export const probeUploads = () => ({
    caches: [...liveUploadCaches],
    /** Sets the bound until `restore` runs. */
    limitCache: (entries: number) => {
        const before = uploadLimits.cacheEntries;
        uploadLimits.cacheEntries = entries;
        return () => {
            uploadLimits.cacheEntries = before;
        };
    },
});
