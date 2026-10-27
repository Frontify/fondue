/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type KeyboardEventHandler, type MutableRefObject, type ReactNode } from 'react';

import { type TurnIntoEntry } from '#/bridge/chrome/helpers/turnInto';
import { type PortalStore } from '#/bridge/nodeViews/helpers/portals';
import { type EditorHosts } from '#/bridge/pluginApi/plugin';
import { type Announcer } from '#/bridge/session/helpers/announcer';
import { type ReactWork } from '#/bridge/session/helpers/devChecks';
import { type MountCoordinator } from '#/bridge/session/helpers/mount';
import {
    type CapabilityRef,
    type ContentModel,
    type DecodeResult,
    type ResourceLimits,
    type RichTextLocale,
} from '#/model';
import { type TreeNode } from '#/model/internal';
import { type LoadedDocument, type SaveRequest } from '#/persistence/types';
import { type readerContext } from '#/reader/helpers/context';
import { type ReaderOverrides } from '#/reader/helpers/plan';
import { type ReaderPresentation } from '#/reader/ReaderWith/ReaderWith';
import { type EditorPort, type RuntimeHandle } from '#/runtime/port';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/helpers/items';
import { type PanelController } from '#/ui/helpers/panelContext';
import { type referenceListStrings } from '#/ui/LazySuggestionList/helpers/referenceStrings';

import { type CompiledEditorDefinition, type Defined, type Props, type ToolbarMode } from '../types';

import { type PluginOverlay } from './hooks/usePluginHosts';
import { type Choosing } from './hooks/useSessionRuntime';

export type { Defined, Props };
/** The `data-test-id` of the root when the host sets none. */
export const DEFAULT_TEST_ID = 'fondue-rich-text-editor';
export const NO_PRESENTATION: ReaderPresentation = { styles: [], colorTokens: [] };
/** The `services` members whose change aborts what they started. */
export const SERVICE_MEMBERS = ['persistence', 'recovery', 'references', 'uploads', 'assets'] as const;
/** The key binding that moves focus to the toolbars unless the presentation sets another. */
export const DEFAULT_TOOLBAR_SHORTCUT = 'Alt-F10';

/** What one mount keeps for its whole life: a changed `definition` or `profile` needs a new mount. */
export type Mounted = {
    definition: CompiledEditorDefinition<object>;
    profile: Props['profile'];
    /** `undefined` for a blocked document, which gets no session. */
    decoded: { tree: TreeNode; capabilities: readonly CapabilityRef[] } | undefined;
    blocked: Extract<DecodeResult, { status: 'blocked' }> | undefined;
    /** The document's own language and direction, which win over the theme's. */
    lang: string | undefined;
    dir: 'ltr' | 'rtl' | undefined;
    /** Mounted with `services.persistence`, which keeps the session managed for its whole life. */
    managed: boolean;
};

/** What the parts share for the toolbars and focus moves between the surface and the chrome. */
export type Chrome = {
    items: readonly ToolbarItem[];
    /** The rows that only the More menus hold. */
    menu: readonly ToolbarItem[];
    /** The block conversions the Turn into menus of node chrome and the context menu narrow to their block. */
    turnInto: readonly TurnIntoEntry[];
    strings: ToolbarStrings;
    /** The bubble toolbar's and the context menu's names, and the More rows that switch the toolbar mode. */
    labels: {
        bubble: string;
        toBubble: string;
        toFixed: string;
        contextMenu: string;
        turnInto: string;
    };
    /** The surface element `id`, generated when a toolbar's `aria-controls` needs one and the host set none. */
    surfaceId: string | undefined;
    toolbarRef: MutableRefObject<HTMLDivElement | null>;
    bubbleRef: MutableRefObject<HTMLDivElement | null>;
    /** Opens the bubble toolbar of bubble mode at the selection and focuses it. */
    showBubbleRef: MutableRefObject<(() => void) | null>;
    mode: ToolbarMode;
    /** Switches the toolbar and reports the new mode to the host. */
    setMode: (mode: ToolbarMode) => void;
    /** The height the on-screen keyboard of a touch device covers, which a focused editor docks its toolbar above. */
    keyboard: number;
    /** The language of the chrome's strings, which the root, node chrome and plugin labels take (WCAG 2.2 SC 3.1.2). */
    lang: string;
    /** The chrome's strings in the shown locale. */
    t: ReturnType<typeof readerContext>['t'];
};

