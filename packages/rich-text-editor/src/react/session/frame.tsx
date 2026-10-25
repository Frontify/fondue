/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type KeyboardEventHandler, type MutableRefObject, type ReactNode } from 'react';

import { AnnouncerContext, type Announcer } from '#/bridge/announcer';
import { Phase, ReactWorkContext, type ReactWork } from '#/bridge/devChecks';
import { type MountCoordinator } from '#/bridge/mount';
import { OverlayBody, OverlayContext, type Overlays } from '#/bridge/overlays';
import { EditorHostsContext, type EditorHosts } from '#/bridge/plugin';
import { PortalHost } from '#/bridge/PortalHost';
import { type PortalStore } from '#/bridge/portals';
import { SessionContext } from '#/bridge/session';
import { type readerContext } from '#/reader/context';
import { type EditorPort, mediaOf } from '#/runtime/port';
import { VISUALLY_HIDDEN } from '#/styles/visuallyHidden';
import { ContextMenu } from '#/ui/contextMenu/ContextMenu';
import { PanelContext, type PanelController } from '#/ui/panels/context';
import { type referenceListStrings, SuggestionList } from '#/ui/suggestions/SuggestionList';

import { type PluginOverlay } from '../plugin-hosts';
import { translatedLabel } from '../toolbar-items';
import { type ToolbarMode } from '../types';

import { Bubble } from './parts';
import { RootContext } from './root-context';
import { type Chrome, type RootContextValue } from './types';
import { type Choosing } from './use-runtime';

type ChromeContext = ReturnType<typeof readerContext>;

interface ProviderValues {
    readonly root: RootContextValue;
    readonly hosts: EditorHosts;
    readonly live: EditorPort | undefined;
    readonly work: ReactWork | undefined;
    readonly announcer: Announcer;
    readonly overlays: Overlays;
}

/** What the parts, the plugins and the overlays of one session read from context. */
export const SessionProviders = ({ values, children }: { values: ProviderValues; children: ReactNode }) => (
    <RootContext.Provider value={values.root}>
        <EditorHostsContext.Provider value={values.hosts}>
            <SessionContext.Provider value={values.live}>
                <ReactWorkContext.Provider value={values.work}>
                    <AnnouncerContext.Provider value={values.announcer}>
                        <OverlayContext.Provider value={values.overlays}>{children}</OverlayContext.Provider>
                    </AnnouncerContext.Provider>
                </ReactWorkContext.Provider>
            </SessionContext.Provider>
        </EditorHostsContext.Provider>
    </RootContext.Provider>
);

/** The file chooser exists where `media.image` takes files that `services.uploads` sends. */
const FileChooser = ({
    testId,
    chooserRef,
    choosingRef,
    coordinator,
}: {
    testId: string;
    chooserRef: MutableRefObject<HTMLInputElement | null>;
    choosingRef: MutableRefObject<Choosing | undefined>;
    coordinator: MountCoordinator;
}) => (
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

interface Standing {
    readonly key: string;
    readonly component: ComponentType<{ toolbarRef: (element: HTMLElement | null) => void; covered: boolean }>;
    readonly toolbarRef: (element: HTMLElement | null) => void;
}

/** The plugins' standing overlays, and the plugin overlay a command opened. */
const PluginOverlays = ({
    standing,
    pluginOverlay,
    hosts,
}: {
    standing: readonly Standing[];
    pluginOverlay: PluginOverlay | undefined;
    hosts: EditorHosts;
}) => (
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

export type FrameProps = {
    readonly rootRef: MutableRefObject<HTMLDivElement | null>;
    readonly lang: string;
    readonly testId: string;
    readonly live: EditorPort | undefined;
    readonly coordinator: MountCoordinator;
    readonly onKeyDown: KeyboardEventHandler<HTMLDivElement>;
    readonly work: ReactWork | undefined;
    readonly announcer: Announcer;
    readonly panelState: PanelController;
    readonly toolbarMode: ToolbarMode;
    readonly chrome: Chrome;
    readonly disabled: boolean;
    readonly portals: PortalStore;
    readonly chromeContext: ChromeContext;
    readonly onFlush: () => void;
    readonly referenceStrings: ReturnType<typeof referenceListStrings>;
    readonly standing: readonly Standing[];
    readonly pluginOverlay: PluginOverlay | undefined;
    readonly hosts: EditorHosts;
    readonly choosesFiles: boolean;
    readonly chooserRef: MutableRefObject<HTMLInputElement | null>;
    readonly choosingRef: MutableRefObject<Choosing | undefined>;
    readonly overlayRootElement: ReactNode;
    readonly children: ReactNode;
};

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
                    strings={chrome.strings}
                    disabled={disabled}
                />
            </PanelContext.Provider>
            <PortalHost store={portals} context={chromeContext} lang={lang} onFlush={onFlush} />
            <SuggestionList
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
