/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ForwardedRef, useCallback, useRef, useState } from 'react';

import { useOverlayRoot } from '#/bridge/overlays/hooks/useOverlayRoot';
import { useClientLayoutEffect } from '#/bridge/session/hooks/useClientLayoutEffect';
import { type EditorPort, resyncSelectionOf } from '#/runtime/port';

import { type EditorHandle } from '../../../types';
import { chromeKeyDownOf } from '../../helpers/chromeKeyDownOf';
import { shellPropsOf } from '../../helpers/sessionHelpers';
import {
    useChooserRefs,
    useChrome,
    useChromeRefs,
    useLocaleRefs,
    useOverlayValues,
    useToolbarMode,
} from '../../hooks/useChrome';
import { useColumns } from '../../hooks/useColumns';
import { useEscapeToSurface } from '../../hooks/useEscapeToSurface';
import { useKeyboardInset } from '../../hooks/useKeyboardInset';
import { useMountState } from '../../hooks/useMountState';
import { usePanels } from '../../hooks/usePanels';
import { useRootContext } from '../../hooks/useRoot';
import { useSessionHandle } from '../../hooks/useSessionHandle';
import { useSessionHosts } from '../../hooks/useSessionHosts';
import { useSessionRuntime } from '../../hooks/useSessionRuntime';
import { useChangeWatch, usePresentationSync } from '../../hooks/useSync';
import { useUnloadGuard } from '../../hooks/useUnloadGuard';
import { type ChromeContext, type SessionProps, type SessionRest } from '../../types';

/** The refs, hosts and toolbar mode a session keeps from its first render. */
export const useSessionMount = (props: SessionRest, retried: SessionProps['retried']) => {
    const { loaded, mounted, faulted, setFaulted, coordinator, portals, work, announcer } = useMountState(
        props,
        retried,
    );
    const { generatedId, toolbarRef, bubbleRef, showBubbleRef, overlayToolbarsRef } = useChromeRefs();
    const { langRef, tRef } = useLocaleRefs();
    const { chooserRef, choosingRef } = useChooserRefs();
    const handleRef = useRef<EditorHandle<object> | null>(null);
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

    return {
        loaded,
        mounted,
        faulted,
        setFaulted,
        coordinator,
        portals,
        work,
        announcer,
        generatedId,
        toolbarRef,
        bubbleRef,
        showBubbleRef,
        overlayToolbarsRef,
        langRef,
        tRef,
        chooserRef,
        choosingRef,
        handleRef,
        live,
        setLive,
        latestRef,
        rootRef,
        overlayRoot,
        scope,
        overlayRootElement,
        toolbarMode,
        switchToolbar,
        panelState,
        hosts,
        pluginOverlay,
        keyboard,
    };
};

export type SessionMount = ReturnType<typeof useSessionMount>;

const runtimeSourcesOf = (mount: SessionMount, onSession: SessionProps['onSession']) => ({
    mounted: mount.mounted,
    loaded: mount.loaded,
    coordinator: mount.coordinator,
    portals: mount.portals,
    work: mount.work,
    announcer: mount.announcer,
    hosts: mount.hosts,
    scope: mount.scope,
    latestRef: mount.latestRef,
    chooserRef: mount.chooserRef,
    choosingRef: mount.choosingRef,
    handleRef: mount.handleRef,
    setLive: mount.setLive,
    setFaulted: mount.setFaulted,
    onSession,
});

const keySourcesOf = (props: SessionRest, mount: SessionMount) => ({
    props,
    coordinator: mount.coordinator,
    toolbarRef: mount.toolbarRef,
    bubbleRef: mount.bubbleRef,
    showBubbleRef: mount.showBubbleRef,
    overlayToolbarsRef: mount.overlayToolbarsRef,
    toolbarMode: mount.toolbarMode,
});

const chromeSourcesOf = (props: SessionRest, shell: ReturnType<typeof shellPropsOf>, mount: SessionMount) => ({
    props,
    shell,
    mounted: mount.mounted,
    hosts: mount.hosts,
    generatedId: mount.generatedId,
    langRef: mount.langRef,
    tRef: mount.tRef,
    overlayToolbarsRef: mount.overlayToolbarsRef,
    toolbarRef: mount.toolbarRef,
    bubbleRef: mount.bubbleRef,
    showBubbleRef: mount.showBubbleRef,
    toolbarMode: mount.toolbarMode,
    switchToolbar: mount.switchToolbar,
    keyboard: mount.keyboard,
});

const overlaySourcesOf = (props: SessionRest, mount: SessionMount, chromeContext: ChromeContext) => ({
    props,
    mounted: mount.mounted,
    overlayRoot: mount.overlayRoot,
    scope: mount.scope,
    pluginOverlay: mount.pluginOverlay,
    chromeContext,
});

/** The running session's chrome and the values its frame renders. */
export const useSessionView = (
    props: SessionRest,
    onSession: SessionProps['onSession'],
    ref: ForwardedRef<EditorHandle<object> | null>,
    mount: SessionMount,
) => {
    useSessionRuntime(runtimeSourcesOf(mount, onSession));
    useSessionHandle(ref, mount.live, mount.handleRef);
    usePresentationSync(props, mount.coordinator, mount.handleRef, mount.rootRef);
    useChangeWatch(props, mount.mounted, mount.coordinator);
    useUnloadGuard(mount.live, props);

    const onFlush = useCallback(() => resyncSelectionOf(mount.coordinator.runtime), [mount.coordinator]);
    const onKeyDown = chromeKeyDownOf(keySourcesOf(props, mount));
    const shell = shellPropsOf(props);
    const { lang, chromeContext, renderedHosts, standing, chrome } = useChrome(chromeSourcesOf(props, shell, mount));
    useColumns(mount.live, props.presentation, chromeContext.t);
    const { overlays, choosesFiles, referenceStrings } = useOverlayValues(
        overlaySourcesOf(props, mount, chromeContext),
    );
    const context = useRootContext(props, mount.latestRef, mount.mounted, mount.coordinator, chrome);

    return {
        shell,
        onKeyDown,
        onFlush,
        lang,
        chromeContext,
        renderedHosts,
        standing,
        chrome,
        overlays,
        choosesFiles,
        referenceStrings,
        context,
    };
};
