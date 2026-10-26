/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject } from 'react';

import { type InteractionScope } from '#/bridge/overlays/helpers/interactionScope';
import { type Announcer } from '#/bridge/session/helpers/announcer';
import { type MountCoordinator } from '#/bridge/session/helpers/mount';
import { type readerContext } from '#/reader/helpers/context';

import { memberOf, pluginPresentationOf } from '../helpers/sessionHelpers';
import { DEFAULT_TEST_ID, type SessionRest } from '../types';

import { usePluginHosts } from './usePluginHosts';

type HostWiring = {
    coordinator: MountCoordinator;
    scope: InteractionScope;
    announcer: Announcer;
    panelActionsRef: Parameters<typeof usePluginHosts>[0]['panels'];
    openPanelRef: MutableRefObject<string | undefined>;
    tRef: MutableRefObject<ReturnType<typeof readerContext>['t']>;
    langRef: MutableRefObject<string>;
    latestRef: MutableRefObject<SessionRest>;
};

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
