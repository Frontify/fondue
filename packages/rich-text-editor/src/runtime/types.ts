/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type Diagnostic, type ModelRef, type RichTextDocument } from '#/model';

// The host-facing runtime types of `SPEC-rich-text.contracts.ts` (DR-063).

export type Unsubscribe = () => void;
export type Direction = 'ltr' | 'rtl' | 'auto';
/** A BCP 47 tag that passes `Intl.getCanonicalLocales`. */
export type LanguageTag = string;
/** Stored IDs (`styleId`, `tokenId`, `languageId`, `resourceType`) match `^[a-z0-9][a-z0-9._:-]{0,127}$`. */
export type StoredId = string;
export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type Alignment = 'left' | 'center' | 'right' | 'justify';

export interface LinkValue {
    readonly href: string;
    /** Visible text that `link.set` inserts on a collapsed selection. */
    readonly text?: string;
    readonly openInNewWindow: boolean;
    readonly styleId: StoredId | null;
}
export interface ReferenceValue {
    readonly resourceType: StoredId;
    readonly resourceId: string;
    readonly labelSnapshot: string;
    /** Set on link destination results (SPEC-rich-text-references). */
    readonly href?: string;
}

export interface FeaturePolicy {
    readonly create: boolean;
    readonly edit: boolean;
    readonly remove: boolean;
    readonly paste: boolean;
}
export interface AuthoringPolicy {
    readonly features: Readonly<Record<string, FeaturePolicy>>;
    readonly creatableHeadingLevels: readonly HeadingLevel[];
    /** `paragraph` by default in Comment, Document and Brand document, where Comment may use `submit`; Inline defaults to `submit`, which acts as `none` while the host sets no `onSubmit`. */
    readonly enterBehavior: 'paragraph' | 'submit' | 'none';
}

