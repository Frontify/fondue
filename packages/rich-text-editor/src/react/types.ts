/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CSSProperties, type FocusEvent, type Ref } from 'react';

import {
    type CapabilityRef,
    type CommandRef,
    type ContentModel,
    type Diagnostic,
    type Feature,
    type ModelRef,
    type ResourceLimits,
    type RichTextDocument,
    type RichTextLocale,
    type RuntimeEnvironment,
} from '#/model';
import {
    type CommitOptions,
    type CommitResult,
    type LoadedDocument,
    type PersistenceOptions,
    type PersistenceService,
    type RecoveryService,
    type ReplaceDocumentRequest,
    type ReplaceResult,
    type SaveStatus,
    type ServiceContext,
    type Snapshot,
} from '#/persistence/types';
import { type ReaderPresentation } from '#/reader/reader';
import {
    type AuthoringPolicy,
    type CaptureResult,
    type CaptureTargetOptions,
    type CommandArgs,
    type CommandKey,
    type CommandResult,
    type CommandState,
    type DocumentChange,
    type EditorSummary,
    type ReferenceValue,
    type SelectionHandle,
    type SelectionSummary,
    type SessionToken,
    type ShippedCommands,
    type StoredId,
    type Unsubscribe,
} from '#/runtime/types';

// The host-facing types of `SPEC-rich-text.contracts.ts`, landed in full ahead of their behavior (DR-063).

export interface EditorDefinitionOptions<Model extends ContentModel = ContentModel> {
    readonly id: string;
    readonly model: Model;
    readonly policy?: Partial<AuthoringPolicy>;
    /** May only make limits stricter. */
    readonly limits?: Partial<ResourceLimits>;
    /** The only way to loosen a limit, set by a host per consumer. */
    readonly limitOverrides?: Partial<ResourceLimits>;
}
export interface EditorDefinitionInfo {
    readonly id: string;
    readonly model: ModelRef;
    readonly capabilities: readonly CapabilityRef[];
    readonly authoring: AuthoringPolicy;
    readonly limits: ResourceLimits;
}
declare const editorDefinitionBrand: unique symbol;
export interface CompiledEditorDefinition<Commands extends object = ShippedCommands> extends EditorDefinitionInfo {
    readonly [editorDefinitionBrand]: Commands;
}
type UnionToIntersection<U> = (U extends unknown ? (value: U) => void : never) extends (value: infer I) => void
    ? I
    : never;
/** Distributes over the feature union, so one feature without commands keeps the others' commands. */
export type CommandsOfModel<Model> =
    Model extends ContentModel<infer Features>
        ? UnionToIntersection<
              Features[number] extends infer F ? (F extends Feature<infer C, object, object> ? C : never) : never
          >
        : never;

export interface ReferenceSearchRequest {
    readonly query: string;
    /** Empty means any type (`SPEC-rich-text-references/AC-027`). */
    readonly resourceTypes: readonly string[];
    readonly cursor: string | null;
}
export interface ReferencePage {
    readonly items: readonly ReferenceValue[];
    readonly nextCursor: string | null;
}
export interface ReferenceService {
    search(request: ReferenceSearchRequest, context: ServiceContext): Promise<ReferencePage>;
}
export interface AssetValue {
    readonly assetId: string;
    readonly mediaType: string;
    readonly labelSnapshot: string;
}
export interface UploadRequest {
    readonly operationId: string;
    readonly blob: Blob;
    readonly filename: string;
}
export interface UploadService {
    upload(
        request: UploadRequest,
        context: ServiceContext & { readonly reportProgress: (fraction: number) => void },
    ): Promise<AssetValue>;
    /** Server-managed cleanup; never deletes an asset still referenced elsewhere. */
    releaseUnused(operationId: string, context: ServiceContext): Promise<void>;
}
/** A host asset library; `image.insert` opens it with its purpose when set, else the file chooser (SPEC-rich-text-blocks). */
export interface AssetPickerService {
    /** `purpose` is `image` for the shipped features; a later feature may pass its own purpose, so implementations handle any string. */
    pick(request: { readonly purpose: string }, context: ServiceContext): Promise<AssetValue | null>;
}
export interface EditorServices {
    readonly persistence?: PersistenceService;
    readonly recovery?: RecoveryService;
    readonly references?: ReferenceService;
    readonly uploads?: UploadService;
    readonly assets?: AssetPickerService;
}

