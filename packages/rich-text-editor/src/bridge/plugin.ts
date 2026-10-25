/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, createContext, type RefCallback, useContext } from 'react';

import {
    type CodecContext,
    type ColorToken,
    type CommandRef,
    type Diagnostic,
    type Feature,
    type InputRule,
    type JsonObject,
    type JsonValue,
    type KeyBinding,
    type PayloadDeclaration,
    type PayloadOf,
    type PresentationStyle,
} from '#/model';
import { type BlockDecorationSource, type SuggestionPage, type SuggestionRules } from '#/model/internal';
import { type ContentChecksApi } from '#/runtime/capabilities/checks/api';
import { type EditorRange } from '#/runtime/document-api';
import { type AuthoringPolicy, type ReferenceValue } from '#/runtime/types';

import { type EditorApi, type EditorFacet } from './api-facets';
import { type NodeViewDeclaration, type PanelDeclaration } from './define';
import { editorApiOf } from './live-api';
import { SessionContext, useSessionValue } from './session';

export { type CheckedIssue, type ContentChecksApi, type ContentChecksResult } from '#/runtime/capabilities/checks/api';
export {
    type AncestorValue,
    type BlockValue,
    type CommandOutcome,
    type EditorRange,
    type InsertPlace,
    type MarkRunValue,
    type NodeValue,
    sameRange,
    type SelectionValue,
    type WriteOutcome,
    type WriteTarget,
} from '#/runtime/document-api';
export { passesToBrowser } from '#/runtime/browser-keys';
export { type ReferenceValue, type SelectionHandle, type UploadStatus } from '#/runtime/types';
export { type Announcer, createAnnouncer } from './announcer';
export { type EditorApi, type EditorControlApi, type EditorFacet, type EditorFacets } from './api-facets';
export { useClientLayoutEffect } from './client-layout-effect';
export { OverlayBody, passEscape, useEditorOverlay, useOverlayContainer, useScopedFocus } from './overlays';
export { useApplePlatform } from './platform';

/** A rectangle an overlay anchors to, as Fondue's `virtualAnchor` takes it. */
export interface OverlayAnchor {
    getBoundingClientRect(): DOMRect;
}

/** What an overlay anchors to: the selection, a range, an element, or the range a function reads each frame. */
export type AnchorTarget = 'selection' | EditorRange | Element | (() => EditorRange | undefined);

/** What an overlay that a command opened renders with. */
export interface OverlayProps {
    readonly close: () => void;
    readonly anchor: OverlayAnchor;
    /** The element that had focus when it opened, such as the toolbar button, which a dismissal returns focus to. */
    readonly opener: Element | null;
}

/** What an overlay that a plugin keeps mounted renders with, such as a bubble that shows itself near the caret. */
export interface StandingOverlayProps {
    /** Takes its toolbar while it shows, which Alt+F10 reaches before any other. */
    readonly toolbarRef: RefCallback<HTMLElement>;
    /** Whether an overlay that a command opened shows, which it gives way to. */
    readonly covered: boolean;
}

/** One page of the host's reference search, of the values the session keeps, and the cursor of the next page. */
export interface ReferenceSearch {
    search(
        query: string,
        resourceTypes: readonly string[],
        signal: AbortSignal,
        cursor: string | null,
    ): Promise<{ readonly items: readonly ReferenceValue[]; readonly nextCursor: string | null }>;
}

/** The presentation as plugins read it. */
export interface PluginPresentation {
    readonly styles: readonly PresentationStyle[];
    readonly colorTokens: readonly ColorToken[];
    /** How many columns the content flows in, 1 without columns. */
    readonly columns: number;
    /** The gap between the columns as a CSS length, `undefined` without columns. */
    readonly columnGap: string | undefined;
}

/** Host data that only some plugins use, kept in one member so none of it can shadow a document member. */
export interface PluginServices {
    readonly presentation: () => PluginPresentation;
    /** The host's reference search, or `undefined` without one. */
    readonly references: () => ReferenceSearch | undefined;
    /** The session's content checks, or `undefined` when the model does not install `a11y.content-checks`. */
    readonly checks: () => ContentChecksApi | undefined;
}

