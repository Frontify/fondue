/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ReactNode } from 'react';

import { AnnouncerContext, type Announcer } from '#/bridge/announcer';
import { ReactWorkContext, type ReactWork } from '#/bridge/devChecks';
import { OverlayContext, type Overlays } from '#/bridge/overlays';
import { EditorHostsContext, type EditorHosts } from '#/bridge/pluginApi/plugin';
import { SessionContext } from '#/bridge/session';
import { TurnIntoContext, type TurnIntoEntry } from '#/bridge/turnInto';
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

/** What the parts, the plugins and the overlays of one session read from context. */
export const SessionProviders = ({ values, children }: { values: ProviderValues; children: ReactNode }) => (
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
