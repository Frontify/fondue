/* (c) Copyright Frontify Ltd., all rights reserved. */

import { liveOperations } from '#/runtime/async';
import { busResources } from '#/runtime/events';
import { liveResources } from '#/runtime/runtime';
import { settleResources } from '#/runtime/settle';
import { liveUploadCaches, uploadLimits } from '#/runtime/uploads';

/**
 * What every live runtime owns now: its views, node views and their portals, the installed feature IDs of each
 * session, its event subscriptions, selector subscriptions, queued intents, pending frames, settle timers, targets
 * and async operations.
 */
export const probeRuntimes = () => ({
    views: [...liveResources.views],
    nodeViews: liveResources.nodeViews,
    portals: liveResources.portals,
    installedFeatures: [...liveResources.installedFeatures.values()],
    subscriptions: busResources.subscriptions,
    selectors: busResources.selectors,
    intents: liveResources.intents,
    frames: liveResources.frames,
    timers: settleResources.timers,
    targets: liveResources.targets,
    operations: [...liveOperations],
});

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
