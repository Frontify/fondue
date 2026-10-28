/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { TurnIntoContext, type TurnIntoEntry } from '#/bridge/chrome/helpers/turnInto';
import { OverlayContext, type Overlays } from '#/bridge/overlays/helpers/overlayContext';
import { EditorHostsContext } from '#/bridge/pluginApi/helpers/editorHostsContext';
import { type EditorHosts } from '#/bridge/pluginApi/plugin';
import { AnnouncerContext, type Announcer } from '#/bridge/session/helpers/announcer';
import { ReactWorkContext, type ReactWork } from '#/bridge/session/helpers/devChecks';
import { SessionContext } from '#/bridge/session/helpers/sessionContext';
import { type EditorPort } from '#/runtime/port';

import { RootContext } from '../helpers/rootContext';
import { type RootContextValue } from '../types';

type ProviderValues = {
    root: RootContextValue;
    hosts: EditorHosts;
    live: EditorPort | undefined;
    work: ReactWork | undefined;
    announcer: Announcer;
    overlays: Overlays;
    turnInto: readonly TurnIntoEntry[];
};

export type SessionProvidersProps = { values: ProviderValues; children: ReactNode };

/** What the parts, the plugins and the overlays of one session read from context. */
export const SessionProviders = ({ values, children }: SessionProvidersProps) => (
    <RootContext.Provider value={values.root}>
        <EditorHostsContext.Provider value={values.hosts}>
            <SessionContext.Provider value={values.live}>
                <ReactWorkContext.Provider value={values.work}>
                    <AnnouncerContext.Provider value={values.announcer}>
                        <OverlayContext.Provider value={values.overlays}>
                            <TurnIntoContext.Provider value={values.turnInto}>{children}</TurnIntoContext.Provider>
                        </OverlayContext.Provider>
                    </AnnouncerContext.Provider>
                </ReactWorkContext.Provider>
            </SessionContext.Provider>
        </EditorHostsContext.Provider>
    </RootContext.Provider>
);
SessionProviders.displayName = 'SessionProviders';
