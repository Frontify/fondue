/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CapabilityRef, type Feature, type JsonObject, type ModelRef } from './types';

/** A mark in the stored document: its type and attributes. */
export type MarkJSON = {
    readonly type: string;
    readonly attrs?: JsonObject;
};
/** A node in the stored document: its type, attributes, content and marks. */
export type ContentNodeJSON = {
    readonly type: string;
    readonly attrs?: JsonObject;
    readonly content?: readonly ContentNodeJSON[];
    readonly marks?: readonly MarkJSON[];
    readonly text?: string;
};
/** The stored form of a document: the format envelope, the model it was written with and its content. */
export type RichTextDocument = {
    readonly format: 'frontify.rich-text';
    readonly formatVersion: 1;
    readonly model: ModelRef;
    readonly requiredCapabilities: readonly CapabilityRef[];
    readonly content: ContentNodeJSON;
};
/** A copied range of content, which a paste reads back with the model and capabilities that wrote it. */
export type RichTextSlice = {
    format: 'frontify.rich-text-slice';
    formatVersion: 1;
    model: ModelRef;
    requiredCapabilities: readonly CapabilityRef[];
    context: string | null;
    openStart: number;
    openEnd: number;
    content: readonly ContentNodeJSON[];
};
/**
 * The closed document type of a feature list: its nodes, marks and attributes, growing when a host adds a
 * feature. Stored input is still checked only by `decodeDocument`, and islands never appear in this type.
 */
export type DocumentOf<Features extends readonly Feature[]> = Omit<RichTextDocument, 'content'> & {
    readonly content: NodeOf<Features>;
};
type NodeMapOf<F> = F extends Feature<object, infer N, object> ? N : never;
type MarkMapOf<F> = F extends Feature<object, object, infer M> ? M : never;
type UnionToIntersectionOf<U> = (U extends unknown ? (value: U) => void : never) extends (value: infer I) => void
    ? I
    : never;
type NodesIn<Features extends readonly Feature[]> = UnionToIntersectionOf<NodeMapOf<Features[number]>>;
type MarksIn<Features extends readonly Feature[]> = UnionToIntersectionOf<MarkMapOf<Features[number]>>;
/** The mark types, with their attributes, that a set of features defines. */
export type MarkOf<Features extends readonly Feature[]> = {
    readonly [K in Extract<keyof MarksIn<Features>, string>]: {
        readonly type: K;
        readonly attrs?: MarksIn<Features>[K];
    };
}[Extract<keyof MarksIn<Features>, string>];
/** The closed node union of a feature list: only its node types, mark types and attributes. */
export type NodeOf<Features extends readonly Feature[]> = {
    readonly [K in Extract<keyof NodesIn<Features>, string>]: {
        readonly type: K;
        readonly attrs?: NodesIn<Features>[K];
        readonly content?: readonly NodeOf<Features>[];
        readonly marks?: readonly MarkOf<Features>[];
        readonly text?: string;
    };
}[Extract<keyof NodesIn<Features>, string>];

/** The codes of the diagnostics found when reading the stored envelope of a document. */
export type FormatDiagnosticCode =
    | 'format.not-json'
    | 'format.envelope-invalid'
    | 'format.unknown-format-version'
    | 'format.wrong-model'
    | 'format.unknown-capability'
    | 'format.capability-undeclared'
    | 'format.unknown-node'
    | 'format.unknown-mark'
    | 'format.unknown-attribute'
    | 'format.invalid-attribute'
    | 'format.invalid-structure'
    | 'format.limit-exceeded'
    | 'format.duplicate-occurrence-id'
    | 'format.unsafe-url';
export type RuntimeDiagnosticCode =
    | 'runtime.append-limit'
    | 'runtime.async-discarded'
    | 'runtime.duplicate-engine'
    | 'runtime.enqueue-loop'
    | 'runtime.listener-error'
    | 'runtime.multiple-dispatch'
    | 'runtime.plugin-error'
    | 'runtime.recovery-stored'
    | 'runtime.stale-transaction'
    | 'runtime.view-fault';
