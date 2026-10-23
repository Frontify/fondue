/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type MutableRefObject, useMemo, useRef, useState } from 'react';

import { anchorOf } from '#/bridge/anchor';
import { type Announcer } from '#/bridge/announcer';
import { type InteractionScope } from '#/bridge/interaction-scope';
import { type MountCoordinator } from '#/bridge/mount';
import {
    type AnchorTarget,
    type EditorHosts,
    type OverlayAnchor,
    type OverlayProps,
    type PluginPresentation,
} from '#/bridge/plugin';
import { type CodecContext } from '#/model';
import { contentChecksApi } from '#/runtime/editor-api';
import { referenceValues } from '#/runtime/suggestions/references';

import { type ReferenceService } from './types';

/** The overlay a plugin command opened, with what it renders with; `id` remounts it when it opens again. */
export interface PluginOverlay {
    readonly id: number;
    readonly component: ComponentType<OverlayProps>;
    readonly props: object;
    readonly anchor: OverlayAnchor;
    readonly opener: Element | null;
}

/** What the hosts read when a plugin calls them: the session's parts, and the newest props, strings and language. */
interface HostSources {
    readonly coordinator: MountCoordinator;
    readonly scope: InteractionScope;
    readonly announcer: Announcer;
    readonly panels: MutableRefObject<{ open(id: string): void; close(): void; toggle(id: string): void }>;
    readonly openPanel: MutableRefObject<string | undefined>;
    readonly t: () => CodecContext['t'];
    readonly lang: () => string;
    readonly presentation: () => PluginPresentation;
    readonly references: () => ReferenceService | undefined;
    readonly testId: () => string;
}

/** The hosts an editor gives its plugins, built once per mount, and the overlay a plugin command opened, which it renders. */
export const usePluginHosts = (sources: HostSources) => {
    const [pluginOverlay, setPluginOverlay] = useState<PluginOverlay>();
    const pluginOverlayRef = useRef<PluginOverlay>(undefined);
    const [hosts] = useState<EditorHosts>(() => {
        const { coordinator, scope, announcer, panels, openPanel } = sources;
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
            services: {
                presentation: sources.presentation,
                references: () => {
                    const service = sources.references();
                    const runtime = coordinator.runtime;
                    if (service === undefined || runtime === undefined) {
                        return undefined;
                    }
                    return {
                        search: async (query, resourceTypes, signal, cursor) => {
                            const session = runtime.handle.getSummary().session;
                            const page = await service.search(
                                { query, resourceTypes: [...resourceTypes], cursor },
                                { signal, session },
                            );
                            // The session checks the host's page as untrusted input.
                            const kept = referenceValues(page, resourceTypes, runtime.limits.maxAttributeLength);
                            if (kept === undefined) {
                                throw new TypeError('The reference service answered no page.');
                            }
                            return kept;
                        },
                    };
                },
                checks: () => {
                    const runtime = coordinator.runtime;
                    if (runtime === undefined) {
                        return undefined;
                    }
                    return contentChecksApi(runtime);
                },
            },
            overlays: {
                open: (component, props, target = 'selection') => {
                    opened += 1;
                    const shown = component as ComponentType<OverlayProps>;
                    showOverlay({
                        id: opened,
                        component: shown,
                        props,
                        anchor: anchor(target),
                        opener: scope.active(),
                    });
                },
                close: () => showOverlay(undefined),
                isOpen: () => pluginOverlayRef.current !== undefined,
            },
            panels: {
                open: (id) => panels.current.open(id),
                toggle: (id) => panels.current.toggle(id),
                close: () => panels.current.close(),
                isOpen: (id) => openPanel.current === id,
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
