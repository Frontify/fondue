/* (c) Copyright Frontify Ltd., all rights reserved. */

import { liveResources } from '#/runtime/runtime';

/** What every live runtime holds now: its views, its subscriptions and its pending frames. */
export const probeRuntimes = () => ({
    views: [...liveResources.views],
    subscriptions: liveResources.subscriptions,
    frames: liveResources.frames,
});
