/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type ComponentType, type RefCallback } from 'react';

import {
    type CodecContext,
    type CommandRef,
    type Diagnostic,
    type Feature,
    type InputRule,
    type JsonObject,
    type JsonValue,
    type KeyBinding,
    type PayloadDeclaration,
    type PayloadOf,
} from '#/model';
import { type BlockDecorationSource, type SuggestionPage, type SuggestionRules } from '#/model/declarations';
import { type DocumentApi } from '#/runtime/document-api';
import { type AuthoringPolicy } from '#/runtime/types';

export {
    type AncestorValue,
    type CommandOutcome,
    type EditorRange,
    sameRange,
    type SelectionValue,
} from '#/runtime/document-api';

/** What the editor around a plugin hosts for it: strings and focus. */
export interface EditorHosts {
    /** The package's own chrome strings in the editor's locale; a plugin brings its own strings, by `locale`. */
    readonly t: CodecContext['t'];
    /** The language tag of the chrome's strings, such as `de-CH`. */
    readonly locale: () => string;
    /** Moves focus to the surface at its selection. */
    readonly focus: () => void;
    /**
     * The editable surface, to listen to its events; never to change it. `undefined` until the session starts.
     */
    readonly surface: () => HTMLElement | undefined;
    /** The editor's `data-test-id`, which a plugin's UI prefixes its own with. */
    readonly testId: () => string;
    /** Sends `diagnostic` to the host's diagnostic listener, as the editor's own diagnostics go. */
    readonly report: (diagnostic: Diagnostic) => void;
    /** The session's generation, which each document replacement advances, or `undefined` before the session starts. */
    readonly generation: () => number | undefined;
}

/**
 * What plugin commands and plugin UI act through, with no engine type: reads of the selection and content, writes that
 * each run as one undo step, and the editor's hosts. Inside a command, writes join the command's one
 * undo step and host actions wait until the command has run.
 */
export type EditorApi = DocumentApi & EditorHosts;

interface EditorCommandBase<P> {
    /** Changes the document only through `api`: a query without `enabled` runs it against a draft, where any other effect would happen. */
    run(api: EditorApi, payload: P): boolean;
    enabled?(api: EditorApi, payload: P): boolean;
    active?(api: EditorApi, payload: P): boolean | 'mixed';
    /** Whether `policy` refuses the call, as a heading level it does not offer: rejected as `not-allowed`, and not offered in the toolbar. */
    refuses?(policy: AuthoringPolicy, payload: P): boolean;
    /** Runs in a read-only editor too, as a command that only opens a panel does. */
    readonly readOnly?: boolean;
}

/**
 * A plugin command: `run` returns whether it applied; `enabled` and `active` answer a query. A command whose `run`
 * takes a payload declares it in `payload`, which `defineEditorPlugin` checks against `run`'s payload type.
 */
export type EditorCommand<P = undefined> = EditorCommandBase<P> &
    ([P] extends [undefined] ? { readonly payload?: PayloadDeclaration } : { readonly payload: PayloadDeclaration });

/**
 * A key's own handler, which runs as the input it replaces: its change reports no command and groups with typing in
 * one undo step; `false` hands the key on.
 */
export type KeyHandler = (api: EditorApi) => boolean;

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
export interface SuggestionSearchContext {
    readonly api: EditorApi;
    readonly signal: AbortSignal;
    readonly cursor: string | null;
}

/**
 * An editor part's suggestion list: typing `trigger`, one or two characters, at a word start under `rules` opens the
 * options `search` finds; the accepted option replaces the trigger and the query by running `command` with its payload.
 * Its accessible name is `labelKey` or `label`, as a toolbar entry's is.
 */
export type EditorSuggestion = {
    readonly trigger: string;
    readonly rules: SuggestionRules;
    /** Whether the list can open now, such as while the host gives a reference search. */
    available?(api: EditorApi): boolean;
    /** A page of options. */
    search(query: string, context: SuggestionSearchContext): Promise<SuggestionPage>;
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
 * its feature: a command, key or toolbar entry with the same ID replaces the shipped one whole, with no
 * field merged, and the others are added.
 */
export interface EditorPluginParts {
    readonly commands?: Readonly<Record<string, EditorCommand<never>>>;
    readonly keys?: Readonly<Record<KeyBinding, CommandRef | KeyHandler>>;
    readonly inputRules?: readonly InputRule[];
    readonly toolbar?: readonly PluginToolbarEntry[];
    /** Decorations over textblocks, which the editor derives again only for a block a change touched. */
    readonly decorations?: readonly BlockDecorationSource[];
    /** Lists that typing a trigger opens, whose options the part's own search finds. */
    readonly suggestions?: readonly EditorSuggestion[];
}

declare const pluginBrand: unique symbol;

/** An editor part for one feature, which `defineEditor` installs when the model installs that feature. */
export interface EditorPlugin<Id extends string = string, Commands extends object = object> extends EditorPluginParts {
    readonly feature: Id;
    /** The payload type of each of its commands, as types only. */
    readonly [pluginBrand]?: Commands;
}

/** The payload types of a plugin's commands by command ID; a command whose `run` takes none takes `undefined`. */
type PayloadsOf<C> = {
    readonly [K in keyof C]: C[K] extends { run(api: EditorApi, payload: infer P): boolean }
        ? unknown extends P
            ? undefined
            : P
        : never;
};

/** A command whose `run` takes a payload that its `payload` declaration does not give is refused, as it would reject every `execute`. */
type PayloadMatched<C> = {
    readonly [K in keyof C]: C[K] extends {
        readonly payload?: infer D;
        run(api: EditorApi, payload: infer P): boolean;
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
export type CommandsOfPlugin<P> = P extends EditorPlugin<string, infer C> ? C : never;

type CheckedParts<Parts extends EditorPluginParts> = Parts & {
    readonly commands?: PayloadMatched<NoInfer<NonNullable<Parts['commands']>>>;
};

const optionParts = new WeakMap<object, (options: JsonObject) => EditorPluginParts>();

/**
 * The editor part of `feature`, a factory or a feature it made, which may load apart from the feature itself. `parts`
 * may be a function of the feature's resolved options, which each editor definition calls once.
 */
export const defineEditorPlugin = <Id extends string, const Parts extends EditorPluginParts>(
    feature: Feature<object, object, object, Id> | ((options?: never) => Feature<object, object, object, Id>),
    parts: CheckedParts<Parts> | ((options: JsonObject) => CheckedParts<Parts>),
): EditorPlugin<Id, PayloadsOf<NonNullable<Parts['commands']>>> => {
    const { id } = typeof feature === 'function' ? feature() : feature;
    if (typeof parts === 'function') {
        const plugin = Object.freeze({ feature: id });
        optionParts.set(plugin, parts);
        return plugin as EditorPlugin<Id, PayloadsOf<NonNullable<Parts['commands']>>>;
    }
    const plugin: EditorPluginParts & { readonly feature: string } = { feature: id, ...parts };
    return Object.freeze(plugin) as EditorPlugin<Id, PayloadsOf<NonNullable<Parts['commands']>>>;
};

/** `plugin` with the parts its function gives for its feature's resolved `options`, else `plugin` itself. */
export const pluginWithOptions = (plugin: EditorPlugin, options: JsonObject): EditorPlugin => {
    const partsOf = optionParts.get(plugin);
    if (partsOf === undefined) {
        return plugin;
    }
    return Object.freeze({ ...partsOf(options), feature: plugin.feature });
};
