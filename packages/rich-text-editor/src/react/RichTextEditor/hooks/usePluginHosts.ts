/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type MutableRefObject, useMemo, useRef, useState } from 'react';

import { anchorOf } from '#/bridge/overlays/helpers/anchor';
import { type InteractionScope } from '#/bridge/overlays/helpers/interactionScope';
import {
    type AnchorTarget,
    type EditorHosts,
    type OverlayProps,
    type PluginPresentation,
} from '#/bridge/pluginApi/plugin';
import { type Announcer } from '#/bridge/session/helpers/announcer';
import { type MountCoordinator } from '#/bridge/session/helpers/mount';
import { type CodecContext } from '#/model';
import { contentChecksOf, referenceValues, surfaceElement } from '#/runtime/port';

import { type ReferenceService } from '../../types';
import { type PluginOverlay } from '../types';

/** What the hosts read when a plugin calls them: the session's parts, and the newest props, strings and language. */
type HostSources = {
    coordinator: MountCoordinator;
    scope: InteractionScope;
    announcer: Announcer;
    panels: MutableRefObject<{ open(id: string): void; close(): void; toggle(id: string): void }>;
    openPanel: MutableRefObject<string | undefined>;
    translate: () => CodecContext['translate'];
    lang: () => string;
    presentation: () => PluginPresentation;
    references: () => ReferenceService | undefined;
    testId: () => string;
};

/** The hosts an editor gives its plugins, built once per mount, and the overlay a plugin command opened, which it renders. */
export const usePluginHosts = (sources: HostSources) => {
    const [pluginOverlay, setPluginOverlay] = useState<PluginOverlay>();
    const pluginOverlayRef = useRef<PluginOverlay>(undefined);

    const [hosts] = useState<EditorHosts>(() => {
        const { coordinator, scope, announcer, panels, openPanel } = sources;

        const port = () => coordinator.runtime;
        const anchor = (target: AnchorTarget) => anchorOf(port, target);

        let opened = 0;
        // A plugin command's `enabled` or `active` may read `overlays.isOpen`, so its query reads again.
        const showOverlay = (next: PluginOverlay | undefined) => {
            pluginOverlayRef.current = next;
            setPluginOverlay(next);
            coordinator.runtime?.notifyWatchers();
        };

        return {
            translate: (key, values) => sources.translate()(key, values),
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

                    return contentChecksOf(runtime);
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
            surface: () => surfaceElement(port()),
            testId: sources.testId,
            report: (diagnostic) => coordinator.runtime?.report(diagnostic),
            generation: () => coordinator.runtime?.handle.getSummary().session.generation,
        };
    });

    return { hosts, pluginOverlay };
};

/** The hosts with the strings and language of this render, so plugin UI follows a locale change in the render it happens. */
export const useRenderedHosts = (hosts: EditorHosts, translate: CodecContext['translate'], lang: string): EditorHosts =>
    useMemo(
        () => ({ ...hosts, translate: (key, values) => translate(key, values), locale: () => lang }),
        [hosts, translate, lang],
    );
