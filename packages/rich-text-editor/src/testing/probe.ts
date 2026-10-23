/* (c) Copyright Frontify Ltd., all rights reserved. */

import { busResources } from '#/runtime/events';
import { liveResources } from '#/runtime/runtime';

/** What every live runtime owns now: its views, its event subscriptions and pending frames. */
export const probeRuntimes = () => ({
    views: Array.from<object>(liveResources.views),
    subscriptions: busResources.subscriptions,
    frames: liveResources.frames,
});