/** What the editor around a plugin hosts for it: strings, services, overlays, panels, the live region and focus. */
export interface EditorHosts {
    /** The package's own chrome strings in the editor's locale; a plugin brings its own strings, by `locale`. */
    readonly t: CodecContext['t'];
    /** The language tag of the chrome's strings, such as `de-CH`. */
    readonly locale: () => string;
    readonly services: PluginServices;
    readonly overlays: {
        /**
         * Opens `component` with `props`, anchored to `anchor`, in place of any overlay a command opened before. To open
         * one from a click on a mark, keep a standing overlay (`overlays` of the editor part) or have the part listen to
         * `api.surface()`, then, in the click handler, read `run = api.marks.run(mark, { at: event.target })` and call
         * `overlays.open(Component, props, run.range)`.
         */
        open<P extends object>(component: ComponentType<P & OverlayProps>, props: P, anchor?: AnchorTarget): void;
        close(): void;
        isOpen(): boolean;
    };
    readonly panels: {
        open(id: string): void;
        /** Closes `id` when it is the open panel, else opens it. */
        toggle(id: string): void;
        close(): void;
        isOpen(id: string): boolean;
    };
    /** Says `message` in the editor's live region, which stays audible under a modal dialog, or with `key` once no other message with that key followed it. A value between U+2068 and U+2069 is written in a `bdi`. */
    readonly announce: (message: string, key?: string) => void;
    /** Moves focus to the surface at its selection. */
    readonly focus: () => void;
    /** A virtual anchor for an overlay the plugin renders itself. */
    readonly anchor: (target: AnchorTarget) => OverlayAnchor;
    /**
     * The editable surface, to listen to its events; never to change it. `undefined` until the session starts, so a
     * standing overlay reads it in an effect that reruns when the API appears, and a command reads it when it runs.
     */
    readonly surface: () => HTMLElement | undefined;
    /** The editor's `data-test-id`, which a plugin's UI prefixes its own with. */
    readonly testId: () => string;
    /** Sends `diagnostic` to the host's diagnostic listener, as the editor's own diagnostics go. */
    readonly report: (diagnostic: Diagnostic) => void;
    /** The session's generation, which each document replacement advances, or `undefined` before the session starts. */
    readonly generation: () => number | undefined;
}

interface EditorCommandBase<P, N extends EditorFacet> {
    /** Changes the document only through `api`: a query without `enabled` runs it against a draft, where any other effect would happen. */
    readonly run: (api: EditorApi<N>, payload: P) => boolean;
    readonly enabled?: (api: EditorApi<N>, payload: P) => boolean;
    readonly active?: (api: EditorApi<N>, payload: P) => boolean | 'mixed';
    /** Whether `policy` refuses the call, as a heading level it does not offer: rejected as `not-allowed`, and not offered in the toolbar. */
    refuses?(policy: AuthoringPolicy, payload: P): boolean;
    /** Runs in a read-only editor too, as a command that only opens a panel does. */
    readonly readOnly?: boolean;
}

/**
 * A plugin command: `run` returns whether it applied; `enabled` and `active` answer a query. A command whose `run`
 * takes a payload declares it in `payload`, which `defineEditorPart` checks against `run`'s payload type.
 */
export type EditorCommand<P = undefined, N extends EditorFacet = EditorFacet> = EditorCommandBase<P, N> &
    ([P] extends [undefined] ? { readonly payload?: PayloadDeclaration } : { readonly payload: PayloadDeclaration });

/**
 * A key's own handler, which runs as the input it replaces: its change reports no command and groups with typing in
 * one undo step; `false` hands the key on.
 */
export type KeyHandler<N extends EditorFacet = EditorFacet> = (api: EditorApi<N>) => boolean;

/** What a plugin-owned toolbar control renders with, in place of the standard button. */
export interface ToolbarControlProps {
    readonly label: string;
    readonly icon: string;
    readonly disabled: boolean;
    /** The control takes no Tab stop, as in the bubble toolbar. */
    readonly outOfTabOrder: boolean;
    /** Takes the control's focusable element, which the toolbar fits before More and moves focus to. */
    readonly controlRef: RefCallback<HTMLElement>;
    /**
     * Runs the entry's command as the standard button does: it focuses the control first when the command opens an
     * overlay, and returns focus to the surface after unless the command moved it elsewhere.
     */
    readonly run: () => Promise<void>;
    /** The command's key binding as the tooltip shows it, such as `⇧⌘L`, or `undefined` without one. */
    readonly shortcut: string | undefined;
    /** The command's key binding as `aria-keyshortcuts` names it, or `undefined` without one. */
    readonly keyshortcuts: string | undefined;
}

