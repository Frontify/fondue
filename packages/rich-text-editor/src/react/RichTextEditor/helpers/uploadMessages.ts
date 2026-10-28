/* (c) Copyright Frontify Ltd., all rights reserved. */

import { isolate } from '#/bridge/session/helpers/announcer';
import { type CodecContext, type ResourceLimits } from '#/model';
import { MAX_IMAGE_SIDE, megabytes, type UploadEvent, type UploadRejection } from '#/runtime/port';

// The names authors know the accepted media types by.
const TYPE_NAMES: Readonly<Record<string, string>> = {
    'image/png': 'PNG',
    'image/jpeg': 'JPEG',
    'image/gif': 'GIF',
    'image/webp': 'WebP',
    'image/avif': 'AVIF',
    'image/svg+xml': 'SVG',
};

/** The name of `type`, such as `PNG`, or its subtype in capitals for a type with no known name. */
const typeName = (type: string) => {
    const known = TYPE_NAMES[type];
    if (known !== undefined) {
        return known;
    }

    const subtype = type.split('/')[1] ?? type;

    return subtype.split('+')[0]?.toUpperCase() ?? type;
};

const EVENT_KEYS = {
    started: 'RichTextEditor_uploadStarted',
    failed: 'RichTextEditor_uploadFailed',
    cancelled: 'RichTextEditor_uploadCancelled',
} as const;

const REFUSAL_KEYS = {
    type: 'RichTextEditor_uploadWrongType',
    size: 'RichTextEditor_uploadTooLarge',
    unreadable: 'RichTextEditor_uploadUnreadable',
    unsafe: 'RichTextEditor_uploadUnsafe',
} as const;

/** `items` as one alternative list in `lang`, such as "PNG, JPEG or GIF". */
const alternatives = (items: readonly string[], lang: string) => {
    try {
        return new Intl.ListFormat(lang, { type: 'disjunction' }).format(items);
    } catch {
        return items.join(', ');
    }
};

type Limits = Pick<ResourceLimits, 'maxAssetBytes' | 'maxImagePixels'>;

/** Why one file was refused, with how to fix it: the accepted types and size, or the pixel limits. */
const refusalOf = (
    { name, reason }: { name: string; reason: UploadRejection },
    t: CodecContext['translate'],
    lang: string,
    limits: Limits,
    accepts: readonly string[],
) => {
    const numbers = new Intl.NumberFormat(lang, { maximumFractionDigits: 1 });
    if (reason === 'pixels') {
        return t('RichTextEditor_uploadTooManyPixels', {
            name: isolate(name),
            megapixels: numbers.format(limits.maxImagePixels / 1_000_000),
            side: numbers.format(MAX_IMAGE_SIDE),
        });
    }

    const megabyteFormat = new Intl.NumberFormat(lang, { style: 'unit', unit: 'megabyte', maximumFractionDigits: 1 });
    const size = megabyteFormat.format(megabytes(limits.maxAssetBytes));
    const types = alternatives([...new Set(accepts.map(typeName))], lang);

    return t(REFUSAL_KEYS[reason], { name: isolate(name), types, size });
};

/**
 * The live region message of an upload event in `lang`, with each file name isolated. A gesture's message says why
 * each file it refused was refused and how to fix it, then the upload it started by its name, or how many it started.
 */
export const uploadMessage = (
    event: UploadEvent,
    t: CodecContext['translate'],
    lang: string,
    limits: Limits,
    accepts: readonly string[],
): string => {
    if (event.kind === 'completed') {
        const key = event.altMissing ? 'RichTextEditor_uploadCompletedNoAlt' : 'RichTextEditor_uploadCompleted';
        const completed = t(key, { name: isolate(event.name) });
        if (!event.review) {
            return completed;
        }

        return t('RichTextEditor_announceBoth', { first: completed, second: t('RichTextEditor_imageAltReviewPrompt') });
    }

    if (event.kind !== 'gesture') {
        return t(EVENT_KEYS[event.kind], { name: isolate(event.name) });
    }

    const parts = event.refused.map((refused) => refusalOf(refused, t, lang, limits, accepts));
    const [first] = event.started;
    if (event.started.length === 1 && first !== undefined) {
        parts.push(t('RichTextEditor_uploadStarted', { name: isolate(first) }));
    } else if (event.started.length > 1) {
        parts.push(t('RichTextEditor_uploadStartedCount', { count: event.started.length }));
    }

    return parts.join(' ');
};
