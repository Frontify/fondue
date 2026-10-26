/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isRecord } from '../helpers/values';
import { type ContentModel } from '../vocabulary/declarations';
import { pointer } from '../vocabulary/errors';
import { type Diagnostic, diagnostic, type RichTextDocument } from '../vocabulary/format';

export type EnvelopeResult =
    | { ok: true; document: RichTextDocument }
    | { ok: false; reason: 'invalid' | 'unsupported'; diagnostic: Diagnostic };

const ENVELOPE_KEYS = ['format', 'formatVersion', 'model', 'requiredCapabilities', 'content'];
const ROOT_KEYS = new Set(['type', 'attrs', 'content']);

const hasExactly = (record: Readonly<Record<string, unknown>>, keys: readonly string[]) =>
    Object.keys(record).length === keys.length && keys.every((key) => Object.hasOwn(record, key));

/** A `model` value or a `requiredCapabilities` element: exactly a string `id` and an integer `version`. */
const isRef = (value: unknown): value is { id: string; version: number } =>
    isRecord(value) &&
    hasExactly(value, ['id', 'version']) &&
    typeof value.id === 'string' &&
    Number.isInteger(value.version);

/** A `doc` with at least one child and no key but `attrs` (an object). */
export const isRoot = (root: unknown): boolean =>
    isRecord(root) &&
    root.type === 'doc' &&
    Array.isArray(root.content) &&
    root.content.length > 0 &&
    Object.keys(root).every((key) => ROOT_KEYS.has(key)) &&
    (!Object.hasOwn(root, 'attrs') || isRecord(root.attrs));

/** The path of the first part of a `requiredCapabilities` value that is not an array of refs with distinct `id`s. */
export const findMisshapenCapabilities = (capabilities: unknown): string | undefined => {
    if (!Array.isArray(capabilities)) {
        return '/requiredCapabilities';
    }

    const ids = new Set<string>();
    for (const [index, capability] of capabilities.entries()) {
        if (!isRef(capability) || ids.has(capability.id)) {
            return pointer('requiredCapabilities', index);
        }

        ids.add(capability.id);
    }

    return undefined;
};

/** The path of the first part of a known-version envelope that lacks the envelope shape or the root shape. */
const findMisshapen = (envelope: Readonly<Record<string, unknown>>): string | undefined => {
    if (!hasExactly(envelope, ENVELOPE_KEYS)) {
        return '';
    }

    if (!isRef(envelope.model)) {
        return '/model';
    }

    const root = isRoot(envelope.content) ? undefined : '/content';

    return findMisshapenCapabilities(envelope.requiredCapabilities) ?? root;
};

/** Checks the format and its version, then the envelope and root shape, then the model ID. */
export const checkEnvelope = (value: unknown, model: ContentModel): EnvelopeResult => {
    const invalid = (path: string): EnvelopeResult => ({
        ok: false,
        reason: 'invalid',
        diagnostic: diagnostic('format.envelope-invalid', path, undefined, 'error'),
    });
    if (!isRecord(value) || value.format !== 'frontify.rich-text' || !Object.hasOwn(value, 'formatVersion')) {
        return invalid('');
    }

    if (value.formatVersion !== 1) {
        return {
            ok: false,
            reason: 'unsupported',
            diagnostic: diagnostic('format.unknown-format-version', '/formatVersion', undefined, 'error'),
        };
    }

    const misshapen = findMisshapen(value);
    if (misshapen !== undefined) {
        return invalid(misshapen);
    }

    // `findMisshapen` checked the envelope and root shape; deeper content is checked later, per node.
    const document = value as Readonly<Record<string, unknown>> & RichTextDocument;
    if (document.model.id !== model.ref.id) {
        return {
            ok: false,
            reason: 'unsupported',
            diagnostic: diagnostic('format.wrong-model', '/model/id', undefined, 'error'),
        };
    }

    return { ok: true, document };
};
