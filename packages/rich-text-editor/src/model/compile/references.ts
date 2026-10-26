/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isRecord } from '../helpers/values';
import { type ReferenceDeclaration } from '../vocabulary/contentRules';
import {
    type CodecContext,
    type ContentModel,
    type JsonObject,
    type ReferenceResolution,
} from '../vocabulary/declarations';
import { type RichTextDocument } from '../vocabulary/format';

import { compiledModel } from './compile';

/** A host's lookup of a mentioned resource's current label. */
export type ResolveReference = (resourceType: string, resourceId: string) => ReferenceResolution;

const UNKNOWN: ReferenceResolution = { status: 'unknown' };
// Bidirectional marks, embeddings, overrides and isolates, which would reorder the text around a label.
const BIDI_CONTROLS = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/gu;

// C0 and C1 control characters, such as the escape that starts a terminal hyperlink.
const CONTROLS = /[\u0000-\u001F\u007F-\u009F]/gu;
const UNSAFE = /[\u0000-\u001F\u007F-\u009F\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/u;

/** `text` without bidirectional control characters; the letters of every script stay. */
export const withoutBidiControls = (text: string): string => text.replaceAll(BIDI_CONTROLS, '');

/** A label as it is shown and written: without bidirectional and C0 and C1 control characters. */
export const shownLabel = (text: string): string => withoutBidiControls(text).replaceAll(CONTROLS, '');

/** Whether `text` holds a bidirectional or control character, which no stored ID may. */
export const holdsControls = (text: string): boolean => UNSAFE.test(text);

/** `resolve`, or none, as a resolver that gives `unknown` where it has none or throws, for that call only. */
export const resolvingSafely =
    (resolve: ResolveReference | undefined): ResolveReference =>
    (resourceType, resourceId) => {
        if (resolve === undefined) {
            return UNKNOWN;
        }

        try {
            return resolve(resourceType, resourceId);
        } catch {
            return UNKNOWN;
        }
    };

/**
 * What a mention shows: its label, and whether its resource is unavailable, with the reason.
 * Public so the shipped features and the core share it.
 */
export type MentionLabel = {
    label: string;
    unavailable: 'deleted' | 'forbidden' | null;
};

const stringOf = (value: unknown): string => {
    if (typeof value === 'string') {
        return value;
    }

    return '';
};

/**
 * The label a mention shows in the editor, the reader and every codec: the label `resolveReference` reports as current,
 * else `labelSnapshot`, else `Unknown` and the resource type, so no mention shows an empty label. An unavailable
 * resource keeps its snapshot, since a deleted and a forbidden one look the same.
 * Public so the shipped features and the core share it.
 */
export const mentionLabel = (
    attrs: JsonObject,
    { t, resolveReference }: Pick<CodecContext, 't'> & { resolveReference?: ResolveReference | undefined },
): MentionLabel => {
    // IDs resolve as stored, so the chip names the resource `diffReferences` reports.
    const resourceType = stringOf(attrs.resourceType);
    const resolution: unknown = resolvingSafely(resolveReference)(resourceType, stringOf(attrs.resourceId));
    let status: unknown;
    if (typeof resolution === 'object' && resolution !== null) {
        status = (resolution as { status?: unknown }).status;
    }

    if (status === 'current') {
        const current = shownLabel(stringOf((resolution as { label?: unknown }).label));
        if (current !== '') {
            return { label: current, unavailable: null };
        }
    }

    let label = shownLabel(stringOf(attrs.labelSnapshot));
    if (label === '') {
        label = t('RichTextEditor_mentionUnknown', { resourceType });
    }

    if (status === 'unavailable') {
        const { code } = resolution as { code?: unknown };

        return { label, unavailable: code === 'forbidden' ? 'forbidden' : 'deleted' };
    }

    return { label, unavailable: null };
};

/**
 * The text after a mention's label that says its resource is unavailable, or nothing.
 * Public so the shipped features and the core share it.
 */
export const unavailableNote = ({ unavailable }: MentionLabel, t: CodecContext['t']): string => {
    if (unavailable === null) {
        return '';
    }

    return ` (${t('RichTextEditor_mentionUnavailable')})`;
};

/** One mention occurrence: its `nodeId` and the resource it names. */
export type MentionReference = {
    nodeId: string;
    resourceType: string;
    resourceId: string;
};
/** The mentions a change added to a document and removed from it. */
export type ReferenceDiff = {
    added: readonly MentionReference[];
    removed: readonly MentionReference[];
};

/** The mentions of a stored document by `nodeId`, in document order; a repeated `nodeId` counts once. */
const mentionsOf = (document: RichTextDocument, model: ContentModel): Map<string, MentionReference> => {
    const declared = new Map<string, ReferenceDeclaration>(
        compiledModel(model)
            .features.flatMap(({ declaration }) => declaration.references ?? [])
            .map((reference) => [reference.node, reference]),
    );
    const found = new Map<string, MentionReference>();
    const pending: unknown[] = [document.content];
    // Walked with a stack, so a document nested past the call stack's depth still reads.
    for (let node = pending.pop(); node !== undefined; node = pending.pop()) {
        if (!isRecord(node)) {
            continue;
        }

        const { attrs } = node;
        const reference = typeof node.type === 'string' ? declared.get(node.type) : undefined;
        if (reference !== undefined && isRecord(attrs)) {
            const nodeId = attrs[reference.nodeId];
            const resourceType = attrs[reference.resourceType];
            const resourceId = attrs[reference.resourceId];
            if (
                typeof nodeId === 'string' &&
                typeof resourceType === 'string' &&
                typeof resourceId === 'string' &&
                !found.has(nodeId)
            ) {
                found.set(nodeId, { nodeId, resourceType, resourceId });
            }
        }

        if (Array.isArray(node.content)) {
            const children = node.content as readonly unknown[];
            for (let index = children.length - 1; index >= 0; index -= 1) {
                pending.push(children[index]);
            }
        }
    }

    return found;
};

const sameReference = (a: MentionReference, b: MentionReference) =>
    a.resourceType === b.resourceType && a.resourceId === b.resourceId;

/**
 * The mentions `after` holds that `before` does not, and the reverse, keyed by `nodeId`: a moved mention keeps its
 * `nodeId` and is neither, a pasted copy has a new one and is added, and a `nodeId` that names another resource is
 * removed and added. A host decides from this whom to notify; the editor notifies no one. The `model`'s features
 * declare which nodes are references.
 */
export const diffReferences = (
    before: RichTextDocument,
    after: RichTextDocument,
    model: ContentModel,
): ReferenceDiff => {
    const previous = mentionsOf(before, model);
    const next = mentionsOf(after, model);
    const added = [...next.values()].filter((mention) => {
        const old = previous.get(mention.nodeId);

        return old === undefined || !sameReference(old, mention);
    });
    const removed = [...previous.values()].filter((mention) => {
        const kept = next.get(mention.nodeId);

        return kept === undefined || !sameReference(kept, mention);
    });

    return { added, removed };
};
