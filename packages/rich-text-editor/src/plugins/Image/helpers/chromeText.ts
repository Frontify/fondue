/* (c) Copyright Frontify Ltd., all rights reserved. */

import { type CodecContext } from '#/model';

/** The alternative-text action's name: review, add or edit. */
export const altActionLabel = (t: CodecContext['translate'], review: boolean, kept: boolean) => {
    let altText = t('RichTextEditor_imageAltEdit');
    if (review) {
        altText = t('RichTextEditor_imageAltReview');
    } else if (!kept) {
        altText = t('RichTextEditor_imageAltAdd');
    }

    return altText;
};

/** The size action's name: the stored percent, or the original size. */
export const sizeActionLabel = (t: CodecContext['translate'], displayWidth: number | null) => {
    let sizeText = t('RichTextEditor_imageSizeOriginal');
    if (displayWidth !== null) {
        sizeText = t('RichTextEditor_imageSizePercent', { percent: displayWidth });
    }

    return sizeText;
};
