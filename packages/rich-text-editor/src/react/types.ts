/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type FocusEvent, type Ref } from 'react';

import { type RichTextPlugin } from '#/bridge/pluginApi/definePlugin';
import { type CommandsOfPart } from '#/bridge/pluginApi/plugin';
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
    /** The editor's identifier. */
    id: string;
    /** The content model the editor edits. */
    model: Model;
    /** One plugin per feature of the model, of the same ID and version. */
    plugins: readonly RichTextPlugin[];
    /** Authoring switches that start differently from the model's defaults. */
    policy?: Partial<AuthoringPolicy>;
    /** May only make limits stricter. */
    limits?: Partial<ResourceLimits>;
    /** The only way to loosen a limit, set by a host per consumer. */
    limitOverrides?: Partial<ResourceLimits>;
};
/** The id, content model and capabilities of a compiled editor definition. */
export type EditorDefinitionInfo = {
    /** The editor's identifier. */
    readonly id: string;
    /** The content model the editor edits. */
    readonly model: ModelRef;
    /** What the editor can do, one entry per feature. */
    readonly capabilities: readonly CapabilityRef[];
    /** The authoring policy the definition starts with. */
    readonly authoring: AuthoringPolicy;
    /** The limits the definition enforces. */
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
/** The commands of the plugins a host passes `defineEditor`. */
export type CommandsOfPlugins<Plugins extends readonly RichTextPlugin[]> = UnionToIntersection<
    CommandsOfPart<Plugins[number]['editor']>
> &
    object;

/** A search a host answers when the user looks for something to mention or link. */
export type ReferenceSearchRequest = {
    /** The text the user typed. */
    query: string;
    /** Empty means any type. */
    resourceTypes: readonly string[];
    /** The cursor of the page to load, or `null` for the first page. */
    cursor: string | null;
};
/** One page of results for a reference search, with the cursor for the next page. */
export type ReferencePage = {
    /** The matches on this page. */
    items: readonly ReferenceValue[];
    /** The cursor for the next page, or `null` when there is none. */
    nextCursor: string | null;
};
/** The host service that searches for the things a document can mention. */
export type ReferenceService = {
    /** Resolves one page of matches for the request; rejects when the search fails. */
    search(request: ReferenceSearchRequest, context: ServiceContext): Promise<ReferencePage>;
};
/** An asset a host uploaded or picked, as a document stores it. */
export type AssetValue = {
    /** The host's identifier for the asset. */
    assetId: string;
    /** The media type, such as `image/png`. */
    mediaType: string;
    /** The asset's label when the document stored it. */
    labelSnapshot: string;
};
/** What the editor sends to the upload service: the file and the operation it belongs to. */
export type UploadRequest = {
    /** The operation this upload belongs to; pass it to `releaseUnused` to clean up. */
    operationId: string;
    /** The file's content. */
    blob: Blob;
    /** The file's name. */
    filename: string;
};
/** The host service that uploads a file and returns its asset. */
export type UploadService = {
    /** Uploads the file and resolves its asset; `reportProgress` takes a fraction from 0 to 1. */
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
    /** Loads and saves the document. */
    persistence?: PersistenceService;
    /** Stores and offers a draft to recover. */
    recovery?: RecoveryService;
    /** Searches for things to mention or link. */
    references?: ReferenceService;
    /** Uploads files that the user adds. */
    uploads?: UploadService;
    /** Lets the user pick an asset from the host's library. */
    assets?: AssetPickerService;
};

/** The events the editor emits, each with the value its listeners get. */
export type EditorEventMap = {
    /** The session is ready. */
    ready: SessionToken;
    /** The document changed. */
    documentChange: DocumentChange;
    /** The selection changed. */
    selectionChange: SelectionSummary;
    /** The save status changed. */
    saveStatusChange: SaveStatus;
    /** The editor reported a problem. */
    diagnostic: Diagnostic;
    /** A timed operation finished. */
    operationMetric: OperationMetric;
    /** The document was replaced, which starts a new session. */
    replaced: SessionToken;
    /** The session was disposed. */
    disposed: SessionToken;
};
/**
 * The session of a mounted editor. With `profile`, the ref holds `null` until the profile's module has loaded and the
 * session exists, and no host callback runs before then.
 */
export type EditorHandle<C extends object = ShippedCommands> = {
    /** A short description of the session and its document. */
    getSummary(): EditorSummary;
    /** The document as it is now. */
    getSnapshot(): Snapshot;
    /** Whether the document is saved, saving or failed to save. */
    getSaveStatus(): SaveStatus;
    /** The draft that the recovery service offered, or `null` when none. */
    getRecoveryCandidate(): RichTextDocument | null;
    /** Whether the command can run now, with the reason when it cannot. */
    query<K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>): CommandState;
    /** Synchronous event-handler API. Do not call from React render or effects. */
    execute<K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>): CommandResult;
    /** Queues an intent, not a transaction. Without a target, uses the selection at execution. */
    enqueue<K extends CommandKey<C>>(id: K, ...args: CommandArgs<C, K>): Promise<CommandResult>;
    /** Keeps a selection that a later command can target, such as while a host modal is open. */
    captureTarget(options: CaptureTargetOptions): CaptureResult;
    /** Frees a target from `captureTarget`. */
    releaseTarget(target: SelectionHandle): void;
    /** Flushes pending changes and resolves once they are committed. */
    requestCommit(options: CommitOptions): Promise<CommitResult>;
    /** Swaps in a new document, which ends this session and starts another. */
    replaceDocument(request: ReplaceDocumentRequest): Promise<ReplaceResult>;
    /** Switches between editing and reading without a remount. */
    setMode(mode: 'editable' | 'readonly'): void;
    /** Never changes the document schema. Throws `DefinitionError` for an unknown feature ID. */
    updatePolicy(policy: AuthoringPolicy): void;
    /** Moves focus into the editor, to the current selection unless told otherwise. */
    focus(where?: 'current' | 'start' | 'end'): void;
    /** Registers a host modal root with the interaction scope. */
    registerInteractionRoot(element: HTMLElement): Unsubscribe;
    /** Adds a listener for an event and returns the function that removes it. */
    subscribe<K extends keyof EditorEventMap>(event: K, listener: (value: EditorEventMap[K]) => void): Unsubscribe;
    /** Synchronous invalidation. Does not promise that remote saves were cancelled. */
    dispose(): void;
};

