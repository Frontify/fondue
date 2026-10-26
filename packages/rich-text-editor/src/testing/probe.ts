/* (c) Copyright Frontify Ltd., all rights reserved. */

import { liveOperations } from '#/runtime/async/async';
import { settleResources } from '#/runtime/dom/settle';
import { busResources } from '#/runtime/reporting/events';
import { liveResources } from '#/runtime/runtime';

/**
 * What every live runtime owns now: its views, node views and their portals, the installed feature IDs of each
 * session, its event subscriptions, selector subscriptions, queued intents, pending frames, settle timers, targets
 * and async operations.
 */
export const probeRuntimes = () => ({
    views: Array.from<object>(liveResources.views),
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