interface PluginToolbarEntryBase {
    /** Unique within its part; a host part's entry of the same `id` replaces the shipped one. */
    readonly id: string;
    /** `toggle` shows pressed while its command is active; `button` only runs it. */
    readonly kind: 'toggle' | 'button';
    /** The ID of the command the entry runs, which the model or a plugin installs. */
    readonly command: string;
    /** What the command runs with, which its `payload` declaration accepts; `undefined` runs it with none. */
    readonly payload?: JsonValue;
    /** The name of a Fondue icon, a key of `icons` from `@frontify/fondue-icons`, such as `IconLink`. */
    readonly icon: string;
    /** Shows in the bubble toolbar near a text selection too, as a mark toggle does. */
    readonly bubble?: boolean;
    /** Its command opens an overlay, which returns focus to the item that opened it. */
    readonly opensOverlay?: boolean;
    /** The panel whose toggle this is, which shows pressed while that panel is open. */
    readonly panel?: string;
    /** Renders in place of the standard button; a row of the More menu still runs the command. */
    readonly control?: ComponentType<ToolbarControlProps>;
    /**
     * The node type whose command this is, such as `asset_image`: the entry gets no toolbar item and shows in the More
     * menu, the bubble toolbar's More menu and the context menu only while such a node is selected or holds the caret.
     */
    readonly node?: string;
}

/** What a search reads besides its query: the session's API, a signal that aborts when a newer query or a closed list replaces it, and the page's cursor, `null` for the first. */
export interface SuggestionSearchContext<N extends EditorFacet = EditorFacet> {
    readonly api: EditorApi<N>;
    readonly signal: AbortSignal;
    readonly cursor: string | null;
}

/**
 * An editor part's suggestion list: typing `trigger`, one or two characters, at a word start under `rules` opens the
 * options `search` finds; the accepted option replaces the trigger and the query by running `command` with its payload.
 * Its accessible name is `labelKey` or `label`, as a toolbar entry's is.
 */
export type EditorSuggestion<N extends EditorFacet = EditorFacet> = {
    readonly trigger: string;
    readonly rules: SuggestionRules;
    /** Whether the list can open now, such as while the host gives a reference search. */
    readonly available?: (api: EditorApi<N>) => boolean;
    /** A page of options. */
    readonly search: (query: string, context: SuggestionSearchContext<N>) => Promise<SuggestionPage>;
    readonly command: string;
} & (
    | { readonly labelKey: string; readonly label?: never }
    | { readonly label: Readonly<Record<string, string>> & { readonly 'en-US': string }; readonly labelKey?: never }
);

/** A toolbar entry of a plugin, which a presentation's toolbar shows by its command; it has an accessible name. */
export type PluginToolbarEntry = PluginToolbarEntryBase &
    (
        | {
              /** A package string, which a plugin outside this package cannot add to. */
              readonly labelKey: string;
              readonly label?: never;
          }
        | {
              /** Its own translations by language tag, which must include `en-US`. */
              readonly label: Readonly<Record<string, string>> & { readonly 'en-US': string };
              readonly labelKey?: never;
          }
    );

/**
 * The editor part of a plugin: everything a feature does while it is edited. A host part extends the shipped part of
 * its feature: a command, key, node view or toolbar entry with the same ID replaces the shipped one whole, with no
 * field merged, and the others are added.
 */
export interface EditorPartSpec<N extends EditorFacet = EditorFacet> {
    /** The API facets its functions read; the API they get holds these and the control members only. */
    readonly needs?: readonly N[];
    readonly commands?: Readonly<Record<string, EditorCommand<never, N>>>;
    readonly keys?: Readonly<Partial<Record<KeyBinding, CommandRef | KeyHandler<N>>>>;
    readonly inputRules?: readonly InputRule[];
    readonly toolbar?: readonly PluginToolbarEntry[];
    /** Overlays the editor keeps mounted, which decide themselves when to show; `EditorHosts.overlays.open` has the recipe for one a click on a mark opens. */
    readonly overlays?: readonly ComponentType<StandingOverlayProps>[];
    readonly panels?: readonly PanelDeclaration[];
    /** Decorations over textblocks, which the editor derives again only for a block a change touched. */
    readonly decorations?: readonly BlockDecorationSource[];
    /** Lists that typing a trigger opens, whose options the part's own search finds. */
    readonly suggestions?: readonly EditorSuggestion<N>[];
    /** Chrome around the editable content of a node, which renders again only when its node or selection changes. */
    readonly views?: readonly NodeViewDeclaration[];
    /**
     * Takes files pasted or dropped from outside at `at.range`, which the paste then leaves alone; `false` hands them to
     * the next part, then to the paste of their text.
     */
    readonly files?: (
        api: EditorApi<N>,
        files: readonly File[],
        at: { readonly origin: 'paste' | 'drop'; readonly range: EditorRange },
    ) => boolean;
}

declare const pluginBrand: unique symbol;

/** An editor part for one feature, which `defineEditor` installs when the model installs that feature. */
export interface EditorPart<Id extends string = string, Commands extends object = object> extends EditorPartSpec {
    readonly feature: Id;
    /** The payload type of each of its commands, as types only. */
    readonly [pluginBrand]?: Commands;
}