/** Where the toolbar shows: fixed above the content or as a bubble at the selection. */
export type ToolbarMode = 'fixed' | 'bubble';
/** The reader presentation's resolvers, its other fields, and the editor's toolbar and controls. */
export type ReactPresentation = {
    /** The looks of the document's styles. */
    styles: readonly PresentationStyle[];
    /** The colors that a document can use. */
    colorTokens: readonly ColorToken[];
    /** How each list level looks. */
    listLevels?: ListLevels;
    /** 1 to 6. */
    columns?: number;
    /**
     * `normal`, or a length in `px` or `rem`. With `normal` and a font size on `contentClassName` that differs from the
     * surrounding font, the reader's column thresholds use the surrounding font; a `px` or `rem` gap avoids it.
     */
    columnGap?: string;
    /** A class name for the content surface. */
    contentClassName?: string;
    /** Groups of command IDs, `{ command, payload }` items and the `text-style` control ID, in order. */
    toolbar: readonly (readonly CommandRef[])[];
    /** The label key and icon of each toolbar control, by control ID. */
    controls?: Readonly<Record<string, { labelKey?: string; icon?: string }>>;
    /** The slice of the document that the toolbar acts on, or `null` for the whole document. */
    sliceContext: string | null;
    /** Package key syntax. @default 'Alt-F10' */
    toolbarShortcut?: string;
} & ReaderPresentation;

