/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, type ReactNode } from 'react';

import { type MountCoordinator } from '#/bridge/mount';
import { type TurnIntoEntry } from '#/bridge/turnInto';
import { type CapabilityRef, type DecodeResult } from '#/model';
import { type TreeNode } from '#/model/internal';
import { type LoadedDocument, type SaveRequest } from '#/persistence/types';
import { type readerContext } from '#/reader/helpers/context';
import { type ReaderPresentation } from '#/reader/ReaderWith/ReaderWith';
import { type RuntimeHandle } from '#/runtime/port';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/toolbar/Toolbar';

import { type CompiledEditorDefinition, type Defined, type Props, type ToolbarMode } from '../types';

export type { Defined, Props };
export const DEFAULT_TEST_ID = 'fondue-rich-text-editor';
export const NO_PRESENTATION: ReaderPresentation = { styles: [], colorTokens: [] };
export const SERVICE_MEMBERS = ['persistence', 'recovery', 'references', 'uploads', 'assets'] as const;
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
