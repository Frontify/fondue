/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject } from 'react';

import { type InteractionScope } from '#/bridge/overlays/helpers/interactionScope';
import { type Announcer } from '#/bridge/session/helpers/announcer';
import { type MountCoordinator } from '#/bridge/session/helpers/mount';

import { memberOf, pluginPresentationOf } from '../helpers/sessionHelpers';
import { type ChromeContext, DEFAULT_TEST_ID, type SessionRest } from '../types';

import { usePluginHosts } from './usePluginHosts';

type HostWiring = {
    coordinator: MountCoordinator;
    scope: InteractionScope;
    announcer: Announcer;
    panelActionsRef: Parameters<typeof usePluginHosts>[0]['panels'];
    openPanelRef: MutableRefObject<string | undefined>;
    translateRef: MutableRefObject<ChromeContext['translate']>;
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
    translateRef,
    langRef,
    latestRef,
}: HostWiring) =>
    usePluginHosts({
        coordinator,
        scope,
        announcer,
        panels: panelActionsRef,
        openPanel: openPanelRef,
        translate: () => translateRef.current,
        lang: () => langRef.current,
        presentation: () => pluginPresentationOf(latestRef.current.presentation),
        references: () => memberOf(latestRef.current.services, 'references'),
        testId: () => latestRef.current['data-test-id'] ?? DEFAULT_TEST_ID,
    });