/** The name of a shipped profile: inline, comment, document or brand-document. */
export type RichTextProfile = 'inline' | 'comment' | 'document' | 'brand-document';
/** The props the editor takes in every profile. */
export type RichTextEditorBaseProps<C extends object = ShippedCommands> = {
    /**
     * Ignored when `definition` is set. The profile's module loads on first use. While it loads, the editor renders the
     * server shell (the loading shell with the textbox role and name), `ref` holds `null` and no callback runs. A failed
     * load shows a retry shell. A profile loaded once renders at once.
     * @default 'document'
     */
    profile?: RichTextProfile;
    /** A compiled editor definition, which replaces `profile`. */
    definition?: CompiledEditorDefinition<C>;
    /** How the editor looks, and which toolbar and controls it shows. */
    presentation?: ReactPresentation;
    /** The document the editor starts with. Later changes to it do not reach the editor; use `replaceDocument`. */
    defaultValue: LoadedDocument;
    /** The ID of the element that describes the editor. */
    'aria-describedby'?: string;
    /** The ID of the element that shows the error message. */
    'aria-errormessage'?: string;
    /** `error` sets `aria-invalid`. */
    status?: 'neutral' | 'success' | 'error' | 'loading';
    /** Whether the document must not be empty for `validate()` to pass. */
    required?: boolean;
    /** Whether the editor ignores input and leaves the tab order. */
    disabled?: boolean;
    /** Whether the user can read and select the content but not change it. */
    readOnly?: boolean;
    /** The text shown while the document is empty. */
    placeholder?: string;
    /** The `ThemeProvider` locale when the package ships it, else `enUS`. */
    locale?: RichTextLocale;
    /** The host services the editor calls. */
    services?: EditorServices;
    /** Options for how the document loads and saves. */
    persistenceOptions?: PersistenceOptions;
    /** Where the editor's popovers and menus render. */
    portalContainer?: HTMLElement | null;
    /** Whether the browser spell-checks the content. */
    spellCheck?: boolean;
    /** `false` turns off every input rule; `exclude` turns off the named rules. */
    inputRules?: false | { exclude: readonly string[] };
    /**
     * When true, Tab and Shift+Tab move focus and do not indent or change cells.
     * @default false
     */
    tabMovesFocus?: boolean;
    /**
     * When false, the view does not scroll the selection into view.
     * @default true
     */
    scrollSelectionIntoView?: boolean;
    /** Where the toolbar shows at first. */
    defaultToolbarMode?: ToolbarMode;
    /**
     * For the session id and the `nodeId`s the editor creates.
     * @default crypto.randomUUID(), or a version 4 UUID where that is missing
     */
    generateId?: () => string;
    /** The surface element `id`. */
    id?: string;
    /**
     * Suffixed IDs mark the parts.
     * @default 'fondue-rich-text-editor'
     */
    'data-test-id'?: string;
    /** Runs once the session exists. */
    onReady?: (session: SessionToken) => void;
    /** Runs when the document changes. */
    onDocumentChange?: (change: DocumentChange) => void;
    /** Runs when the editor reports a problem. */
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
    /** Runs when focus leaves the surface and its overlays. */
    onBlur?: (event: FocusEvent<HTMLElement>) => void;
    /** Runs when the user or the editor changes where the toolbar shows. */
    onToolbarModeChange?: (mode: ToolbarMode) => void;
    /** `null` until the session exists, which with `profile` is once the profile's module has loaded. */
    ref?: Ref<EditorHandle<C>>;
};
/** Exactly one accessible name source is required. */
export type RichTextEditorProps<C extends object = ShippedCommands> = RichTextEditorBaseProps<C> &
    (
        | {
              /** The surface's accessible name, as text. */
              'aria-label': string;
              /** Not allowed beside `aria-label`. */
              'aria-labelledby'?: never;
          }
        | {
              /** The ID of the element that names the surface. */
              'aria-labelledby': string;
              /** Not allowed beside `aria-labelledby`. */
              'aria-label'?: never;
          }
    );

/** The editor props as the session reads them: the `RichTextEditor` props of any command set. */
export type Props = RichTextEditorProps<object>;
/** The props once `definition` is known to be set. */
export type Defined = Props & { definition: CompiledEditorDefinition<object> };
