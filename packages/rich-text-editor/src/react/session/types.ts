/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type MutableRefObject, type ReactNode } from 'react';

import { type MountCoordinator } from '#/bridge/mount';
import { type CapabilityRef, type DecodeResult } from '#/model';
import { type TreeNode } from '#/model/content';
import { type LoadedDocument, type SaveRequest } from '#/persistence/types';
import { type readerContext } from '#/reader/context';
import { type ReaderPresentation } from '#/reader/reader';
import { type RuntimeHandle } from '#/runtime/port';
import { type ToolbarItem, type ToolbarStrings } from '#/ui/toolbar/toolbar';

import { type CompiledEditorDefinition, type RichTextEditorProps, type ToolbarMode } from '../types';

export type Props = RichTextEditorProps<object>;
/** The props once `definition` is known to be set. */
export type Defined = Props & { readonly definition: CompiledEditorDefinition<object> };
export const DEFAULT_TEST_ID = 'fondue-rich-text-editor';
export const NO_PRESENTATION: ReaderPresentation = { styles: [], colorTokens: [] };
export const SERVICE_MEMBERS = ['persistence', 'recovery', 'references', 'uploads', 'assets'] as const;
export const DEFAULT_TOOLBAR_SHORTCUT = 'Alt-F10';

/** What one mount keeps for its whole life: a changed `definition` or `profile` needs a new mount. */
export interface Mounted {
    readonly definition: CompiledEditorDefinition<object>;
    readonly profile: Props['profile'];
    /** `undefined` for a blocked document, which gets no session. */
    readonly decoded: { readonly tree: TreeNode; readonly capabilities: readonly CapabilityRef[] } | undefined;
    readonly blocked: Extract<DecodeResult, { readonly status: 'blocked' }> | undefined;
    /** The document's own language and direction, which win over the theme's. */
    readonly lang: string | undefined;
    readonly dir: 'ltr' | 'rtl' | undefined;
    /** Mounted with `services.persistence`, which keeps the session managed for its whole life. */
    readonly managed: boolean;
}

/** What the parts share for the toolbars and focus moves between the surface and the chrome. */
export interface Chrome {
    readonly items: readonly ToolbarItem[];
    /** The rows that only the More menus hold. */
    readonly menu: readonly ToolbarItem[];
    readonly strings: ToolbarStrings;
    /** The bubble toolbar's and the context menu's names, and the More rows that switch the toolbar mode. */
    readonly labels: {
        readonly bubble: string;
        readonly toBubble: string;
        readonly toFixed: string;
        readonly contextMenu: string;
    };
    /** The surface element `id`, generated when a toolbar's `aria-controls` needs one and the host set none. */
    readonly surfaceId: string | undefined;
    readonly toolbarRef: MutableRefObject<HTMLDivElement | null>;
    readonly bubbleRef: MutableRefObject<HTMLDivElement | null>;
    /** Opens the bubble toolbar of bubble mode at the selection and focuses it. */
    readonly showBubbleRef: MutableRefObject<(() => void) | null>;
    readonly mode: ToolbarMode;
    /** Switches the toolbar and reports the new mode to the host. */
    readonly setMode: (mode: ToolbarMode) => void;
    /** The height the on-screen keyboard of a touch device covers, which a focused editor docks its toolbar above. */
    readonly keyboard: number;
    /** The language of the chrome's strings, which the root, node chrome and plugin labels take (WCAG 2.2 SC 3.1.2). */
    readonly lang: string;
    /** The chrome's strings in the shown locale. */
    readonly t: ReturnType<typeof readerContext>['t'];
}

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

export interface RootContextValue {
    readonly props: PartProps;
    /** Stable, and call the host's latest callback. */
    readonly onFocus: NonNullable<Props['onFocus']>;
    readonly onBlur: NonNullable<Props['onBlur']>;
    readonly submits: boolean;
    readonly mounted: Mounted;
    readonly coordinator: MountCoordinator;
    readonly chrome: Chrome;
}

/** A running session and the write its coordinator left with an unknown outcome, which Retry hands on. */
export interface RecoverySession {
    readonly handle: RuntimeHandle;
    readonly unresolved: () => SaveRequest | undefined;
}

export type SessionProps = Defined & {
    readonly children: ReactNode;
    /** The snapshot Retry mounts this session from, in place of `defaultValue`. */
    readonly retried: LoadedDocument | undefined;
    /** Receives the handle of each session it runs, whose snapshot the recovery shell reads. */
    readonly onSession: (session: RecoverySession) => void;
    /** The document holds changes the failed session before Retry never saved. */
    readonly unsavedOnMount: boolean;
    /** The write the failed session left unresolved, which this one replays first. */
    readonly carried: SaveRequest | undefined;
    /** Mounts the editor again from this session's snapshot. */
    readonly onRetry: () => void;
};

/** The session's props that stay when its own parts are taken out: the host's, and what Retry hands on. */
export type SessionRest = Defined & Pick<SessionProps, 'unsavedOnMount' | 'carried'>;
