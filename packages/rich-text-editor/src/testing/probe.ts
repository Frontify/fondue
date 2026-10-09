/* (c) Copyright Frontify Ltd., all rights reserved. */

import { liveOperations } from '#/runtime/async';
import { busResources } from '#/runtime/events';
import { liveResources } from '#/runtime/runtime';
import { settleResources } from '#/runtime/settle';

/**
 * What every live runtime owns now: its views, node views and their portals, the installed feature IDs of each
 * session, its event subscriptions, selector subscriptions, queued intents, pending frames, settle timers and targets
 * (SPEC-rich-text-runtime/AC-060), and its registered async operations (AC-046).
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