export type ColorValue = { readonly tokenId: StoredId } | { readonly value: string };
/** Commands of the shipped features. A definition's own map comes from its features. */
export interface ShippedCommands {
    // core
    readonly 'history.undo': undefined;
    readonly 'history.redo': undefined;
    readonly 'clipboard.paste-plain': undefined;
    readonly 'paragraph.set': undefined;
    readonly 'text.insert': { readonly text: string };
    readonly 'hard-break.insert': undefined;
    readonly 'block.move.up': undefined;
    readonly 'block.move.down': undefined;
    readonly 'block.duplicate': undefined;
    readonly 'block.delete': undefined;
    // marks
    readonly 'mark.bold.toggle': undefined;
    readonly 'mark.italic.toggle': undefined;
    readonly 'mark.underline.toggle': undefined;
    readonly 'mark.strike.toggle': undefined;
    readonly 'mark.code.toggle': undefined;
    readonly 'mark.subscript.toggle': undefined;
    readonly 'mark.superscript.toggle': undefined;
    readonly 'mark.font-color.set': ColorValue | null;
    readonly 'mark.highlight.set': ColorValue | null;
    readonly 'mark.color.reapply': undefined;
    readonly 'mark.color.clear': undefined;
    /** `tokenIds` limits the menu to those tokens, as the contrast repair does. */
    readonly 'mark.color.menu.open': undefined | { readonly tokenIds: readonly StoredId[] };
    readonly 'mark.language.set': { readonly lang: LanguageTag; readonly dir: Direction | null } | null;
    readonly 'mark.language.edit': undefined;
    readonly 'format.inline.clear': undefined;
    // blocks
    readonly 'heading.set': { readonly level: HeadingLevel };
    readonly 'quote.toggle': undefined;
    /** An input rule passes the fence's language. */
    readonly 'code-block.toggle': undefined | { readonly languageId?: StoredId };
    readonly 'code-block.language.set': { readonly languageId: StoredId | null };
    readonly 'code-block.indent': undefined;
    readonly 'code-block.outdent': undefined;
    readonly 'block.style.set': { readonly styleId: StoredId | null };
    readonly 'block.align.set': { readonly align: Alignment };
    readonly 'block.indent': undefined;
    readonly 'block.outdent': undefined;
    readonly 'indent.increase': undefined;
    readonly 'indent.decrease': undefined;
    // lists
    readonly 'list.indent': undefined;
    readonly 'list.outdent': undefined;
    readonly 'list.bullet.toggle': undefined;
    readonly 'list.ordered.toggle': { readonly start: number };
    readonly 'list.ordered.start.edit': undefined;
    readonly 'list.ordered.start.set': { readonly start: number };
    /** An input rule passes `checked` for `[x]`. */
    readonly 'list.task.toggle': undefined | { readonly checked?: boolean };
    readonly 'task.toggle': undefined;
    readonly 'task.setChecked': { readonly nodeId: string; readonly checked: boolean };
    readonly 'task.indent': undefined;
    readonly 'task.outdent': undefined;
    // links and mentions
    readonly 'link.edit': undefined;
    readonly 'link.set': LinkValue;
    readonly 'link.remove': undefined;
    readonly 'reference.insert': ReferenceValue;
    readonly 'mention.search.open': undefined;
    // insert, navigation and checks
    readonly 'emoji.picker.open': undefined;
    readonly 'find.open': undefined;
    readonly 'outline.toggle': undefined;
    readonly 'checks.open': undefined;
    // SPEC-rich-text-blocks
    readonly 'rule.insert': undefined;
    readonly 'column.break.insert': undefined;
    readonly 'table.insert': { readonly rows: number; readonly columns: number; readonly withHeaderRow?: boolean };
    readonly 'table.row.insert': { readonly side: 'before' | 'after' };
    readonly 'table.column.insert': { readonly side: 'before' | 'after' };
    readonly 'table.row.delete': undefined;
    readonly 'table.column.delete': undefined;
    readonly 'table.delete': undefined;
    readonly 'table.header.toggle': { readonly axis: 'row' | 'column' };
    readonly 'table.column.width.set': { readonly width: number | null };
    readonly 'table.cells.merge': undefined;
    readonly 'table.cell.split': undefined;
    readonly 'media.upload.cancel': { readonly nodeId: string };
    readonly 'media.upload.retry': { readonly nodeId: string };
    readonly 'image.insert': undefined;
    readonly 'image.replace': { readonly nodeId: string };
    readonly 'image.alt.edit': undefined;
    readonly 'image.size.set': { readonly displayWidth: number | null };
    readonly 'image.align.set': { readonly align: 'left' | 'center' | 'right' };
    readonly 'embed.insert': undefined;
    readonly 'embed.edit': undefined;
    readonly 'embed.set': { readonly url: string; readonly title: string | null };
    readonly 'embed.update': { readonly nodeId: string; readonly url: string; readonly title: string | null };
}
export type CommandId = Extract<keyof ShippedCommands, string>;
export type CommandKey<C extends object> = Extract<keyof C, string>;
/** A command whose payload may be `undefined` may be called without the argument. */
export type CommandArgs<C extends object, K extends CommandKey<C>> = undefined extends C[K]
    ? [payload?: C[K], options?: CommandOptions]
    : [payload: C[K], options?: CommandOptions];

declare const selectionHandleBrand: unique symbol;
/** Opaque, session-local and releasable; never persisted or sent to a server. */
export interface SelectionHandle {
    readonly [selectionHandleBrand]: true;
    readonly id: string;
    readonly session: SessionToken;
}
export interface CaptureTargetOptions {
    readonly purpose: 'format' | 'insert' | 'replace-text' | 'edit-node';
    readonly onIntersectingEdit: 'invalidate' | 'map';
}
export type CaptureResult =
    | { readonly status: 'captured'; readonly target: SelectionHandle }
    | { readonly status: 'rejected'; readonly code: 'not-ready' };
