/* (c) Copyright Frontify Ltd., all rights reserved. */

import { liveResources } from '#/runtime/runtime';

/**
 * What every live runtime owns now: its views, the installed feature IDs of each session, and its event
 * subscriptions, selector subscriptions, queued intents and pending frames (SPEC-rich-text-runtime/AC-060).
 */
export const probeRuntimes = () => ({
    views: [...liveResources.views],
    sessions: [...liveResources.sessions.values()],
    subscriptions: liveResources.subscriptions,
    selectors: liveResources.selectors,
    intents: liveResources.intents,
    frames: liveResources.frames,
});
