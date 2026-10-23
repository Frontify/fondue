/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, useMemo, useRef, useState } from 'react';

import { anchorOf } from '#/bridge/anchor';
import { type Announcer } from '#/bridge/announcer';
import { type MountCoordinator } from '#/bridge/mount';
import {
    type AnchorTarget,
    type EditorHosts,
    type OverlayAnchor,
    type OverlayProps,
    type PluginPresentation,
} from '#/bridge/plugin';
import { type CodecContext } from '#/model';

/** The overlay a plugin command opened, with what it renders with; `id` remounts it when it opens again. */
export interface PluginOverlay {
    readonly id: number;
    readonly component: ComponentType<OverlayProps>;
    readonly props: object;
    readonly anchor: OverlayAnchor;
}

/** What the hosts read when a plugin calls them: the session's parts, and the newest props, strings and language. */
interface HostSources {
    readonly coordinator: MountCoordinator;
    readonly announcer: Announcer;
    readonly t: () => CodecContext['t'];
    readonly lang: () => string;
    readonly presentation: () => PluginPresentation;
    readonly testId: () => string;
}

/** The hosts an editor gives its plugins, built once per mount, and the overlay a plugin command opened, which it renders. */
export const usePluginHosts = (sources: HostSources) => {
    const [pluginOverlay, setPluginOverlay] = useState<PluginOverlay>();
    const pluginOverlayRef = useRef<PluginOverlay>(undefined);
    const [hosts] = useState<EditorHosts>(() => {
        const { coordinator, announcer } = sources;
        const view = () => coordinator.runtime?.view;
        const anchor = (target: AnchorTarget) => anchorOf(view, target);
        let opened = 0;
        const showOverlay = (next: PluginOverlay | undefined) => {
            pluginOverlayRef.current = next;
            setPluginOverlay(next);
        };
        return {
            t: (key, values) => sources.t()(key, values),
            locale: sources.lang,
            services: { presentation: sources.presentation },
            overlays: {
                open: (component, props, target = 'selection') => {
                    opened += 1;
                    const shown = component as ComponentType<OverlayProps>;
                    showOverlay({
                        id: opened,
                        component: shown,
                        props,
                        anchor: anchor(target),
                    });
                },
                close: () => showOverlay(undefined),
                isOpen: () => pluginOverlayRef.current !== undefined,
            },
            announce: (message, key) => announcer.announce(message, key),
            focus: () => coordinator.runtime?.handle.focus(),
            anchor,
            surface: () => view()?.dom,
            testId: sources.testId,
            report: (diagnostic) => coordinator.runtime?.report(diagnostic),
            generation: () => coordinator.runtime?.handle.getSummary().session.generation,
        };
    });
    return { hosts, pluginOverlay };
};

/** The hosts with the strings and language of this render, so plugin UI follows a locale change in the render it happens. */
export const useRenderedHosts = (hosts: EditorHosts, t: CodecContext['t'], lang: string): EditorHosts =>
    useMemo(() => ({ ...hosts, t: (key, values) => t(key, values), locale: () => lang }), [hosts, t, lang]);
