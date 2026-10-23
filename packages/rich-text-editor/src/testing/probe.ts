/* (c) Copyright Frontify Ltd., all rights reserved. */

import { busResources } from '#/runtime/events';
import { liveResources } from '#/runtime/runtime';
import { settleResources } from '#/runtime/settle';

/**
 * What every live runtime owns now: its views, the installed feature IDs of each session, its event subscriptions,
 * selector subscriptions, queued intents, pending frames, settle timers and targets.
 */
export const probeRuntimes = () => ({
    views: Array.from<object>(liveResources.views),
    installedFeatures: [...liveResources.installedFeatures.values()],
    subscriptions: busResources.subscriptions,
    selectors: busResources.selectors,
    intents: liveResources.intents,
    frames: liveResources.frames,
    timers: settleResources.timers,
    targets: liveResources.targets,
});
