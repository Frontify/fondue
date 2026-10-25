/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject } from 'react';

import { type Announcer } from '#/bridge/announcer';
import { type InteractionScope } from '#/bridge/interaction-scope';
import { type MountCoordinator } from '#/bridge/mount';
import { type readerContext } from '#/reader/context';

import { usePluginHosts } from '../plugin-hosts';

import { memberOf, pluginPresentationOf } from './helpers';
import { DEFAULT_TEST_ID, type SessionRest } from './types';

interface HostWiring {
    readonly coordinator: MountCoordinator;
    readonly scope: InteractionScope;
    readonly announcer: Announcer;
    readonly panelActionsRef: Parameters<typeof usePluginHosts>[0]['panels'];
    readonly openPanelRef: MutableRefObject<string | undefined>;
    readonly tRef: MutableRefObject<ReturnType<typeof readerContext>['t']>;
    readonly langRef: MutableRefObject<string>;
    readonly latestRef: MutableRefObject<SessionRest>;
}

/** The hosts the plugins call, reading the newest props, strings and language when they run. */
export const useSessionHosts = ({
    coordinator,
    scope,
    announcer,
    panelActionsRef,
    openPanelRef,
    tRef,
    langRef,
    latestRef,
}: HostWiring) =>
    usePluginHosts({
        coordinator,
        scope,
        announcer,
        panels: panelActionsRef,
        openPanel: openPanelRef,
        t: () => tRef.current,
        lang: () => langRef.current,
        presentation: () => pluginPresentationOf(latestRef.current.presentation),
        references: () => memberOf(latestRef.current.services, 'references'),
        testId: () => latestRef.current['data-test-id'] ?? DEFAULT_TEST_ID,
    });
