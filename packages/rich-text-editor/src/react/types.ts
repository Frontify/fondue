/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEvent, type Ref } from 'react';

import { type CommandsOfPlugin, type EditorPlugin } from '#/bridge/plugin';
import {
    type CapabilityRef,
    type ColorToken,
    type ContentModel,
    type Diagnostic,
    type Feature,
    type ListLevels,
    type ModelRef,
    type PresentationStyle,
    type ResourceLimits,
    type RichTextDocument,
    type RichTextLocale,
} from '#/model';
import {
    type LoadedDocument,
    type PersistenceOptions,
    type PersistenceService,
    type RecoveryService,
    type ReplaceDocumentRequest,
    type ReplaceResult,
} from '#/persistence/types';
import { type ShippedPluginCommands } from '#/react/plugins';
import { type ReaderPresentation } from '#/reader/reader';
import {
    type AuthoringPolicy,
    type CaptureResult,
    type CaptureTargetOptions,
    type CommandArgs,
    type CommandKey,
    type CommandResult,
    type CommandState,
    type CommitOptions,
    type CommitResult,
    type DocumentChange,
    type EditorSummary,
    type OperationMetric,
    type SaveStatus,
    type SelectionHandle,
    type SelectionSummary,
    type SessionToken,
    type ShippedCommands,
    type Snapshot,
    type Unsubscribe,
} from '#/runtime/types';

export type { ColorToken, ListLevels, OperationMetric, PresentationStyle };

// Host-facing editor types. Some members are typed before their behavior is built.

/** What a host passes to define an editor: its id, content model, editor parts and limits. */
export interface EditorDefinitionOptions<Model extends ContentModel = ContentModel> {
    readonly id: string;
    readonly model: Model;
    /** Editor parts of the model's features; one extends the shipped part of its feature. */
    readonly plugins?: readonly EditorPlugin[];
    readonly policy?: Partial<AuthoringPolicy>;
    /** May only make limits stricter. */
    readonly limits?: Partial<ResourceLimits>;
    /** The only way to loosen a limit, set by a host per consumer. */
    readonly limitOverrides?: Partial<ResourceLimits>;
}
/** The id, content model and capabilities of a compiled editor definition. */
export interface EditorDefinitionInfo {
    readonly id: string;
    readonly model: ModelRef;
    readonly capabilities: readonly CapabilityRef[];
    readonly authoring: AuthoringPolicy;
    readonly limits: ResourceLimits;
}
declare const editorDefinitionBrand: unique symbol;
/** An editor definition that was checked and compiled, typed with the commands it supports. */
export interface CompiledEditorDefinition<Commands extends object = ShippedCommands> extends EditorDefinitionInfo {
    readonly [editorDefinitionBrand]: Commands;
}
type UnionToIntersection<U> = (U extends unknown ? (value: U) => void : never) extends (value: infer I) => void
    ? I
    : never;
/**
 * Distributes over the feature union, so one feature without commands keeps the others' commands; a shipped feature
 * adds the commands of its shipped editor part.
 */
export type CommandsOfModel<Model> =
    Model extends ContentModel<infer Features>
        ? UnionToIntersection<
              Features[number] extends infer F
                  ? F extends Feature<infer C, object, object, infer Id>
                      ? C & ShippedPluginCommands<Id>
                      : never
                  : never
          >
        : never;
/** The commands of the editor parts a host passes `defineEditor`. */
export type CommandsOfPlugins<Plugins extends readonly EditorPlugin[]> = UnionToIntersection<
    CommandsOfPlugin<Plugins[number]>
>;

/** The services a host gives the editor, such as persistence. */
export interface EditorServices {
    readonly persistence?: PersistenceService;
    readonly recovery?: RecoveryService;
}

