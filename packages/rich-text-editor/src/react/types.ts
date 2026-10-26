/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEvent, type Ref } from 'react';

import { type RichTextPlugin } from '#/bridge/definePlugin';
import { type CommandsOfPart } from '#/bridge/plugin';
import {
    type CapabilityRef,
    type ColorToken,
    type CommandRef,
    type ContentModel,
    type Diagnostic,
    type ListLevels,
    type ModelRef,
    type PresentationStyle,
    type ResourceLimits,
    type RichTextDocument,
    type RichTextLocale,
    type StyleRecipe,
} from '#/model';
import {
    type LoadedDocument,
    type PersistenceOptions,
    type PersistenceService,
    type RecoveryService,
    type ReplaceDocumentRequest,
    type ReplaceResult,
    type ServiceContext,
} from '#/persistence/types';
import { type ReaderPresentation } from '#/reader/ReaderWith/ReaderWith';
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
    type ReferenceValue,
    type SaveStatus,
    type SelectionHandle,
    type SelectionSummary,
    type SessionToken,
    type ShippedCommands,
    type Snapshot,
    type Unsubscribe,
} from '#/runtime/port';

export type { ColorToken, ListLevels, OperationMetric, PresentationStyle, StyleRecipe };

// Host-facing editor types. Some members are typed before their behavior is built.

/** What a host passes to define an editor: its id, content model, editor parts and limits. */
export type EditorDefinitionOptions<Model extends ContentModel = ContentModel> = {
    id: string;
    model: Model;
    /** One unit per feature of the model, of the same ID and version. */
    plugins: readonly RichTextPlugin[];
    policy?: Partial<AuthoringPolicy>;
    /** May only make limits stricter. */
    limits?: Partial<ResourceLimits>;
    /** The only way to loosen a limit, set by a host per consumer. */
    limitOverrides?: Partial<ResourceLimits>;
};
/** The id, content model and capabilities of a compiled editor definition. */
export type EditorDefinitionInfo = {
    readonly id: string;
    readonly model: ModelRef;
    readonly capabilities: readonly CapabilityRef[];
    readonly authoring: AuthoringPolicy;
    readonly limits: ResourceLimits;
};
declare const editorDefinitionBrand: unique symbol;
/** An editor definition that was checked and compiled, typed with the commands it supports. */
export type CompiledEditorDefinition<Commands extends object = ShippedCommands> = {
    readonly [editorDefinitionBrand]: Commands;
} & EditorDefinitionInfo;
type UnionToIntersection<U> = (U extends unknown ? (value: U) => void : never) extends (value: infer I) => void
    ? I
    : never;
/** The commands of the units a host passes `defineEditor`. */
export type CommandsOfPlugins<Plugins extends readonly RichTextPlugin[]> = UnionToIntersection<
    CommandsOfPart<Plugins[number]['editor']>
> &
    object;

/** A search a host answers when the user looks for something to mention or link. */
export type ReferenceSearchRequest = {
    query: string;
    /** Empty means any type. */
    resourceTypes: readonly string[];
    cursor: string | null;
};
/** One page of results for a reference search, with the cursor for the next page. */
export type ReferencePage = {
    items: readonly ReferenceValue[];
    nextCursor: string | null;
};
/** The host service that searches for the things a document can mention. */
export type ReferenceService = {
    search(request: ReferenceSearchRequest, context: ServiceContext): Promise<ReferencePage>;
};
/** An asset a host uploaded or picked, as a document stores it. */
export type AssetValue = {
    assetId: string;
    mediaType: string;
    labelSnapshot: string;
};
/** What the editor sends to the upload service: the file and the operation it belongs to. */
export type UploadRequest = {
    operationId: string;
    blob: Blob;
    filename: string;
};
/** The host service that uploads a file and returns its asset. */
export type UploadService = {
    upload(
        request: UploadRequest,
        context: ServiceContext & { reportProgress: (fraction: number) => void },
    ): Promise<AssetValue>;
    /** Server-managed cleanup; never deletes an asset still referenced elsewhere. */
    releaseUnused(operationId: string, context: ServiceContext): Promise<void>;
};
/** A host asset library; `image.insert` opens it with its purpose when set, else the file chooser. */
export type AssetPickerService = {
    /** `purpose` is `image` for the shipped features; a later feature may pass its own purpose, so implementations handle any string. */
    pick(request: { purpose: string }, context: ServiceContext): Promise<AssetValue | null>;
};
/** The services a host gives the editor, such as persistence, recovery, references and uploads. */
export type EditorServices = {
    persistence?: PersistenceService;
    recovery?: RecoveryService;
    references?: ReferenceService;
    uploads?: UploadService;
    assets?: AssetPickerService;
};

/** The events the editor emits, each with the value its listeners get. */
export type EditorEventMap = {
    ready: SessionToken;
    documentChange: DocumentChange;
    selectionChange: SelectionSummary;
    saveStatusChange: SaveStatus;
    diagnostic: Diagnostic;
    operationMetric: OperationMetric;
    replaced: SessionToken;
    disposed: SessionToken;
};
/**
 * The session of a mounted editor. With `profile`, the ref holds `null` until the profile's module has loaded and the
 * session exists, and no host callback runs before then.
 */
