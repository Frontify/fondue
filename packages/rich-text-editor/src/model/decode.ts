/* (c) Copyright Frontify Ltd., all rights reserved. */

import { attributesOf } from './compile';
import { checkContent, type TreeNode, vocabularyOf } from './content';
import { type ContentModel } from './declarations';
import { encodeTree } from './encode';
import { checkEnvelope } from './envelope';
import { pointer } from './errors';
import {
    type DecodeOptions,
    type DecodeResult,
    defaultLimits,
    type Diagnostic,
    diagnostic,
    type ResourceLimits,
    type RichTextDocument,
} from './format';
import { runMigrations } from './migrate';
import { randomId } from './random-id';
import { exceedsBytes, readInput } from './read';

const limitsOf = (given: Partial<ResourceLimits> | undefined): ResourceLimits => {
    const limits: Record<string, number> = { ...defaultLimits };
    for (const [name, value] of Object.entries(given === undefined ? {} : given)) {
        if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
            limits[name] = value;
        }
    }
    return limits as unknown as ResourceLimits;
};

/** A capability the model does not install, or installs at a lower version than the document records, warns. */
const capabilityWarnings = (document: RichTextDocument, model: ContentModel): Diagnostic[] => {
    const installed = new Map(model.capabilities.map(({ id, version }) => [id, version]));
    const warnings: Diagnostic[] = [];
    for (const [index, { id, version }] of document.requiredCapabilities.entries()) {
        const current = installed.get(id);
        if (current === undefined || version > current) {
            const details = { capability: id, version };
            warnings.push(diagnostic('format.unknown-capability', pointer('requiredCapabilities', index), details));
        }
    }
    return warnings;
};

export interface Decoded {
    readonly result: DecodeResult;
    /** The island tree of an `editable` result, for the runtime and the encoder. */
    readonly tree?: TreeNode;
}

/** `decodeDocument` with the island tree the runtime builds its document from. */
export const decodeToTree = (input: unknown, model: ContentModel, options: DecodeOptions = {}): Decoded => {
    const limits = limitsOf(options.limits);
    const blocked = (reason: 'invalid' | 'unsupported' | 'limit-exceeded', diagnostics: readonly Diagnostic[]) => ({
        result: { status: 'blocked', reason, original: input, diagnostics } as const,
    });
    const read = readInput(input, limits);
    if (!read.ok) {
        return blocked(read.reason, [read.diagnostic]);
    }
    const envelope = checkEnvelope(read.value, model);
    if (!envelope.ok) {
        return blocked(envelope.reason, [envelope.diagnostic]);
    }
    const warnings = capabilityWarnings(envelope.document, model);
    const migrated = runMigrations(envelope.document, model, options.generateId ?? randomId, limits);
    const document = migrated.document;
    if (document === null) {
        return blocked('unsupported', [...warnings, ...migrated.diagnostics]);
    }
    const { tree, diagnostics } = checkContent(document.content, model, migrated.review);
    const found = [...warnings, ...migrated.diagnostics, ...diagnostics];
    if (tree === undefined) {
        return blocked('invalid', found);
    }
    const encoded = encodeTree(tree, model, document.requiredCapabilities);
    if (encoded.longestText > limits.maxTextLength) {
        const limit = diagnostic('format.limit-exceeded', '/content', { limit: 'maxTextLength' }, 'error');
        return blocked('limit-exceeded', [...found, limit]);
    }
    if (exceedsBytes(JSON.stringify(encoded.document), limits.maxDocumentBytes)) {
        const limit = diagnostic('format.limit-exceeded', '', { limit: 'maxDocumentBytes' }, 'error');
        return blocked('limit-exceeded', [...found, limit]);
    }
    return { result: { status: 'editable', document, diagnostics: found }, tree };
};

/**
 * Validates JSON text or a parsed value before any engine node exists. Unknown or
 * invalid content becomes islands or `unknownAttributes`; only unreadable input blocks, keeping the original.
 */
export const decodeDocument = (input: unknown, model: ContentModel, options?: DecodeOptions): DecodeResult =>
    decodeToTree(input, model, options).result;

/** A new document: a `doc` with one empty paragraph, every declared attribute at its default. */
export const createEmptyDocument = (model: ContentModel): RichTextDocument => {
    const { nodes } = vocabularyOf(model);
    const defaults = (name: string) => {
        const attrs: Record<string, unknown> = { unknownAttributes: null };
        const node = nodes.get(name);
        for (const [attribute, declaration] of Object.entries(node === undefined ? {} : attributesOf(node))) {
            attrs[attribute] = 'default' in declaration ? declaration.default : null;
        }
        return attrs;
    };
    const paragraph = { type: 'paragraph', attrs: defaults('paragraph') };
    return encodeTree({ type: 'doc', attrs: defaults('doc'), content: [paragraph] }, model).document;
};
