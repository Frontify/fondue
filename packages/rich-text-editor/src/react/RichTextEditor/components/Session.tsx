/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, forwardRef } from 'react';

import { type EditorHandle } from '../../types';
import { useSessionMount, useSessionView } from '../session/hooks/useSessionShell';
import { type SessionProps } from '../types';

import { BlockedShell } from './BlockedShell';
import { RecoveryShell } from './RecoveryShell';
import { SessionFrame } from './SessionFrame';
import { SessionProviders } from './SessionProviders';

const SessionComponent = (
    { children, onSession, onRetry, retried, ...props }: SessionProps,
    ref: ForwardedRef<EditorHandle<object> | null>,
) => {
    const mount = useSessionMount(props, retried);
    const view = useSessionView(props, onSession, ref, mount);

    if (mount.mounted.blocked !== undefined) {
        return <BlockedShell result={mount.mounted.blocked} {...view.shell} />;
    }

    if (mount.faulted !== undefined) {
        return <RecoveryShell document={mount.faulted} {...view.shell} onRetry={onRetry} />;
    }

    return (
        <SessionProviders
            values={{
                root: view.context,
                hosts: view.renderedHosts,
                live: mount.live,
                work: mount.work,
                announcer: mount.announcer,
                overlays: view.overlays,
                turnInto: view.chrome.turnInto,
            }}
        >
            <SessionFrame
                rootRef={mount.rootRef}
                lang={view.lang}
                testId={view.shell.testId}
                live={mount.live}
                coordinator={mount.coordinator}
                onKeyDown={view.onKeyDown}
                work={mount.work}
                announcer={mount.announcer}
                panelState={mount.panelState}
                toolbarMode={mount.toolbarMode}
                chrome={view.chrome}
                disabled={props.disabled === true}
                portals={mount.portals}
                chromeContext={view.chromeContext}
                onFlush={view.onFlush}
                referenceStrings={view.referenceStrings}
                standing={view.standing}
                pluginOverlay={mount.pluginOverlay}
                hosts={mount.hosts}
                choosesFiles={view.choosesFiles}
                chooserRef={mount.chooserRef}
                choosingRef={mount.choosingRef}
                overlayRootElement={mount.overlayRootElement}
            >
                {children}
            </SessionFrame>
        </SessionProviders>
    );
};

export const Session = forwardRef(SessionComponent);
Session.displayName = 'Session';