export type EditorHandle<C extends object = ShippedCommands> = {
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
    /** Registers a host modal root with the interaction scope. */
    registerInteractionRoot(element: HTMLElement): Unsubscribe;
    subscribe<K extends keyof EditorEventMap>(event: K, listener: (value: EditorEventMap[K]) => void): Unsubscribe;
    /** Synchronous invalidation. Does not promise that remote saves were cancelled. */
    dispose(): void;
};

/** Where the toolbar shows: fixed above the content or as a bubble at the selection. */
export type ToolbarMode = 'fixed' | 'bubble';
/** The reader presentation's resolvers, its other fields, and the editor's toolbar and controls. */
export type ReactPresentation = {
    styles: readonly PresentationStyle[];
    colorTokens: readonly ColorToken[];
    listLevels?: ListLevels;
    /** 1 to 6. */
    columns?: number;
    /**
     * `normal`, or a length in `px` or `rem`. With `normal` and a font size on `contentClassName` that differs from the
     * surrounding font, the reader's column thresholds use the surrounding font; a `px` or `rem` gap avoids it.
     */
    columnGap?: string;
    contentClassName?: string;
    /** Groups of command IDs, `{ command, payload }` items and the `text-style` control ID, in order. */
    toolbar: readonly (readonly CommandRef[])[];
    controls?: Readonly<Record<string, { labelKey?: string; icon?: string }>>;
    sliceContext: string | null;
    /** Package key syntax; default `Alt-F10`. */
    toolbarShortcut?: string;
} & ReaderPresentation;

/** The name of a shipped profile: inline, comment, document or brand-document. */
export type RichTextProfile = 'inline' | 'comment' | 'document' | 'brand-document';
/** The props the editor takes in every profile. */
export type RichTextEditorBaseProps<C extends object = ShippedCommands> = {
    /**
     * Default `document`; ignored when `definition` is set. The profile's module loads on first use: until it has, the
     * editor renders nothing, `ref` holds `null` and no callback runs. A profile loaded once renders at once.
     */
    profile?: RichTextProfile;
    definition?: CompiledEditorDefinition<C>;
    presentation?: ReactPresentation;
    defaultValue: LoadedDocument;
    'aria-describedby'?: string;
    'aria-errormessage'?: string;
    /** `error` sets `aria-invalid`. */
    status?: 'neutral' | 'success' | 'error' | 'loading';
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    /** Default: the `ThemeProvider` locale when the package ships it, else `enUS`. */
    locale?: RichTextLocale;
    services?: EditorServices;
    persistenceOptions?: PersistenceOptions;
    portalContainer?: HTMLElement | null;
    spellCheck?: boolean;
    inputRules?: false | { exclude: readonly string[] };
    /** When true, Tab and Shift+Tab move focus and do not indent or change cells. Default false. */
    tabMovesFocus?: boolean;
    /** When false, the view does not scroll the selection into view. Default true. */
    scrollSelectionIntoView?: boolean;
    defaultToolbarMode?: ToolbarMode;
    /** For the session id and the `nodeId`s the editor creates. Default: `crypto.randomUUID()`, or a version 4 UUID where that is missing. */
    generateId?: () => string;
    /** The surface element `id`. */
    id?: string;
    /** Default `fondue-rich-text-editor`, with suffixed IDs on the parts. */
    'data-test-id'?: string;
    onReady?: (session: SessionToken) => void;
    onDocumentChange?: (change: DocumentChange) => void;
    onDiagnostic?: (diagnostic: Diagnostic) => void;
    /**
     * Runs only when `validate()` passes. Mod+Enter calls it in the Comment profile, and Enter wherever the policy sets
     * `enterBehavior: 'submit'`, in the Inline profile also Shift+Enter and Mod+Enter; the Document and Brand document
     * profiles call it only with that policy.
     */
    onSubmit?: (snapshot: Snapshot) => void;
    /**
     * Native focus events of the surface, including moves into the editor's own overlays.
     * Pointer and focus events bubble out of the editor root. There is no further focus callback.
     * The bubble toolbar hides when the editor loses focus, and the selection stays.
     */
    onFocus?: (event: FocusEvent<HTMLElement>) => void;
    onBlur?: (event: FocusEvent<HTMLElement>) => void;
    onToolbarModeChange?: (mode: ToolbarMode) => void;
    /** `null` until the session exists, which with `profile` is once the profile's module has loaded. */
    ref?: Ref<EditorHandle<C>>;
};
/** Exactly one accessible name source is required. */
export type RichTextEditorProps<C extends object = ShippedCommands> = RichTextEditorBaseProps<C> &
    ({ 'aria-label': string; 'aria-labelledby'?: never } | { 'aria-labelledby': string; 'aria-label'?: never });

/** The editor props as the session reads them: the `RichTextEditor` props of any command set. */
export type Props = RichTextEditorProps<object>;
/** The props once `definition` is known to be set. */
export type Defined = Props & { definition: CompiledEditorDefinition<object> };
