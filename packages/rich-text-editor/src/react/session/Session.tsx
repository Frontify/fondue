/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';

import { useClientLayoutEffect } from '#/bridge/clientLayoutEffect';
import { useOverlayRoot } from '#/bridge/useOverlayRoot';
import { type EditorPort, resyncSelectionOf } from '#/runtime/port';

import { useEscapeToSurface } from '../chromeFocus';
import { BlockedShell, RecoveryShell } from '../Shells';
import { type EditorHandle } from '../types';
import { useKeyboardInset } from '../useKeyboardInset';

import { SessionFrame, SessionProviders } from './Frame';
import { shellPropsOf } from './helpers';
import { useRootContext } from './rootContext';
import { type SessionProps } from './types';
import { chromeKeyDownOf, useChrome, useOverlayValues, useSessionRefs, useToolbarMode } from './useChrome';
import { useColumns } from './useColumns';
import { useMountState } from './useMountState';
import { usePanels } from './usePanels';
import { useSessionHosts } from './useSessionHosts';
import { useSessionRuntime } from './useSessionRuntime';
import { useChangeWatch, usePresentationSync } from './useSync';
import { useUnloadGuard } from './useUnloadGuard';

const SessionComponent = (
    { children, onSession, onRetry, retried, ...props }: SessionProps,
    ref: ForwardedRef<EditorHandle<object> | null>,
) => {
    const { loaded, mounted, faulted, setFaulted, coordinator, portals, work, announcer } = useMountState(
        props,
        retried,
    );
    const refs = useSessionRefs();
    const { generatedId, toolbarRef, langRef, handleRef, bubbleRef, showBubbleRef } = refs;
    const { overlayToolbarsRef, tRef, chooserRef, choosingRef } = refs;
    // The session once it is ready, which the parts and hooks read.
    const [live, setLive] = useState<EditorPort>();
    const latestRef = useRef(props);
    const {
        rootRef,
        overlayRoot,
        overlayRootRef,
        scope,
        element: overlayRootElement,
    } = useOverlayRoot(coordinator, props.portalContainer);
    const { toolbarMode, switchToolbar } = useToolbarMode(props.defaultToolbarMode, latestRef);
    const { openPanelRef, panelActionsRef, panelState } = usePanels(rootRef, coordinator);
    const { hosts, pluginOverlay } = useSessionHosts({
        coordinator,
        scope,
        announcer,
        panelActionsRef,
        openPanelRef,
        tRef,
        langRef,
        latestRef,
    });
    const keyboard = useKeyboardInset(rootRef, coordinator);

    useClientLayoutEffect(() => {
        latestRef.current = props;
    });

    useEscapeToSurface(rootRef, toolbarRef, overlayRootRef, coordinator);

    useSessionRuntime({
        mounted,
        loaded,
        coordinator,
        portals,
        work,
        announcer,
        hosts,
        scope,
        latestRef,
        chooserRef,
        choosingRef,
        handleRef,
        setLive,
        setFaulted,
        onSession,
    });

    // A blocked document gets no session and so no handle. The ref is the fallback because `live` lags the layout effect.
    useImperativeHandle<EditorHandle<object> | null, EditorHandle<object> | null>(
        ref,
        () => live?.handle ?? handleRef.current,
        [live, handleRef],
    );

    usePresentationSync(props, coordinator, handleRef, rootRef);
    useChangeWatch(props, mounted, coordinator);
    useUnloadGuard(live, props);

    const onFlush = useCallback(() => resyncSelectionOf(coordinator.runtime), [coordinator]);

    const onKeyDown = chromeKeyDownOf({
        props,
        coordinator,
        toolbarRef,
        bubbleRef,
        showBubbleRef,
        overlayToolbarsRef,
        toolbarMode,
    });

    const shell = shellPropsOf(props);
    const { lang, chromeContext, renderedHosts, standing, chrome } = useChrome({
        props,
        shell,
        mounted,
        hosts,
        generatedId,
        langRef,
        tRef,
        overlayToolbarsRef,
        toolbarRef,
        bubbleRef,
        showBubbleRef,
        toolbarMode,
        switchToolbar,
        keyboard,
    });
    useColumns(live, props.presentation, chromeContext.t);

    const { overlays, choosesFiles, referenceStrings } = useOverlayValues({
        props,
        mounted,
        overlayRoot,
        scope,
        pluginOverlay,
        chromeContext,
    });
    const context = useRootContext(props, latestRef, mounted, coordinator, chrome);
    if (mounted.blocked !== undefined) {
        return <BlockedShell result={mounted.blocked} {...shell} />;
    }
    if (faulted !== undefined) {
        return <RecoveryShell document={faulted} {...shell} onRetry={onRetry} />;
    }
    return (
        <SessionProviders
            values={{ root: context, hosts: renderedHosts, live, work, announcer, overlays, turnInto: chrome.turnInto }}
        >
            <SessionFrame
                rootRef={rootRef}
                lang={lang}
                testId={shell.testId}
                live={live}
                coordinator={coordinator}
                onKeyDown={onKeyDown}
                work={work}
                announcer={announcer}
                panelState={panelState}
                toolbarMode={toolbarMode}
                chrome={chrome}
                disabled={props.disabled === true}
                portals={portals}
                chromeContext={chromeContext}
                onFlush={onFlush}
                referenceStrings={referenceStrings}
                standing={standing}
                pluginOverlay={pluginOverlay}
                hosts={hosts}
                choosesFiles={choosesFiles}
                chooserRef={chooserRef}
                choosingRef={choosingRef}
                overlayRootElement={overlayRootElement}
            >
                {children}
            </SessionFrame>
        </SessionProviders>
    );
};

export const Session = forwardRef(SessionComponent);
Session.displayName = 'RichTextEditor.Session';
