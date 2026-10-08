/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CapabilityRef, type Feature, type JsonObject, type ModelRef } from './declarations';
import { type IdSource } from './environment';

export interface MarkJSON {
    readonly type: string;
    readonly attrs?: JsonObject;
}
export interface ContentNodeJSON {
    readonly type: string;
    readonly attrs?: JsonObject;
    readonly content?: readonly ContentNodeJSON[];
    readonly marks?: readonly MarkJSON[];
    readonly text?: string;
}
export interface RichTextDocument {
    readonly format: 'frontify.rich-text';
    readonly formatVersion: 1;
    readonly model: ModelRef;
    readonly requiredCapabilities: readonly CapabilityRef[];
    readonly content: ContentNodeJSON;
}
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
/** The codes the package emits so far; later layers add theirs. */
export type DiagnosticCode =
    | FormatDiagnosticCode
    | 'migration.requires-review'
    | 'migration.unsupported'
    | 'codecs.markdown-unsupported'
    | 'codecs.lossy-output'
    | 'codecs.override-failed'
    | 'reader.override-failed';

export interface Diagnostic {
    readonly code: DiagnosticCode;
    readonly severity: 'info' | 'warning' | 'error';
    readonly messageKey: string;
    /** A JSON Pointer into the input, where the spec names one. */
    readonly path?: string;
    readonly featureId?: string;
    /** Codes, feature IDs, capability names, counts and hashes only: never document text, attribute values, URLs or labels. */
    readonly details?: JsonObject;
}

export type DecodeResult =
    | {
          /** Unknown or invalid content is kept as islands or in `unknownAttributes` inside the runtime. */
          readonly status: 'editable';
          /** The input after migrations, exactly as read: a value in a node or mark position may be any JSON value. */
          readonly document: RichTextDocument;
          readonly diagnostics: readonly Diagnostic[];
      }
    | {
          /**
           * Only unreadable input: not JSON, a bad envelope or root node, another format version or model, a limit, a
           * migration step that returns `unsupported`, throws or writes an output that fails the read or root checks,
           * or a `requires-review` step that leaves the root unmapped.
           */
          readonly status: 'blocked';
          readonly reason: 'invalid' | 'unsupported' | 'limit-exceeded';
          readonly original: unknown;
          readonly diagnostics: readonly Diagnostic[];
      };

export interface ResourceLimits {
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
}
const MIB = 1024 * 1024;
/** The Limits table defaults. */
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

export interface DecodeOptions {
    /** Default the Limits table; a host passes the limits the writing definition used. */
    readonly limits?: Partial<ResourceLimits>;
    /** For `nodeId`s that registered migrations create; the package default when omitted. */
    readonly ids?: IdSource;
}

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