export interface OperationMetric {
    readonly kind: 'mount' | 'commit' | 'paste' | 'save' | 'replace';
    readonly session: SessionToken;
    readonly packageVersion: string;
    readonly model: ModelRef;
    readonly capabilityIds: readonly string[];
    readonly durationMs: number;
    readonly normalizationTransactions: number;
    readonly failureCode: string | null;
}
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
    /** Registers a host modal root with the interaction scope (SPEC-rich-text-react/AC-048). */
    registerInteractionRoot(element: HTMLElement): Unsubscribe;
    subscribe<K extends keyof EditorEventMap>(event: K, listener: (value: EditorEventMap[K]) => void): Unsubscribe;
    /** Synchronous invalidation. Does not promise that remote saves were cancelled. */
    dispose(): void;
}

/** csstype's `Properties<string | number>`, which React's `CSSProperties` extends. */
export type StyleRecipe = CSSProperties;
export interface PresentationStyle {
    readonly id: StoredId;
    readonly label: string;
    readonly appliesTo: readonly ('paragraph' | 'heading' | 'link')[];
    readonly deprecated: boolean;
    readonly recipe: StyleRecipe;
}
export interface ColorToken {
    /** Stored as `tokenId`. */
    readonly id: StoredId;
    /** The swatch's accessible name. */
    readonly label: string;
    /** CSS colour for rendering and contrast checks. */
    readonly value: string;
    readonly usage: readonly ('font_color' | 'highlight')[];
}
export interface ListLevels {
    readonly ordered: readonly { readonly counterType: string; readonly color?: string }[];
    readonly bullet: readonly { readonly shape: string; readonly color?: string; readonly size?: string }[];
}

export type ToolbarMode = 'fixed' | 'bubble';
/** The reader presentation's resolvers, its other fields, and the editor's toolbar and controls. */
export interface ReactPresentation extends ReaderPresentation {
    /** Prefix of heading ids and in-document link targets in the reader output; default `rte-` (SPEC-rich-text-references, Links to headings). */
    readonly anchorPrefix?: string;
    readonly styles: readonly PresentationStyle[];
    readonly colorTokens: readonly ColorToken[];
    readonly listLevels?: ListLevels;
    /** 1 to 6. */
    readonly columns?: number;
    /** `normal`, or a length in `px` or `rem`. */
    readonly columnGap?: string;
    readonly contentClassName?: string;
    /** Strikethrough and secondary colour on checked task items; default false (`SPEC-rich-text-editing`). */
    readonly strikeCheckedTasks?: boolean;
    /** Groups of command IDs, `{ command, payload }` items and the `text-style` control ID, in order (Default toolbars). */
    readonly toolbar: readonly (readonly CommandRef[])[];
    readonly controls?: Readonly<Record<string, { readonly labelKey?: string; readonly icon?: string }>>;
    readonly sliceContext: string | null;
    /** Package key syntax; default `Alt-F10`. */
    readonly toolbarShortcut?: string;
}

export type RichTextProfile = 'inline' | 'comment' | 'document' | 'brand-document';
/** The 1.0 props; the 1.x `maxLength` joins with the character count. */
export interface RichTextEditorBaseProps<C extends object = ShippedCommands> {
    /** Default `document` (SPEC-rich-text/AC-031); ignored when `definition` is set. */
    readonly profile?: RichTextProfile;
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
    /** Default: the `ThemeProvider` locale when the package ships it, else `enUS` (DR-012). */
    readonly locale?: RichTextLocale;
    readonly services?: EditorServices;
    readonly persistenceOptions?: PersistenceOptions;
    readonly portalContainer?: HTMLElement | null;
    readonly spellCheck?: boolean;
    readonly inputRules?: false | { readonly exclude: readonly string[] };
    readonly defaultToolbarMode?: ToolbarMode;
    readonly environment?: RuntimeEnvironment;
    /** The surface element `id`. */
    readonly id?: string;
    /** Default `fondue-rich-text-editor`, with suffixed IDs on the parts. */
    readonly 'data-test-id'?: string;
    readonly onReady?: (session: SessionToken) => void;
    readonly onDocumentChange?: (change: DocumentChange) => void;
    readonly onDiagnostic?: (diagnostic: Diagnostic) => void;
    /** Runs only when `validate()` passes. */
    readonly onSubmit?: (snapshot: Snapshot) => void;
    /** Native focus events of the surface, including moves into the editor's own overlays. */
    readonly onFocus?: (event: FocusEvent<HTMLElement>) => void;
    readonly onBlur?: (event: FocusEvent<HTMLElement>) => void;
    readonly onToolbarModeChange?: (mode: ToolbarMode) => void;
    readonly ref?: Ref<EditorHandle<C>>;
}
/** Exactly one accessible name source is required (SPEC-rich-text/AC-031). */
export type RichTextEditorProps<C extends object = ShippedCommands> = RichTextEditorBaseProps<C> &
    (
        | { readonly 'aria-label': string; readonly 'aria-labelledby'?: never }
        | { readonly 'aria-labelledby': string; readonly 'aria-label'?: never }
    );
