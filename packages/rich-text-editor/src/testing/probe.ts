/* (c) Copyright Frontify Ltd., all rights reserved. */

import { busResources } from '#/runtime/events';
import { liveResources } from '#/runtime/runtime';

/**
 * What every live runtime owns now: its views, the installed feature IDs of each session, and its event
 * subscriptions, selector subscriptions, queued intents, pending frames and targets.
 */
export const probeRuntimes = () => ({
    views: [...liveResources.views],
    installedFeatures: [...liveResources.installedFeatures.values()],
    subscriptions: busResources.subscriptions,
    selectors: busResources.selectors,
    intents: liveResources.intents,
    frames: liveResources.frames,
    targets: liveResources.targets,
});
