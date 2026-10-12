/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CodecContext, type ResourceLimits } from '#/model';
import { MAX_IMAGE_SIDE, megabytes, type UploadEvent } from '#/runtime/uploads';

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
const typeName = (type: string) =>
    TYPE_NAMES[type] ?? (type.split('/')[1] ?? type).split('+')[0]?.toUpperCase() ?? type;

const EVENT_KEYS = {
    started: 'RichTextEditor_uploadStarted',
    completed: 'RichTextEditor_uploadCompleted',
    failed: 'RichTextEditor_uploadFailed',
    cancelled: 'RichTextEditor_uploadCancelled',
} as const;

/** `items` as one alternative list in `lang`, such as "PNG, JPEG or GIF". */
const alternatives = (items: readonly string[], lang: string) => {
    try {
        return new Intl.ListFormat(lang, { type: 'disjunction' }).format(items);
    } catch {
        return items.join(', ');
    }
};

/**
 * The live region message of an upload event in `lang`; a refused file's message names how to fix it: the accepted
 * types and size, or the pixel limits.
 */
export const uploadMessage = (
    event: UploadEvent,
    t: CodecContext['t'],
    lang: string,
    limits: Pick<ResourceLimits, 'maxAssetBytes' | 'maxImagePixels'>,
    accepts: readonly string[],
): string => {
    const { name } = event;
    if (event.kind !== 'rejected') {
        return t(EVENT_KEYS[event.kind], { name });
    }
    const numbers = new Intl.NumberFormat(lang, { maximumFractionDigits: 1 });
    if (event.reason === 'pixels') {
        return t('RichTextEditor_uploadTooManyPixels', {
            name,
            megapixels: numbers.format(limits.maxImagePixels / 1_000_000),
            side: numbers.format(MAX_IMAGE_SIDE),
        });
    }
    const size = new Intl.NumberFormat(lang, { style: 'unit', unit: 'megabyte', maximumFractionDigits: 1 }).format(
        megabytes(limits.maxAssetBytes),
    );
    const types = alternatives([...new Set(accepts.map(typeName))], lang);
    if (event.reason === 'size') {
        return t('RichTextEditor_uploadTooLarge', { name, types, size });
    }
    return t('RichTextEditor_uploadWrongType', { name, types, size });
};