/** The codes the package emits. A minor release may add codes, so handle a code you do not know. */
export type DiagnosticCode =
    | FormatDiagnosticCode
    | RuntimeDiagnosticCode
    | 'persistence.ack-mismatch'
    | 'persistence.conflict'
    | 'persistence.disposed-dirty'
    | 'persistence.retries-exhausted'
    | 'migration.requires-review'
    | 'migration.unsupported'
    | 'codecs.markdown-unsupported'
    | 'codecs.lossy-output'
    | 'codecs.override-failed'
    | 'codecs.unresolved-asset'
    | 'clipboard.paste-rejected'
    | 'media.upload-failed'
    | 'media.cache-full'
    | 'reader.override-failed'
    | 'styles.unknown-style'
    | 'reference.unavailable'
    | 'react.default-value-changed'
    | 'react.definition-changed'
    | 'react.duplicate-accessible-name'
    | 'react.execute-in-render';

/** A finding the package reports about content or use, with a code, a severity and a translation key for its message. */
export type Diagnostic = {
    code: DiagnosticCode;
    severity: 'info' | 'warning' | 'error';
    messageKey: string;
    /** A JSON Pointer into the input, when the diagnostic has a place. */
    path?: string;
    featureId?: string;
    /** Codes, feature IDs, capability names, counts and hashes only: never document text, attribute values, URLs or labels. */
    details?: JsonObject;
};

/** The outcome of reading stored content: editable, or not editable with the reason. */
export type DecodeResult =
    | {
          /** Unknown or invalid content is kept as islands or in `unknownAttributes` inside the runtime. */
          status: 'editable';
          /** The input after migrations, exactly as read: a value in a node or mark position may be any JSON value. */
          document: RichTextDocument;
          diagnostics: readonly Diagnostic[];
      }
    | {
          /**
           * Only unreadable input: not JSON, a bad envelope or root node, another format version or model, a limit, a
           * migration step that returns `unsupported`, throws or writes an output that fails the read or root checks,
           * or a `requires-review` step that leaves the root unmapped.
           */
          status: 'blocked';
          reason: 'invalid' | 'unsupported' | 'limit-exceeded';
          original: unknown;
          diagnostics: readonly Diagnostic[];
      };

/** The size limits applied when reading a document, such as bytes, nodes and depth. */
export type ResourceLimits = {
    readonly maxDocumentBytes: number;
    readonly maxDocumentNodes: number;
    readonly maxDepth: number;
    readonly maxPasteBytes: number;
    readonly maxTableCells: number;
    readonly maxAssetBytes: number;
    readonly maxTextLength: number;
    readonly maxAttributeLength: number;
    readonly maxImagePixels: number;
    /** Uploads running at once in one editor; more queue. */
    readonly maxConcurrentUploads: number;
    /** Normalization transactions appended to one commit. */
    readonly maxAppendedTransactions: number;
};
const MIB = 1024 * 1024;
/** The resource limits a read uses when the caller passes none. */
export const defaultLimits: ResourceLimits = Object.freeze({
    maxDocumentBytes: 5 * MIB,
    maxDocumentNodes: 50_000,
    maxDepth: 64,
    maxPasteBytes: MIB,
    maxTableCells: 2500,
    maxAssetBytes: 25 * MIB,
    maxConcurrentUploads: 3,
    maxAppendedTransactions: 32,
    maxTextLength: 1_000_000,
    maxAttributeLength: 8192,
    maxImagePixels: 89_478_485,
});

/** Options for reading a stored document: the limits and the id source for migrations. */
export type DecodeOptions = {
    /** Defaults to `defaultLimits`; a host passes the limits the writing definition used. */
    limits?: Partial<ResourceLimits>;
    /** Creates the `nodeId`s that registered migrations add; `crypto.randomUUID` when omitted. */
    generateId?: () => string;
};

export const diagnostic = (
    code: DiagnosticCode,
    path: string | undefined,
    details?: JsonObject,
    severity: Diagnostic['severity'] = 'warning',
): Diagnostic => {
    const base = { code, severity, messageKey: code };
    const located = path === undefined ? base : { ...base, path };

    return details === undefined ? located : { ...located, details };
};