/** The payload types of a plugin's commands by command ID; a command whose `run` takes none takes `undefined`. */
type PayloadsOf<C> = {
    readonly [K in keyof C]: C[K] extends { readonly run: (api: never, payload: infer P) => boolean }
        ? unknown extends P
            ? undefined
            : P
        : never;
};

/** A command whose `run` takes a payload that its `payload` declaration does not give is refused, as it would reject every `execute`. */
type PayloadMatched<C> = {
    readonly [K in keyof C]: C[K] extends {
        readonly payload?: infer D;
        readonly run: (api: never, payload: infer P) => boolean;
    }
        ? unknown extends D
            ? [undefined] extends [P]
                ? C[K]
                : EditorCommand<undefined>
            : // A command typed as `EditorCommand<P>` holds the wide declaration, which `EditorCommand` checks.
              [PayloadDeclaration] extends [D]
              ? C[K]
              : [PayloadOf<D>] extends [P]
                ? C[K]
                : EditorCommand<PayloadOf<D>>
        : C[K];
};

/** The command payloads of a plugin, by command ID. */
export type CommandsOfPart<P> = P extends EditorPart<string, infer C> ? C : never;

type CheckedSpec<Parts extends EditorPartSpec<N>, N extends EditorFacet> = Parts & {
    readonly needs?: readonly N[];
    readonly commands?: PayloadMatched<NoInfer<NonNullable<Parts['commands']>>>;
};

export type SpecOfOptions = (options: JsonObject) => EditorPartSpec;

// An own enumerable symbol property, so a spread copy of the plugin keeps its option-dependent parts.
export const OPTION_PARTS = Symbol('specOfOptions');

/**
 * The editor part of `feature`, a factory or a feature it made, which may load apart from the feature itself. `parts`
 * may be a function of the feature's resolved options, which each editor definition calls once.
 */
export const defineEditorPart = <
    Id extends string,
    const N extends EditorFacet = never,
    const Parts extends EditorPartSpec<N> = EditorPartSpec<N>,
>(
    feature: Feature<object, object, object, Id> | ((options?: never) => Feature<object, object, object, Id>),
    parts: CheckedSpec<Parts, N> | ((options: JsonObject) => CheckedSpec<Parts, N>),
): EditorPart<Id, PayloadsOf<NonNullable<Parts['commands']>>> => {
    const { id } = typeof feature === 'function' ? feature() : feature;
    if (typeof parts === 'function') {
        const specOfOptions: SpecOfOptions = Object.freeze((options: JsonObject) => parts(options));
        const plugin: EditorPart = Object.freeze({ feature: id, [OPTION_PARTS]: specOfOptions });
        return plugin as EditorPart<Id, PayloadsOf<NonNullable<Parts['commands']>>>;
    }
    const plugin: EditorPartSpec & { readonly feature: string } = { feature: id, ...parts };
    return Object.freeze(plugin) as EditorPart<Id, PayloadsOf<NonNullable<Parts['commands']>>>;
};

/** `plugin` with the parts its function gives for its feature's resolved `options`, else `plugin` itself. */
export const partWithOptions = (plugin: EditorPart, options: JsonObject): EditorPart => {
    const partsOf = (plugin as EditorPart & { readonly [OPTION_PARTS]?: SpecOfOptions })[OPTION_PARTS];
    if (partsOf === undefined) {
        return plugin;
    }
    return Object.freeze({ ...partsOf(options), feature: plugin.feature });
};

export const EditorHostsContext = createContext<EditorHosts | null>(null);
EditorHostsContext.displayName = 'RichTextEditorHostsContext';

/**
 * The API of the editor around the caller, or `undefined` until its session is ready. Plugin UI acts through it;
 * `useEditorHandle` is the host's own handle, which a plugin does not use.
 */
export const useEditorApi = (): EditorApi | undefined => {
    const runtime = useContext(SessionContext);
    const hosts = useContext(EditorHostsContext);
    if (runtime === undefined || hosts === null) {
        return undefined;
    }
    return editorApiOf(runtime, hosts);
};

/** A value read through the editor API, which rerenders the caller only when `isEqual` finds it changed. */
export const useEditorValue = <T>(
    read: (api: EditorApi | undefined) => T,
    isEqual: (previous: T, next: T) => boolean = Object.is,
): T => {
    const hosts = useContext(EditorHostsContext);
    return useSessionValue((runtime) => {
        if (runtime === undefined || hosts === null) {
            return read(undefined);
        }
        return read(editorApiOf(runtime, hosts));
    }, isEqual);
};