/** The events the editor emits, each with the value its listeners get. */
export interface EditorEventMap {
    readonly ready: SessionToken;
    readonly documentChange: DocumentChange;
    readonly selectionChange: SelectionSummary;
    readonly saveStatusChange: SaveStatus;
    readonly diagnostic: Diagnostic;
    readonly operationMetric: OperationMetric;
    readonly replaced: SessionToken;
    readonly disposed: SessionToken;
}
/** The session of a mounted editor. */
export interface EditorHandle<C extends object = ShippedCommands> {
    getSummary(): EditorSummary;
    getSnapshot(): Snapshot;
    getSaveStatus(): SaveStatus;
    getRecoveryCandidate(): RichTextDocument | null;
    query<K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>): CommandState;
    /** Synchronous event-handler API. Do not call from React render or effects. */
    execute<K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>): CommandResult;
    /** Queues an intent, not a transaction. Without a target, uses the selection at execution. */
    enqueue<K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>): Promise<CommandResult>;
    captureTarget(options: CaptureTargetOptions): CaptureResult;
    releaseTarget(target: SelectionHandle): void;
    requestCommit(options: CommitOptions): Promise<CommitResult>;
    replaceDocument(request: ReplaceDocumentRequest): Promise<ReplaceResult>;
    setMode(mode: 'editable' | 'readonly'): void;
    /** Never changes the document schema. Throws `DefinitionError` for an unknown feature ID. */
    updatePolicy(policy: AuthoringPolicy): void;
    focus(where?: 'current' | 'start' | 'end'): void;
    subscribe<K extends keyof EditorEventMap>(event: K, listener: (value: EditorEventMap[K]) => void): Unsubscribe;
    /** Synchronous invalidation. Does not promise that remote saves were cancelled. */
    dispose(): void;
}

/** The reader presentation's resolvers and its other fields. */
export interface ReactPresentation extends ReaderPresentation {
    readonly styles: readonly PresentationStyle[];
    readonly colorTokens: readonly ColorToken[];
    readonly listLevels?: ListLevels;
    /** 1 to 6. */
    readonly columns?: number;
    /**
     * `normal`, or a length in `px` or `rem`. With `normal` and a font size on `contentClassName` that differs from the
     * surrounding font, the reader's column thresholds use the surrounding font; a `px` or `rem` gap avoids it.
     */
    readonly columnGap?: string;
    readonly contentClassName?: string;
}

/** The props the editor takes. */
export interface RichTextEditorBaseProps<C extends object = ShippedCommands> {
    readonly definition?: CompiledEditorDefinition<C>;
    readonly presentation?: ReactPresentation;
    readonly defaultValue: LoadedDocument;
    readonly 'aria-describedby'?: string;
    readonly 'aria-errormessage'?: string;
    /** `error` sets `aria-invalid`. */
    readonly status?: 'neutral' | 'success' | 'error' | 'loading';
    readonly required?: boolean;
    readonly disabled?: boolean;
    readonly readOnly?: boolean;
    readonly placeholder?: string;
    /** Default: the `ThemeProvider` locale when the package ships it, else `enUS`. */
    readonly locale?: RichTextLocale;
    readonly services?: EditorServices;
    readonly persistenceOptions?: PersistenceOptions;
    readonly spellCheck?: boolean;
    /** For the session id and the `nodeId`s the editor creates. Default: `crypto.randomUUID()`, or a version 4 UUID where that is missing. */
    readonly generateId?: () => string;
    /** The surface element `id`. */
    readonly id?: string;
    /** Default `fondue-rich-text-editor`, with suffixed IDs on the parts. */
    readonly 'data-test-id'?: string;
    readonly onReady?: (session: SessionToken) => void;
    readonly onDocumentChange?: (change: DocumentChange) => void;
    readonly onDiagnostic?: (diagnostic: Diagnostic) => void;
    /**
     * Native focus events of the surface, including moves into the editor's own overlays.
     * Pointer and focus events bubble out of the editor root. There is no further focus callback.
     */
    readonly onFocus?: (event: FocusEvent<HTMLElement>) => void;
    readonly onBlur?: (event: FocusEvent<HTMLElement>) => void;
    /** `null` until the session exists. */
    readonly ref?: Ref<EditorHandle<C>>;
}
/** Exactly one accessible name source is required. */
export type RichTextEditorProps<C extends object = ShippedCommands> = RichTextEditorBaseProps<C> &
    (
        | { readonly 'aria-label': string; readonly 'aria-labelledby'?: never }
        | { readonly 'aria-labelledby': string; readonly 'aria-label'?: never }
    );
