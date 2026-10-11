/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CodecContext, type JsonObject, type ReferenceResolution } from '#/model';
import { type ReaderNodeProps, type ReaderRenderers } from '#/reader/define';

/** What a mention shows: the current label, else its snapshot, and whether its resource is unavailable, with the reason. */
export interface ShownMention {
    readonly label: string;
    readonly unavailable: 'deleted' | 'forbidden' | null;
}

const textOf = (value: unknown): string => {
    if (typeof value === 'string') {
        return value;
    }
    return '';
};

/**
 * The label a mention shows: the label `resolveReference` reports as current, else `labelSnapshot`, else `Unknown`
 * and the resource type, so no mention shows an empty label. An unavailable resource keeps its snapshot, since a
 * deleted and a forbidden one look the same.
 */
export const shownMention = (
    attrs: JsonObject,
    context: Pick<CodecContext, 't'> & {
        readonly resolveReference: (resourceType: string, resourceId: string) => ReferenceResolution;
    },
): ShownMention => {
    const resourceType = textOf(attrs.resourceType);
    const resolution: unknown = context.resolveReference(resourceType, textOf(attrs.resourceId));
    let status: unknown;
    if (typeof resolution === 'object' && resolution !== null) {
        status = (resolution as { readonly status?: unknown }).status;
    }
    if (status === 'current') {
        const current = textOf((resolution as { readonly label?: unknown }).label);
        if (current !== '') {
            return { label: current, unavailable: null };
        }
    }
    let label = textOf(attrs.labelSnapshot);
    if (label === '') {
        label = context.t('RichTextEditor_mentionUnknown', { resourceType });
    }
    if (status === 'unavailable') {
        const { code } = resolution as { readonly code?: unknown };
        return { label, unavailable: code === 'forbidden' ? 'forbidden' : 'deleted' };
    }
    return { label, unavailable: null };
};

/** `@` and the label isolated for bidirectional text, then the unavailable note, with no resource ID in the markup. */
const Mention = ({ attrs, context }: ReaderNodeProps) => {
    const shown = shownMention(attrs, context);
    return (
        <span data-mention="">
            @<bdi>{shown.label}</bdi>
            {shown.unavailable !== null && ` (${context.t('RichTextEditor_mentionUnavailable')})`}
        </span>
    );
};

export const mentionReader: ReaderRenderers = { mention: Mention };
