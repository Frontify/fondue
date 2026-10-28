/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject } from 'react';

import { PortalHost } from '#/bridge/nodeViews/components/PortalHost';
import { OverlayBody } from '#/bridge/overlays/components/OverlayBody';
import { type EditorHosts } from '#/bridge/pluginApi/plugin';
import { Phase } from '#/bridge/session/components/Phase';
import { type MountCoordinator } from '#/bridge/session/helpers/mount';
import { mediaOf } from '#/runtime/port';
import { VISUALLY_HIDDEN } from '#/styles/visuallyHidden';
import { ContextMenu } from '#/ui/ContextMenu/ContextMenu';
import { PanelContext } from '#/ui/helpers/panelContext';
import { LazySuggestionList } from '#/ui/LazySuggestionList/LazySuggestionList';

import { translatedLabel } from '../../helpers/toolbarItems';
import { type PluginOverlay } from '../hooks/usePluginHosts';
import { type Choosing } from '../hooks/useSessionRuntime';
import { type FrameProps, type Standing } from '../types';

import { Bubble } from './Parts';

type FileChooserProps = {
    testId: string;
    chooserRef: MutableRefObject<HTMLInputElement | null>;
    choosingRef: MutableRefObject<Choosing | undefined>;
    coordinator: MountCoordinator;
};

/** The file chooser exists where `media.image` takes files that `services.uploads` sends. */
const FileChooser = ({ testId, chooserRef, choosingRef, coordinator }: FileChooserProps) => (
    <input
        ref={chooserRef}
        type="file"
        hidden
        tabIndex={-1}
        aria-hidden="true"
        data-test-id={`${testId}-file-chooser`}
        onChange={(event) => {
            const files = [...(event.currentTarget.files ?? [])];
            const choosing = choosingRef.current;
            choosingRef.current = undefined;
            event.currentTarget.value = '';

            const { runtime } = coordinator;
            const current = runtime?.handle.getSummary().session;
            // Files chosen for a document that was replaced since go nowhere.
            if (
                choosing !== undefined &&
                runtime !== undefined &&
                current?.sessionId === choosing.session.sessionId &&
                current.generation === choosing.session.generation
            ) {
                mediaOf(runtime)
                    ?.uploads.begin(files, choosing.place)
                    .catch(() => undefined);
            }
        }}
    />
);

type PluginOverlaysProps = {
    standing: readonly Standing[];
    pluginOverlay: PluginOverlay | undefined;
    hosts: EditorHosts;
};

/** The plugins' standing overlays, and the plugin overlay a command opened. */
const PluginOverlays = ({ standing, pluginOverlay, hosts }: PluginOverlaysProps) => (
    <>
        {standing.map(({ key, component: Standing, toolbarRef: ref }) => (
            <Standing key={key} toolbarRef={ref} covered={pluginOverlay !== undefined} />
        ))}
        {pluginOverlay !== undefined && (
            <OverlayBody>
                <pluginOverlay.component
                    key={pluginOverlay.id}
                    {...pluginOverlay.props}
                    close={hosts.overlays.close}
                    anchor={pluginOverlay.anchor}
                    opener={pluginOverlay.opener}
                />
            </OverlayBody>
        )}
    </>
);

/** The root element of a session: the host's parts, then the chrome that every session renders. */
export const SessionFrame = ({
    rootRef,
    lang,
    testId,
    live,
    coordinator,
    onKeyDown,
    work,
    announcer,
    panelState,
    toolbarMode,
    chrome,
    disabled,
    portals,
    chromeContext,
    onFlush,
    referenceStrings,
    standing,
    pluginOverlay,
    hosts,
    choosesFiles,
    chooserRef,
    choosingRef,
    overlayRootElement,
    children,
}: FrameProps) => (
    <>
        {/* Focus in the chrome keeps the selection visible until it returns. */}
        {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- the root only hears keys and focus that bubble from the surface and chrome. */}
        <div
            ref={rootRef}
            lang={lang}
            data-test-id={testId}
            aria-busy={live === undefined ? true : undefined}
            onKeyDown={onKeyDown}
            onFocus={(event) =>
                coordinator.chrome.showSelection(event.target.getAttribute('data-rte-surface') === null)
            }
            onBlur={() => coordinator.chrome.showSelection(false)}
        >
            {work !== undefined && <Phase work={work} open />}
            <PanelContext.Provider value={panelState}>
                {children}
                {toolbarMode === 'bubble' && <Bubble />}
                <ContextMenu
                    items={chrome.menu}
                    label={chrome.labels.contextMenu}
                    turnIntoLabel={chrome.labels.turnInto}
                    strings={chrome.strings}
                    disabled={disabled}
                />
            </PanelContext.Provider>
            <PortalHost store={portals} context={chromeContext} lang={lang} onFlush={onFlush} />
            <LazySuggestionList
                nameOf={(name) => {
                    if (typeof name === 'string') {
                        return chromeContext.t(name as `RichTextEditor_${string}`);
                    }

                    return translatedLabel(name, lang);
                }}
                strings={referenceStrings}
                testId={testId}
            />
            <PluginOverlays standing={standing} pluginOverlay={pluginOverlay} hosts={hosts} />
            {choosesFiles && (
                <FileChooser
                    testId={testId}
                    chooserRef={chooserRef}
                    choosingRef={choosingRef}
                    coordinator={coordinator}
                />
            )}
            <div
                ref={announcer.setRegion}
                aria-live="polite"
                style={VISUALLY_HIDDEN}
                data-test-id={`${testId}-announcer`}
            />
            {overlayRootElement}
            {work !== undefined && <Phase work={work} open={false} />}
        </div>
    </>
);
SessionFrame.displayName = 'SessionFrame';