/** The props the parts read, so a host rerender with equal props leaves the context alone. */
export const PART_KEYS = [
    'data-test-id',
    'spellCheck',
    'placeholder',
    'presentation',
    'aria-describedby',
    'aria-label',
    'aria-labelledby',
    'aria-errormessage',
    'status',
    'required',
    'disabled',
] as const;

export type PartProps = { readonly [K in (typeof PART_KEYS)[number]]?: Props[K] | undefined };

/** What every part of the editor reads from `RichTextEditor.Root`. */
export type RootContextValue = {
    props: PartProps;
    /** Stable, and call the host's latest callback. */
    onFocus: NonNullable<Props['onFocus']>;
    onBlur: NonNullable<Props['onBlur']>;
    submits: boolean;
    mounted: Mounted;
    coordinator: MountCoordinator;
    chrome: Chrome;
};

/** A running session and the write its coordinator left with an unknown outcome, which Retry hands on. */
export type RecoverySession = {
    handle: RuntimeHandle;
    unresolved: () => SaveRequest | undefined;
};

export type SessionProps = Defined & {
    children: ReactNode;
    /** The snapshot Retry mounts this session from, in place of `defaultValue`. */
    retried: LoadedDocument | undefined;
    /** Receives the handle of each session it runs, whose snapshot the recovery shell reads. */
    onSession: (session: RecoverySession) => void;
    /** The document holds changes the failed session before Retry never saved. */
    unsavedOnMount: boolean;
    /** The write the failed session left unresolved, which this one replays first. */
    carried: SaveRequest | undefined;
    /** Mounts the editor again from this session's snapshot. */
    onRetry: () => void;
};

/** The session's props that stay when its own parts are taken out: the host's, and what Retry hands on. */
export type SessionRest = Defined & Pick<SessionProps, 'unsavedOnMount' | 'carried'>;

export type ChromeContext = ReturnType<typeof readerContext>;

/** A plugin's standing overlay, with a stable key and the ref its toolbar reports through. */
export type Standing = {
    key: string;
    component: ComponentType<{ toolbarRef: (element: HTMLElement | null) => void; covered: boolean }>;
    toolbarRef: (element: HTMLElement | null) => void;
};

export type FrameProps = {
    rootRef: MutableRefObject<HTMLDivElement | null>;
    lang: string;
    testId: string;
    live: EditorPort | undefined;
    coordinator: MountCoordinator;
    onKeyDown: KeyboardEventHandler<HTMLDivElement>;
    work: ReactWork | undefined;
    announcer: Announcer;
    panelState: PanelController;
    toolbarMode: ToolbarMode;
    chrome: Chrome;
    disabled: boolean;
    portals: PortalStore;
    chromeContext: ChromeContext;
    onFlush: () => void;
    referenceStrings: ReturnType<typeof referenceListStrings>;
    standing: readonly Standing[];
    pluginOverlay: PluginOverlay | undefined;
    hosts: EditorHosts;
    choosesFiles: boolean;
    chooserRef: MutableRefObject<HTMLInputElement | null>;
    choosingRef: MutableRefObject<Choosing | undefined>;
    overlayRootElement: ReactNode;
    children: ReactNode;
};

/** What both shells read the document with, in place of the editor. */
export type ShellProps = {
    model: ContentModel;
    /** The definition's reader overrides, so the shells load no reader of a feature the definition does not install. */
    readers: ReaderOverrides;
    /** The definition's limits, which a host may have loosened. */
    limits: ResourceLimits;
    presentation: ReaderPresentation;
    locale: RichTextLocale;
    testId: string;
};