export interface CommandOptions {
    readonly target?: SelectionHandle;
    readonly focus?: 'preserve' | 'editor';
}
export interface CommandState {
    readonly enabled: boolean;
    readonly active: boolean | 'mixed';
    readonly disabledReason: string | null;
}
export type CommandResult =
    | { readonly status: 'applied' | 'no-op'; readonly stamp: DocumentStamp; readonly contentChanged: boolean }
    | {
          readonly status: 'rejected';
          readonly code:
              | 'not-ready'
              | 'busy'
              | 'readonly'
              | 'not-allowed'
              | 'not-applicable'
              | 'unknown-command'
              | 'invalid-payload'
              | 'target-invalid'
              | 'wrong-session'
              | 'composition-active';
      };

export interface SessionToken {
    readonly documentId: string;
    readonly sessionId: string;
    readonly generation: number;
}
/** `sequence` advances once for each effective persisted-content change. */
export interface DocumentStamp extends SessionToken {
    readonly sequence: number;
}
export interface SelectionSummary {
    /** `gap` is the gap cursor of `prosemirror-gapcursor` (SPEC-rich-text-runtime/AC-088). */
    readonly kind: 'text' | 'node' | 'cells' | 'gap' | 'all' | 'none';
    readonly collapsed: boolean;
    readonly blockType: string | null;
    readonly selectedNodeId: string | null;
}
export type ChangeOrigin =
    | 'input'
    | 'command'
    | 'paste'
    | 'cut'
    | 'drop'
    | 'history'
    | 'async'
    | 'external'
    | 'normalization'
    | 'unknown';
export interface DocumentChange {
    readonly stamp: DocumentStamp;
    readonly commitSequence: number;
    readonly origin: ChangeOrigin;
    readonly commandId: string | null;
    /** Serializes the captured immutable document lazily; not a live read. */
    readonly readDocument: () => RichTextDocument;
}
export interface EditorSummary {
    readonly session: SessionToken;
    readonly phase: 'mounting' | 'ready' | 'transitioning' | 'faulted' | 'disposed';
    readonly mode: 'editable' | 'readonly';
    readonly commitSequence: number;
    /** The effective-change counter the glossary calls `sequence`. */
    readonly sequence: number;
    readonly compositionActive: boolean;
    readonly selection: SelectionSummary;
}

/** Opaque, never parsed or compared numerically. `null` at load or base means create-only. */
export type ServerRevision = string;
export interface Snapshot {
    readonly stamp: DocumentStamp;
    readonly document: RichTextDocument;
    readonly acknowledgedRevision: ServerRevision | null;
    readonly compositionActive: boolean;
}
export interface SaveAcknowledgment {
    /** `null` only in the acknowledgment synthesized for a loaded or replaced record that no save has touched (SPEC-rich-text-persistence/AC-024). */
    readonly operationId: string | null;
    readonly stamp: DocumentStamp;
    readonly revision: ServerRevision;
}
export interface SaveStatus {
    readonly state: 'unmanaged' | 'clean' | 'dirty' | 'saving' | 'uncertain' | 'offline' | 'conflict' | 'error';
    readonly latestSequence: number;
    readonly acknowledgedSequence: number;
    readonly revision: ServerRevision | null;
    readonly inFlightOperationId: string | null;
    readonly diagnostic: Diagnostic | null;
}
export interface CommitOptions {
    readonly reason: 'submit' | 'navigate' | 'manual';
    /** Default `wait`. */
    readonly composition?: 'wait' | 'reject';
    /** Default `PersistenceOptions.timeoutMs`. */
    readonly timeoutMs?: number;
}
export type CommitResult =
    | { readonly status: 'acknowledged'; readonly acknowledgment: SaveAcknowledgment }
    | {
          readonly status: 'blocked';
          readonly code: 'unmanaged' | 'composition-active' | 'conflict' | 'forbidden' | 'not-ready';
      }
    | {
          readonly status: 'failed';
          readonly code: 'timeout' | 'transport' | 'disposed' | 'incompatible-writer' | 'invalid';
          readonly outcome: 'not-sent' | 'unknown' | 'rejected';
      };
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
