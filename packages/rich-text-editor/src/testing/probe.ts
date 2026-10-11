/* (c) Copyright Frontify Ltd., all rights reserved. */

import { liveOperations } from '#/runtime/async';
import { busResources } from '#/runtime/events';
import { liveResources } from '#/runtime/runtime';
import { settleResources } from '#/runtime/settle';

/**
 * What every live runtime owns now: its views, the installed feature IDs of each session, and its event
 * subscriptions, selector subscriptions, queued intents, pending frames, settle timers, targets and async operations.
 */
export const probeRuntimes = () => ({
    views: [...liveResources.views],
    installedFeatures: [...liveResources.installedFeatures.values()],
    subscriptions: busResources.subscriptions,
    selectors: busResources.selectors,
    intents: liveResources.intents,
    frames: liveResources.frames,
    timers: settleResources.timers,
    targets: liveResources.targets,
    operations: [...liveOperations],
});
