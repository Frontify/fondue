/* (c) Copyright Frontify Ltd., all rights reserved. */

import { useState } from 'react';

import { type MountCoordinator } from '#/bridge/mount';
import { type EditorHosts, type PluginPresentation } from '#/bridge/plugin';
import { type CodecContext } from '#/model';

/** What the hosts read when a plugin calls them: the session's parts, and the newest props, strings and language. */
interface HostSources {
    readonly coordinator: MountCoordinator;
    readonly t: () => CodecContext['t'];
    readonly lang: () => string;
    readonly presentation: () => PluginPresentation;
    readonly testId: () => string;
}

/** The hosts an editor gives its plugins, built once per mount. */
export const usePluginHosts = (sources: HostSources) => {
    const [hosts] = useState<EditorHosts>(() => {
        const { coordinator } = sources;
        const view = () => coordinator.runtime?.view;
        return {
            t: (key, values) => sources.t()(key, values),
            locale: sources.lang,
            services: { presentation: sources.presentation },
            focus: () => coordinator.runtime?.handle.focus(),
            surface: () => view()?.dom,
            testId: sources.testId,
            report: (diagnostic) => coordinator.runtime?.report(diagnostic),
            generation: () => coordinator.runtime?.handle.getSummary().session.generation,
        };
    });
    return { hosts };
};
